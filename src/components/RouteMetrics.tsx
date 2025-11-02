import React from 'react';
import { Route, Clock, Fuel, Navigation } from 'lucide-react';
import { CardPremium, CardPremiumHeader, CardPremiumTitle, CardPremiumContent } from './ui/card-premium';

interface RouteMetricsProps {
  route: any;
  isCalculating: boolean;
}

const RouteMetrics: React.FC<RouteMetricsProps> = ({ route, isCalculating }) => {
  if (isCalculating) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent mb-3"></div>
          <p className="text-sm text-muted-foreground">Calculating route...</p>
        </div>
      </div>
    );
  }

  if (!route || !route.legs || route.legs.length === 0) {
    return null;
  }

  const { legs, totals } = route;

  return (
    <div className="space-y-4">
      {/* Total Metrics */}
      <CardPremium>
        <CardPremiumHeader>
          <CardPremiumTitle>Trip Summary</CardPremiumTitle>
        </CardPremiumHeader>
        <CardPremiumContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Route className="h-3 w-3" />
                <span>Total Distance</span>
              </div>
              <p className="text-2xl font-serif font-normal text-foreground">
                {totals.distance}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Clock className="h-3 w-3" />
                <span>Est. Duration</span>
              </div>
              <p className="text-2xl font-serif font-normal text-foreground">
                {totals.duration}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {totals.legCount} leg{totals.legCount !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Navigation className="h-3 w-3" />
                <span>Ready to ride</span>
              </div>
            </div>
          </div>
        </CardPremiumContent>
      </CardPremium>

      {/* Per-Leg Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Leg Details</h3>
        {legs.map((leg: any) => (
          <div
            key={leg.legNumber}
            className="p-4 rounded-lg bg-muted/30 border border-border/30 space-y-3"
          >
            {/* Leg Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-accent">
                Leg {leg.legNumber}
              </span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Route className="h-3 w-3" />
                  <span>{leg.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{leg.duration}</span>
                </div>
              </div>
            </div>

            {/* Route Visualization */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {leg.legNumber}
                </div>
                <span className="text-foreground/80 line-clamp-1">
                  {leg.startAddress}
                </span>
              </div>
              <div className="ml-3 border-l-2 border-accent/30 pl-5 py-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-accent/50"></div>
                  <span className="text-xs">{leg.distance} • {leg.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {leg.legNumber + 1}
                </div>
                <span className="text-foreground/80 line-clamp-1">
                  {leg.endAddress}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMetrics;
