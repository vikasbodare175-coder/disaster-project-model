import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck, 
  Wind, 
  Droplets, 
  Activity, 
  Waves,
  Users,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface SimulationSandboxViewProps {
  onApplySimulationToMap?: (displacedCount: number, affectedAcres: number) => void;
}

export const SimulationSandboxView: React.FC<SimulationSandboxViewProps> = ({
  onApplySimulationToMap,
}) => {
  const [scenarioType, setScenarioType] = useState<'cyclone' | 'earthquake' | 'monsoon'>('cyclone');
  const [windSpeed, setWindSpeed] = useState<number>(140); // km/h
  const [rainfallMm, setRainfallMm] = useState<number>(220); // mm
  const [quakeMagnitude, setQuakeMagnitude] = useState<number>(6.2); // Richter
  const [damDischargeCusecs, setDamDischargeCusecs] = useState<number>(45000); // cusecs
  const [appliedNotice, setAppliedNotice] = useState(false);

  // Derived calculation models based on inputs
  const calculateImpact = () => {
    let projectedAcres = 0;
    let projectedDisplaced = 0;
    let recommendedNDRFBattalions = 1;

    if (scenarioType === 'cyclone') {
      projectedAcres = Math.round(windSpeed * 3.8 + rainfallMm * 1.5);
      projectedDisplaced = Math.round(windSpeed * 420 + rainfallMm * 180);
      recommendedNDRFBattalions = Math.max(1, Math.round(windSpeed / 30));
    } else if (scenarioType === 'earthquake') {
      projectedAcres = Math.round(Math.pow(quakeMagnitude, 3.2) * 2.1);
      projectedDisplaced = Math.round(Math.pow(quakeMagnitude, 4) * 85);
      recommendedNDRFBattalions = Math.max(2, Math.round(quakeMagnitude * 1.5));
    } else {
      projectedAcres = Math.round(rainfallMm * 4.2 + (damDischargeCusecs / 1000) * 12);
      projectedDisplaced = Math.round(rainfallMm * 320 + (damDischargeCusecs / 1000) * 950);
      recommendedNDRFBattalions = Math.max(2, Math.round(damDischargeCusecs / 15000));
    }

    return { projectedAcres, projectedDisplaced, recommendedNDRFBattalions };
  };

  const { projectedAcres, projectedDisplaced, recommendedNDRFBattalions } = calculateImpact();

  const handleApply = () => {
    if (onApplySimulationToMap) {
      onApplySimulationToMap(projectedDisplaced, projectedAcres);
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  const handleReset = () => {
    setWindSpeed(140);
    setRainfallMm(220);
    setQuakeMagnitude(6.2);
    setDamDischargeCusecs(45000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <span>Crisis Modeling & Disaster Simulation Sandbox</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test "What-If" emergency contingencies, atmospheric stress thresholds, and civil evacuation limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
        </div>
      </div>

      {/* Scenario Presets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setScenarioType('cyclone');
            setWindSpeed(165);
            setRainfallMm(280);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            scenarioType === 'cyclone'
              ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
            <Wind className="w-4 h-4" />
            <span>Super Cyclone Surge</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Severe Category 4 cyclone landfall with tidal surge breaching low-lying coastal bunds.
          </p>
        </button>

        <button
          onClick={() => {
            setScenarioType('earthquake');
            setQuakeMagnitude(6.8);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            scenarioType === 'earthquake'
              ? 'bg-amber-50/70 border-amber-400 shadow-xs ring-1 ring-amber-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-1">
            <Activity className="w-4 h-4" />
            <span>Koyna Fault Rupture M6.8</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Major shallow focal earthquake triggering structural masonry stress and reservoir locks.
          </p>
        </button>

        <button
          onClick={() => {
            setScenarioType('monsoon');
            setRainfallMm(420);
            setDamDischargeCusecs(85000);
          }}
          className={`p-4 rounded-xl border text-left transition-all ${
            scenarioType === 'monsoon'
              ? 'bg-cyan-50/70 border-cyan-400 shadow-xs ring-1 ring-cyan-400'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2 text-cyan-700 font-bold text-sm mb-1">
            <Waves className="w-4 h-4" />
            <span>Monsoon Deluge & Dam Spillway</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Continuous cloudburst upstream causing peak dam discharge of 85,000+ cusecs into river basins.
          </p>
        </button>
      </div>

      {/* Interactive Controls & Projected Outcomes Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Sliders */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-5">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Simulated Environmental Parameters
          </h3>

          {/* Wind Speed */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Sustained Wind Gusts:</span>
              <span className="font-mono text-blue-600">{windSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="40"
              max="240"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>40 km/h (Breeze)</span>
              <span>120 km/h (Cyclone)</span>
              <span>240 km/h (Catastrophic)</span>
            </div>
          </div>

          {/* Precipitation */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>24-Hour Cumulative Rain:</span>
              <span className="font-mono text-cyan-600">{rainfallMm} mm</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>20 mm (Light)</span>
              <span>200 mm (Heavy)</span>
              <span>500 mm (Cloudburst)</span>
            </div>
          </div>

          {/* Quake Magnitude */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Seismic Rupture Magnitude:</span>
              <span className="font-mono text-amber-600">M {quakeMagnitude.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="8.5"
              step="0.1"
              value={quakeMagnitude}
              onChange={(e) => setQuakeMagnitude(Number(e.target.value))}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>M3.0 (Minor)</span>
              <span>M6.0 (Severe)</span>
              <span>M8.5 (Cataclysmic)</span>
            </div>
          </div>

          {/* Dam Sluice Gate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Reservoir Controlled Outflow:</span>
              <span className="font-mono text-indigo-600">{damDischargeCusecs.toLocaleString()} cusecs</span>
            </div>
            <input
              type="range"
              min="5000"
              max="120000"
              step="5000"
              value={damDischargeCusecs}
              onChange={(e) => setDamDischargeCusecs(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              <span>5,000 cusecs</span>
              <span>50,000 cusecs</span>
              <span>120,000 cusecs (Spillover)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Vulnerability Calculations */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Projected Crisis Impact Matrix</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Computational Engine</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Projected Inundation
                </span>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {projectedAcres.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">acres</span>
                </p>
                <span className="text-[10px] text-slate-400">Directly submerged acreage</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Estimated Evacuees
                </span>
                <p className="text-2xl font-bold font-mono text-amber-700 mt-1 tabular-nums">
                  {projectedDisplaced.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">citizens</span>
                </p>
                <span className="text-[10px] text-slate-400">Requiring immediate shelter</span>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Recommended Asset Allocation</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Deploy at least <strong>{recommendedNDRFBattalions} NDRF / SDRF Battalions</strong> to vulnerable talukas.</li>
                <li>Activate <strong>{Math.ceil(projectedDisplaced / 800)} Designated Relief Centers</strong> with ready generators.</li>
                <li>Position <strong>{Math.max(2, Math.round(recommendedNDRFBattalions * 3))} Inflatable Motorboats</strong> along riverbanks.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
            {appliedNotice ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Simulated parameters applied to Live Monitor</span>
              </span>
            ) : (
              <span className="text-xs text-slate-400">Scenario ready for operational preview</span>
            )}

            <button
              onClick={handleApply}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Apply to Live Operations</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
