import React from 'react';
import { ServiceRequest } from '../types';
import { MOCK_ISSUES, MOCK_ASSETS, MOCK_VENDORS } from '../constants';
import { ArrowLeft, Calendar, Truck, AlertCircle, Clock, MapPin, Phone, Mail, FileText, CheckCircle2, Wrench, User } from 'lucide-react';

interface ServiceRequestDetailsProps {
  request: ServiceRequest;
  onBack: () => void;
}

const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> = ({ request, onBack }) => {
  // Resolve linked data
  const resolvedIssues = request.issueIds 
    ? MOCK_ISSUES.filter(issue => request.issueIds?.includes(issue.id))
    : [];
  
  const resolvedVendor = MOCK_VENDORS.find(v => v.id === request.vendorId);
  const resolvedAsset = MOCK_ASSETS.find(a => a.id === request.vehicleId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-[#f9fafb] min-h-full flex flex-col">
       {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Service Requests
        </button>

        <div className="flex justify-between items-start">
           <div>
               <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">Request #{request.id.replace('req_', '')}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
               </div>
               <p className="text-sm text-gray-500 mt-1">Submitted on {request.submittedDate}</p>
           </div>
           
           <div className="flex gap-2">
             {request.status === 'Pending' && (
                <button className="px-4 py-2 border border-red-200 text-red-600 bg-white hover:bg-red-50 rounded-md text-sm font-medium">
                    Cancel Request
                </button>
             )}
             <button className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md text-sm font-medium">
                 Download PDF
             </button>
           </div>
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
         
         {/* Main Column */}
         <div className="flex-1 space-y-6">
            
            {/* Service Details Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                 <Wrench size={20} className="mr-2 text-gray-500" /> Service Information
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Primary Service</label>
                    <div className="text-gray-900 font-medium">{request.serviceType}</div>
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Scheduled Date</label>
                    <div className="text-gray-900 font-medium">{request.scheduledDate || 'Not yet scheduled'}</div>
                 </div>
               </div>

               {request.notes && (
                 <div className="mt-6 pt-6 border-t border-gray-100">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Customer Notes</label>
                    <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-700 border border-gray-200">
                        {request.notes}
                    </div>
                 </div>
               )}
            </div>

            {/* Issues Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                   <AlertCircle size={20} className="mr-2 text-gray-500" /> Linked Issues
                 </h3>
                 <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{resolvedIssues.length}</span>
               </div>
               
               {resolvedIssues.length > 0 ? (
                 <div className="divide-y divide-gray-100">
                   {resolvedIssues.map(issue => (
                     <div key={issue.id} className="p-4 flex items-start gap-3">
                        <div className={`mt-0.5 p-1 rounded-full bg-red-100 text-red-600`}>
                           <AlertCircle size={16} />
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                             <span className={`text-xs font-bold px-1.5 py-0.5 rounded uppercase ${
                                issue.type === 'Fault' ? 'bg-red-100 text-red-700' : 
                                issue.type === 'DVIR' ? 'bg-orange-100 text-orange-700' : 
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {issue.type}
                             </span>
                             <span className="text-xs text-gray-500">{issue.date}</span>
                           </div>
                           <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                           <div className="text-sm text-gray-500">{issue.description}</div>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="p-8 text-center text-gray-500 text-sm">
                    No specific faults or DVIRs were linked to this request.
                 </div>
               )}
            </div>
         </div>

         {/* Right Sidebar */}
         <div className="w-full lg:w-96 space-y-6">
            
            {/* Vendor Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Service Provider</h3>
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={request.vendorImage} alt={request.vendorName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{request.vendorName}</div>
                    {resolvedVendor && <div className="text-xs text-gray-500">{resolvedVendor.location}</div>}
                  </div>
               </div>
               
               <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                  {resolvedVendor?.phoneNumber && (
                      <div className="flex items-center text-gray-600">
                        <Phone size={16} className="mr-3 text-gray-400" />
                        {resolvedVendor.phoneNumber}
                      </div>
                  )}
                  {resolvedVendor?.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail size={16} className="mr-3 text-gray-400" />
                        <a href={`mailto:${resolvedVendor.email}`} className="text-samsara-blue hover:underline">{resolvedVendor.email}</a>
                      </div>
                  )}
               </div>
            </div>

            {/* Asset Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Asset Details</h3>
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{request.vehicleName}</div>
                    <div className="text-xs text-gray-500">ID: {request.vehicleId}</div>
                  </div>
               </div>
               
               {resolvedAsset && (
                 <div className="space-y-2 text-sm bg-gray-50 p-3 rounded border border-gray-100">
                    <div className="flex justify-between">
                       <span className="text-gray-500">VIN</span>
                       <span className="font-mono text-gray-700">{resolvedAsset.vin}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500">Make/Model</span>
                       <span className="text-gray-700">{resolvedAsset.make} {resolvedAsset.model}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500">Year</span>
                       <span className="text-gray-700">{resolvedAsset.year}</span>
                    </div>
                 </div>
               )}
            </div>

            {/* Timeline Placeholder */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Request History</h3>
               <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  <div className="relative pl-6">
                     <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-samsara-blue border-4 border-white shadow-sm z-10"></div>
                     <div className="text-sm font-medium text-gray-900">Request Submitted</div>
                     <div className="text-xs text-gray-500">{request.submittedDate}</div>
                     <div className="text-xs text-gray-500 mt-0.5">by Hooli User</div>
                  </div>
                  {request.status !== 'Pending' && (
                      <div className="relative pl-6">
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gray-200 border-4 border-white shadow-sm z-10"></div>
                        <div className="text-sm font-medium text-gray-900">Vendor Confirmed</div>
                        <div className="text-xs text-gray-500">Oct 29, 2023</div>
                      </div>
                  )}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default ServiceRequestDetails;