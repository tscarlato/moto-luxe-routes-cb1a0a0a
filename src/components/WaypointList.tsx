import React from 'react';
import { MapPin, X, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';

interface Waypoint {
  id: string;
  order: number;
  address: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface WaypointListProps {
  waypoints: Waypoint[];
  onRemoveWaypoint: (id: string) => void;
}

const WaypointList: React.FC<WaypointListProps> = ({ waypoints, onRemoveWaypoint }) => {
  if (waypoints.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-serif font-normal text-foreground">
          Route Stops
        </h3>
        <span className="text-sm text-muted-foreground">
          {waypoints.length} waypoint{waypoints.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-2">
        {waypoints.map((waypoint) => (
          <div
            key={waypoint.id}
            className="group flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all border border-border/30"
          >
            {/* Waypoint Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-medium text-sm shadow-sm">
              {waypoint.order}
            </div>

            {/* Waypoint Details */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground leading-tight mb-1">
                {waypoint.address}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {waypoint.position.lat.toFixed(4)}, {waypoint.position.lng.toFixed(4)}
              </p>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveWaypoint(waypoint.id)}
              className="flex-shrink-0 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              aria-label={`Remove waypoint ${waypoint.order}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {waypoints.length === 1 && (
        <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs text-foreground">
            Add one more waypoint to calculate your route
          </p>
        </div>
      )}
    </div>
  );
};

export default WaypointList;
