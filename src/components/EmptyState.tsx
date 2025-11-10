import React from 'react';
import { MapPin, Map, Lightbulb, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  type?: 'waypoints' | 'route' | 'trips';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type = 'waypoints' }) => {
  if (type === 'waypoints') {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-5 md:mb-6 ring-1 ring-accent/10">
          <MapPin className="h-8 w-8 md:h-10 md:w-10 text-accent" />
        </div>
        <h3 className="text-base md:text-lg font-serif font-normal text-foreground mb-2">
          Begin Your Journey
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6 max-w-xs leading-relaxed">
          Click the map or search above to mark your first waypoint
        </p>
        <div className="glass-panel p-3 md:p-4 rounded-lg inline-flex items-start gap-2.5 md:gap-3 text-left max-w-xs border border-accent/20">
          <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-foreground tracking-tight">
              Quick Start
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
              Add 2+ waypoints to plot your route and view journey metrics
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'route') {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 md:mb-6 ring-1 ring-primary/10">
          <Map className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </div>
        <h3 className="text-base md:text-lg font-serif font-normal text-foreground mb-2">
          Route Awaiting
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground max-w-xs leading-relaxed">
          Add waypoints to chart your course
        </p>
      </div>
    );
  }

  if (type === 'trips') {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 md:mb-6 ring-1 ring-primary/10">
          <FolderOpen className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </div>
        <h3 className="text-base md:text-lg font-serif font-normal text-foreground mb-2">
          No Saved Trips Yet
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mb-5 md:mb-6 max-w-xs leading-relaxed">
          Start planning your first motorcycle route on the map
        </p>
        <div className="glass-panel p-3 md:p-4 rounded-lg inline-flex items-start gap-2.5 md:gap-3 text-left max-w-xs border border-primary/20">
          <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-semibold text-foreground tracking-tight">
              Getting Started
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
              Create routes on the map, then save them to access later and share with others
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmptyState;
