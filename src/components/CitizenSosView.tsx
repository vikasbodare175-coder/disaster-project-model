import React, { useState } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  Users, 
  ShieldAlert, 
  Plus, 
  CheckCircle, 
  Phone, 
  AlertTriangle 
} from 'lucide-react';
import { CitizenSOSCall } from '../types/disaster';
import { CITIZEN_SOS_CALLS } from '../data/disasterData';

export const CitizenSosView: React.FC = () => {
  const [calls, setCalls] = useState<CitizenSOSCall[]>(CITIZEN_SOS_CALLS);
  const [isLoggingModal, setIsLoggingModal] = useState(false);
  const [newCallerName, setNewCallerName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPeopleCount, setNewPeopleCount] = useState('4');
  const [newUrgency, setNewUrgency] = useState<CitizenSOSCall['urgency']>('Water Trapped');
  const [newNotes, setNewNotes] = useState('');

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCallerName || !newLocation) return;

    const newCall: CitizenSOSCall = {
      id: `sos-${Date.now()}`,
      citizenName: newCallerName,
      phoneNumber: newPhone || '+91 98000 00000',
      regionId: 'maharashtra',
      locationName: newLocation,
      coordinates: [18.5204, 73.8567],
      reportedTime: 'Just now',
      urgency: newUrgency,
      peopleCount: parseInt(newPeopleCount, 10) || 1,
      status: 'Pending Triage',
      notes: newNotes || 'Direct citizen distress request recorded.',
    };

    setCalls([newCall, ...calls]);
    setIsLoggingModal(false);
    setNewCallerName('');
    setNewLocation('');
    setNewNotes('');
  };

  const handleUpdateStatus = (id: string, newStatus: CitizenSOSCall['status']) => {
    setCalls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const pendingCount = calls.filter((c) => c.status === 'Pending Triage').length;
  const dispatchedCount = calls.filter((c) => c.status === 'Unit Dispatched').length;
  const rescuedCount = calls.filter((c) => c.status === 'Rescued').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-600 animate-pulse" />
            <span>Citizen SOS Emergency Helpline & Distress Queue</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct priority incoming rescue calls, coordinates extraction, and immediate responder dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded">
              {pendingCount} Pending Triage
            </span>
            <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
              {dispatchedCount} Dispatched
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
              {rescuedCount} Rescued
            </span>
          </div>

          <button
            onClick={() => setIsLoggingModal(true)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Distress Call</span>
          </button>
        </div>
      </div>

      {/* Distress Calls List */}
      <div className="space-y-3">
        {calls.map((call) => {
          const isPending = call.status === 'Pending Triage';
          const isDispatched = call.status === 'Unit Dispatched';
          const isRescued = call.status === 'Rescued';

          return (
            <div
              key={call.id}
              className={`bg-white rounded-xl border p-5 shadow-2xs transition-all ${
                isPending ? 'border-red-200 bg-red-50/20' : 'border-slate-200/90'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      call.urgency === 'Life Threatening'
                        ? 'bg-red-600 text-white'
                        : call.urgency === 'Water Trapped'
                        ? 'bg-blue-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}>
                      {call.urgency}
                    </span>

                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isPending
                        ? 'bg-red-100 text-red-800 animate-pulse'
                        : isDispatched
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      ● {call.status}
                    </span>

                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{call.reportedTime}</span>
                    </span>

                    <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{call.peopleCount} individuals trapped</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>{call.citizenName}</span>
                    <span className="text-xs text-slate-500 font-normal font-mono">({call.phoneNumber})</span>
                  </h3>

                  <p className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{call.locationName}</span>
                  </p>

                  <p className="text-xs text-slate-700 pt-1 leading-relaxed max-w-3xl">
                    "{call.notes}"
                  </p>
                </div>

                {/* Dispatch / Status Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isPending && (
                    <button
                      onClick={() => handleUpdateStatus(call.id, 'Unit Dispatched')}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Dispatch Rescue Unit</span>
                    </button>
                  )}

                  {isDispatched && (
                    <button
                      onClick={() => handleUpdateStatus(call.id, 'Rescued')}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Confirm Rescued</span>
                    </button>
                  )}

                  {isRescued && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Case Closed & Safe</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Distress Call Modal */}
      {isLoggingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-5 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Log Citizen SOS Distress Call</h3>
            <p className="text-xs text-slate-500 mt-0.5">Emergency Operations Helpline Input</p>

            <form onSubmit={handleLogCall} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Caller Name</label>
                <input
                  type="text"
                  required
                  value={newCallerName}
                  onChange={(e) => setNewCallerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  placeholder="e.g. Anand Shinde"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg font-mono"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Landmark</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  placeholder="e.g. Ratnagiri Coastal Jetty, Shed 4"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Urgency</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs border rounded-lg font-medium"
                  >
                    <option value="Water Trapped">Water Trapped</option>
                    <option value="Life Threatening">Life Threatening</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Food / Water Depleted">Food / Water Depleted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">People Count</label>
                  <input
                    type="number"
                    value={newPeopleCount}
                    onChange={(e) => setNewPeopleCount(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Situation Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg"
                  placeholder="Describe trapped status, injuries, or hazards..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLoggingModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md shadow-xs"
                >
                  Log & Queue Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
