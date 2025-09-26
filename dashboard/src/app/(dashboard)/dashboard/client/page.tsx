"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientDashboard() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Apply for Certificate",
      description: "Apply for various certificates including birth, death, income, and residence certificates.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "indigo"
    },
    {
      id: 2,
      title: "Find Nearest Center",
      description: "Locate the nearest government service center in your area.",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z",
      color: "green"
    },
    {
      id: 3,
      title: "Track Application",
      description: "Check the status of your submitted applications and requests.",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "yellow"
    },
    {
      id: 4,
      title: "Ask Questions",
      description: "Get answers to your questions through our AI-powered chatbot.",
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
      color: "blue"
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Service Center in Ranchi",
      date: "2023-06-15",
      content: "A new service center has been opened in Ranchi to better serve the local community."
    },
    {
      id: 2,
      title: "Online Certificate Application Now Available",
      date: "2023-06-10",
      content: "You can now apply for certificates online through our portal."
    },
    {
      id: 3,
      title: "System Maintenance Notice",
      date: "2023-06-05",
      content: "The system will be undergoing maintenance on June 20th from 10 PM to 2 AM."
    }
  ]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome to Jharkhand Services Portal</h1>
      
      {/* Services Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className={`bg-white rounded-lg shadow-md p-6 border-t-4 border-${service.color}-500 hover:shadow-lg transition-shadow`}>
              <div className={`inline-flex items-center justify-center p-3 bg-${service.color}-100 rounded-full text-${service.color}-600 mb-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link href="#" className={`text-${service.color}-600 font-medium hover:text-${service.color}-700`}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/client/chatbot" className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-sm font-medium">Ask Questions</span>
          </Link>
          
          <Link href="/dashboard/client/map" className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">Find Locations</span>
          </Link>
          
          <Link href="#" className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm font-medium">Track Applications</span>
          </Link>
          
          <Link href="#" className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">Schedule Appointment</span>
          </Link>
        </div>
      </div>
      
      {/* Announcements */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{announcement.title}</h3>
                <span className="text-sm text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-gray-600 mt-2">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Help Section */}
      <div className="bg-indigo-50 rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Our AI-powered chatbot is available 24/7 to answer your questions about government services in Jharkhand.
            </p>
            <Link href="/dashboard/client/chatbot" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Chat Now
            </Link>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}