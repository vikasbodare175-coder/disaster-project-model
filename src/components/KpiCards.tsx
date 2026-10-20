import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Layers, ArrowUpRight } from 'lucide-react';
import { RegionData, TabType } from '../types/disaster';

interface KpiCardsProps {
  region: RegionData;
  onNavigateToAlerts?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  region,
  onNavigateToAlerts,
}) => {
  const [unit, setUnit] = useState<'acres' | 'km²'>('acres');

  // Convert acres to sq km if toggled (1 acre ~ 0.00404686 km²)
  const displayArea = unit === 'acres' 
    ? `${region.totalMonitoredAreaAcres} acres`
    : `${(region.totalMonitoredAreaAcres * 0.004047).toFixed(1)} km²`;

  const formattedAlertCount = region.activeAlertsCount < 10 
    ? `0${region.activeAlertsCount}` 
    : `${region.activeAlertsCount}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {/* Card 1: Total Monitored Area */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium tracking-tight">
            Total Monitored Area
          </span>
          <button
            onClick={() => setUnit(unit === 'acres' ? 'km²' : 'acres')}
            className="text-[10px] text-slate-400 hover:text-slate-600 font-mono tracking-wider uppercase border border-slate-200 rounded px-1.5 py-0.5"
            title="Toggle unit between acres and square kilometers"
          >
            {unit}
          </button>
        </div>

        <div className="mt-2.5">
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
            {displayArea}
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-2 font-normal">
          Across all monitored regions
        </p>
      </div>

      {/* Card 2: Average Safety Level */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium tracking-tight">
            Average Safety Level
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans tabular-nums">
            {region.averageSafetyLevel}%
          </p>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            Stable
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-2 font-normal">
          Based on sample risk values
        </p>
      </div>

      {/* Card 3: Active Alerts */}
      <div 
        onClick={onNavigateToAlerts}
        className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium tracking-tight">
            Active Alerts
          </span>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans tabular-nums">
            {formattedAlertCount}
          </p>
          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
            Active
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-2 font-normal">
          Require immediate inspection
        </p>
      </div>
    </div>
  );
};
