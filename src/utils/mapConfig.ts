// Default map configuration
export const DEFAULT_CENTER = {
  lat: 30.4515,
  lng: -91.1871
};

export const DEFAULT_ZOOM = 8;

export const GOOGLE_MAPS_LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  clickableIcons: false,
  gestureHandling: 'greedy' as const
};

export const ROUTE_POLYLINE_OPTIONS = {
  strokeColor: '#C46831',
  strokeOpacity: 0.9,
  strokeWeight: 4,
  geodesic: true
};

export function getMarkerLabel(order: number) {
  return {
    text: order.toString(),
    color: '#F9F7F3',
    fontSize: '12px',
    fontWeight: 'bold'
  };
}
