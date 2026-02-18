import React from 'react';
import { ServiceRequest } from '../types';
import { Calendar, Truck, AlertCircle, ChevronRight, Clock, CheckCircle2, Wrench } from 'lucide-react';

interface ServiceRequestsListProps {
  requests: ServiceRequest[];
  onSelectRequest: (request: ServiceRequest) => void;
}

const ServiceRequestsList: React.FC<ServiceRequestsListProps> = ({ requests, onSelectRequest }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={14} className="mr-1.5" />;
      case 'Confirmed': return <Calendar size={14} className="mr-1.5" />;
      case 'In Progress': return <Wrench size={14} className="mr-1.5" />;
      case 'Completed': return <CheckCircle2 size={14} className="mr-1.5" />;
      default: return null;
    }
  };

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm">
        <Wrench size={48} className="text-gray-200 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Service Requests</h3>
        <p className="text-gray-500 mt-1">Book a service with a vendor to see it here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Details</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested Date</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr 
                key={request.id} 
                onClick={() => onSelectRequest(request)}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                      <Truck size={16} />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{request.vehicleName}</div>
                      <div className="text-xs text-gray-500">ID: {request.vehicleId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                        {request.vendorImage ? (
                            <img className="h-full w-full object-cover" src={request.vendorImage} alt="" />
                        ) : (
                            <Wrench size={16} className="m-2 text-gray-400" />
                        )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{request.vendorName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{request.serviceType}</div>
                  {request.issueCount > 0 && (
                    <div className="flex items-center mt-1 text-xs text-orange-600 font-medium">
                      <AlertCircle size={12} className="mr-1" />
                      {request.issueCount} reported issue{request.issueCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.scheduledDate ? (
                     <span className="text-samsara-blue font-medium">{request.scheduledDate}</span>
                  ) : (
                     <span>Submitted: {request.submittedDate}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span className="text-gray-400 group-hover:text-gray-600">
                    <ChevronRight size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceRequestsList;