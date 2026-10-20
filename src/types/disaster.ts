export type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';

export type DisasterCategory = 
  | 'Cyclone / Storm'
  | 'Flood / Inundation'
  | 'Earthquake / Seismic'
  | 'Landslide'
  | 'Severe Heatwave'
  | 'Wildfire'
  | 'Tsunami Watch';

export interface HazardIncident {
  id: string;
  title: string;
  regionId: string;
  category: DisasterCategory;
  riskLevel: RiskLevel;
  locationName: string;
  coordinates: [number, number]; // [lat, lng]
  timestamp: string;
  affectedPopulation: string;
  affectedAreaAcres: number;
  severityScore: number; // 0 - 100
  status: 'Active' | 'Investigating' | 'Contained' | 'Resolved';
  description: string;
  emergencyProtocols: string[];
  assignedTeams: string[];
  telemetry: {
    windSpeed?: string;
    precipitation?: string;
    temperature?: string;
    magnitude?: string;
    waterLevel?: string;
  };
}

export interface RegionData {
  id: string;
  name: string;
  country: string;
  centerCoordinates: [number, number];
  defaultZoom: number;
  totalMonitoredAreaAcres: number;
  averageSafetyLevel: number; // percentage e.g. 82
  activeAlertsCount: number;
  description: string;
  vulnerabilityNotes: string;
  incidents: HazardIncident[];
}

export type TabType = 
  | 'dashboard' 
  | 'map' 
  | 'overview' 
  | 'alerts'
  | 'maps-grounding'
  | 'shelters'
  | 'dispatch'
  | 'sos'
  | 'simulation';

export type SeasonType = 
  | '2026 Season'
  | 'Monsoon 2026'
  | 'Cyclone Season 2026'
  | 'Summer Heatwave 2026'
  | 'Winter Blizzard 2026';

export interface EvacuationShelter {
  id: string;
  name: string;
  regionId: string;
  address: string;
  coordinates: [number, number];
  totalCapacity: number;
  currentOccupancy: number;
  status: 'Open & Accepting' | 'Near Capacity' | 'Full' | 'Standby';
  medicalStaffPresent: number;
  foodWaterDays: number;
  hasBackupPower: boolean;
  contactNumber: string;
}

export interface EmergencyResponseUnit {
  id: string;
  name: string;
  branch: 'NDRF' | 'SDRF' | 'Coast Guard' | 'Fire Service' | 'Aviation Squad' | 'Medical Wing';
  regionId: string;
  baseStation: string;
  personnelCount: number;
  status: 'Available' | 'Deployed' | 'In Transit' | 'Standby';
  equipment: string[];
  assignedIncidentTitle?: string;
  etaMinutes?: number;
}

export interface CitizenSOSCall {
  id: string;
  citizenName: string;
  phoneNumber: string;
  regionId: string;
  locationName: string;
  coordinates: [number, number];
  reportedTime: string;
  urgency: 'Life Threatening' | 'Medical Emergency' | 'Water Trapped' | 'Food / Water Depleted';
  peopleCount: number;
  status: 'Pending Triage' | 'Unit Dispatched' | 'Rescued';
  notes: string;
  assignedUnitId?: string;
}

export interface EnvironmentalSensor {
  id: string;
  sensorName: string;
  type: 'Doppler Radar' | 'River Basin Gauge' | 'Borehole Seismometer' | 'Tide Gauge' | 'Soil Inclinometer';
  reading: string;
  unit: string;
  status: 'Normal' | 'Advisory' | 'Critical Alert';
  location: string;
  lastUpdated: string;
}
