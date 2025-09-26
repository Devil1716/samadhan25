"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { supabase } from '@/lib/supabase';

// Fix for default marker icon in Next.js
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Jharkhand center coordinates
const JHARKHAND_CENTER = [23.6102, 85.2799];
const DEFAULT_ZOOM = 7;

type ServiceLocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  service_type: string;
};

export default function JharkhandMap() {
  const [locations, setLocations] = useState<ServiceLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch service locations from Supabase
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase
          .from('service_locations')
          .select('*')
          .eq('state', 'Jharkhand');

        if (error) throw error;
        
        if (data) {
          setLocations(data);
        } else {
          // Fallback data if no locations in database
          setLocations([
            {
              id: 1,
              name: 'Ranchi Service Center',
              latitude: 23.3441,
              longitude: 85.3096,
              address: 'Main Road, Ranchi, Jharkhand',
              service_type: 'Government Office'
            },
            {
              id: 2,
              name: 'Jamshedpur Help Desk',
              latitude: 22.8046,
              longitude: 86.2029,
              address: 'Sakchi, Jamshedpur, Jharkhand',
              service_type: 'Help Center'
            },
            {
              id: 3,
              name: 'Dhanbad Service Hub',
              latitude: 23.7957,
              longitude: 86.4304,
              address: 'Bank More, Dhanbad, Jharkhand',
              service_type: 'Government Office'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Set fallback data
        setLocations([
          {
            id: 1,
            name: 'Ranchi Service Center',
            latitude: 23.3441,
            longitude: 85.3096,
            address: 'Main Road, Ranchi, Jharkhand',
            service_type: 'Government Office'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={JHARKHAND_CENTER as [number, number]} 
        zoom={DEFAULT_ZOOM} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location) => (
          <Marker 
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.address}</p>
                <p className="text-xs mt-1 text-gray-600">{location.service_type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}