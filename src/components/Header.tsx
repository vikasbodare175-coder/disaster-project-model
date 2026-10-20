import React from 'react';
import { Menu, ChevronDown, BellRing, PlusCircle, Radio, FileText } from 'lucide-react';
import { SeasonType, TabType } from '../types/disaster';
import { SEASONS } from '../data/disasterData';

import { AuthBar } from './AuthBar';

interface HeaderProps {
  activeTab: TabType;
  selectedSeason: SeasonType;
  setSelectedSeason: (season: SeasonType) => void;
  setMobileMenuOpen: (open: boolean) => void;
  onOpenBroadcastModal: () => void;
  onOpenAddIncidentModal: () => void;
  onOpenSitRepModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  selectedSeason,
  setSelectedSeason,
  setMobileMenuOpen,
  onOpenBroadcastModal,
  onOpenAddIncidentModal,
  onOpenSitRepModal,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'map':
        return 'Disaster Risk Map & Tactical GIS';
      case 'overview':
        return 'Disaster Overview & Regional Preparedness';
      case 'alerts':
        return 'Active Incident Alerts & Notifications';
      case 'maps-grounding':
        return 'Google Maps Grounded Live Facilities';
      case 'shelters':
        return 'Evacuation Shelters & Relief Network';
      case 'dispatch':
        return 'Tactical Response Fleet Mobilization';
      case 'sos':
        return 'Citizen SOS Emergency Helpline';
      case 'simulation':
        return 'Disaster Scenario Simulation Sandbox';
      case 'dashboard':
      default:
        return 'Disaster Management Dashboard';
    }
  };

  return (
    <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Mobile Hamburger */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
            {getTabTitle()}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor disaster risks and affected areas.
          </p>
        </div>
      </div>

      {/* Right Controls: Action buttons and Season Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onOpenSitRepModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
          title="Generate official Situation Report (SitRep)"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>Export SitRep</span>
        </button>
        <button
          onClick={onOpenAddIncidentModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
          title="Add a new risk point or incident marker"
        >
          <PlusCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Report Hazard</span>
        </button>

        <button
          onClick={onOpenBroadcastModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-lg shadow-2xs transition-colors"
          title="Issue emergency broadcast notification"
        >
          <BellRing className="w-3.5 h-3.5 text-red-600" />
          <span>Broadcast Alert</span>
        </button>

        {/* Season Dropdown - Exact match with screenshot */}
        <div className="relative inline-block">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value as SeasonType)}
            className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-sm font-semibold rounded-lg pl-3.5 pr-8 py-2 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            {SEASONS.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Firebase Authentication Bar */}
        <AuthBar />
      </div>
    </header>
  );
};
