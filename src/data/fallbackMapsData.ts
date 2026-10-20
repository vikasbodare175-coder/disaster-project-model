export interface FallbackMapPlace {
  title: string;
  category: string;
  address: string;
  uri: string;
  reviewSnippet: string;
  coordinates: [number, number];
  phone?: string;
}

export const FALLBACK_MAP_PLACES: Record<string, FallbackMapPlace[]> = {
  maharashtra: [
    {
      title: 'King Edward Memorial (KEM) Hospital & Medical College',
      category: 'Tertiary Trauma Center & Disaster ICU',
      address: 'Acharya Donde Marg, Parel, Mumbai, Maharashtra 400012',
      uri: 'https://www.google.com/maps/search/?api=1&query=King+Edward+Memorial+Hospital+Mumbai',
      reviewSnippet: 'Level-1 apex public trauma center with 1,800 beds and specialized 24/7 disaster casualty reception ward.',
      coordinates: [18.9986, 72.8427],
      phone: '+91 22 2410 7000',
    },
    {
      title: 'Ruby Hall Clinic Multi-Speciality Trauma Unit',
      category: 'Emergency Trauma & Cardiac Center',
      address: '40 Sassoon Rd, Sangamvadi, Pune, Maharashtra 411001',
      uri: 'https://www.google.com/maps/search/?api=1&query=Ruby+Hall+Clinic+Pune',
      reviewSnippet: 'Advanced trauma triage with 24-hour stroke/trauma resuscitation units and dedicated air-ambulance coordination.',
      coordinates: [18.5315, 73.8763],
      phone: '+91 20 6645 5100',
    },
    {
      title: 'Civil Hospital Ratnagiri Coastal Trauma Wing',
      category: 'District Emergency Healthcare',
      address: 'Jail Road, Ratnagiri, Maharashtra 415612',
      uri: 'https://www.google.com/maps/search/?api=1&query=Civil+Hospital+Ratnagiri',
      reviewSnippet: 'Primary coastal emergency triage hospital for Arabian Sea cyclone and maritime casualty reception.',
      coordinates: [16.9902, 73.3120],
      phone: '+91 2352 222363',
    },
    {
      title: 'NDRF 5th Battalion Headquarters & Rescue Depot',
      category: 'National Disaster Response Force Base',
      address: 'Sudumbare, Maval Taluka, Pune, Maharashtra 410507',
      uri: 'https://www.google.com/maps/search/?api=1&query=5th+Battalion+NDRF+Sudumbare+Pune',
      reviewSnippet: 'Central mobilization base for water rescue boats, collapsed building search dogs, and CBRN containment teams.',
      coordinates: [18.7180, 73.6820],
      phone: '+91 2114 247000',
    },
    {
      title: 'Indian Coast Guard Station (ICGS) Ratnagiri',
      category: 'Maritime Search & Rescue Station',
      address: 'Mirya Bay Road, Ratnagiri, Maharashtra 415612',
      uri: 'https://www.google.com/maps/search/?api=1&query=Coast+Guard+Station+Ratnagiri',
      reviewSnippet: 'Coastal hovercraft base and offshore all-weather maritime rescue operations coordination center.',
      coordinates: [16.9950, 73.2840],
      phone: '+91 2352 232230',
    },
    {
      title: 'Satara District Civil Hospital & Seismic Response Unit',
      category: 'District Civil Hospital',
      address: 'Sadar Bazar, Satara, Maharashtra 415001',
      uri: 'https://www.google.com/maps/search/?api=1&query=Civil+Hospital+Satara',
      reviewSnippet: 'Designated referral hospital for Koyna valley earthquake casualties and Sahyadri landslide rescue victims.',
      coordinates: [17.6805, 73.9930],
      phone: '+91 2162 234120',
    },
  ],
  gujarat: [
    {
      title: 'Ahmedabad Civil Hospital Trauma Center',
      category: 'Apex Trauma Center',
      address: 'Asarwa, Ahmedabad, Gujarat 380016',
      uri: 'https://www.google.com/maps/search/?api=1&query=Civil+Hospital+Asarwa+Ahmedabad',
      reviewSnippet: 'One of Asia\'s largest emergency hospital complexes with dedicated mass-casualty triage wards.',
      coordinates: [23.0525, 72.5980],
      phone: '+91 79 2268 3721',
    },
    {
      title: 'GK General Hospital Bhuj',
      category: 'Earthquake-Resistant Base Hospital',
      address: 'Lotus Colony, Bhuj, Gujarat 370001',
      uri: 'https://www.google.com/maps/search/?api=1&query=GK+General+Hospital+Bhuj',
      reviewSnippet: 'State-of-the-art base-isolated seismic resistant hospital constructed for high-risk Kutch fault zone.',
      coordinates: [23.2420, 69.6669],
      phone: '+91 2832 246500',
    },
  ],
  kerala: [
    {
      title: 'Government Medical College Kozhikode',
      category: 'Tertiary Medical Center',
      address: 'Medical College Junction, Kozhikode, Kerala 673008',
      uri: 'https://www.google.com/maps/search/?api=1&query=Government+Medical+College+Kozhikode',
      reviewSnippet: 'Lead referral center for North Kerala floods, landslides, and critical emergency intensive care.',
      coordinates: [11.2720, 75.8350],
      phone: '+91 495 235 0216',
    },
  ],
};
