import React, { useState } from 'react';
import { 
  Radio, 
  Activity, 
  Droplets, 
  Wind, 
  Waves, 
  Gauge, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { EnvironmentalSensor } from '../types/disaster';
import { ENVIRONMENTAL_SENSORS } from '../data/disasterData';

export const SensorTelemetryWidget: React.FC = () => {
  const [sensors, setSensors] = useState<EnvironmentalSensor[]>(ENVIRONMENTAL_SENSORS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState<EnvironmentalSensor | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensors((prev) =>
        prev.map((s) => ({
          ...s,
          lastUpdated: 'Just now',
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  const getSensorIcon = (type: EnvironmentalSensor['type']) => {
    switch (type) {
      case 'Doppler Radar':
        return <Wind className="w-4 h-4 text-blue-500" />;
      case 'River Basin Gauge':
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case 'Borehole Seismometer':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'Tide Gauge':
        return <Waves className="w-4 h-4 text-emerald-500" />;
      case 'Soil Inclinometer':
      default:
        return <Gauge className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-xs mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Radio className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>Environmental & Seismic Telemetry Grid</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated sensor feeds from IMD radar, reservoir sluice gates, and coastal tide buoys.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Sync Sensors</span>
        </button>
      </div>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {sensors.map((sensor) => {
          const isCritical = sensor.status === 'Critical Alert';
          const isAdvisory = sensor.status === 'Advisory';

          return (
            <div
              key={sensor.id}
              onClick={() => setSelectedSensor(sensor)}
              className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-white border border-slate-200/60 shadow-2xs">
                    {getSensorIcon(sensor.type)}
                  </div>
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded uppercase ${
                    isCritical 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : isAdvisory 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {sensor.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {sensor.sensorName}
                </h4>

                <p className="text-[11px] font-mono text-slate-900 font-semibold mt-1">
                  {sensor.reading}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[90px]">{sensor.location}</span>
                <span>{sensor.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sensor Modal */}
      {selectedSensor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-xl border border-slate-200 p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{selectedSensor.type}</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">{selectedSensor.sensorName}</h4>
                <p className="text-xs text-slate-500">{selectedSensor.location}</p>
              </div>
              <button onClick={() => setSelectedSensor(null)} className="text-slate-400 hover:text-slate-700 p-1">✕</button>
            </div>

            <div className="my-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-400">Current Calibrated Value:</span>
              <p className="text-xl font-bold font-mono text-slate-900 mt-1">{selectedSensor.reading}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${selectedSensor.status === 'Critical Alert' ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="font-medium text-slate-700">Threshold: {selectedSensor.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Telemetry readings are collected every 60 seconds via secure satellite relay and optical ground nodes. Alert conditions automatically notify the State Disaster Cell.
            </p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedSensor(null)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
