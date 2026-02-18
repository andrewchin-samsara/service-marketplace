import React from 'react';
import { Vendor, ServiceItem } from '../types';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VendorDetailsProps {
  vendor: Vendor;
  onBack: () => void;
  onBookService: (vendor: Vendor, service?: ServiceItem) => void;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({ vendor, onBack, onBookService }) => {
  return (
    <div className="bg-[#f9fafb] min-h-full flex flex-col">
      {/* Header / Breadcrumb area */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Marketplace
        </button>

        <div className="flex flex-col md:flex-row gap-6">
           {/* Vendor Image */}
           <div className="w-full md:w-48 h-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
             <img src={vendor.imageUrl} alt={vendor.name} className="w-full h-full object-cover" />
           </div>

           {/* Vendor Key Info */}
           <div className="flex-1">
             <div className="flex justify-between items-start">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center text-yellow-500 font-medium">
                      <Star size={16} fill="currentColor" className="mr-1" />
                      {vendor.rating} <span className="text-gray-400 font-normal ml-1">({vendor.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      {vendor.location}
                    </div>
                  </div>
               </div>
               <div className="flex gap-3">
                 <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                   Contact
                 </button>
                 <button 
                    onClick={() => onBookService(vendor)}
                    className="px-4 py-2 bg-samsara-blue text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm"
                 >
                   Book Service
                 </button>
               </div>
             </div>
             
             <div className="flex gap-2 mt-4">
               {vendor.services.slice(0, 4).map((s, i) => (
                 <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200 font-medium">
                   {s}
                 </span>
               ))}
             </div>
           </div>
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col md:flex-row gap-6 flex-1 max-w-7xl mx-auto w-full">
         
         {/* Left Column: Services & Description */}
         <div className="flex-1 space-y-6">
            
            {/* About Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Vendor</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {vendor.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 w-fit px-3 py-1.5 rounded-full border border-green-100">
                <ShieldCheck size={16} />
                <span className="font-medium">Samsara Certified Partner</span>
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="text-lg font-semibold text-gray-900">Services & Pricing</h3>
                 <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Price Level: {vendor.priceLevel}</span>
               </div>
               
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 w-1/2">Service Name</th>
                      <th className="px-6 py-3 border-b border-gray-200">Duration</th>
                      <th className="px-6 py-3 border-b border-gray-200 text-right">Est. Cost</th>
                      <th className="px-6 py-3 border-b border-gray-200 w-16"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {vendor.detailedServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{service.description}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {service.duration}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                          {service.price === 0 ? 'Free' : `$${service.price.toFixed(2)}`}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                              onClick={() => onBookService(vendor, service)}
                              className="text-samsara-blue hover:text-blue-700 opacity-0 group-hover:opacity-100 font-medium transition-all"
                           >
                             Select
                           </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
               <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
                 * Final pricing may vary based on vehicle model and parts required.
               </div>
            </div>
         </div>

         {/* Right Column: Sidebar info */}
         <div className="w-full md:w-80 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Contact Info</h4>
               <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-3 text-gray-400" />
                    {vendor.phoneNumber}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-3 text-gray-400" />
                    <a href={`mailto:${vendor.email}`} className="hover:text-samsara-blue">{vendor.email}</a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-3 text-gray-400" />
                    <span>Next Available: <span className="font-medium text-gray-900">{vendor.nextAvailable}</span></span>
                  </div>
               </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Operating Hours</h4>
               <div className="text-sm text-gray-600">
                 {vendor.hours.split(',').map((part, i) => (
                   <div key={i} className="mb-1">{part.trim()}</div>
                 ))}
               </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
               <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Service Status</h4>
               <div className="flex items-center gap-2 mb-2">
                 <div className={`w-2.5 h-2.5 rounded-full ${
                    vendor.status === 'Available' ? 'bg-green-500' :
                    vendor.status === 'Busy' ? 'bg-orange-500' : 'bg-red-500'
                 }`}></div>
                 <span className="font-medium text-gray-900">{vendor.status}</span>
               </div>
               <p className="text-xs text-gray-500">
                 {vendor.status === 'Available' 
                   ? 'Vendor is currently accepting new instant booking requests.' 
                   : 'Response times may be delayed due to high volume.'}
               </p>
            </div>
         </div>

      </div>
    </div>
  );
};

export default VendorDetails;