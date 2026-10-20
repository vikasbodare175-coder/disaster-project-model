import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Search, 
  MapPin, 
  Phone, 
  Zap, 
  Plus, 
  Activity, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { EvacuationShelter } from '../types/disaster';
import { EVACUATION_SHELTERS } from '../data/disasterData';

export const SheltersView: React.FC = () => {
  const [shelters, setShelters] = useState<EvacuationShelter[]>(EVACUATION_SHELTERS);
  const [search, setSearch] = useState('');
  const [intakeModalShelter, setIntakeModalShelter] = useState<EvacuationShelter | null>(null);
  const [intakeCount, setIntakeCount] = useState('25');

  const filteredShelters = shelters.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  const totalCapacity = shelters.reduce((acc, s) => acc + s.totalCapacity, 0);
  const totalOccupancy = shelters.reduce((acc, s) => acc + s.currentOccupancy, 0);
  const availableSlots = totalCapacity - totalOccupancy;

  const handleRegisterIntake = () => {
    if (!intakeModalShelter) return;
    const addCount = parseInt(intakeCount, 10) || 0;
    setShelters((prev) =>
      prev.map((s) => {
        if (s.id === intakeModalShelter.id) {
          const newOccupancy = Math.min(s.totalCapacity, s.currentOccupancy + addCount);
          const newStatus = 
            newOccupancy >= s.totalCapacity 
              ? 'Full' 
              : newOccupancy >= s.totalCapacity * 0.85 
              ? 'Near Capacity' 
              : 'Open & Accepting';
          return {
            ...s,
            currentOccupancy: newOccupancy,
            status: newStatus,
          };
        }
        return s;
      })
    );
    setIntakeModalShelter(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Evacuation & Relief Shelters Network</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time occupancy monitoring, intake logging, and supply chain readiness.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <div>
            <span className="text-slate-400 block text-[10px]">TOTAL CAPACITY</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">{totalCapacity.toLocaleString()}</span>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px]">CURRENT OCCUPANCY</span>
            <span className="text-sm font-bold text-amber-700 tabular-nums">{totalOccupancy.toLocaleString()}</span>
          </div>
          <div className="w-px h-7 bg-slate-200" />
          <div>
            <span className="text-slate-400 block text-[10px]">AVAILABLE SLOTS</span>
            <span className="text-sm font-bold text-emerald-600 tabular-nums">{availableSlots.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search shelter by name, district, or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs md:text-sm bg-transparent focus:outline-none"
        />
      </div>

      {/* Shelters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShelters.map((shelter) => {
          const occupancyPct = Math.round((shelter.currentOccupancy / shelter.totalCapacity) * 100);
          const isFull = shelter.status === 'Full';
          const isNear = shelter.status === 'Near Capacity';

          return (
            <div
              key={shelter.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                    isFull
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : isNear
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {shelter.status}
                  </span>

                  <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                    {occupancyPct}% full
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {shelter.name}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{shelter.address}</span>
                </p>

                {/* Occupancy Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                    <span>Occupancy:</span>
                    <strong className="font-semibold text-slate-900 tabular-nums">
                      {shelter.currentOccupancy} / {shelter.totalCapacity}
                    </strong>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-red-500' : isNear ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                </div>

                {/* Logistics details */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>Med Staff: <strong>{shelter.medicalStaffPresent}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Rations: <strong>{shelter.foodWaterDays} days</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Generator: <strong>{shelter.hasBackupPower ? 'Active' : 'None'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{shelter.contactNumber}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {shelter.totalCapacity - shelter.currentOccupancy} spots left
                </span>
                <button
                  disabled={isFull}
                  onClick={() => setIntakeModalShelter(shelter)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isFull
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                  }`}
                >
                  Log Evacuee Intake
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evacuee Intake Modal */}
      {intakeModalShelter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-xl border border-slate-200 p-5 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Check In Evacuees</h3>
            <p className="text-xs text-slate-500 mt-0.5">{intakeModalShelter.name}</p>

            <div className="my-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number of Individuals Arrived:
              </label>
              <input
                type="number"
                min="1"
                max={intakeModalShelter.totalCapacity - intakeModalShelter.currentOccupancy}
                value={intakeCount}
                onChange={(e) => setIntakeCount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIntakeModalShelter(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterIntake}
                className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-xs"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
