import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  Trip,
  saveTrip as saveTripToDb,
  getTrip,
  getUserTrips,
  updateTrip as updateTripInDb,
  deleteTrip as deleteTripFromDb,
  createTripFromMapState,
  Waypoint,
  TripSettings,
} from '../services/tripService';

interface TripContextType {
  currentTrip: Trip | null;
  savedTrips: Trip[];
  loading: boolean;
  error: string | null;
  saveTrip: (name: string, description: string, waypoints: Waypoint[], settings: TripSettings, route: any) => Promise<string>;
  updateCurrentTrip: (updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (tripId: string) => Promise<void>;
  loadTrip: (tripId: string) => Promise<void>;
  setCurrentTripById: (tripId: string) => void;
  clearCurrentTrip: () => void;
  loadUserTrips: () => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTrips = (): TripContextType => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user's trips when they log in
  useEffect(() => {
    if (user) {
      loadUserTrips();
    } else {
      // Clear trips when user logs out
      setSavedTrips([]);
      setCurrentTrip(null);
    }
  }, [user]);

  // Load all trips for the current user
  const loadUserTrips = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const trips = await getUserTrips(user.uid);
      setSavedTrips(trips);
    } catch (error: any) {
      console.error('Error loading user trips:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save a new trip
  const saveTrip = async (
    name: string,
    description: string,
    waypoints: Waypoint[],
    settings: TripSettings,
    route: any
  ): Promise<string> => {
    if (!user) {
      throw new Error('User must be logged in to save trips');
    }

    try {
      setLoading(true);
      setError(null);

      const tripData = createTripFromMapState(
        user.uid,
        name,
        description,
        waypoints,
        settings,
        route
      );

      const tripId = await saveTripToDb(tripData);

      // Reload trips list
      await loadUserTrips();

      // Set as current trip
      const savedTrip = await getTrip(tripId);
      if (savedTrip) {
        setCurrentTrip(savedTrip);
      }

      return tripId;
    } catch (error: any) {
      console.error('Error saving trip:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update the current trip
  const updateCurrentTrip = async (updates: Partial<Trip>) => {
    if (!currentTrip || !currentTrip.id) {
      throw new Error('No current trip to update');
    }

    try {
      setLoading(true);
      setError(null);

      await updateTripInDb(currentTrip.id, updates);

      // Update local state
      setCurrentTrip({
        ...currentTrip,
        ...updates,
      });

      // Reload trips list
      await loadUserTrips();
    } catch (error: any) {
      console.error('Error updating trip:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete a trip
  const deleteTrip = async (tripId: string) => {
    try {
      setLoading(true);
      setError(null);

      await deleteTripFromDb(tripId);

      // Remove from local state
      setSavedTrips(savedTrips.filter((trip) => trip.id !== tripId));

      // Clear current trip if it was deleted
      if (currentTrip?.id === tripId) {
        setCurrentTrip(null);
      }
    } catch (error: any) {
      console.error('Error deleting trip:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load a specific trip
  const loadTrip = async (tripId: string) => {
    try {
      setLoading(true);
      setError(null);

      const trip = await getTrip(tripId);
      if (trip) {
        setCurrentTrip(trip);
      } else {
        throw new Error('Trip not found');
      }
    } catch (error: any) {
      console.error('Error loading trip:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Set current trip from already loaded trips
  const setCurrentTripById = (tripId: string) => {
    const trip = savedTrips.find((t) => t.id === tripId);
    if (trip) {
      setCurrentTrip(trip);
    }
  };

  // Clear current trip
  const clearCurrentTrip = () => {
    setCurrentTrip(null);
  };

  const value: TripContextType = {
    currentTrip,
    savedTrips,
    loading,
    error,
    saveTrip,
    updateCurrentTrip,
    deleteTrip,
    loadTrip,
    setCurrentTripById,
    clearCurrentTrip,
    loadUserTrips,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};
