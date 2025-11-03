import React, { useState, useCallback, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import MapContainer from '../components/MapContainer';
import SearchBox from '../components/SearchBox';
import WaypointList from '../components/WaypointList';
import RouteMetrics from '../components/RouteMetrics';
import EmptyState from '../components/EmptyState';
import Logo from '../components/Logo';
import { DEFAULT_CENTER, DEFAULT_ZOOM, GOOGLE_MAPS_LIBRARIES } from '../utils/mapConfig';
import { calculateRoute } from '../utils/routeCalculator';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';

function MapPage() {
  // Load Google Maps API - use environment variable or empty string
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 
                 (typeof process !== 'undefined' && process.env?.REACT_APP_GOOGLE_MAPS_API_KEY) || '';
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAPS_LIBRARIES
  });

  // State management
  const [waypoints, setWaypoints] = useState<any[]>([]);
  const [route, setRoute] = useState<any>(null);
  const [mapSettings, setMapSettings] = useState({
    avoidHighways: true,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM
  });
  const [ui, setUi] = useState({
    isCalculating: false,
    error: null as string | null
  });

  // Waypoint management functions
  const addWaypoint = useCallback((position: any, address: string) => {
    const newWaypoint = {
      id: Date.now().toString(),
      position,
      address,
      order: waypoints.length + 1
    };
    setWaypoints(prev => [...prev, newWaypoint]);
  }, [waypoints.length]);

  const removeWaypoint = useCallback((id: string) => {
    setWaypoints(prev => {
      const filtered = prev.filter(wp => wp.id !== id);
      // Renumber waypoints after removal
      return filtered.map((wp, index) => ({
        ...wp,
        order: index + 1
      }));
    });
  }, []);

  const clearAllWaypoints = useCallback(() => {
    setWaypoints([]);
    setRoute(null);
    setUi(prev => ({ ...prev, error: null }));
  }, []);

  // Route calculation
  useEffect(() => {
    if (waypoints.length < 2) {
      setRoute(null);
      return;
    }

    const calculate = async () => {
      setUi(prev => ({ ...prev, isCalculating: true, error: null }));

      try {
        const routeResult = await calculateRoute(
          waypoints,
          mapSettings.avoidHighways
        );
        setRoute(routeResult);
        setUi(prev => ({ ...prev, isCalculating: false }));
      } catch (error: any) {
        console.error('Route calculation error:', error);
        setUi({
          isCalculating: false,
          error: error.message || 'Failed to calculate route'
        });
      }
    };

    calculate();
  }, [waypoints, mapSettings.avoidHighways]);

  // Toggle highways
  const toggleHighways = useCallback(() => {
    setMapSettings(prev => ({
      ...prev,
      avoidHighways: !prev.avoidHighways
    }));
  }, []);

  // Error state
  if (loadError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center p-8">
          <h2 className="text-2xl font-serif text-destructive mb-4">Map Loading Error</h2>
          <p className="text-muted-foreground">{loadError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-sm z-50">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <Logo size="md" />
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-xs md:text-sm text-muted-foreground hidden sm:block font-medium tracking-wide">
              Route Planner
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Map Container */}
        <div className="flex-1 relative order-2 md:order-1 h-1/2 md:h-full">
          <MapContainer
            center={mapSettings.center}
            zoom={mapSettings.zoom}
            waypoints={waypoints}
            route={route}
            onMapClick={addWaypoint}
            avoidHighways={mapSettings.avoidHighways}
            onToggleHighways={toggleHighways}
            onClearAll={clearAllWaypoints}
            isLoaded={isLoaded}
          />
        </div>

        {/* Side Panel */}
        <aside className="w-full md:w-[420px] lg:w-[480px] bg-card border-t md:border-t-0 md:border-l border-border/50 flex flex-col overflow-hidden shadow-elegant order-1 md:order-2 h-1/2 md:h-full">
          {/* Panel Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-border/50 bg-gradient-to-b from-muted/20 to-transparent">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-serif font-normal text-foreground tracking-tight">
                Plan Your Route
              </h2>
              {waypoints.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllWaypoints}
                  className="text-muted-foreground hover:text-destructive transition-colors h-8 px-2 md:px-3"
                >
                  <X className="h-3.5 w-3.5 md:h-4 md:w-4 md:mr-1" />
                  <span className="hidden md:inline">Clear</span>
                </Button>
              )}
            </div>
            <SearchBox onPlaceSelected={addWaypoint} isLoaded={isLoaded} />
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {waypoints.length === 0 ? (
              <EmptyState type="waypoints" />
            ) : (
              <div className="space-y-4 md:space-y-6 p-4 md:p-6">
                <WaypointList
                  waypoints={waypoints}
                  onRemoveWaypoint={removeWaypoint}
                />
                
                {ui.error && (
                  <div className="p-3 md:p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-xs md:text-sm text-destructive font-medium">{ui.error}</p>
                  </div>
                )}

                {waypoints.length >= 2 && (
                  <RouteMetrics route={route} isCalculating={ui.isCalculating} />
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default MapPage;
