"use client";

import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const JharkhandMap = dynamic(
  () => import('@/components/map/JharkhandMap'),
  { ssr: false }
);

export default function ClientMapPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Service Locations Map</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <JharkhandMap />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Find Services</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <select
                  id="district"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select District</option>
                  <option value="ranchi">Ranchi</option>
                  <option value="jamshedpur">Jamshedpur</option>
                  <option value="dhanbad">Dhanbad</option>
                  <option value="bokaro">Bokaro</option>
                  <option value="hazaribagh">Hazaribagh</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  id="service"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Services</option>
                  <option value="government">Government Office</option>
                  <option value="help">Help Center</option>
                  <option value="health">Health Services</option>
                  <option value="education">Education</option>
                </select>
              </div>
              
              <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Find Locations
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Nearby Services</h2>
            <ul className="space-y-3">
              <li className="p-3 hover:bg-gray-50 rounded-md cursor-pointer">
                <h3 className="font-medium">Ranchi Service Center</h3>
                <p className="text-sm text-gray-600">2.5 km away</p>
              </li>
              <li className="p-3 hover:bg-gray-50 rounded-md cursor-pointer">
                <h3 className="font-medium">Namkum Help Desk</h3>
                <p className="text-sm text-gray-600">4.8 km away</p>
              </li>
              <li className="p-3 hover:bg-gray-50 rounded-md cursor-pointer">
                <h3 className="font-medium">Doranda Office</h3>
                <p className="text-sm text-gray-600">6.2 km away</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}