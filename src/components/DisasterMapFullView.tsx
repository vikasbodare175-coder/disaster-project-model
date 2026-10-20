import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  MapPin, 
  Search, 
  Compass, 
  Filter, 
  Maximize2, 
  ExternalLink,
  Flame,
  Droplets,
  Activity,
  Wind,
  Shield,
  Eye
} from 'lucide-react';
import { RegionData, HazardIncident, DisasterCategory } from '../types/disaster';
import { REGIONS } from '../data/disasterData';

interface DisasterMapFullViewProps {
  currentRegion: RegionData;
  onSelectRegion: (region: RegionData) => void;
  allIncidents: HazardIncident[];
}

export const DisasterMapFullView: React.FC<DisasterMapFullViewProps> = ({
  currentRegion,
  onSelectRegion,
  allIncidents,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const circlesLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [activeLayer, setActiveLayer] = useState<'satellite' | 'street' | 'topo'>('satellite');
  const [selectedIncident, setSelectedIncident] = useState<HazardIncident | null>(null);
  const [showRadiusZones, setShowRadiusZones] = useState<boolean>(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: currentRegion.centerCoordinates,
      zoom: currentRegion.defaultZoom,
      zoomControl: false,
      attributionControl: false,
    });

    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18, crossOrigin: true }
    ).addTo(map);

    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 18, crossOrigin: true }
    ).addTo(map);

    const circlesGroup = L.layerGroup().addTo(map);
    const markersGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    tileLayerRef.current = satelliteLayer;
    labelsLayerRef.current = labelsLayer;
    markersLayerRef.current = markersGroup;
    circlesLayerRef.current = circlesGroup;

    L.control.zoom({ position: 'topright' }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map position when currentRegion changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(currentRegion.centerCoordinates, currentRegion.defaultZoom, {
      duration: 1.2,
    });
  }, [currentRegion]);

  // Handle Layer Type changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    if (labelsLayerRef.current) map.removeLayer(labelsLayerRef.current);

    if (activeLayer === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);
      labelsLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);
    } else if (activeLayer === 'street') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 }
      ).addTo(map);
      labelsLayerRef.current = null;
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        { maxZoom: 17 }
      ).addTo(map);
      labelsLayerRef.current = null;
    }
  }, [activeLayer]);

  // Render Markers and Radius Circles
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !circlesLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    const circlesGroup = circlesLayerRef.current;
    markersGroup.clearLayers();
    circlesGroup.clearLayers();

    const filtered = allIncidents.filter((inc) => {
      if (activeCategoryFilter === 'All') return true;
      return inc.category.includes(activeCategoryFilter);
    });

    filtered.forEach((inc) => {
      const isHigh = inc.riskLevel === 'High Risk';
      const isMed = inc.riskLevel === 'Medium Risk';
      const color = isHigh ? '#EF4444' : isMed ? '#F59E0B' : '#10B981';
      const pulseColor = isHigh ? 'bg-red-500/40' : isMed ? 'bg-amber-500/40' : 'bg-emerald-500/40';

      // Impact Radius circle
      if (showRadiusZones) {
        const radiusMeters = isHigh ? 35000 : isMed ? 20000 : 10000;
        const circle = L.circle(inc.coordinates, {
          radius: radiusMeters,
          color: color,
          weight: 1.5,
          opacity: 0.8,
          fillColor: color,
          fillOpacity: 0.12,
        });
        circlesGroup.addLayer(circle);
      }

      // Marker Icon
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="pulse-ring-effect ${pulseColor}"></div>
          <div class="w-7 h-9 flex items-center justify-center drop-shadow-xl transition-transform group-hover:scale-125">
            <svg viewBox="0 0 24 32" class="w-7 h-9">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="${color}"/>
              <circle cx="12" cy="12" r="4.5" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: 'tactical-gis-marker',
        iconSize: [28, 36],
        iconAnchor: [14, 36],
      });

      const marker = L.marker(inc.coordinates, { icon });
      marker.on('click', () => {
        setSelectedIncident(inc);
      });
      markersGroup.addLayer(marker);
    });
  }, [allIncidents, activeCategoryFilter, showRadiusZones]);

  return (
    <div className="space-y-4">
      {/* Top Map Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Layer selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeLayer === 'satellite' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Satellite Hybrid
          </button>
          <button
            onClick={() => setActiveLayer('street')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeLayer === 'street' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Street Map
          </button>
          <button
            onClick={() => setActiveLayer('topo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeLayer === 'topo' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Topographic
          </button>
        </div>

        {/* Hazard category filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {['All', 'Cyclone', 'Flood', 'Earthquake', 'Landslide', 'Heatwave', 'Wildfire'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors whitespace-nowrap ${
                activeCategoryFilter === cat
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Radius Toggle */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showRadiusZones}
              onChange={(e) => setShowRadiusZones(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500/20"
            />
            <span>Show Hazard Radius Buffers</span>
          </label>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="relative w-full h-[620px] rounded-xl overflow-hidden border border-slate-800 bg-[#0B1528] shadow-md">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Quick Region Selector overlay on tactical map */}
        <div className="absolute top-3 left-3 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-lg flex items-center gap-2 text-xs text-white">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300">Target Region:</span>
          <select
            value={currentRegion.id}
            onChange={(e) => {
              const reg = REGIONS.find((r) => r.id === e.target.value);
              if (reg) onSelectRegion(reg);
            }}
            className="bg-slate-800 text-white text-xs font-semibold px-2 py-1 rounded border border-slate-600 focus:outline-none"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.country})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Incident Drawer */}
        {selectedIncident && (
          <div className="absolute top-14 right-3 w-80 z-30 bg-slate-900/95 text-white p-4 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md">
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                  selectedIncident.riskLevel === 'High Risk' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {selectedIncident.riskLevel}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{selectedIncident.title}</h4>
                <p className="text-xs text-slate-400">{selectedIncident.locationName}</p>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {selectedIncident.description}
            </p>
            <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-800 pt-2 space-y-1">
              <div>Coordinates: <strong className="text-slate-200">{selectedIncident.coordinates[0].toFixed(4)}, {selectedIncident.coordinates[1].toFixed(4)}</strong></div>
              <div>Estimated Population: <strong className="text-slate-200">{selectedIncident.affectedPopulation}</strong></div>
              <div>Severity Rating: <strong className="text-amber-400">{selectedIncident.severityScore}/100</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
