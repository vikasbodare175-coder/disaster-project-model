import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Layers, 
  ShieldAlert, 
  Wind, 
  Droplets, 
  Thermometer, 
  Activity,
  CheckCircle,
  Radio,
  MapPin,
  X
} from 'lucide-react';
import { RegionData, HazardIncident, RiskLevel } from '../types/disaster';

interface DisasterRiskMapProps {
  region: RegionData;
  onSelectIncident?: (incident: HazardIncident) => void;
  onOpenTacticalMap?: () => void;
  onOpenMapsGrounding?: () => void;
}

export const DisasterRiskMap: React.FC<DisasterRiskMapProps> = ({
  region,
  onSelectIncident,
  onOpenTacticalMap,
  onOpenMapsGrounding,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);

  const [mapType, setMapType] = useState<'satellite' | 'streets' | 'topo'>('satellite');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPin, setSelectedPin] = useState<HazardIncident | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: region.centerCoordinates,
      zoom: region.defaultZoom,
      zoomControl: false, // Custom placed or clean
      attributionControl: false,
    });

    // Satellite Imagery Layer (Esri World Imagery)
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        crossOrigin: true,
      }
    ).addTo(map);

    // Boundaries & Labels Layer
    const labelsLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        crossOrigin: true,
      }
    ).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    tileLayerRef.current = satelliteLayer;
    labelsLayerRef.current = labelsLayer;
    markersLayerRef.current = markersGroup;

    // Add standard zoom control in top right or bottom right
    L.control.zoom({ position: 'topright' }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update center when region changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(region.centerCoordinates, region.defaultZoom, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [region]);

  // Update Layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    if (labelsLayerRef.current) map.removeLayer(labelsLayerRef.current);

    if (mapType === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);

      labelsLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(map);
    } else if (mapType === 'streets') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 }
      ).addTo(map);
      labelsLayerRef.current = null;
    } else if (mapType === 'topo') {
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        { maxZoom: 17 }
      ).addTo(map);
      labelsLayerRef.current = null;
    }
  }, [mapType]);

  // Render Risk Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    // Primary Region Center Marker (Exact Red Pin like in Screenshot)
    const primaryMarkerHtml = `
      <div class="relative flex items-center justify-center cursor-pointer group">
        <div class="pulse-ring-effect bg-red-500/40"></div>
        <div class="w-8 h-10 flex items-center justify-center drop-shadow-xl transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 32" class="w-8 h-10 filter drop-shadow-md">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="#DC2626"/>
            <circle cx="12" cy="12" r="5" fill="#FFFFFF"/>
            <circle cx="12" cy="12" r="2.5" fill="#DC2626"/>
          </svg>
        </div>
      </div>
    `;

    const primaryIcon = L.divIcon({
      html: primaryMarkerHtml,
      className: 'custom-leaflet-pin',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
    });

    const mainCenterMarker = L.marker(region.centerCoordinates, { icon: primaryIcon });
    mainCenterMarker.on('click', () => {
      if (region.incidents.length > 0) {
        setSelectedPin(region.incidents[0]);
      }
    });
    markersGroup.addLayer(mainCenterMarker);

    // Additional Incidents Markers for the Region
    region.incidents.forEach((inc) => {
      // Don't duplicate exact center
      const isCenter = 
        Math.abs(inc.coordinates[0] - region.centerCoordinates[0]) < 0.05 &&
        Math.abs(inc.coordinates[1] - region.centerCoordinates[1]) < 0.05;
      
      if (isCenter) return;

      const color = 
        inc.riskLevel === 'High Risk' 
          ? '#EF4444' 
          : inc.riskLevel === 'Medium Risk' 
          ? '#F59E0B' 
          : '#10B981';

      const ringColor = 
        inc.riskLevel === 'High Risk' 
          ? 'bg-red-500/30' 
          : inc.riskLevel === 'Medium Risk' 
          ? 'bg-amber-500/30' 
          : 'bg-emerald-500/30';

      const pinHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="pulse-ring-effect ${ringColor}"></div>
          <div class="w-6 h-8 flex items-center justify-center drop-shadow-md transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 32" class="w-6 h-8">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="${color}"/>
              <circle cx="12" cy="12" r="4.5" fill="#FFFFFF"/>
            </svg>
          </div>
        </div>
      `;

      const markerIcon = L.divIcon({
        html: pinHtml,
        className: 'custom-sub-pin',
        iconSize: [24, 32],
        iconAnchor: [12, 32],
      });

      const marker = L.marker(inc.coordinates, { icon: markerIcon });
      marker.on('click', () => {
        setSelectedPin(inc);
        if (onSelectIncident) onSelectIncident(inc);
      });
      markersGroup.addLayer(marker);
    });
  }, [region]);

  const handleOpenGoogleMaps = () => {
    const [lat, lng] = region.centerCoordinates;
    const url = `https://www.google.com/maps/@${lat},${lng},${region.defaultZoom}z/data=!3m1!1e3`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs ${isFullscreen ? 'fixed inset-4 z-50 overflow-hidden' : ''}`}>
      {/* Outer Card Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Disaster Risk Map
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
          View disaster-prone locations on the map.
        </p>
      </div>

      {/* Inner Container matching screenshot */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 md:p-5">
        <div className="mb-3">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Disaster Risk Map
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            View locations and monitor sample disaster-risk zones.
          </p>
        </div>

        {/* Map Viewport Area */}
        <div className="relative w-full h-[480px] md:h-[560px] rounded-lg overflow-hidden border border-slate-800 bg-[#0C1A2E] shadow-inner">
          {/* Top Left: "Open in Maps" button matching screenshot */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <button
              onClick={handleOpenGoogleMaps}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white/95 hover:bg-white border border-slate-300 rounded shadow-md transition-all active:scale-95"
              title="Open current coordinates in Google Maps"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            </button>

            {onOpenMapsGrounding && (
              <button
                onClick={onOpenMapsGrounding}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded shadow-md transition-all active:scale-95"
                title="Search nearby grounded emergency facilities on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Nearby Facilities (Google Maps)</span>
              </button>
            )}

            {onOpenTacticalMap && (
              <button
                onClick={onOpenTacticalMap}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 rounded backdrop-blur-xs shadow-md transition-all"
              >
                <span>Tactical GIS View</span>
              </button>
            )}
          </div>

          {/* Leaflet Map Div */}
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Bottom Left Inset Thumbnail preview (Google Maps style) */}
          <div className="absolute bottom-4 left-4 z-20">
            <button
              onClick={() => {
                if (mapType === 'satellite') setMapType('streets');
                else if (mapType === 'streets') setMapType('topo');
                else setMapType('satellite');
              }}
              className="group relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 border-white shadow-lg focus:outline-none transition-transform hover:scale-105"
              title={`Currently ${mapType}. Click to switch view.`}
            >
              <div 
                className={`w-full h-full bg-cover bg-center ${
                  mapType === 'satellite'
                    ? 'bg-[#e5e3df] text-slate-800'
                    : 'bg-[#0f2137] text-white'
                } flex flex-col items-center justify-center p-1 text-[9px] font-bold text-center leading-none`}
              >
                <Layers className="w-4 h-4 mb-0.5" />
                <span>{mapType === 'satellite' ? 'Map' : 'Satellite'}</span>
              </div>
            </button>
          </div>

          {/* Bottom Right Attribution & Fullscreen controls */}
          <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] text-slate-300">
            <span className="hidden sm:inline text-slate-400">
              Map data ©2026 Imagery ©2026 NASA / Maxar
            </span>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-white hover:text-blue-300 transition-colors p-0.5 ml-1"
              title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Map Center Overlay: Selected Incident Inspection Box */}
          {selectedPin && (
            <div className="absolute top-14 left-3 right-3 sm:right-auto sm:w-84 z-30 bg-slate-900/95 text-white p-4 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    selectedPin.riskLevel === 'High Risk'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : selectedPin.riskLevel === 'Medium Risk'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {selectedPin.riskLevel}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5 leading-snug">
                    {selectedPin.title}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{selectedPin.locationName}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedPin.description}
              </p>

              {/* Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800 text-[11px]">
                {selectedPin.telemetry.windSpeed && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Wind className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Wind: {selectedPin.telemetry.windSpeed}</span>
                  </div>
                )}
                {selectedPin.telemetry.precipitation && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Rain: {selectedPin.telemetry.precipitation}</span>
                  </div>
                )}
                {selectedPin.telemetry.magnitude && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Quake: {selectedPin.telemetry.magnitude}</span>
                  </div>
                )}
                {selectedPin.telemetry.temperature && (
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Thermometer className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Temp: {selectedPin.telemetry.temperature}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400">
                  Pop. affected: <strong className="text-slate-200">{selectedPin.affectedPopulation}</strong>
                </span>
                <button
                  onClick={() => {
                    alert(`Emergency dispatch team dispatched to ${selectedPin.locationName}`);
                    setSelectedPin(null);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                >
                  Dispatch Unit
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legend row directly below the map matching screenshot */}
        <div className="mt-4 flex items-center gap-5 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-2xs" />
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-2xs" />
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shadow-2xs" />
            <span>High Risk</span>
          </div>
        </div>
      </div>

      {/* Secondary Bottom Legend matching screenshot bottom */}
      <div className="mt-4 flex items-center gap-5 text-xs text-slate-600 font-medium px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
          <span>Low Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span>High Risk</span>
        </div>
      </div>
    </div>
  );
};
