import React from 'react';
import { Vendor } from '../types';
import { MapPin, Star, Clock, Tag } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  onBook: (vendor: Vendor) => void;
  onClick?: (vendor: Vendor) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onBook, onClick }) => {
  return (
    <div 
      onClick={() => onClick && onClick(vendor)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full cursor-pointer group"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-gray-100">
        <img 
          src={vendor.imageUrl} 
          alt={vendor.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold shadow-sm">
          {vendor.distance}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-samsara-blue transition-colors">{vendor.name}</h3>
          <span className="text-sm font-medium text-gray-500">{vendor.priceLevel}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={14} className="mr-1 text-gray-400" />
          <span className="truncate">{vendor.location}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-500 mr-2">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-sm font-bold text-gray-800">{vendor.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({vendor.reviewCount} reviews)</span>
          <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${
            vendor.status === 'Available' ? 'bg-green-100 text-green-700' :
            vendor.status === 'Busy' ? 'bg-orange-100 text-orange-700' :
            'bg-red-100 text-red-700'
          }`}>
            {vendor.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {vendor.services.slice(0, 3).map((service, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
              {service}
            </span>
          ))}
          {vendor.services.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
              +{vendor.services.length - 3}
            </span>
          )}
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} className="mr-1" />
                Next: {vendor.nextAvailable}
            </div>
            <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onBook(vendor);
                }}
                className="bg-white border border-samsara-blue text-samsara-blue hover:bg-blue-50 text-sm font-medium px-3 py-1.5 rounded transition-colors"
            >
                Book Service
            </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;