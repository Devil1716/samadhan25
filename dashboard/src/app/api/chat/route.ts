import { createClient } from '@supabase/supabase-js';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Initialize Supabase client
const supabaseUrl = 'https://ypddqynoyjsgnczqexwv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZGRxeW5veWpzZ25jenFleHd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDA3NDEsImV4cCI6MjA3NDAxNjc0MX0.dqKv34xgq8DNDdfd4yTi6LBSzwBc_yzvy5wmOrNsMlk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize OpenAI client
// Note: In a production environment, use environment variables for API keys
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
});

export async function POST(req: Request) {
  const { messages, userId } = await req.json();

  try {
    // Fetch relevant information from Supabase
    const { data: contextData, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .limit(5);

    if (error) {
      console.error('Error fetching data from Supabase:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch context data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Format context data for the AI
    const contextString = contextData
      ? `Context information from Jharkhand region: ${JSON.stringify(contextData)}`
      : 'No specific context available for Jharkhand region.';

    // Prepare system message with context
    const systemMessage = {
      role: 'system',
      content: `You are a helpful assistant for the SAMADHAAN platform focused on the Jharkhand region in India. 
      Provide accurate, context-aware responses specific to Jharkhand's geography, culture, and services. 
      Be respectful and supportive. If you don't know something specific to Jharkhand, acknowledge that limitation.
      ${contextString}`,
    };

    // Combine system message with user messages
    const combinedMessages = [systemMessage, ...messages];

    // Create a stream from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: combinedMessages,
      temperature: 0.7,
      stream: true,
    });

    // Convert the response to a readable stream
    const stream = OpenAIStream(response);

    // Log conversation to Supabase for analytics
    await supabase.from('chat_history').insert({
      user_id: userId || 'anonymous',
      messages: messages,
      timestamp: new Date().toISOString(),
    });

    // Return the stream response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'An error occurred during the chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}