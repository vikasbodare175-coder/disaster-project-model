import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../lib/firebase';
import { HazardIncident, CitizenSOSCall, EvacuationShelter, RegionData } from '../types/disaster';
import { REGIONS, CITIZEN_SOS_CALLS, EVACUATION_SHELTERS } from '../data/disasterData';

export function useDisasterFirestore() {
  const [firestoreIncidents, setFirestoreIncidents] = useState<HazardIncident[]>([]);
  const [firestoreSosCalls, setFirestoreSosCalls] = useState<CitizenSOSCall[]>(CITIZEN_SOS_CALLS);
  const [firestoreShelters, setFirestoreShelters] = useState<EvacuationShelter[]>(EVACUATION_SHELTERS);
  const [isConnected, setIsConnected] = useState(false);

  // Subscribe to Firestore Incidents
  useEffect(() => {
    const unsubIncidents = onSnapshot(
      collection(db, 'incidents'),
      (snapshot) => {
        setIsConnected(true);
        const docs: HazardIncident[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          docs.push({
            id: d.id,
            title: data.title || '',
            regionId: data.regionId || 'maharashtra',
            category: data.category || 'Flood / Inundation',
            riskLevel: data.riskLevel || 'High Risk',
            locationName: data.locationName || '',
            coordinates: [data.latitude || 19.75, data.longitude || 75.71],
            timestamp: data.timestamp || 'Live',
            affectedPopulation: data.affectedPopulation || 'Unknown',
            affectedAreaAcres: data.affectedAreaAcres || 50,
            severityScore: data.severityScore || 70,
            status: data.status || 'Active',
            description: data.description || '',
            emergencyProtocols: data.emergencyProtocols || ['Disaster response alert active'],
            assignedTeams: data.assignedTeams || ['State Disaster Response Wing'],
            telemetry: data.telemetry || {},
          });
        });

        if (docs.length > 0) {
          setFirestoreIncidents(docs);
        }
      },
      (error) => {
        console.warn('Firestore incidents listener note:', error);
      }
    );

    // Subscribe to Citizen SOS Calls
    const unsubSos = onSnapshot(
      collection(db, 'sos_calls'),
      (snapshot) => {
        const calls: CitizenSOSCall[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          calls.push({
            id: d.id,
            citizenName: data.citizenName || 'Trapped Resident',
            phoneNumber: data.phoneNumber || '',
            regionId: data.regionId || 'maharashtra',
            locationName: data.locationName || '',
            coordinates: [data.latitude || 18.52, data.longitude || 73.85],
            reportedTime: data.reportedTime || 'Recent',
            urgency: data.urgency || 'Water Trapped',
            peopleCount: data.peopleCount || 1,
            status: data.status || 'Pending Triage',
            notes: data.notes || '',
            assignedUnitId: data.assignedUnitId,
          });
        });

        if (calls.length > 0) {
          setFirestoreSosCalls(calls);
        }
      },
      (error) => {
        console.warn('Firestore SOS listener note:', error);
      }
    );

    return () => {
      unsubIncidents();
      unsubSos();
    };
  }, []);

  // Save new incident to Firestore
  const saveIncidentToFirestore = async (incident: HazardIncident) => {
    try {
      const ref = doc(db, 'incidents', incident.id);
      await setDoc(ref, {
        id: incident.id,
        title: incident.title,
        regionId: incident.regionId,
        category: incident.category,
        riskLevel: incident.riskLevel,
        locationName: incident.locationName,
        latitude: incident.coordinates[0],
        longitude: incident.coordinates[1],
        affectedPopulation: incident.affectedPopulation,
        affectedAreaAcres: incident.affectedAreaAcres,
        severityScore: incident.severityScore,
        status: incident.status,
        description: incident.description,
        timestamp: incident.timestamp,
        createdBy: auth.currentUser?.uid || 'anonymous',
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `incidents/${incident.id}`);
    }
  };

  // Update incident status in Firestore
  const updateIncidentInFirestore = async (incidentId: string, newStatus: string) => {
    try {
      const ref = doc(db, 'incidents', incidentId);
      await updateDoc(ref, {
        status: newStatus,
      });
    } catch (error) {
      console.warn('Could not update Firestore incident:', error);
    }
  };

  // Save new SOS call to Firestore
  const saveSosCallToFirestore = async (sos: CitizenSOSCall) => {
    try {
      const ref = doc(db, 'sos_calls', sos.id);
      await setDoc(ref, {
        id: sos.id,
        citizenName: sos.citizenName,
        phoneNumber: sos.phoneNumber,
        regionId: sos.regionId,
        locationName: sos.locationName,
        latitude: sos.coordinates[0],
        longitude: sos.coordinates[1],
        urgency: sos.urgency,
        peopleCount: sos.peopleCount,
        status: sos.status,
        notes: sos.notes,
        reportedTime: sos.reportedTime,
        createdBy: auth.currentUser?.uid || 'anonymous',
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `sos_calls/${sos.id}`);
    }
  };

  return {
    firestoreIncidents,
    firestoreSosCalls,
    firestoreShelters,
    isConnected,
    saveIncidentToFirestore,
    updateIncidentInFirestore,
    saveSosCallToFirestore,
  };
}
