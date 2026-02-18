import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  Wrench, 
  Truck, 
  Zap, 
  FileBox, 
  BarChart2, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Search,
  Box
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onChangeView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onChangeView }) => {
  const [maintenanceExpanded, setMaintenanceExpanded] = useState(true);

  const menuItemClass = (isActive: boolean, isSubItem: boolean = false) => `
    flex items-center px-4 py-2 my-0.5 text-sm font-medium transition-colors cursor-pointer select-none
    ${isSubItem ? 'pl-11' : ''}
    ${isActive 
      ? 'bg-gray-200 text-gray-900 border-r-4 border-gray-500' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
  `;

  return (
    <div className="w-64 h-screen bg-[#F9FAFB] border-r border-gray-200 flex flex-col fixed left-0 top-0 z-20">
      {/* Header / Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
           {/* Simple Logo Placeholder */}
           <div className="w-8 h-8 bg-samsara-dark rounded-md flex items-center justify-center">
             <span className="text-white text-xs font-bold">F</span>
           </div>
           <span className="text-lg font-bold text-gray-800">Fleet</span>
        </div>
        <div className="ml-auto flex gap-2 text-gray-400">
          <MessageSquare size={16} />
          {/* Bell icon simulated */}
          <div className="w-4 h-4 rounded-full border border-current"></div> 
        </div>
      </div>

      {/* Global Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-white border border-gray-200 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-samsara-blue transition-colors"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-2">
        
        <div className={menuItemClass(activeView === 'overview')}>
          <LayoutDashboard size={18} className="mr-3" />
          Overview
        </div>

        <div className={menuItemClass(activeView === 'safety')}>
          <ShieldCheck size={18} className="mr-3" />
          Safety
        </div>

        <div className={menuItemClass(activeView === 'compliance')}>
          <FileText size={18} className="mr-3" />
          Compliance
        </div>

        {/* Maintenance Group (Expanded) */}
        <div>
          <div 
            className={`flex items-center px-4 py-2 my-0.5 text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-900`}
            onClick={() => setMaintenanceExpanded(!maintenanceExpanded)}
          >
            <Wrench size={18} className="mr-3" />
            Maintenance
            {maintenanceExpanded ? <ChevronDown size={14} className="ml-auto" /> : <ChevronRight size={14} className="ml-auto" />}
          </div>
          
          {maintenanceExpanded && (
            <div className="flex flex-col">
              <div 
                className={menuItemClass(activeView === 'status', true)}
                onClick={() => onChangeView('status')}
              >
                Status
              </div>
              <div 
                className={menuItemClass(activeView === 'inventory', true)}
                onClick={() => onChangeView('inventory')}
              >
                Inventory
              </div>
              <div 
                className={menuItemClass(activeView === 'marketplace', true)}
                onClick={() => onChangeView('marketplace')}
              >
                Marketplace <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-bold uppercase tracking-wide">New</span>
              </div>
               <div 
                className={menuItemClass(activeView === 'workorder', true)}
                onClick={() => onChangeView('workorder')}
              >
                Work Order
              </div>
              <div 
                className={menuItemClass(activeView === 'issues', true)}
                onClick={() => onChangeView('issues')}
              >
                Issues
              </div>
              <div 
                className={menuItemClass(activeView === 'servicetasks', true)}
                onClick={() => onChangeView('servicetasks')}
              >
                Service Tasks
              </div>
            </div>
          )}
        </div>

        <div className={menuItemClass(activeView === 'dispatch')}>
          <Truck size={18} className="mr-3" />
          Dispatch
        </div>

        <div className={menuItemClass(activeView === 'fuel')}>
          <Zap size={18} className="mr-3" />
          Fuel & Energy
        </div>

        <div className={menuItemClass(activeView === 'documents')}>
          <FileBox size={18} className="mr-3" />
          Documents
        </div>

        <div className={menuItemClass(activeView === 'reports')}>
          <BarChart2 size={18} className="mr-3" />
          Reports
        </div>

      </div>

      {/* Footer / User Profile */}
      <div className="border-t border-gray-200 p-4">
         <div className="flex items-center justify-between px-2 py-2 mb-2 rounded hover:bg-gray-100 cursor-pointer text-gray-600">
           <div className="flex items-center text-sm font-medium">
             <div className="bg-gray-800 text-white p-1 rounded mr-2 font-bold text-xs tracking-tighter">hooli</div>
             Hooli
           </div>
           <div className="w-6 h-6 bg-samsara-blue rounded-full text-white flex items-center justify-center text-xs font-medium">
             C
           </div>
         </div>
         <div className="flex items-center text-gray-500 text-sm mt-2 px-2 gap-4">
            <HelpCircle size={16} className="cursor-pointer hover:text-gray-700"/>
            <Settings size={16} className="cursor-pointer hover:text-gray-700"/>
            <span className="text-xs cursor-pointer hover:text-gray-700">Feedback</span>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
