import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Search, 
  Hospital, 
  ShieldAlert, 
  Flame, 
  Building2, 
  Compass, 
  Loader2, 
  Navigation,
  Info,
  CheckCircle2
} from 'lucide-react';
import { RegionData } from '../types/disaster';

interface MapsGroundingViewProps {
  currentRegion: RegionData;
}

interface GroundingChunk {
  maps?: {
    uri?: string;
    title?: string;
    placeAnswerSources?: {
      reviewSnippets?: Array<{
        snippet?: string;
        uri?: string;
      }>;
    };
  };
  web?: {
    uri?: string;
    title?: string;
  };
}

export const MapsGroundingView: React.FC<MapsGroundingViewProps> = ({ currentRegion }) => {
  const [query, setQuery] = useState(
    `Find major emergency trauma hospitals, disaster relief hubs, and emergency rescue points in ${currentRegion.name}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string>('');
  const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
  const [rateLimitNote, setRateLimitNote] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    {
      label: 'Hospitals & Trauma Centers',
      icon: <Hospital className="w-3.5 h-3.5 text-blue-500" />,
      text: `Find top emergency trauma care hospitals, ICU facilities, and government medical centers in and around ${currentRegion.name}.`,
    },
    {
      label: 'Relief Shelters & Community Halls',
      icon: <Building2 className="w-3.5 h-3.5 text-emerald-500" />,
      text: `Find designated cyclone shelters, multi-purpose relief halls, and municipal disaster refuge centers in ${currentRegion.name}.`,
    },
    {
      label: 'Civil Defense & Fire Stations',
      icon: <Flame className="w-3.5 h-3.5 text-orange-500" />,
      text: `Locate active fire brigade headquarters, NDRF/SDRF emergency stations, and rescue team command centers in ${currentRegion.name}.`,
    },
    {
      label: 'Helipads & Logistics Airstrips',
      icon: <Compass className="w-3.5 h-3.5 text-purple-500" />,
      text: `Identify operational disaster supply airstrips, military helipads, and emergency air rescue landing zones near ${currentRegion.name}.`,
    },
  ];

  const fetchMapsGrounding = async (customQuery?: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setRateLimitNote(null);
    const activePrompt = customQuery || query;

    try {
      const res = await fetch('/api/maps/grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: activePrompt,
          latitude: currentRegion.centerCoordinates[0],
          longitude: currentRegion.centerCoordinates[1],
          regionId: currentRegion.id,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch Maps grounded data');
      }

      setResponseMarkdown(data.text || 'No description returned.');
      setGroundingChunks(data.groundingChunks || []);
      if (data.rateLimitNote) {
        setRateLimitNote(data.rateLimitNote);
      }
    } catch (err: any) {
      console.error('Maps Grounding error:', err);
      setErrorMsg(err.message || 'Error communicating with Google Maps Grounding API');
    } finally {
      setIsLoading(false);
    }
  };

  // Run on mount or when region changes
  useEffect(() => {
    const defaultQuery = `Find major emergency trauma hospitals, disaster relief hubs, and emergency rescue points in ${currentRegion.name}`;
    setQuery(defaultQuery);
    fetchMapsGrounding(defaultQuery);
  }, [currentRegion.id]);

  // Extract valid map place links
  const mapPlaces = groundingChunks
    .filter((chunk) => chunk.maps && chunk.maps.uri)
    .map((chunk) => chunk.maps!);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-50 text-blue-600 border border-blue-200">
              <MapPin className="w-5 h-5 text-red-500" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Google Maps Grounded Emergency Facilities
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time geospatial place grounding via <code className="font-mono text-blue-600 font-semibold">gemini-3.8-flash</code> with live Google Maps verified locations, coordinates, and directions.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Anchor: {currentRegion.name} ({currentRegion.centerCoordinates[0].toFixed(2)}°N, {currentRegion.centerCoordinates[1].toFixed(2)}°E)</span>
        </div>
      </div>

      {/* Rate limit advisory notice if free tier hit limit */}
      {rateLimitNote && (
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Live Rate Limit Notice:</span>
            <p className="mt-0.5 text-amber-800">{rateLimitNote}</p>
          </div>
        </div>
      )}

      {/* Preset Quick Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(preset.text);
              fetchMapsGrounding(preset.text);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg shadow-2xs transition-all"
          >
            {preset.icon}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchMapsGrounding();
          }}
          className="flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Find 24/7 blood banks, burn units, and relief distribution points..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-colors shrink-0 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Grounding on Maps...</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5" />
                <span>Search Google Maps</span>
              </>
            )}
          </button>
        </form>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
          <strong>Notice:</strong> {errorMsg}
        </div>
      )}

      {/* Grounded Places Cards Grid */}
      {mapPlaces.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Google Maps Grounded Places ({mapPlaces.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Links open directly in Google Maps</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mapPlaces.map((place, idx) => (
              <a
                key={idx}
                href={place.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                        Google Maps Verified
                      </span>
                    </div>

                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {place.title || 'Emergency Medical Point'}
                  </h4>

                  {/* Review / Address snippets if present */}
                  {place.placeAnswerSources?.reviewSnippets && place.placeAnswerSources.reviewSnippets.length > 0 && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 italic">
                      "{place.placeAnswerSources.reviewSnippets[0].snippet}"
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                  <span>View in Google Maps</span>
                  <span>↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* AI Grounded Summary Analysis */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          <span>Operational Facilities Briefing</span>
        </h3>

        {isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-slate-500 text-xs gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span>Retrieving live geographic metadata from Google Maps Grounding...</span>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {responseMarkdown || 'Submit a query to inspect live Google Maps grounded locations.'}
          </div>
        )}
      </div>
    </div>
  );
};
