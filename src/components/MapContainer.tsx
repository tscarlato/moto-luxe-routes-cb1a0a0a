import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { Navigation, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

// Custom map styling for "Rugged Refined" theme
const MAP_STYLES = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{ "color": "#E7D9C7" }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#252015" }]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#F9F7F3" }, { "weight": 2 }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#334D66" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#F9F7F3" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#C46831" }, { "weight": 0.8 }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#A8B5A0" }]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [{ "color": "#D4C4B0" }]
  }
];

const MAP_OPTIONS = {
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  gestureHandling: 'greedy'
};

const ROUTE_POLYLINE_OPTIONS = {
  strokeColor: '#C46831',
  strokeOpacity: 0.9,
  strokeWeight: 4,
  geodesic: true
};

interface MapContainerProps {
  center: any;
  zoom: number;
  waypoints: any[];
  route: any;
  onMapClick: (position: any, address: string) => void;
  avoidHighways: boolean;
  onToggleHighways: () => void;
  onClearAll: () => void;
  isLoaded: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({
  center,
  zoom,
  waypoints,
  route,
  onMapClick,
  avoidHighways,
  onToggleHighways,
  onClearAll,
  isLoaded
}) => {
  const [, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Handle map load
  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  // Handle map unmount
  const onUnmount = useCallback(() => {
    setMap(null);
    mapRef.current = null;
  }, []);

  // Handle map click to add waypoint
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Reverse geocode to get address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        onMapClick({ lat, lng }, results[0].formatted_address);
      } else {
        // Fallback to coordinates if geocoding fails
        onMapClick({ lat, lng }, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    });
  }, [onMapClick]);

  // Decode polyline for route display
  const getRoutePath = () => {
    if (!route || !route.overview_polyline || !isLoaded) return [];

    // Use Google Maps geometry library to decode
    if (!window.google?.maps?.geometry?.encoding) {
      console.warn('Google Maps Geometry library not loaded');
      return [];
    }

    try {
      const path = window.google.maps.geometry.encoding.decodePath(
        route.overview_polyline
      );
      return path.map((point: any) => ({
        lat: point.lat(),
        lng: point.lng()
      }));
    } catch (error) {
      console.error('Error decoding polyline:', error);
      return [];
    }
  };

  // Custom marker icon
  const getMarkerIcon = (order: number) => {
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: '#C46831',
      fillOpacity: 1,
      strokeColor: '#F9F7F3',
      strokeWeight: 3,
      scale: 12,
      labelOrigin: new window.google.maps.Point(0, 0)
    };
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={MAP_OPTIONS}
      >
        {/* Waypoint markers */}
        {waypoints.map((waypoint) => (
          <Marker
            key={waypoint.id}
            position={waypoint.position}
            icon={getMarkerIcon(waypoint.order)}
            label={{
              text: waypoint.order.toString(),
              color: '#F9F7F3',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            title={waypoint.address}
          />
        ))}

        {/* Route polyline */}
        {route && (
          <Polyline
            path={getRoutePath()}
            options={ROUTE_POLYLINE_OPTIONS}
          />
        )}
      </GoogleMap>

      {/* Map Controls Overlay */}
      <div className="absolute top-6 left-6 glass-panel p-4 rounded-lg shadow-elegant">
        <div className="flex items-center gap-3">
          <Navigation className="h-5 w-5 text-accent" />
          <div className="flex items-center gap-2">
            <Switch
              id="avoid-highways"
              checked={avoidHighways}
              onCheckedChange={onToggleHighways}
            />
            <Label htmlFor="avoid-highways" className="text-sm font-medium cursor-pointer">
              Avoid Highways
            </Label>
          </div>
        </div>
      </div>

      {/* Info overlay */}
      {waypoints.length === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-lg shadow-elegant">
          <p className="text-sm text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            Click anywhere on the map to add your first waypoint
          </p>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
