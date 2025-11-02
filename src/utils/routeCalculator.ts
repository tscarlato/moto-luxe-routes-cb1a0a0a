interface Waypoint {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  address: string;
  order: number;
}

interface RouteLeg {
  legNumber: number;
  distance: string;
  duration: string;
  startAddress: string;
  endAddress: string;
  distanceValue: number;
  durationValue: number;
}

interface RouteResult {
  legs: RouteLeg[];
  totals: {
    distance: string;
    duration: string;
    legCount: number;
  };
  overview_polyline: string;
}

export async function calculateRoute(
  waypoints: Waypoint[],
  avoidHighways: boolean
): Promise<RouteResult> {
  if (waypoints.length < 2) {
    throw new Error('At least 2 waypoints are required');
  }

  return new Promise((resolve, reject) => {
    if (!window.google?.maps) {
      reject(new Error('Google Maps not loaded'));
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();

    const origin = waypoints[0].position;
    const destination = waypoints[waypoints.length - 1].position;
    const waypointPositions = waypoints
      .slice(1, -1)
      .map(wp => ({
        location: new window.google.maps.LatLng(wp.position.lat, wp.position.lng),
        stopover: true
      }));

    const request: google.maps.DirectionsRequest = {
      origin: new window.google.maps.LatLng(origin.lat, origin.lng),
      destination: new window.google.maps.LatLng(destination.lat, destination.lng),
      waypoints: waypointPositions,
      travelMode: window.google.maps.TravelMode.DRIVING,
      avoidHighways,
      optimizeWaypoints: false
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK && result) {
        const route = result.routes[0];
        const legs = route.legs;

        // Calculate totals
        let totalDistanceValue = 0;
        let totalDurationValue = 0;

        const routeLegs: RouteLeg[] = legs.map((leg, index) => {
          totalDistanceValue += leg.distance?.value || 0;
          totalDurationValue += leg.duration?.value || 0;

          return {
            legNumber: index + 1,
            distance: leg.distance?.text || 'N/A',
            duration: leg.duration?.text || 'N/A',
            startAddress: leg.start_address,
            endAddress: leg.end_address,
            distanceValue: leg.distance?.value || 0,
            durationValue: leg.duration?.value || 0
          };
        });

        // Format totals
        const totalDistance = formatDistance(totalDistanceValue);
        const totalDuration = formatDuration(totalDurationValue);

        resolve({
          legs: routeLegs,
          totals: {
            distance: totalDistance,
            duration: totalDuration,
            legCount: legs.length
          },
          overview_polyline: route.overview_polyline
        });
      } else {
        reject(new Error(`Failed to calculate route: ${status}`));
      }
    });
  });
}

function formatDistance(meters: number): string {
  const miles = meters / 1609.34;
  return `${miles.toFixed(1)} mi`;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
