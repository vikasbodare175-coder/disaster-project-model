import { RegionData, SeasonType } from '../types/disaster';

export const SEASONS: SeasonType[] = [
  '2026 Season',
  'Monsoon 2026',
  'Cyclone Season 2026',
  'Summer Heatwave 2026',
  'Winter Blizzard 2026',
];

export const REGIONS: RegionData[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    country: 'India',
    centerCoordinates: [19.7515, 75.7139],
    defaultZoom: 6,
    totalMonitoredAreaAcres: 250,
    averageSafetyLevel: 82,
    activeAlertsCount: 4,
    description: 'Western coastal and Deccan plateau region prone to monsoon inundation, Sahyadri landslides, and seismic activity in Koyna.',
    vulnerabilityNotes: 'Monsoon flash flooding along Godavari & Krishna basins, severe coastal tidal surge in Ratnagiri-Raigad sector.',
    incidents: [
      {
        id: 'inc-mah-1',
        title: 'Koyna Valley Seismic Watch',
        regionId: 'maharashtra',
        category: 'Earthquake / Seismic',
        riskLevel: 'High Risk',
        locationName: 'Koynanagar, Satara',
        coordinates: [17.3995, 73.7424],
        timestamp: '12 mins ago',
        affectedPopulation: '18,400',
        affectedAreaAcres: 85,
        severityScore: 78,
        status: 'Active',
        description: 'Micro-tremor cluster M3.2 detected by deep borehole sensors near Koyna Dam fault rupture zone. Structural integrity sensors engaged.',
        emergencyProtocols: ['Dam spillway seismic locks engaged', 'SDRF 3rd Battalion placed on standby', 'Early warning sirens tested in Patan taluka'],
        assignedTeams: ['Satara SDRF Unit 4', 'Geological Survey Rapid Response', 'Irrigation Engineering Wing'],
        telemetry: {
          magnitude: '3.2 ML',
          temperature: '28°C',
          waterLevel: '682.4 m'
        }
      },
      {
        id: 'inc-mah-2',
        title: 'Ratnagiri Coastal Inundation Risk',
        regionId: 'maharashtra',
        category: 'Cyclone / Storm',
        riskLevel: 'High Risk',
        locationName: 'Mirya Bay, Ratnagiri Coast',
        coordinates: [16.9902, 73.3120],
        timestamp: '34 mins ago',
        affectedPopulation: '42,000',
        affectedAreaAcres: 95,
        severityScore: 84,
        status: 'Active',
        description: 'Storm surge warning issued due to Arabian Sea deep depression. Predicted high tidal waves exceeding 4.2m with wind gusts reaching 65 km/h.',
        emergencyProtocols: ['Fishermen sea sortie prohibition enforced', 'Low-lying coastal hamlet evacuation ready', 'Emergency shelter centers activated'],
        assignedTeams: ['Indian Coast Guard Station Ratnagiri', 'Coastal Police Patrol 2', 'Medical Mobile Unit 1'],
        telemetry: {
          windSpeed: '65 km/h',
          precipitation: '48 mm/h',
          temperature: '29°C'
        }
      },
      {
        id: 'inc-mah-3',
        title: 'Vidarbha Basin Severe Heatwave',
        regionId: 'maharashtra',
        category: 'Severe Heatwave',
        riskLevel: 'Medium Risk',
        locationName: 'Chandrapur & Nagpur Border',
        coordinates: [20.2520, 79.2961],
        timestamp: '1 hour ago',
        affectedPopulation: '65,000',
        affectedAreaAcres: 50,
        severityScore: 62,
        status: 'Active',
        description: 'Thermal satellite anomaly showing surface temperatures peaking at 44.5°C with severe wet-bulb temperature stress. Red alert for outdoor labor.',
        emergencyProtocols: ['Cool-roof shelters activated', 'Electrolyte distribution stations at transit hubs', 'Power grid contingency load balancing'],
        assignedTeams: ['Municipal Health Surveillance', 'Civil Defense Corps'],
        telemetry: {
          temperature: '44.5°C',
          windSpeed: '12 km/h'
        }
      },
      {
        id: 'inc-mah-4',
        title: 'Bhimashankar Ghat Landslide Watch',
        regionId: 'maharashtra',
        category: 'Landslide',
        riskLevel: 'Medium Risk',
        locationName: 'Khandala-Lonavala Ghat Cut',
        coordinates: [18.7557, 73.4091],
        timestamp: '2 hours ago',
        affectedPopulation: '9,200',
        affectedAreaAcres: 20,
        severityScore: 56,
        status: 'Active',
        description: 'Soil saturation sensors on expressway retaining wall indicate 88% moisture pore pressure. Slope stabilization telemetry alerting.',
        emergencyProtocols: ['Heavy traffic lane speed reduction to 40km/h', 'Excavation debris clearing crews stationed', 'Drone aerial surveillance ongoing'],
        assignedTeams: ['MSRDC Emergency Road Squad', 'Highway Police Patrol'],
        telemetry: {
          precipitation: '32 mm/h',
          temperature: '24°C'
        }
      },
      {
        id: 'inc-mah-5',
        title: 'Mula-Mutha River Basin Water Level',
        regionId: 'maharashtra',
        category: 'Flood / Inundation',
        riskLevel: 'Low Risk',
        locationName: 'Khadakwasla Dam Outflow, Pune',
        coordinates: [18.4414, 73.7629],
        timestamp: '3 hours ago',
        affectedPopulation: '12,000',
        affectedAreaAcres: 40,
        severityScore: 28,
        status: 'Contained',
        description: 'Controlled water discharge from Khadakwasla reservoir at 14,000 cusecs. Riverbank warning flags active, normal water levels monitored.',
        emergencyProtocols: ['Riparian buffer zone monitored', 'Civil wardens positioned at river bridges'],
        assignedTeams: ['Pune Municipal Disaster Cell'],
        telemetry: {
          waterLevel: 'Normal (82% capacity)',
          precipitation: '8 mm/h',
          temperature: '26°C'
        }
      }
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    country: 'India',
    centerCoordinates: [22.2587, 71.1924],
    defaultZoom: 6,
    totalMonitoredAreaAcres: 480,
    averageSafetyLevel: 76,
    activeAlertsCount: 6,
    description: 'Vulnerable coastline with Arabian Sea cyclone tracks, Kutch seismic fault zones, and Narmada-Tapi flood catchment systems.',
    vulnerabilityNotes: 'High vulnerability to cyclone landfall and post-monsoon tidal flooding across Okha, Porbandar and Kandla ports.',
    incidents: [
      {
        id: 'inc-guj-1',
        title: 'Kutch Rift Basin Tremor Series',
        regionId: 'gujarat',
        category: 'Earthquake / Seismic',
        riskLevel: 'High Risk',
        locationName: 'Bhuj - Anjar Faultline',
        coordinates: [23.2420, 69.6669],
        timestamp: '25 mins ago',
        affectedPopulation: '38,000',
        affectedAreaAcres: 120,
        severityScore: 82,
        status: 'Active',
        description: 'Continuous low-frequency seismic hum and M3.8 foreshock recorded along the Katrol Hill Fault.',
        emergencyProtocols: ['National Disaster Response Force on alert', 'Hospital trauma beds mobilized', 'Public broadcast warning issued'],
        assignedTeams: ['NDRF 6th Battalion', 'ISR Seismic Observers'],
        telemetry: { magnitude: '3.8 ML', temperature: '31°C' }
      },
      {
        id: 'inc-guj-2',
        title: 'Kandla Maritime Storm Alert',
        regionId: 'gujarat',
        category: 'Cyclone / Storm',
        riskLevel: 'Medium Risk',
        locationName: 'Gulf of Kutch, Kandla',
        coordinates: [23.0040, 70.2195],
        timestamp: '1 hour ago',
        affectedPopulation: '51,000',
        affectedAreaAcres: 160,
        severityScore: 68,
        status: 'Active',
        description: 'Wind shear reaching 58 km/h. Vessel berthing paused at cargo berths.',
        emergencyProtocols: ['Port cargo cranes locked', 'Tugboats on standby'],
        assignedTeams: ['Deendayal Port Trust Emergency Unit'],
        telemetry: { windSpeed: '58 km/h', precipitation: '22 mm/h' }
      }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    centerCoordinates: [10.8505, 76.2711],
    defaultZoom: 7,
    totalMonitoredAreaAcres: 190,
    averageSafetyLevel: 69,
    activeAlertsCount: 5,
    description: 'High-precipitation Western Ghats terrain susceptible to catastrophic mudslides, river swelling, and coastal swell waves.',
    vulnerabilityNotes: 'Severe slope destabilization in Wayanad and Idukki districts during continuous heavy rains.',
    incidents: [
      {
        id: 'inc-ker-1',
        title: 'Wayanad High-Altitude Soil Slip',
        regionId: 'kerala',
        category: 'Landslide',
        riskLevel: 'High Risk',
        locationName: 'Meppadi - Chooralmala Basin',
        coordinates: [11.5518, 76.1265],
        timestamp: '8 mins ago',
        affectedPopulation: '14,200',
        affectedAreaAcres: 75,
        severityScore: 91,
        status: 'Active',
        description: 'Rainfall exceeded 180mm in 12 hours. Piezometer soil pore pressure sensors triggered red alert limit in tea estate slopes.',
        emergencyProtocols: ['Red zone evacuation triggered', 'Indian Army Madras Regiment standby', 'Rescue drones airborne'],
        assignedTeams: ['Kerala Fire & Rescue Special Task Force', 'NDRF Unit 2', 'District Emergency Operations Center'],
        telemetry: { precipitation: '184 mm/12h', temperature: '22°C' }
      },
      {
        id: 'inc-ker-2',
        title: 'Periyar River Red Alert Gauge',
        regionId: 'kerala',
        category: 'Flood / Inundation',
        riskLevel: 'Medium Risk',
        locationName: 'Aluva Manappuram, Kochi Outskirts',
        coordinates: [10.1076, 76.3516],
        timestamp: '45 mins ago',
        affectedPopulation: '62,000',
        affectedAreaAcres: 80,
        severityScore: 64,
        status: 'Active',
        description: 'Periyar river flowing 1.2m above warning level following regulated spillway opening at Idamalayar reservoir.',
        emergencyProtocols: ['Low-lying residential warnings active', 'Flood barricades deployed at subways'],
        assignedTeams: ['Ernakulam District Disaster Management'],
        telemetry: { waterLevel: '+1.2m above datum', precipitation: '45 mm/h' }
      }
    ]
  },
  {
    id: 'odisha',
    name: 'Odisha',
    country: 'India',
    centerCoordinates: [20.9517, 85.0985],
    defaultZoom: 6,
    totalMonitoredAreaAcres: 320,
    averageSafetyLevel: 74,
    activeAlertsCount: 7,
    description: 'Bay of Bengal cyclone gateway with advanced multi-purpose cyclone shelters and flood management networks.',
    vulnerabilityNotes: 'Cyclonic storm surges and Mahanadi delta river floods during depression tracking from Andaman Sea.',
    incidents: [
      {
        id: 'inc-odi-1',
        title: 'Puri Coastal Surge Defense Alert',
        regionId: 'odisha',
        category: 'Cyclone / Storm',
        riskLevel: 'High Risk',
        locationName: 'Puri - Konark Coastline',
        coordinates: [19.8135, 85.8312],
        timestamp: '18 mins ago',
        affectedPopulation: '84,000',
        affectedAreaAcres: 140,
        severityScore: 88,
        status: 'Active',
        description: 'Doppler Radar Gopalpur detects intense spiral rain bands approaching shore at 75 km/h.',
        emergencyProtocols: ['ODRAF cyclone teams deployed', '220 cyclone shelters stocked with dry rations', 'Beach access barricaded'],
        assignedTeams: ['ODRAF Team 1', 'Indian Navy INS Chilka Logistics Support'],
        telemetry: { windSpeed: '78 km/h', precipitation: '95 mm/h' }
      }
    ]
  },
  {
    id: 'assam',
    name: 'Assam',
    country: 'India',
    centerCoordinates: [26.2006, 92.9376],
    defaultZoom: 6,
    totalMonitoredAreaAcres: 310,
    averageSafetyLevel: 65,
    activeAlertsCount: 8,
    description: 'Brahmaputra and Barak river basins subject to massive annual flooding, erosion of island habitats, and flash spates.',
    vulnerabilityNotes: 'Riverbank breach warnings and Majuli island cut-off contingencies.',
    incidents: [
      {
        id: 'inc-asm-1',
        title: 'Brahmaputra Embankment Stress Alert',
        regionId: 'assam',
        category: 'Flood / Inundation',
        riskLevel: 'High Risk',
        locationName: 'Kaziranga Buffer Zone & Tezpur',
        coordinates: [26.6528, 92.7926],
        timestamp: '15 mins ago',
        affectedPopulation: '110,000',
        affectedAreaAcres: 180,
        severityScore: 92,
        status: 'Active',
        description: 'Water discharge at 34,000 cumecs. Water has breached agricultural bunds in Northern bank.',
        emergencyProtocols: ['High-speed rescue inflatable motorboats deployed', 'Animal safe-passage corridors on NH-37 enforced'],
        assignedTeams: ['Assam SDRF Battalion 1', 'Kaziranga Forest Protection Force'],
        telemetry: { waterLevel: 'Above danger mark by 1.85m', precipitation: '65 mm/h' }
      }
    ]
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    country: 'India',
    centerCoordinates: [30.0668, 79.0193],
    defaultZoom: 7,
    totalMonitoredAreaAcres: 140,
    averageSafetyLevel: 71,
    activeAlertsCount: 3,
    description: 'Himalayan fragile ecology with high risk of cloudbursts, glacial lake outbursts (GLOF), and seismic vulnerability.',
    vulnerabilityNotes: 'Flash flood vulnerability along Alaknanda, Mandakini, and Bhagirathi gorge riverbeds.',
    incidents: [
      {
        id: 'inc-uk-1',
        title: 'Chamoli Glacial Moraine Monitoring',
        regionId: 'uttarakhand',
        category: 'Flood / Inundation',
        riskLevel: 'High Risk',
        locationName: 'Rishiganga - Dhauliganga Confluence',
        coordinates: [30.5583, 79.5694],
        timestamp: '50 mins ago',
        affectedPopulation: '8,400',
        affectedAreaAcres: 45,
        severityScore: 79,
        status: 'Active',
        description: 'Satellite thermal radar shows sudden ice-dam melt accumulation. Water discharge velocity increased by 40%.',
        emergencyProtocols: ['Downstream siren grid sounded in Tapovan and Joshimath', 'Hydroelectric plant workers evacuated'],
        assignedTeams: ['ITBP 1st Battalion', 'State Disaster Emergency Cell Joshimath'],
        telemetry: { waterLevel: 'Surge of 3.2m in riverbed', temperature: '9°C' }
      }
    ]
  },
  {
    id: 'california',
    name: 'California',
    country: 'United States',
    centerCoordinates: [36.7783, -119.4179],
    defaultZoom: 5.5,
    totalMonitoredAreaAcres: 950,
    averageSafetyLevel: 78,
    activeAlertsCount: 5,
    description: 'Pacific rim seismic zone along San Andreas fault and high-risk Mediterranean wildland-urban interface fire corridors.',
    vulnerabilityNotes: 'Diablo and Santa Ana wind-driven wildfire hazards and tectonic stress buildup.',
    incidents: [
      {
        id: 'inc-cal-1',
        title: 'Sierra Foothills Wildfire Ignition',
        regionId: 'california',
        category: 'Wildfire',
        riskLevel: 'High Risk',
        locationName: 'Butte County Ridge',
        coordinates: [39.7596, -121.6219],
        timestamp: '22 mins ago',
        affectedPopulation: '26,000',
        affectedAreaAcres: 420,
        severityScore: 89,
        status: 'Active',
        description: 'Red Flag conditions with sustained 45 mph gusting winds. Rapid brush rate of spread of 80 acres/hour.',
        emergencyProtocols: ['Mandatory evacuation Zone 3 & 4', 'CAL FIRE Air Attack Supertankers en route'],
        assignedTeams: ['CAL FIRE Unit 3', 'Butte County Fire Dept', 'CHP Highway Escort'],
        telemetry: { windSpeed: '72 km/h', temperature: '38°C' }
      }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo Bay',
    country: 'Japan',
    centerCoordinates: [35.6762, 139.6503],
    defaultZoom: 8,
    totalMonitoredAreaAcres: 210,
    averageSafetyLevel: 91,
    activeAlertsCount: 2,
    description: 'High-density urban coastline protected by sea barriers, subterranean flood diversion tunnels, and seismic dampers.',
    vulnerabilityNotes: 'Subduction zone earthquake early warnings and typhoon surge deflection.',
    incidents: [
      {
        id: 'inc-tok-1',
        title: 'Sagami Trough Deep Tremor Watch',
        regionId: 'tokyo',
        category: 'Earthquake / Seismic',
        riskLevel: 'Medium Risk',
        locationName: 'Tokyo Bay Outer Trench',
        coordinates: [35.2500, 139.8000],
        timestamp: '1 hour ago',
        affectedPopulation: '180,000',
        affectedAreaAcres: 60,
        severityScore: 54,
        status: 'Active',
        description: 'Ocean-bottom seismograph array detected slow-slip episode with tremor magnitude 3.6.',
        emergencyProtocols: ['Shinkansen train automatic deceleration test ok', 'Underground tsunami gates checked'],
        assignedTeams: ['Tokyo Fire Department Emergency Command', 'JMA Seismic Monitoring Unit'],
        telemetry: { magnitude: '3.6 ML', waterLevel: 'Normal tidal level' }
      }
    ]
  }
];

export const EVACUATION_SHELTERS = [
  {
    id: 'sh-mah-1',
    name: 'Chiplun High School Flood Relief Center',
    regionId: 'maharashtra',
    address: 'Mumbai-Goa Highway Rd, Chiplun, Ratnagiri',
    coordinates: [17.5323, 73.5186] as [number, number],
    totalCapacity: 1200,
    currentOccupancy: 480,
    status: 'Open & Accepting' as const,
    medicalStaffPresent: 8,
    foodWaterDays: 6,
    hasBackupPower: true,
    contactNumber: '+91 2355 252101'
  },
  {
    id: 'sh-mah-2',
    name: 'Patan Taluka Cyclone & Seismic Shelter',
    regionId: 'maharashtra',
    address: 'Near Patan Police Ground, Satara',
    coordinates: [17.3732, 73.9015] as [number, number],
    totalCapacity: 850,
    currentOccupancy: 610,
    status: 'Open & Accepting' as const,
    medicalStaffPresent: 5,
    foodWaterDays: 4,
    hasBackupPower: true,
    contactNumber: '+91 2162 230440'
  },
  {
    id: 'sh-mah-3',
    name: 'Alibaug Coastal High-Elevation Hall',
    regionId: 'maharashtra',
    address: 'Raigad Coastal Sector 2, Alibaug',
    coordinates: [18.6414, 72.8722] as [number, number],
    totalCapacity: 2000,
    currentOccupancy: 1820,
    status: 'Near Capacity' as const,
    medicalStaffPresent: 12,
    foodWaterDays: 5,
    hasBackupPower: true,
    contactNumber: '+91 2141 222001'
  },
  {
    id: 'sh-mah-4',
    name: 'Chandrapur Thermal Heatwave Respite Center',
    regionId: 'maharashtra',
    address: 'Civil Lines Sports Complex, Chandrapur',
    coordinates: [19.9615, 79.2961] as [number, number],
    totalCapacity: 600,
    currentOccupancy: 190,
    status: 'Open & Accepting' as const,
    medicalStaffPresent: 6,
    foodWaterDays: 10,
    hasBackupPower: true,
    contactNumber: '+91 7172 251120'
  },
  {
    id: 'sh-guj-1',
    name: 'Bhuj Multi-Hazard Refuge Center',
    regionId: 'gujarat',
    address: 'Station Road, Jubilee Ground, Bhuj',
    coordinates: [23.2420, 69.6669] as [number, number],
    totalCapacity: 1500,
    currentOccupancy: 320,
    status: 'Open & Accepting' as const,
    medicalStaffPresent: 10,
    foodWaterDays: 8,
    hasBackupPower: true,
    contactNumber: '+91 2832 250080'
  },
  {
    id: 'sh-ker-1',
    name: 'Meppadi Community Plantation Shelter',
    regionId: 'kerala',
    address: 'Chooralmala Bypass, Wayanad',
    coordinates: [11.5518, 76.1265] as [number, number],
    totalCapacity: 900,
    currentOccupancy: 840,
    status: 'Near Capacity' as const,
    medicalStaffPresent: 9,
    foodWaterDays: 3,
    hasBackupPower: true,
    contactNumber: '+91 4936 202234'
  }
];

export const RESPONSE_UNITS = [
  {
    id: 'unit-ndrf-5',
    name: 'NDRF 5th Battalion Rapid Team Alpha',
    branch: 'NDRF' as const,
    regionId: 'maharashtra',
    baseStation: 'Sudumbare Base, Pune',
    personnelCount: 45,
    status: 'Deployed' as const,
    equipment: ['Inflatable Zodiac Boats (6)', 'Collapsed Structure Search RADAR', 'Deep Dive Gear', 'Chainsaws'],
    assignedIncidentTitle: 'Koyna Valley Seismic Watch',
    etaMinutes: 24
  },
  {
    id: 'unit-sdrf-satara',
    name: 'SDRF Satara Flood & Landslide Company',
    branch: 'SDRF' as const,
    regionId: 'maharashtra',
    baseStation: 'Satara District HQ',
    personnelCount: 30,
    status: 'Deployed' as const,
    equipment: ['Hydraulic Earth Movers', 'Mudslide Pumping Sets', 'Emergency Tents'],
    assignedIncidentTitle: 'Bhimashankar Ghat Landslide Watch',
    etaMinutes: 15
  },
  {
    id: 'unit-icg-ratnagiri',
    name: 'ICGS Subhadra Coastal Hovercraft Unit',
    branch: 'Coast Guard' as const,
    regionId: 'maharashtra',
    baseStation: 'Ratnagiri Coast Guard Base',
    personnelCount: 18,
    status: 'Deployed' as const,
    equipment: ['High-Speed All-Terrain Hovercraft (2)', 'Life Rafts', 'Satellite EPIRB Trackers'],
    assignedIncidentTitle: 'Ratnagiri Coastal Inundation Risk',
    etaMinutes: 10
  },
  {
    id: 'unit-fire-pune',
    name: 'Maharashtra Fire & Rescue Task Force 2',
    branch: 'Fire Service' as const,
    regionId: 'maharashtra',
    baseStation: 'Bhawani Peth Central, Pune',
    personnelCount: 24,
    status: 'Available' as const,
    equipment: ['High-Pressure Water Bowsers', 'Aerial Ladder Platforms', 'Rescue Cutters'],
  },
  {
    id: 'unit-air-mumbai',
    name: 'Indian Air Force Mi-17V5 SAR Detachment',
    branch: 'Aviation Squad' as const,
    regionId: 'maharashtra',
    baseStation: 'Colaba Helipad / Lohegaon AFS',
    personnelCount: 12,
    status: 'Standby' as const,
    equipment: ['FLIR Thermal Camera', 'Bambi Buckets (4000L)', 'Winch Rescue Harnesses'],
  },
  {
    id: 'unit-med-nagpur',
    name: 'Disaster Mobile Trauma & Surgical Hospital',
    branch: 'Medical Wing' as const,
    regionId: 'maharashtra',
    baseStation: 'Government Medical College, Nagpur',
    personnelCount: 22,
    status: 'Deployed' as const,
    equipment: ['Mobile ICU Van', 'Oxygen Concentrators (40)', 'ORS & Anti-Venom Kits'],
    assignedIncidentTitle: 'Vidarbha Basin Severe Heatwave',
    etaMinutes: 30
  }
];

export const CITIZEN_SOS_CALLS = [
  {
    id: 'sos-101',
    citizenName: 'Sunita Patil',
    phoneNumber: '+91 98231 44520',
    regionId: 'maharashtra',
    locationName: 'Patan Lowlands, Ward 3, Satara',
    coordinates: [17.3820, 73.8920] as [number, number],
    reportedTime: '7 mins ago',
    urgency: 'Water Trapped' as const,
    peopleCount: 5,
    status: 'Pending Triage' as const,
    notes: 'Elderly person with pacemaker trapped on first floor terrace due to flash runoff.'
  },
  {
    id: 'sos-102',
    citizenName: 'Ganesh Kadam',
    phoneNumber: '+91 97665 12099',
    regionId: 'maharashtra',
    locationName: 'Mirya Port Fishermen Colony, Ratnagiri',
    coordinates: [16.9950, 73.3080] as [number, number],
    reportedTime: '18 mins ago',
    urgency: 'Life Threatening' as const,
    peopleCount: 8,
    status: 'Unit Dispatched' as const,
    notes: 'Tidal wave breached sea wall. 2 fishing vessels grounded near dwelling.',
    assignedUnitId: 'unit-icg-ratnagiri'
  },
  {
    id: 'sos-103',
    citizenName: 'Dr. Ramesh Kulkarni',
    phoneNumber: '+91 94220 88134',
    regionId: 'maharashtra',
    locationName: 'Primary Health Sub-center, Koynanagar',
    coordinates: [17.4010, 73.7460] as [number, number],
    reportedTime: '32 mins ago',
    urgency: 'Medical Emergency' as const,
    peopleCount: 14,
    status: 'Unit Dispatched' as const,
    notes: 'Backup generator failure following seismic tremor. Requires auxiliary diesel generator.',
    assignedUnitId: 'unit-ndrf-5'
  },
  {
    id: 'sos-104',
    citizenName: 'Pravin Jadhav',
    phoneNumber: '+91 91580 34912',
    regionId: 'maharashtra',
    locationName: 'Khandala Ghat Tunnel Approach',
    coordinates: [18.7510, 73.4050] as [number, number],
    reportedTime: '45 mins ago',
    urgency: 'Food / Water Depleted' as const,
    peopleCount: 22,
    status: 'Pending Triage' as const,
    notes: 'Tourist bus halted behind boulder fall. Stranded for 3 hours, water needed.'
  }
];

export const ENVIRONMENTAL_SENSORS = [
  {
    id: 'sns-dop-1',
    sensorName: 'IMD Mumbai Doppler Weather Radar (DWR)',
    type: 'Doppler Radar' as const,
    reading: '48 dBZ Reflectivity (Heavy Rain Bands)',
    unit: 'dBZ',
    status: 'Advisory' as const,
    location: 'Veravali Hill, Mumbai',
    lastUpdated: '2 mins ago'
  },
  {
    id: 'sns-dam-1',
    sensorName: 'Koyna Dam Sluice Level Telemetry',
    type: 'River Basin Gauge' as const,
    reading: '682.4 m (Crest: 686.0 m)',
    unit: 'meters',
    status: 'Normal' as const,
    location: 'Koyna Hydro Project',
    lastUpdated: '1 min ago'
  },
  {
    id: 'sns-seis-1',
    sensorName: 'National Seismological Network Array Koyna',
    type: 'Borehole Seismometer' as const,
    reading: 'M3.2 Depth 6.4 km',
    unit: 'Magnitude',
    status: 'Critical Alert' as const,
    location: 'Patan Borehole Observatory',
    lastUpdated: '12 mins ago'
  },
  {
    id: 'sns-tide-1',
    sensorName: 'Survey of India Coastal Acoustic Tide Gauge',
    type: 'Tide Gauge' as const,
    reading: '+3.9 m Tide Above Chart Datum',
    unit: 'meters',
    status: 'Critical Alert' as const,
    location: 'Ratnagiri Port Pier 1',
    lastUpdated: '4 mins ago'
  },
  {
    id: 'sns-soil-1',
    sensorName: 'Sahyadri Inclinometer & Pore Pressure Array',
    type: 'Soil Inclinometer' as const,
    reading: '88% Saturation, 1.4 mm/hr creep',
    unit: 'creep rate',
    status: 'Advisory' as const,
    location: 'Bhor Ghat Pass Retaining Wall',
    lastUpdated: '8 mins ago'
  }
];
