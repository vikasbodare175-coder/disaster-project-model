import React from 'react';
import { X, FileText, Printer, Download, CheckCircle, Shield } from 'lucide-react';
import { RegionData, HazardIncident, SeasonType } from '../types/disaster';

interface SituationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRegion: RegionData;
  selectedSeason: SeasonType;
  incidents: HazardIncident[];
}

export const SituationReportModal: React.FC<SituationReportModalProps> = ({
  isOpen,
  onClose,
  currentRegion,
  selectedSeason,
  incidents,
}) => {
  if (!isOpen) return null;

  const sitrepDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const reportData = {
      reportType: 'DISASTER_SITREP',
      reportNumber: `SITREP-${currentRegion.id.toUpperCase()}-2026-004`,
      generatedAt: new Date().toISOString(),
      region: currentRegion.name,
      country: currentRegion.country,
      season: selectedSeason,
      summary: {
        totalMonitoredAreaAcres: currentRegion.totalMonitoredAreaAcres,
        averageSafetyLevel: `${currentRegion.averageSafetyLevel}%`,
        activeAlertsCount: currentRegion.activeAlertsCount,
      },
      activeIncidents: incidents.map((i) => ({
        title: i.title,
        category: i.category,
        riskLevel: i.riskLevel,
        location: i.locationName,
        affectedPopulation: i.affectedPopulation,
        status: i.status,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SitRep_${currentRegion.name}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold tracking-tight">Official Incident Situation Report (SitRep)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SitRep Document Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 text-xs md:text-sm font-sans">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  DISASTER MONITORING & EMERGENCY RESPONSE CELL
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  State Emergency Operations Center (SEOC) · {currentRegion.name}, {currentRegion.country}
                </p>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="font-bold text-slate-900 block">SITREP #{currentRegion.id.toUpperCase()}-26-04</span>
                <span className="text-slate-500">{sitrepDate}</span>
              </div>
            </div>
          </div>

          {/* Key Facts Matrix */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Key Operational Indicators ({selectedSeason})
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[11px] text-slate-500 block">Total Monitored Area</span>
                <span className="text-base font-bold text-slate-900 font-mono">{currentRegion.totalMonitoredAreaAcres} acres</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[11px] text-slate-500 block">System Safety Index</span>
                <span className="text-base font-bold text-emerald-600 font-mono">{currentRegion.averageSafetyLevel}%</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-[11px] text-slate-500 block">Active Critical Alerts</span>
                <span className="text-base font-bold text-amber-700 font-mono">{currentRegion.activeAlertsCount} active</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              2. Executive Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {currentRegion.description} The primary vulnerability watch is focused on {currentRegion.vulnerabilityNotes}. All designated emergency relief centers have initiated power backup readiness checks.
            </p>
          </div>

          {/* Active Incidents Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              3. Incident Triage Breakdown
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Incident</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Risk Level</th>
                    <th className="p-2">Affected Pop.</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {incidents.slice(0, 5).map((inc) => (
                    <tr key={inc.id}>
                      <td className="p-2 font-semibold text-slate-900">{inc.title}</td>
                      <td className="p-2 text-slate-600">{inc.category}</td>
                      <td className="p-2 font-bold text-red-600">{inc.riskLevel}</td>
                      <td className="p-2 font-mono text-slate-700">{inc.affectedPopulation}</td>
                      <td className="p-2 font-medium text-slate-800">{inc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 24-hr Priority Directives */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              4. Immediate 24-Hour Directives
            </h2>
            <ul className="list-disc pl-4 text-xs text-slate-700 space-y-1">
              <li>Maintain reservoir spillway outflow telemetry monitoring around the clock.</li>
              <li>Coordinate with Indian Coast Guard and SDRF marine units to restrict coastal sorties.</li>
              <li>Keep all taluka satellite phones and UHF wireless repeaters synchronized on emergency channel.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Classified: Official Civil Protection Distribution</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-2xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print SitRep</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
