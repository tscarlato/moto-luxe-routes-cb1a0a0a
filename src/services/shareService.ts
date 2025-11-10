import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from './firebase';
import { getTrip, saveTrip, Trip } from './tripService';

// Generate a unique share token
export const generateShareToken = (): string => {
  return nanoid(21); // 21 characters provides ~149 bits of entropy
};

// Enable sharing for a trip
export const enableTripSharing = async (tripId: string): Promise<string> => {
  try {
    const shareToken = generateShareToken();

    // Update the trip document with sharing info
    await updateDoc(doc(db, 'trips', tripId), {
      isShared: true,
      shareToken,
      updatedAt: serverTimestamp(),
    });

    // Create a document in sharedTrips collection for easy lookup
    await setDoc(doc(db, 'sharedTrips', shareToken), {
      tripId,
      createdAt: serverTimestamp(),
    });

    console.log('Trip sharing enabled:', tripId, shareToken);
    return shareToken;
  } catch (error) {
    console.error('Error enabling trip sharing:', error);
    throw error;
  }
};

// Disable sharing for a trip
export const disableTripSharing = async (tripId: string): Promise<void> => {
  try {
    // Update the trip document
    await updateDoc(doc(db, 'trips', tripId), {
      isShared: false,
      updatedAt: serverTimestamp(),
    });

    // Note: We intentionally keep the sharedTrips document
    // This prevents token reuse and maintains audit trail
    console.log('Trip sharing disabled:', tripId);
  } catch (error) {
    console.error('Error disabling trip sharing:', error);
    throw error;
  }
};

// Generate a shareable URL
export const generateShareURL = (shareToken: string): string => {
  const origin = window.location.origin;
  return `${origin}/shared/${shareToken}`;
};

// Get a trip by share token
export const getTripByShareToken = async (shareToken: string): Promise<Trip | null> => {
  try {
    // Look up the trip ID from the share token
    const sharedTripDoc = await getDoc(doc(db, 'sharedTrips', shareToken));

    if (!sharedTripDoc.exists()) {
      console.log('Share token not found:', shareToken);
      return null;
    }

    const { tripId } = sharedTripDoc.data();

    // Get the actual trip
    const trip = await getTrip(tripId);

    // Verify the trip is still shared
    if (!trip || !trip.isShared) {
      console.log('Trip not found or no longer shared');
      return null;
    }

    return trip;
  } catch (error) {
    console.error('Error getting trip by share token:', error);
    throw error;
  }
};

// Copy a shared trip to a user's account
export const copySharedTripToAccount = async (
  shareToken: string,
  userId: string
): Promise<string> => {
  try {
    const sharedTrip = await getTripByShareToken(shareToken);

    if (!sharedTrip) {
      throw new Error('Shared trip not found');
    }

    // Create a copy of the trip for the user
    const tripCopy = {
      userId,
      name: `${sharedTrip.name} (Copy)`,
      description: sharedTrip.description,
      waypoints: sharedTrip.waypoints,
      settings: sharedTrip.settings,
      metrics: sharedTrip.metrics,
      isShared: false,
    };

    const newTripId = await saveTrip(tripCopy);
    console.log('Shared trip copied to account:', newTripId);
    return newTripId;
  } catch (error) {
    console.error('Error copying shared trip:', error);
    throw error;
  }
};
