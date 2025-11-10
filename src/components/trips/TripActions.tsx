import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTrips } from '@/contexts/TripContext';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { SaveTripModal } from './SaveTripModal';
import { Waypoint, TripSettings } from '@/services/tripService';

interface TripActionsProps {
  waypoints: Waypoint[];
  settings: TripSettings;
  route: any;
}

export const TripActions: React.FC<TripActionsProps> = ({ waypoints, settings, route }) => {
  const { user } = useAuth();
  const { currentTrip } = useTrips();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleSaveClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowSaveModal(true);
    }
  };

  // Only show save button if there are at least 2 waypoints
  if (waypoints.length < 2) {
    return null;
  }

  const buttonText = currentTrip?.id ? 'Save Changes' : 'Save Trip';

  return (
    <>
      <Button
        onClick={handleSaveClick}
        variant="default"
        size="sm"
        className="gap-2"
      >
        <Save className="h-4 w-4" />
        {buttonText}
      </Button>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <SaveTripModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        waypoints={waypoints}
        settings={settings}
        route={route}
        existingTrip={currentTrip}
      />
    </>
  );
};
