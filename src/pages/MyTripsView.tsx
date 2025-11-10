import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { TripCard } from '@/components/trips/TripCard';
import EmptyState from '@/components/EmptyState';
import Logo from '@/components/Logo';

export default function MyTripsView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { savedTrips, loading } = useTrips();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Map
              </Button>
              <Logo size="sm" />
            </div>
            <Button onClick={() => navigate('/')} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              New Trip
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-normal mb-2">My Trips</h1>
            <p className="text-muted-foreground">
              {savedTrips.length === 0
                ? 'Start planning your first motorcycle route'
                : `${savedTrips.length} saved ${savedTrips.length === 1 ? 'trip' : 'trips'}`}
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your trips...</p>
              </div>
            </div>
          ) : savedTrips.length === 0 ? (
            <div className="py-12">
              <EmptyState type="trips" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
