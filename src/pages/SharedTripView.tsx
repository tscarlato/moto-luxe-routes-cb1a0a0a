import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import MapContainer from '@/components/MapContainer';
import WaypointList from '@/components/WaypointList';
import RouteMetrics from '@/components/RouteMetrics';
import Logo from '@/components/Logo';
import { DEFAULT_CENTER, DEFAULT_ZOOM, GOOGLE_MAPS_LIBRARIES } from '@/utils/mapConfig';
import { getTripByShareToken, copySharedTripToAccount } from '@/services/shareService';
import { Trip } from '@/services/tripService';
import { toast } from 'sonner';
import { calculateRoute } from '@/utils/routeCalculator';

export default function SharedTripView() {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loadUserTrips } = useTrips();

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [trip, setTrip] = useState<Trip | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load shared trip
  useEffect(() => {
    const loadTrip = async () => {
      if (!shareToken) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const sharedTrip = await getTripByShareToken(shareToken);

        if (!sharedTrip) {
          setError('Trip not found or no longer shared');
          setLoading(false);
          return;
        }

        setTrip(sharedTrip);

        // Calculate route
        if (sharedTrip.waypoints.length >= 2) {
          try {
            const routeResult = await calculateRoute(
              sharedTrip.waypoints,
              sharedTrip.settings.avoidHighways
            );
            setRoute(routeResult);
          } catch (error) {
            console.error('Error calculating route:', error);
          }
        }
      } catch (error) {
        console.error('Error loading shared trip:', error);
        setError('Failed to load trip');
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [shareToken]);

  const handleCopyToAccount = async () => {
    if (!user) {
      toast.error('Please sign in to save this trip');
      return;
    }

    if (!shareToken) return;

    try {
      setCopying(true);
      await copySharedTripToAccount(shareToken, user.uid);
      await loadUserTrips();
      toast.success('Trip copied to your account!');
      navigate('/trips');
    } catch (error) {
      console.error('Error copying trip:', error);
      toast.error('Failed to copy trip');
    } finally {
      setCopying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading shared trip...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-md p-8">
          <h2 className="text-2xl font-serif text-foreground mb-4">Trip Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || 'This trip may have been deleted or is no longer shared.'}
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-sm z-50">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Logo size="sm" />
          </div>
          {user && (
            <Button onClick={handleCopyToAccount} disabled={copying} size="sm" className="gap-2">
              {copying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save to My Trips
                </>
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full">
          <MapContainer
            center={trip.waypoints[0]?.position || DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            waypoints={trip.waypoints}
            route={route}
            onMapClick={() => {}} // Read-only
            avoidHighways={trip.settings.avoidHighways}
            onToggleHighways={() => {}} // Read-only
            onClearAll={() => {}} // Read-only
            isLoaded={isLoaded}
            readOnly={true}
          />
        </div>

        {/* Side Panel */}
        <aside className="w-full md:w-[420px] lg:w-[480px] bg-card border-t md:border-t-0 md:border-l border-border/50 flex flex-col overflow-hidden shadow-elegant order-1 md:order-2 h-1/2 md:h-full">
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-border/50 bg-gradient-to-b from-muted/20 to-transparent">
            <h2 className="text-xl font-serif font-normal text-foreground mb-2">
              {trip.name}
            </h2>
            {trip.description && (
              <p className="text-sm text-muted-foreground">{trip.description}</p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6 space-y-4 md:space-y-6">
            <WaypointList waypoints={trip.waypoints} onRemoveWaypoint={() => {}} readOnly={true} />

            {trip.waypoints.length >= 2 && (
              <RouteMetrics route={route} isCalculating={false} />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
