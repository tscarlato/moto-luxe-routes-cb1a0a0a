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
    <div className="space-y-3">
      <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Route ({waypoints.length})
      </h3>
      
      <div className="space-y-2.5">
        {waypoints.map((waypoint, index) => (
          <div
            key={waypoint.id}
            className="group relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg p-3 md:p-4 border border-border/40 hover:border-accent/60 hover:shadow-md transition-all duration-250"
          >
            {/* Waypoint Number Badge */}
            <div className="absolute -left-2.5 md:-left-3 top-3 md:top-4 w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs md:text-sm font-bold shadow-elegant ring-2 ring-background">
              {waypoint.order}
            </div>
            
            <div className="pl-6 md:pl-7 pr-9 md:pr-10">
              {/* Address */}
              <p className="text-xs md:text-sm font-medium text-foreground mb-1 leading-snug line-clamp-2">
                {waypoint.address}
              </p>
              
              {/* Coordinates */}
              <p className="text-[10px] md:text-xs text-muted-foreground font-mono tracking-tight">
                {waypoint.position.lat.toFixed(4)}, {waypoint.position.lng.toFixed(4)}
              </p>
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveWaypoint(waypoint.id)}
              className="absolute right-1.5 md:right-2 top-2.5 md:top-3 h-6 w-6 md:h-7 md:w-7 p-0 opacity-60 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive/10 hover:text-destructive"
              aria-label={`Remove waypoint ${waypoint.order}`}
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>

            {/* Connection Line to Next Waypoint */}
            {index < waypoints.length - 1 && (
              <div className="absolute -bottom-2.5 left-0 w-6 md:w-7 flex justify-center">
                <div className="w-0.5 h-2.5 bg-gradient-to-b from-accent/50 to-accent/20" />
              </div>
            )}
          </div>
        ))}
      </div>

      {waypoints.length === 1 && (
        <div className="mt-4 p-3 md:p-4 glass-panel border-primary/30">
          <p className="text-xs md:text-sm text-foreground font-medium leading-relaxed">
            Add another waypoint to plot your journey
          </p>
        </div>
      )}
    </div>
  );
};

export default WaypointList;
