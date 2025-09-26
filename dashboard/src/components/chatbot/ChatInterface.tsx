"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { supabase } from '@/lib/supabase';

export default function ChatInterface() {
  const [userId, setUserId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, status } = useChat({
    onFinish: () => {
      // Scroll to bottom when new message arrives
      scrollToBottom();
    },
  });

  // Get current user ID from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    
    fetchUser();
  }, []);

  // Auto-scroll to the most recent message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Send message with additional metadata
      sendMessage({
        text: inputValue,
        metadata: { userId }
      });
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Check if we're currently loading/streaming
  const isLoading = status === 'submitted' || status === 'streaming';

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-lg shadow-md">
      <div className="p-4 bg-indigo-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">SAMADHAAN Assistant</h2>
        <p className="text-sm opacity-80">Ask me anything about Jharkhand services</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">
            <p>Welcome to SAMADHAAN Assistant!</p>
            <p className="text-sm mt-2">How can I help you today?</p>
          </div>
        ) : (
          messages.map((message: UIMessage) => {
            const isUser = message.role === 'user';
            // Extract text content from the message parts
            let content = '';
            if (Array.isArray(message.parts)) {
              content = message.parts.map(part => {
                if (typeof part === 'string') {
                  return part;
                } else if (typeof part === 'object' && part !== null) {
                  // Handle different part types
                  if ('text' in part) {
                    return (part as any).text || '';
                  } else if ('type' in part && (part as any).type === 'text') {
                    return (part as any).value || '';
                  }
                }
                return '';
              }).join('');
            }
            
            return (
              <div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{content}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleFormSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-indigo-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}