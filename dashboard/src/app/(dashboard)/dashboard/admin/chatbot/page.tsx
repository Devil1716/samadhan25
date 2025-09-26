"use client";

import ChatInterface from '@/components/chatbot/ChatInterface';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminChatbotPage() {
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const { error } = await supabase
        .from('knowledge_base')
        .insert([{ content: knowledgeBase, region: 'Jharkhand', created_at: new Date().toISOString() }]);

      if (error) throw error;
      
      setSuccessMessage('Knowledge base updated successfully!');
      setKnowledgeBase('');
    } catch (error) {
      console.error('Error updating knowledge base:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chatbot Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add to Knowledge Base</h2>
            <form onSubmit={handleAddKnowledge}>
              <div className="mb-4">
                <label htmlFor="knowledge" className="block text-sm font-medium text-gray-700 mb-1">
                  Information about Jharkhand
                </label>
                <textarea
                  id="knowledge"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Add information about services, locations, or procedures..."
                  value={knowledgeBase}
                  onChange={(e) => setKnowledgeBase(e.target.value)}
                  required
                />
              </div>
              {successMessage && (
                <div className="mb-4 p-2 bg-green-50 text-green-700 rounded-md text-sm">
                  {successMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Add to Knowledge Base'}
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Conversations</span>
                <span className="font-medium">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Users</span>
                <span className="font-medium">58</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-medium">1.2s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Satisfaction Rate</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}