import React from 'react';
import { 
  Globe, 
  Map as MapIcon, 
  LayoutDashboard, 
  Bell, 
  Radio, 
  Activity,
  CheckCircle2,
  X,
  Building2,
  Truck,
  PhoneCall,
  Sliders,
  MapPin
} from 'lucide-react';
import { TabType } from '../types/disaster';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isLiveMode: boolean;
  setIsLiveMode: (live: boolean) => void;
  activeAlertsCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isLiveMode,
  setIsLiveMode,
  activeAlertsCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <span className="p-1 rounded bg-blue-500/20 text-blue-400">
          <LayoutDashboard className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'map',
      label: 'Disaster Map',
      icon: (
        <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
          <MapIcon className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'overview',
      label: 'Disaster Overview',
      icon: (
        <span className="p-1 rounded bg-cyan-500/20 text-cyan-400">
          <Globe className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'alerts',
      label: 'Alerts',
      badge: activeAlertsCount,
      icon: (
        <span className="p-1 rounded bg-amber-500/20 text-amber-400">
          <Bell className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'maps-grounding',
      label: 'Google Maps Grounding',
      icon: (
        <span className="p-1 rounded bg-rose-500/20 text-rose-400">
          <MapPin className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'shelters',
      label: 'Shelters & Evacuation',
      icon: (
        <span className="p-1 rounded bg-indigo-500/20 text-indigo-400">
          <Building2 className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'dispatch',
      label: 'Tactical Dispatch',
      icon: (
        <span className="p-1 rounded bg-orange-500/20 text-orange-400">
          <Truck className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'sos',
      label: 'Citizen SOS',
      icon: (
        <span className="p-1 rounded bg-red-500/20 text-red-400">
          <PhoneCall className="w-4 h-4" />
        </span>
      ),
    },
    {
      id: 'simulation',
      label: 'Crisis Simulation',
      icon: (
        <span className="p-1 rounded bg-purple-500/20 text-purple-400">
          <Sliders className="w-4 h-4" />
        </span>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A1426] text-slate-200 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Globe Icon matching screenshot */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-base leading-tight tracking-tight">
                  DisasterMonitor
                </h1>
                <p className="text-xs text-slate-400 font-medium">Disaster Management</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Pill Toggle (Demo Mode Active / Live Simulation) */}
          <div className="mt-4">
            <button
              onClick={() => setIsLiveMode(!isLiveMode)}
              className="w-full group flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg border border-slate-700/80 bg-[#111e38] hover:bg-[#16274a] transition-colors"
              title="Click to toggle between Demo Mode and Live Telemetry Simulation"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-slate-200">
                  {isLiveMode ? 'Live Mode Active' : 'Demo Mode Active'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-200 transition-colors">
                {isLiveMode ? 'Simulating' : 'Static'}
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#182642] text-white shadow-xs font-semibold'
                      : 'text-slate-300 hover:bg-[#121f38] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full tabular-nums">
                      {item.badge < 10 ? `0${item.badge}` : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Legend & Branding */}
        <div className="p-5 border-t border-slate-800/80 bg-[#091222]">
          <h2 className="font-semibold text-white text-sm">Disaster Management</h2>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
            Monitor disaster risks and affected areas.
          </p>

          {/* Risk Level Color Indicators */}
          <div className="mt-4 flex items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs shadow-emerald-500/50" />
              <span className="text-[11px]">Low Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs shadow-amber-500/50" />
              <span className="text-[11px]">Medium Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-xs shadow-red-500/50" />
              <span className="text-[11px]">High Risk</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
