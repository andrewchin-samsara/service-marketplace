import React, { useState } from 'react';
import { MOCK_VENDORS, SERVICE_CATEGORIES, MOCK_SERVICE_REQUESTS } from '../constants';
import VendorCard from './VendorCard';
import VendorDetails from './VendorDetails';
import BookingFlow from './BookingFlow';
import ServiceRequestsList from './ServiceRequestsList';
import ServiceRequestDetails from './ServiceRequestDetails';
import { Vendor, ServiceItem, ServiceRequest } from '../types';
import { Search, Filter, Map, List, Plus } from 'lucide-react';

interface MarketplaceProps {
  onAddVendor?: () => void;
}

type MarketplaceTab = 'browse' | 'requests' | 'network' | 'history';

const Marketplace: React.FC<MarketplaceProps> = ({ onAddVendor }) => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  
  // Data State
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(MOCK_SERVICE_REQUESTS);

  // Booking State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingVendor, setBookingVendor] = useState<Vendor | null>(null);
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | undefined>(undefined);

  const filteredVendors = MOCK_VENDORS.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Services' || vendor.services.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleBookService = (vendor: Vendor, service?: ServiceItem) => {
    setBookingVendor(vendor);
    setPreSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newRequest: ServiceRequest) => {
    setIsBookingOpen(false);
    setBookingVendor(null);
    setPreSelectedService(undefined);
    setSelectedVendor(null); // Return to main view to see the tab switch
    
    // Add new request to list
    setServiceRequests([newRequest, ...serviceRequests]);
    
    // Switch to requests tab
    setActiveTab('requests');
  };

  // If a vendor is selected, show the details view
  // Note: We only show details if booking is NOT open, so booking modal appears on top
  if (selectedVendor && !isBookingOpen) {
    return (
      <VendorDetails 
        vendor={selectedVendor} 
        onBack={() => setSelectedVendor(null)} 
        onBookService={handleBookService}
      />
    );
  }

  // If a service request is selected (and we are in that tab), show details
  if (selectedRequest && activeTab === 'requests' && !isBookingOpen) {
    return (
      <ServiceRequestDetails 
        request={selectedRequest}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f9fafb] relative">
      
      {/* Booking Modal */}
      {isBookingOpen && bookingVendor && (
        <BookingFlow 
          vendor={bookingVendor}
          initialService={preSelectedService}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Service Marketplace</h1>
           <p className="text-sm text-gray-500 mt-1">Find and book authorized service providers near you.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                View Master Record
            </button>
            <button className="px-4 py-2 bg-samsara-blue text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center">
                <Plus size={16} className="mr-1.5" />
                Add Vendor
            </button>
        </div>
      </div>

      {/* Tabs / Filters Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-0">
          <div className="flex space-x-8">
              <button 
                  onClick={() => { setActiveTab('browse'); setSelectedRequest(null); }}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'browse' ? 'border-samsara-blue text-samsara-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                  Browse Vendors
              </button>
              <button 
                  onClick={() => { setActiveTab('requests'); setSelectedRequest(null); }}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'requests' ? 'border-samsara-blue text-samsara-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                  Service Requests 
                  {serviceRequests.length > 0 && <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{serviceRequests.length}</span>}
              </button>
              <button 
                  onClick={() => { setActiveTab('network'); setSelectedRequest(null); }}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'network' ? 'border-samsara-blue text-samsara-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                  Preferred Network
              </button>
              <button 
                  onClick={() => { setActiveTab('history'); setSelectedRequest(null); }}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-samsara-blue text-samsara-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                  Transaction History
              </button>
          </div>
      </div>

      {/* Controls Area (Only show for 'browse') */}
      {activeTab === 'browse' && (
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            
            {/* Search and Category Filter */}
            <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search vendors, services, or locations..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="relative">
                    <select 
                        className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700 cursor-pointer hover:border-gray-300"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {SERVICE_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                         <Filter size={14} />
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-md border border-gray-200">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-sm transition-all ${viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <List size={18} />
                </button>
                <button 
                    onClick={() => setViewMode('map')}
                    className={`p-1.5 rounded-sm transition-all ${viewMode === 'map' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Map size={18} />
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-6 h-[calc(100vh-280px)]">
             {/* Main Grid */}
             <div className={`flex-1 overflow-y-auto pr-2 ${viewMode === 'map' ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full'}`}>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {filteredVendors.map(vendor => (
                        <VendorCard 
                            key={vendor.id} 
                            vendor={vendor} 
                            onClick={(v) => setSelectedVendor(v)}
                            onBook={(v) => {
                                handleBookService(v);
                            }} 
                        />
                    ))}
                    {filteredVendors.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                            <Search size={48} className="mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No vendors found</p>
                            <p className="text-sm">Try adjusting your filters or search query.</p>
                        </div>
                    )}
                 </div>
             </div>

             {/* Map Placeholder */}
             {viewMode === 'map' && (
                 <div className="flex-1 bg-gray-200 rounded-lg border border-gray-300 overflow-hidden relative min-h-[400px]">
                     <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                         <Map size={64} className="mb-4 text-gray-400" />
                         <p className="font-medium">Interactive Map View</p>
                         <p className="text-xs max-w-xs text-center mt-2 text-gray-400">Showing {filteredVendors.length} vendors in the current area.</p>
                         
                         {/* Mock Map Elements */}
                         <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-samsara-blue rounded-full ring-4 ring-blue-500/20"></div>
                         <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-samsara-blue rounded-full ring-4 ring-blue-500/20"></div>
                         <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-samsara-blue rounded-full ring-4 ring-blue-500/20"></div>
                     </div>
                 </div>
             )}
        </div>
      </div>
      )}

      {/* Service Requests Tab */}
      {activeTab === 'requests' && (
          <div className="px-8 py-6 h-full overflow-y-auto">
             <div className="max-w-7xl mx-auto">
                <ServiceRequestsList 
                  requests={serviceRequests} 
                  onSelectRequest={(req) => setSelectedRequest(req)}
                />
             </div>
          </div>
      )}

      {/* Placeholders for other tabs */}
      {(activeTab === 'network' || activeTab === 'history') && (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
             <div className="text-6xl mb-4">🚧</div>
             <h2 className="text-xl font-medium text-gray-600">Under Construction</h2>
             <p>The {activeTab} view is coming soon.</p>
          </div>
      )}
    </div>
  );
};

export default Marketplace;