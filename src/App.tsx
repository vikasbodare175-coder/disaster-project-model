import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NoticeBanner } from './components/NoticeBanner';
import { RegionSelector } from './components/RegionSelector';
import { KpiCards } from './components/KpiCards';
import { DisasterRiskMap } from './components/DisasterRiskMap';
import { SensorTelemetryWidget } from './components/SensorTelemetryWidget';
import { AlertsView } from './components/AlertsView';
import { DisasterOverviewView } from './components/DisasterOverviewView';
import { DisasterMapFullView } from './components/DisasterMapFullView';
import { MapsGroundingView } from './components/MapsGroundingView';
import { SheltersView } from './components/SheltersView';
import { DispatchView } from './components/DispatchView';
import { CitizenSosView } from './components/CitizenSosView';
import { SimulationSandboxView } from './components/SimulationSandboxView';
import { BroadcastModal } from './components/BroadcastModal';
import { AddIncidentModal } from './components/AddIncidentModal';
import { SituationReportModal } from './components/SituationReportModal';
import { TabType, SeasonType, RegionData, HazardIncident } from './types/disaster';
import { REGIONS } from './data/disasterData';
import { testFirestoreConnection } from './lib/firebase';
import { useDisasterFirestore } from './hooks/useDisasterFirestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedSeason, setSelectedSeason] = useState<SeasonType>('2026 Season');
  const [regions, setRegions] = useState<RegionData[]>(REGIONS);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('maharashtra');
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false);
  const [isSitRepOpen, setIsSitRepOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Firestore synchronization hook
  const { 
    firestoreIncidents, 
    isConnected: firestoreConnected, 
    saveIncidentToFirestore, 
    updateIncidentInFirestore 
  } = useDisasterFirestore();

  // Test Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Merge Firestore incidents into regions when new remote incidents arrive
  useEffect(() => {
    if (firestoreIncidents.length === 0) return;

    setRegions((prevRegions) => {
      return prevRegions.map((reg) => {
        const customForRegion = firestoreIncidents.filter((inc) => inc.regionId === reg.id);
        if (customForRegion.length === 0) return reg;

        // Merge avoiding duplicate IDs
        const existingIds = new Set(reg.incidents.map((i) => i.id));
        const newOnes = customForRegion.filter((i) => !existingIds.has(i.id));

        if (newOnes.length === 0) return reg;

        const mergedIncidents = [...newOnes, ...reg.incidents];
        return {
          ...reg,
          incidents: mergedIncidents,
          activeAlertsCount: mergedIncidents.filter((i) => i.status !== 'Resolved').length,
        };
      });
    });
  }, [firestoreIncidents]);

  // Find active region
  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  // All incidents across all regions
  const allIncidents = regions.flatMap((r) => r.incidents);

  // Live simulation tick effect when isLiveMode is on
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setRegions((prevRegions) => {
        return prevRegions.map((reg) => {
          const jitter = Math.random() > 0.5 ? 1 : -1;
          const newSafety = Math.min(99, Math.max(45, reg.averageSafetyLevel + (Math.random() > 0.7 ? jitter : 0)));
          return {
            ...reg,
            averageSafetyLevel: newSafety,
          };
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  const handleSelectRegion = (region: RegionData) => {
    setSelectedRegionId(region.id);
  };

  const handleUpdateIncidentStatus = (
    id: string,
    newStatus: 'Active' | 'Investigating' | 'Contained' | 'Resolved'
  ) => {
    setRegions((prev) =>
      prev.map((reg) => {
        const hasIncident = reg.incidents.some((i) => i.id === id);
        if (!hasIncident) return reg;

        const updatedIncidents = reg.incidents.map((i) =>
          i.id === id ? { ...i, status: newStatus } : i
        );
        const newActiveCount = updatedIncidents.filter((i) => i.status !== 'Resolved').length;

        return {
          ...reg,
          incidents: updatedIncidents,
          activeAlertsCount: newActiveCount,
        };
      })
    );

    // Sync to Firestore
    updateIncidentInFirestore(id, newStatus);
    showToast(`Incident status updated to "${newStatus}" and synced to Firestore`);
  };

  const handleAddIncident = async (newIncident: HazardIncident) => {
    setRegions((prev) =>
      prev.map((reg) => {
        if (reg.id === newIncident.regionId) {
          const updatedIncidents = [newIncident, ...reg.incidents];
          return {
            ...reg,
            incidents: updatedIncidents,
            activeAlertsCount: reg.activeAlertsCount + 1,
            totalMonitoredAreaAcres: reg.totalMonitoredAreaAcres + newIncident.affectedAreaAcres,
          };
        }
        return reg;
      })
    );

    // Persist to Firestore database
    await saveIncidentToFirestore(newIncident);
    showToast(`New hazard pin added & persisted in Firestore: "${newIncident.title}"`);
  };

  const handleApplySimulation = (displacedCount: number, affectedAcres: number) => {
    setRegions((prev) =>
      prev.map((reg) => {
        if (reg.id === selectedRegion.id) {
          return {
            ...reg,
            totalMonitoredAreaAcres: reg.totalMonitoredAreaAcres + Math.round(affectedAcres * 0.1),
            averageSafetyLevel: Math.max(35, reg.averageSafetyLevel - 12),
          };
        }
        return reg;
      })
    );
    showToast(`Simulation scenario applied to ${selectedRegion.name}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] text-slate-800 flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveMode={isLiveMode}
        setIsLiveMode={(live) => {
          setIsLiveMode(live);
          showToast(live ? 'Switched to Live Simulation Mode' : 'Switched to Demo Mode');
        }}
        activeAlertsCount={selectedRegion.activeAlertsCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 min-h-screen flex flex-col">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          {/* Header */}
          <Header
            activeTab={activeTab}
            selectedSeason={selectedSeason}
            setSelectedSeason={(season) => {
              setSelectedSeason(season);
              showToast(`Season profile updated to: ${season}`);
            }}
            setMobileMenuOpen={setMobileMenuOpen}
            onOpenBroadcastModal={() => setIsBroadcastOpen(true)}
            onOpenAddIncidentModal={() => setIsAddIncidentOpen(true)}
            onOpenSitRepModal={() => setIsSitRepOpen(true)}
          />

          {/* Conditional View Rendering based on activeTab */}
          {activeTab === 'dashboard' && (
            <>
              {/* Notice Banner matching screenshot */}
              <NoticeBanner
                isLiveMode={isLiveMode}
                onToggleLiveMode={() => setIsLiveMode(!isLiveMode)}
              />

              {/* Region Selector matching screenshot */}
              <RegionSelector
                selectedRegion={selectedRegion}
                onSelectRegion={handleSelectRegion}
              />

              {/* 3 Metric Cards matching screenshot */}
              <KpiCards
                region={selectedRegion}
                onNavigateToAlerts={() => setActiveTab('alerts')}
              />

              {/* Main Disaster Risk Map matching screenshot */}
              <DisasterRiskMap
                region={selectedRegion}
                onSelectIncident={(incident) => {
                  showToast(`Inspecting: ${incident.title}`);
                }}
                onOpenTacticalMap={() => setActiveTab('map')}
                onOpenMapsGrounding={() => setActiveTab('maps-grounding')}
              />

              {/* Sensor Telemetry Widget directly below main map */}
              <SensorTelemetryWidget />
            </>
          )}

          {activeTab === 'map' && (
            <DisasterMapFullView
              currentRegion={selectedRegion}
              onSelectRegion={handleSelectRegion}
              allIncidents={allIncidents}
            />
          )}

          {activeTab === 'maps-grounding' && (
            <MapsGroundingView currentRegion={selectedRegion} />
          )}

          {activeTab === 'overview' && (
            <DisasterOverviewView
              selectedSeason={selectedSeason}
              onSelectRegion={(reg) => {
                handleSelectRegion(reg);
                setActiveTab('dashboard');
              }}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsView
              incidents={allIncidents}
              onUpdateIncidentStatus={handleUpdateIncidentStatus}
              onOpenBroadcastModal={() => setIsBroadcastOpen(true)}
            />
          )}

          {activeTab === 'shelters' && (
            <SheltersView />
          )}

          {activeTab === 'dispatch' && (
            <DispatchView incidents={allIncidents} />
          )}

          {activeTab === 'sos' && (
            <CitizenSosView />
          )}

          {activeTab === 'simulation' && (
            <SimulationSandboxView onApplySimulationToMap={handleApplySimulation} />
          )}
        </div>
      </main>

      {/* Emergency Broadcast Modal */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        currentRegion={selectedRegion}
        onBroadcastSent={(headline) => {
          showToast(`Emergency Broadcast sent: "${headline}"`);
        }}
      />

      {/* Add Incident Modal */}
      <AddIncidentModal
        isOpen={isAddIncidentOpen}
        onClose={() => setIsAddIncidentOpen(false)}
        currentRegion={selectedRegion}
        onAddIncident={handleAddIncident}
      />

      {/* Official Situation Report Modal */}
      <SituationReportModal
        isOpen={isSitRepOpen}
        onClose={() => setIsSitRepOpen(false)}
        currentRegion={selectedRegion}
        selectedSeason={selectedSeason}
        incidents={selectedRegion.incidents}
      />
    </div>
  );
}
