import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Waypoint {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  order: number;
}

export interface RouteMetrics {
  totalDistance: number;
  totalDuration: number;
  legs: number;
}

export interface TripSettings {
  avoidHighways: boolean;
}

export interface Trip {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  waypoints: Waypoint[];
  settings: TripSettings;
  metrics?: RouteMetrics;
  isShared: boolean;
  shareToken?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Save a new trip
export const saveTrip = async (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'trips'), {
      ...tripData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log('Trip saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving trip:', error);
    throw error;
  }
};

// Get a single trip by ID
export const getTrip = async (tripId: string): Promise<Trip | null> => {
  try {
    const docRef = doc(db, 'trips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Trip;
    } else {
      console.log('No such trip!');
      return null;
    }
  } catch (error) {
    console.error('Error getting trip:', error);
    throw error;
  }
};

// Get all trips for a user
export const getUserTrips = async (userId: string): Promise<Trip[]> => {
  try {
    const q = query(
      collection(db, 'trips'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];

    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data(),
      } as Trip);
    });

    return trips;
  } catch (error) {
    console.error('Error getting user trips:', error);
    throw error;
  }
};

// Update an existing trip
export const updateTrip = async (tripId: string, updates: Partial<Trip>) => {
  try {
    const docRef = doc(db, 'trips', tripId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    console.log('Trip updated:', tripId);
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
};

// Delete a trip
export const deleteTrip = async (tripId: string) => {
  try {
    await deleteDoc(doc(db, 'trips', tripId));
    console.log('Trip deleted:', tripId);
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};

// Helper function to create a trip object from map state
export const createTripFromMapState = (
  userId: string,
  name: string,
  description: string,
  waypoints: Waypoint[],
  settings: TripSettings,
  route: any
): Omit<Trip, 'id' | 'createdAt' | 'updatedAt'> => {
  const tripData: any = {
    userId,
    name,
    description,
    waypoints,
    settings,
    isShared: false,
  };

  // Only include metrics if route is available
  if (route && route.totalDistance !== undefined && route.totalDuration !== undefined) {
    tripData.metrics = {
      totalDistance: route.totalDistance || 0,
      totalDuration: route.totalDuration || 0,
      legs: route.legs?.length || 0,
    };
  }

  return tripData;
};
