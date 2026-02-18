import React, { useState } from 'react';
import { Vendor, ServiceItem, Asset, Issue, ServiceRequest } from '../types';
import { MOCK_ASSETS, MOCK_ISSUES } from '../constants';
import { X, Search, CheckCircle, AlertTriangle, Calendar, FileText, Truck, ArrowRight, ChevronLeft } from 'lucide-react';

interface BookingFlowProps {
  vendor: Vendor;
  initialService?: ServiceItem;
  onClose: () => void;
  onSuccess: (request: ServiceRequest) => void;
}

type Step = 'asset' | 'issues' | 'review';

const BookingFlow: React.FC<BookingFlowProps> = ({ vendor, initialService, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<Step>('asset');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [assetSearch, setAssetSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Derived state
  const relevantIssues = selectedAsset ? MOCK_ISSUES.filter(i => i.assetId === selectedAsset.id) : [];
  
  const filteredAssets = MOCK_ASSETS.filter(a => 
    a.name.toLowerCase().includes(assetSearch.toLowerCase()) || 
    a.vin.toLowerCase().includes(assetSearch.toLowerCase())
  );

  const handleNext = () => {
    if (currentStep === 'asset' && selectedAsset) {
      setCurrentStep('issues');
    } else if (currentStep === 'issues') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'issues') {
      setCurrentStep('asset');
    } else if (currentStep === 'review') {
      setCurrentStep('issues');
    }
  };

  const toggleIssue = (id: string) => {
    if (selectedIssues.includes(id)) {
      setSelectedIssues(selectedIssues.filter(i => i !== id));
    } else {
      setSelectedIssues([...selectedIssues, id]);
    }
  };

  const handleSubmit = () => {
    if (!selectedAsset) return;

    // Create the service request object
    const newRequest: ServiceRequest = {
        id: `req_${Date.now()}`,
        vendorId: vendor.id,
        vendorName: vendor.name,
        vendorImage: vendor.imageUrl,
        vehicleId: selectedAsset.id,
        vehicleName: selectedAsset.name,
        serviceType: initialService ? initialService.name : 'General Maintenance Request',
        issueCount: selectedIssues.length,
        issueIds: selectedIssues,
        notes: notes,
        status: 'Pending',
        submittedDate: new Date().toISOString().split('T')[0],
        scheduledDate: (date && time) ? `${date} ${time}` : undefined
    };

    // Simulate API call then trigger success
    setTimeout(() => {
      onSuccess(newRequest);
    }, 800);
  };

  const renderAssetStep = () => (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Asset to Service</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-samsara-blue focus:border-samsara-blue sm:text-sm"
            placeholder="Search by vehicle name or VIN..."
            value={assetSearch}
            onChange={(e) => setAssetSearch(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-md divide-y divide-gray-100">
        {filteredAssets.map(asset => (
          <div 
            key={asset.id} 
            onClick={() => setSelectedAsset(asset)}
            className={`p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${selectedAsset?.id === asset.id ? 'bg-blue-50 border-l-4 border-samsara-blue' : ''}`}
          >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                 <Truck size={20} />
               </div>
               <div>
                 <div className="font-medium text-gray-900">{asset.name}</div>
                 <div className="text-xs text-gray-500">{asset.year} {asset.make} {asset.model} • VIN: ...{asset.vin.slice(-6)}</div>
               </div>
             </div>
             {selectedAsset?.id === asset.id && <CheckCircle className="text-samsara-blue" size={20} />}
          </div>
        ))}
      </div>
    </div>
  );

  const renderIssuesStep = () => (
    <div className="flex flex-col h-full">
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-md flex items-start gap-3 mb-4">
         <div className="mt-0.5 text-samsara-blue"><Truck size={18} /></div>
         <div>
           <div className="text-sm font-medium text-blue-900">Selected: {selectedAsset?.name}</div>
           <div className="text-xs text-blue-700">We found {relevantIssues.length} open items for this asset. Select those you want to include in this service request.</div>
         </div>
      </div>

      <h3 className="text-sm font-medium text-gray-700 mb-3">Open Faults, DVIRs & PMs</h3>
      
      {relevantIssues.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500 border border-dashed border-gray-300 rounded-md">
           <CheckCircle size={32} className="mb-2 text-green-500" />
           <p>No open issues found for this asset.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2">
          {relevantIssues.map(issue => (
            <div 
              key={issue.id}
              onClick={() => toggleIssue(issue.id)}
              className={`border rounded-md p-3 cursor-pointer flex items-start gap-3 hover:bg-gray-50 ${selectedIssues.includes(issue.id) ? 'border-samsara-blue ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${selectedIssues.includes(issue.id) ? 'bg-samsara-blue border-samsara-blue text-white' : 'border-gray-300 bg-white'}`}>
                {selectedIssues.includes(issue.id) && <CheckCircle size={14} />}
              </div>
              <div className="flex-1">
                 <div className="flex items-center justify-between mb-1">
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
                 <div className="text-xs text-gray-600 mt-1">{issue.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderReviewStep = () => (
    <div className="flex flex-col h-full space-y-4 overflow-y-auto pr-1">
       
       {/* Summary Card */}
       <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Service Request Summary</h3>
          
          <div className="space-y-3 text-sm">
             <div className="flex justify-between">
                <span className="text-gray-500">Vendor</span>
                <span className="font-medium text-gray-900">{vendor.name}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Asset</span>
                <span className="font-medium text-gray-900">{selectedAsset?.name} ({selectedAsset?.make})</span>
             </div>
             {initialService && (
               <div className="flex justify-between">
                  <span className="text-gray-500">Primary Service</span>
                  <span className="font-medium text-gray-900">{initialService.name} ({initialService.price === 0 ? 'Free' : `$${initialService.price}`})</span>
               </div>
             )}
             <div className="flex justify-between">
                <span className="text-gray-500">Additional Issues</span>
                <span className="font-medium text-gray-900">{selectedIssues.length} items selected</span>
             </div>
          </div>
       </div>

       {/* Form Fields */}
       <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label>
         <div className="flex gap-2">
            <input 
                type="date" 
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-samsara-blue focus:border-samsara-blue sm:text-sm" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <input 
                type="time" 
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-samsara-blue focus:border-samsara-blue sm:text-sm" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
         </div>
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
         <textarea 
            rows={3}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-samsara-blue focus:border-samsara-blue sm:text-sm"
            placeholder="Describe any other issues or special instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
         ></textarea>
       </div>

       <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800 flex gap-2">
         <AlertTriangle size={16} className="shrink-0" />
         This request will be sent to the vendor for confirmation. You will receive a notification once the appointment is confirmed.
       </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Book Service</h2>
            <p className="text-sm text-gray-500">with {vendor.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
           <div className="flex items-center justify-between text-sm">
              <div className={`flex items-center ${currentStep === 'asset' ? 'text-samsara-blue font-bold' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs border ${currentStep === 'asset' ? 'border-samsara-blue bg-blue-50' : selectedAsset ? 'bg-green-100 text-green-700 border-green-200' : 'border-gray-300'}`}>1</div>
                Select Asset
              </div>
              <div className="w-8 h-px bg-gray-300 mx-2"></div>
              <div className={`flex items-center ${currentStep === 'issues' ? 'text-samsara-blue font-bold' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs border ${currentStep === 'issues' ? 'border-samsara-blue bg-blue-50' : 'border-gray-300'}`}>2</div>
                Add Issues
              </div>
              <div className="w-8 h-px bg-gray-300 mx-2"></div>
              <div className={`flex items-center ${currentStep === 'review' ? 'text-samsara-blue font-bold' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs border ${currentStep === 'review' ? 'border-samsara-blue bg-blue-50' : 'border-gray-300'}`}>3</div>
                Review
              </div>
           </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-hidden">
          {currentStep === 'asset' && renderAssetStep()}
          {currentStep === 'issues' && renderIssuesStep()}
          {currentStep === 'review' && renderReviewStep()}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50 rounded-b-lg">
           {currentStep !== 'asset' ? (
             <button 
               onClick={handleBack}
               className="flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2"
             >
               <ChevronLeft size={16} className="mr-1" /> Back
             </button>
           ) : (
             <div></div>
           )}

           {currentStep === 'review' ? (
             <button 
               onClick={handleSubmit}
               className="bg-samsara-blue hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded shadow-sm flex items-center"
             >
               Submit Request <CheckCircle size={16} className="ml-2" />
             </button>
           ) : (
             <button 
               onClick={handleNext}
               disabled={currentStep === 'asset' && !selectedAsset}
               className={`bg-samsara-blue hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 rounded shadow-sm flex items-center transition-opacity ${currentStep === 'asset' && !selectedAsset ? 'opacity-50 cursor-not-allowed' : ''}`}
             >
               Next Step <ArrowRight size={16} className="ml-2" />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;