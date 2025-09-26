"use client";

import ChatInterface from '@/components/chatbot/ChatInterface';

export default function ClientChatbotPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chat Assistant</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-3">
            <li>
              <button className="text-left text-indigo-600 hover:text-indigo-800 font-medium">
                What services are available in my district?
              </button>
            </li>
            <li>
              <button className="text-left text-indigo-600 hover:text-indigo-800 font-medium">
                How can I apply for a government scheme?
              </button>
            </li>
            <li>
              <button className="text-left text-indigo-600 hover:text-indigo-800 font-medium">
                Where is the nearest service center?
              </button>
            </li>
            <li>
              <button className="text-left text-indigo-600 hover:text-indigo-800 font-medium">
                What documents do I need for registration?
              </button>
            </li>
            <li>
              <button className="text-left text-indigo-600 hover:text-indigo-800 font-medium">
                How can I track my application status?
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}