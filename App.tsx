import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Marketplace from './components/Marketplace';
import { ViewState } from './types';
import { Settings, Plus, MoreHorizontal } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('marketplace');

  // Placeholder for other views
  const renderContent = () => {
    switch (activeView) {
      case 'marketplace':
        return <Marketplace />;
      case 'inventory':
        return <InventoryPlaceholder />;
      default:
        return <GenericPlaceholder viewName={activeView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Sidebar activeView={activeView} onChangeView={setActiveView} />
      
      <main className="flex-1 ml-64 flex flex-col min-w-0">
        {renderContent()}
      </main>
    </div>
  );
};

// --- Placeholders for non-implemented views to maintain the "App" feel ---

const InventoryPlaceholder = () => (
  <div className="flex-1 p-8">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold text-gray-900">Parts Inventory</h1>
       <div className="flex gap-2">
         <button className="p-2 border border-gray-300 rounded hover:bg-gray-50"><MoreHorizontal size={20} className="text-gray-600"/></button>
         <button className="px-4 py-2 bg-samsara-blue text-white rounded font-medium text-sm flex items-center hover:bg-blue-700">
           <Plus size={16} className="mr-2" /> Add Part
         </button>
       </div>
     </div>
     
     <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex gap-8 mb-6 border-b border-gray-200">
           <div className="pb-3 border-b-2 border-gray-900 font-medium text-sm">Parts</div>
           <div className="pb-3 text-gray-500 hover:text-gray-700 cursor-pointer font-medium text-sm">Purchase Order</div>
           <div className="pb-3 text-gray-500 hover:text-gray-700 cursor-pointer font-medium text-sm">Transaction</div>
           <div className="pb-3 text-gray-500 hover:text-gray-700 cursor-pointer font-medium text-sm">Work Order</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="border border-gray-200 rounded p-4">
              <div className="text-sm font-medium text-gray-900">Total Inventory Value</div>
              <div className="text-2xl font-bold mt-1">$2,345.32</div>
           </div>
           <div className="border border-gray-200 rounded p-4">
              <div className="text-sm font-medium text-gray-900">Out of Stock</div>
              <div className="text-2xl font-bold mt-1 text-red-600">4</div>
           </div>
           <div className="border border-gray-200 rounded p-4">
              <div className="text-sm font-medium text-gray-900">Low Stock</div>
              <div className="text-2xl font-bold mt-1 text-orange-500">13</div>
           </div>
        </div>
        
        {/* Simple Table visual */}
        <table className="w-full text-left text-sm text-gray-600">
           <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
             <tr>
               <th className="py-3 px-4">Part ID</th>
               <th className="py-3 px-4">Part Name</th>
               <th className="py-3 px-4">Category</th>
               <th className="py-3 px-4">Manufacturer</th>
               <th className="py-3 px-4">In Stock</th>
               <th className="py-3 px-4">Action</th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-b border-gray-100 hover:bg-gray-50">
               <td className="py-4 px-4 flex items-center gap-3">
                 <div className="w-8 h-8 bg-yellow-100 rounded border border-gray-200 flex items-center justify-center">🛢️</div>
                 ENG-01
               </td>
               <td className="py-4 px-4 font-medium text-gray-900">Engine Oil 5W-30</td>
               <td className="py-4 px-4">Fluids</td>
               <td className="py-4 px-4">Pennzoil</td>
               <td className="py-4 px-4">12</td>
               <td className="py-4 px-4"><MoreHorizontal size={16} /></td>
             </tr>
             <tr className="border-b border-gray-100 hover:bg-gray-50">
               <td className="py-4 px-4 flex items-center gap-3">
                 <div className="w-8 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">🧊</div>
                 AIR-12
               </td>
               <td className="py-4 px-4 font-medium text-gray-900">Air Filter Type A</td>
               <td className="py-4 px-4">Filters</td>
               <td className="py-4 px-4">Samsung</td>
               <td className="py-4 px-4 text-orange-500 font-bold">2</td>
               <td className="py-4 px-4"><MoreHorizontal size={16} /></td>
             </tr>
           </tbody>
        </table>
     </div>
  </div>
);

const GenericPlaceholder: React.FC<{viewName: string}> = ({ viewName }) => (
  <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
    <Settings size={48} className="mb-4 text-gray-300" />
    <h2 className="text-xl font-semibold capitalize text-gray-600">{viewName}</h2>
    <p className="text-sm">This module is under development.</p>
  </div>
);

export default App;
