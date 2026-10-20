import React, { useState } from 'react';
import { X, Plus, MapPin, AlertTriangle } from 'lucide-react';
import { RegionData, HazardIncident, DisasterCategory, RiskLevel } from '../types/disaster';

interface AddIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: RegionData;
  onAddIncident: (incident: HazardIncident) => void;
}

export const AddIncidentModal: React.FC<AddIncidentModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
  onAddIncident,
}) => {
  const [title, setTitle] = useState('');
  const [locationName, setLocationName] = useState('');
  const [category, setCategory] = useState<DisasterCategory>('Flood / Inundation');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('High Risk');
  const [lat, setLat] = useState(currentRegion.centerCoordinates[0].toString());
  const [lng, setLng] = useState(currentRegion.centerCoordinates[1].toString());
  const [areaAcres, setAreaAcres] = useState('35');
  const [population, setPopulation] = useState('15,000');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !locationName.trim()) return;

    const newIncident: HazardIncident = {
      id: `inc-custom-${Date.now()}`,
      title,
      locationName,
      regionId: currentRegion.id,
      category,
      riskLevel,
      coordinates: [parseFloat(lat) || currentRegion.centerCoordinates[0], parseFloat(lng) || currentRegion.centerCoordinates[1]],
      timestamp: 'Just now',
      affectedPopulation: population || 'Unknown',
      affectedAreaAcres: parseInt(areaAcres, 10) || 25,
      severityScore: riskLevel === 'High Risk' ? 85 : riskLevel === 'Medium Risk' ? 55 : 25,
      status: 'Active',
      description: description || `Hazard alert reported at ${locationName}. Emergency inspection protocol initiated.`,
      emergencyProtocols: ['Rapid reconnaissance team deployed', 'Early warning message issued'],
      assignedTeams: ['State Disaster Response Wing'],
      telemetry: {
        precipitation: '24 mm/h',
        temperature: '29°C',
      },
    };

    onAddIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold">Report New Hazard Pin</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Incident Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sub-basin River Cresting Warning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Disaster Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DisasterCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-800"
              >
                <option value="Cyclone / Storm">Cyclone / Storm</option>
                <option value="Flood / Inundation">Flood / Inundation</option>
                <option value="Earthquake / Seismic">Earthquake / Seismic</option>
                <option value="Landslide">Landslide</option>
                <option value="Severe Heatwave">Severe Heatwave</option>
                <option value="Wildfire">Wildfire</option>
                <option value="Tsunami Watch">Tsunami Watch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Risk Classification
              </label>
              <select
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
              >
                <option value="High Risk">High Risk (Red Pin)</option>
                <option value="Medium Risk">Medium Risk (Amber Pin)</option>
                <option value="Low Risk">Low Risk (Green Pin)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Location Landmark / District
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Raigad Valley Sector 4"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Latitude (deg N)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Longitude (deg E)
              </label>
              <input
                type="number"
                step="0.0001"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Monitored Acres
              </label>
              <input
                type="number"
                value={areaAcres}
                onChange={(e) => setAreaAcres(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Population Estimate
              </label>
              <input
                type="text"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Field Situation Summary
            </label>
            <textarea
              rows={2}
              placeholder="Sensor triggers, observed water elevation, or landslide indicators..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
            >
              Save Pin to Map
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
