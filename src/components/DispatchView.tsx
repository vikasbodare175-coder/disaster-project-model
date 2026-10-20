import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Truck, 
  Anchor, 
  Plane, 
  Flame, 
  HeartPulse, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { EmergencyResponseUnit, HazardIncident } from '../types/disaster';
import { RESPONSE_UNITS } from '../data/disasterData';

interface DispatchViewProps {
  incidents: HazardIncident[];
}

export const DispatchView: React.FC<DispatchViewProps> = ({ incidents }) => {
  const [units, setUnits] = useState<EmergencyResponseUnit[]>(RESPONSE_UNITS);
  const [selectedUnit, setSelectedUnit] = useState<EmergencyResponseUnit | null>(null);
  const [targetIncidentId, setTargetIncidentId] = useState<string>(incidents[0]?.id || '');

  const getBranchIcon = (branch: EmergencyResponseUnit['branch']) => {
    switch (branch) {
      case 'NDRF':
      case 'SDRF':
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case 'Coast Guard':
        return <Anchor className="w-4 h-4 text-cyan-500" />;
      case 'Aviation Squad':
        return <Plane className="w-4 h-4 text-blue-500" />;
      case 'Fire Service':
        return <Flame className="w-4 h-4 text-red-500" />;
      case 'Medical Wing':
      default:
        return <HeartPulse className="w-4 h-4 text-emerald-500" />;
    }
  };

  const handleDispatch = () => {
    if (!selectedUnit) return;
    const inc = incidents.find((i) => i.id === targetIncidentId);

    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === selectedUnit.id) {
          return {
            ...u,
            status: 'In Transit',
            assignedIncidentTitle: inc ? inc.title : 'Emergency Vector',
            etaMinutes: Math.floor(Math.random() * 20) + 10,
          };
        }
        return u;
      })
    );
    setSelectedUnit(null);
  };

  const handleStatusChange = (unitId: string, newStatus: EmergencyResponseUnit['status']) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          return {
            ...u,
            status: newStatus,
            assignedIncidentTitle: newStatus === 'Available' ? undefined : u.assignedIncidentTitle,
            etaMinutes: newStatus === 'Available' ? undefined : u.etaMinutes,
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            <span>Emergency Tactical Response Fleet & Mobilization</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time battalion positioning, specialized search equipment, and rapid air/maritime dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600">
            Total Operational Units: <strong className="text-slate-900">{units.length}</strong>
          </span>
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => {
          const isDeployed = unit.status === 'Deployed';
          const isInTransit = unit.status === 'In Transit';
          const isAvailable = unit.status === 'Available';

          return (
            <div
              key={unit.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-slate-100 border border-slate-200">
                      {getBranchIcon(unit.branch)}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{unit.branch}</span>
                  </div>

                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    isDeployed 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : isInTransit 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                      : isAvailable 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {unit.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {unit.name}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Base: {unit.baseStation}</span>
                </p>

                <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-600">
                  <span>Personnel: <strong>{unit.personnelCount} specialists</strong></span>
                </div>

                {unit.assignedIncidentTitle && (
                  <div className="mt-2.5 p-2 rounded bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900">
                    <span className="text-[10px] uppercase font-bold text-amber-700 block">Mission Assignment:</span>
                    <strong className="block truncate">{unit.assignedIncidentTitle}</strong>
                    {unit.etaMinutes && (
                      <span className="text-[10px] text-amber-700 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> ETA: {unit.etaMinutes} mins
                      </span>
                    )}
                  </div>
                )}

                {/* Equipment chips */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                    Specialized Gear:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {unit.equipment.map((eq, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Action Controller */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                {isAvailable ? (
                  <button
                    onClick={() => setSelectedUnit(unit)}
                    className="w-full py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Deploy Unit to Incident</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] text-slate-500">Operating</span>
                    <button
                      onClick={() => handleStatusChange(unit.id, 'Available')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded border border-slate-200"
                    >
                      Recall to Base
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Modal */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-5 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Deploy Response Unit</h3>
            <p className="text-xs text-slate-500 mt-0.5">{selectedUnit.name}</p>

            <div className="my-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Active Disaster Zone:
              </label>
              <select
                value={targetIncidentId}
                onChange={(e) => setTargetIncidentId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                {incidents.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.title} ({inc.locationName} - {inc.riskLevel})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUnit(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDispatch}
                className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Deployment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
