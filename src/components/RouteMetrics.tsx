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
      <div className="flex flex-col items-center justify-center py-10 md:py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-2 border-accent/20 border-t-accent" />
          <div className="absolute inset-0 rounded-full border-2 border-accent/10" />
        </div>
        <p className="text-xs md:text-sm text-muted-foreground mt-4 font-medium">Calculating route...</p>
      </div>
    );
  }

  if (!route || !route.legs || route.legs.length === 0) {
    return null;
  }

  const { legs, totals } = route;

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Total Metrics */}
      <CardPremium className="border-accent/20 shadow-elegant">
        <CardPremiumHeader className="pb-3">
          <CardPremiumTitle className="text-xl md:text-2xl">Journey Overview</CardPremiumTitle>
        </CardPremiumHeader>
        <CardPremiumContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Route className="h-4 w-4" />
                <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Distance</span>
              </div>
              <p className="text-xl md:text-2xl font-serif font-normal text-foreground tracking-tight">
                {totals.distance}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Duration</span>
              </div>
              <p className="text-xl md:text-2xl font-serif font-normal text-foreground tracking-tight">
                {totals.duration}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Navigation className="h-4 w-4" />
                <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold">Segments</span>
              </div>
              <span className="text-base md:text-lg font-serif font-normal text-foreground">
                {legs.length}
              </span>
            </div>
          </div>
        </CardPremiumContent>
      </CardPremium>

      {/* Per-Leg Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Segment Details
        </h3>
        
        {legs.map((leg: any, index: number) => (
          <div key={index}>
            <CardPremium className="hover:shadow-elevated transition-shadow">
              <CardPremiumContent className="p-3 md:p-4">
                <div className="flex items-start gap-2.5 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0 ring-1 ring-accent/20">
                    <span className="text-xs md:text-sm font-bold text-accent">
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3">
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Distance</p>
                        <p className="text-xs md:text-sm font-semibold text-foreground">
                          {leg.distance}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Duration</p>
                        <p className="text-xs md:text-sm font-semibold text-foreground">
                          {leg.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 font-medium">From</p>
                        <p className="text-[11px] md:text-xs text-foreground leading-snug line-clamp-2">
                          {leg.startAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 font-medium">To</p>
                        <p className="text-[11px] md:text-xs text-foreground leading-snug line-clamp-2">
                          {leg.endAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardPremiumContent>
            </CardPremium>
            
            {/* Connection arrow */}
            {index < legs.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-0.5 h-3 md:h-4 bg-gradient-to-b from-accent/40 to-accent/10 rounded-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMetrics;
