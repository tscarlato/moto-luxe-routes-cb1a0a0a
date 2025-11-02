import React from 'react';
import { MapPin, Map, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  type?: 'waypoints' | 'route';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type = 'waypoints' }) => {
  if (type === 'waypoints') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <MapPin className="h-10 w-10 text-accent" />
        </div>
        <h3 className="text-lg font-serif font-normal text-foreground mb-2">
          No Waypoints Yet
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xs">
          Click on the map or use the search box above to add your first waypoint
        </p>
        <div className="glass-panel p-4 rounded-lg inline-flex items-start gap-3 text-left max-w-xs">
          <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">
              Pro Tip
            </p>
            <p className="text-xs text-muted-foreground">
              Add at least 2 waypoints to calculate your route and see trip metrics
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'route') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Map className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-normal text-foreground mb-2">
          Route Not Calculated
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Add at least 2 waypoints to calculate your route
        </p>
      </div>
    );
  }

  return null;
};

export default EmptyState;
