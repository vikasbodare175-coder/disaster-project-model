import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Volume2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  ShieldCheck, 
  Send,
  SlidersHorizontal
} from 'lucide-react';
import { HazardIncident, RiskLevel } from '../types/disaster';

interface AlertsViewProps {
  incidents: HazardIncident[];
  onUpdateIncidentStatus: (id: string, newStatus: 'Active' | 'Investigating' | 'Contained' | 'Resolved') => void;
  onOpenBroadcastModal: () => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  incidents,
  onUpdateIncidentStatus,
  onOpenBroadcastModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'All' | RiskLevel>('All');
  const [isPlayingSiren, setIsPlayingSiren] = useState(false);

  // Filtered incidents
  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch = 
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === 'All' || inc.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  // Web Audio API emergency beep test
  const playSirenTest = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      setIsPlayingSiren(true);
      osc.stop(audioCtx.currentTime + 1.2);

      setTimeout(() => {
        setIsPlayingSiren(false);
      }, 1200);
    } catch (e) {
      console.log('Audio not supported', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Audio Test */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Incident Alert Center</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time hazard notifications, triage workflows, and incident command dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={playSirenTest}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 shadow-2xs ${
              isPlayingSiren
                ? 'bg-red-600 text-white border-red-600 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Test alert siren audio tone"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingSiren ? 'text-white' : 'text-slate-500'}`} />
            <span>{isPlayingSiren ? 'Siren Sounding...' : 'Test Siren Tone'}</span>
          </button>

          <button
            onClick={onOpenBroadcastModal}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast Warning</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by incident title, location, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Risk:</span>
          </span>
          {(['All', 'High Risk', 'Medium Risk', 'Low Risk'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap ${
                riskFilter === lvl
                  ? lvl === 'High Risk'
                    ? 'bg-red-500 text-white border-red-500 shadow-2xs'
                    : lvl === 'Medium Risk'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                    : lvl === 'Low Risk'
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xs'
                    : 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">No matching alerts found</h3>
            <p className="text-xs text-slate-500 mt-1">All monitored parameters are within safe thresholds.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isHigh = incident.riskLevel === 'High Risk';
            const isMedium = incident.riskLevel === 'Medium Risk';

            return (
              <div
                key={incident.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                        isHigh
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : isMedium
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {incident.riskLevel}
                      </span>

                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {incident.category}
                      </span>

                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{incident.timestamp}</span>
                      </span>

                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        incident.status === 'Active' 
                          ? 'bg-red-100 text-red-800' 
                          : incident.status === 'Investigating' 
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        ● {incident.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {incident.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium">
                      Location: <strong className="text-slate-800 font-semibold">{incident.locationName}</strong> · Approx. Population: {incident.affectedPopulation}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl pt-1">
                      {incident.description}
                    </p>
                  </div>

                  {/* Actions & Status Controller */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-2.5 shrink-0">
                    <div className="flex items-center gap-2">
                      {incident.status !== 'Resolved' ? (
                        <>
                          <button
                            onClick={() => onUpdateIncidentStatus(incident.id, 'Investigating')}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
                          >
                            Investigate
                          </button>
                          <button
                            onClick={() => onUpdateIncidentStatus(incident.id, 'Resolved')}
                            className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                          >
                            Mark Resolved
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onUpdateIncidentStatus(incident.id, 'Active')}
                          className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
                        >
                          Reopen Alert
                        </button>
                      )}
                    </div>

                    {/* Assigned Teams */}
                    <div className="text-[11px] text-slate-400 text-right">
                      <span>Assigned: </span>
                      <strong className="text-slate-700 font-medium">{incident.assignedTeams[0] || 'State Command'}</strong>
                    </div>
                  </div>
                </div>

                {/* Protocols Checklist Strip */}
                {incident.emergencyProtocols.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Response Protocols In Effect:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {incident.emergencyProtocols.map((proto, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{proto}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
