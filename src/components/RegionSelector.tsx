import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { RegionData } from '../types/disaster';
import { REGIONS } from '../data/disasterData';

interface RegionSelectorProps {
  selectedRegion: RegionData;
  onSelectRegion: (region: RegionData) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-slate-700">
        Select Region:
      </span>

      <div className="relative inline-block">
        <select
          value={selectedRegion.id}
          onChange={(e) => {
            const found = REGIONS.find((r) => r.id === e.target.value);
            if (found) onSelectRegion(found);
          }}
          className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-900 text-sm font-semibold rounded-lg pl-3.5 pr-8 py-2 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer min-w-[170px]"
        >
          {REGIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
        <MapPin className="w-3.5 h-3.5 text-slate-400" />
        <span>{selectedRegion.country}</span>
        <span aria-hidden="true">·</span>
        <span className="text-slate-600 font-medium">{selectedRegion.incidents.length} active hazard points</span>
      </div>
    </div>
  );
};
