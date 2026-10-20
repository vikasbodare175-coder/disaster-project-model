import React from 'react';
import { 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  AlertOctagon, 
  Hospital, 
  Truck, 
  LifeBuoy, 
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { RegionData, SeasonType } from '../types/disaster';
import { REGIONS } from '../data/disasterData';

interface DisasterOverviewViewProps {
  selectedSeason: SeasonType;
  onSelectRegion: (region: RegionData) => void;
}

export const DisasterOverviewView: React.FC<DisasterOverviewViewProps> = ({
  selectedSeason,
  onSelectRegion,
}) => {
  // Aggregate stats across all regions
  const totalMonitoredAcres = REGIONS.reduce((acc, r) => acc + r.totalMonitoredAreaAcres, 0);
  const totalActiveAlerts = REGIONS.reduce((acc, r) => acc + r.activeAlertsCount, 0);
  const avgSystemSafety = Math.round(
    REGIONS.reduce((acc, r) => acc + r.averageSafetyLevel, 0) / REGIONS.length
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-600" />
            <span>Regional Vulnerability & Preparedness Overview</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Macro analysis, resource availability, and seasonal risk forecasting for {selectedSeason}.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px]">TOTAL COVERAGE</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">{totalMonitoredAcres.toLocaleString()} acres</span>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px]">NETWORK ALERTS</span>
            <span className="text-sm font-bold text-amber-700 tabular-nums">{totalActiveAlerts}</span>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px]">AVG READINESS</span>
            <span className="text-sm font-bold text-emerald-600 tabular-nums">{avgSystemSafety}%</span>
          </div>
        </div>
      </div>

      {/* Emergency Resources Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Hospital className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-700">Trauma Beds Ready</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">4,820</p>
          <span className="text-[11px] text-emerald-600 font-medium">94% availability</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Truck className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-700">Mobile Rescue Vans</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">340</p>
          <span className="text-[11px] text-slate-500 font-medium">GPS deployed & tracked</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-cyan-600 mb-1">
            <LifeBuoy className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-700">Cyclone Shelters</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">1,215</p>
          <span className="text-[11px] text-emerald-600 font-medium">Generators fueled</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold text-slate-700">Relief Personnel</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">28,500</p>
          <span className="text-[11px] text-slate-500 font-medium">NDRF / SDRF / volunteers</span>
        </div>
      </div>

      {/* Regional Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Regional Safety & Threat Matrix</h3>
            <p className="text-xs text-slate-500">Live health indicators across monitored administrative sectors</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200/80">
              <tr>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Monitored Area</th>
                <th className="px-4 py-3">Safety Score</th>
                <th className="px-4 py-3">Active Alerts</th>
                <th className="px-4 py-3">Primary Vulnerability</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REGIONS.map((reg) => (
                <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{reg.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{reg.country}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-700">{reg.totalMonitoredAreaAcres} acres</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            reg.averageSafetyLevel >= 80 
                              ? 'bg-emerald-500' 
                              : reg.averageSafetyLevel >= 70 
                              ? 'bg-amber-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${reg.averageSafetyLevel}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-800 tabular-nums">{reg.averageSafetyLevel}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-bold">
                    <span className={`px-2 py-0.5 rounded text-[11px] ${
                      reg.activeAlertsCount > 5 
                        ? 'bg-red-50 text-red-700 border border-red-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {reg.activeAlertsCount < 10 ? `0${reg.activeAlertsCount}` : reg.activeAlertsCount} alerts
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 max-w-xs truncate" title={reg.vulnerabilityNotes}>
                    {reg.vulnerabilityNotes}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => onSelectRegion(reg)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
