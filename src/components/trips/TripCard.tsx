import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrips } from '@/contexts/TripContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Route, Share2, Trash2 } from 'lucide-react';
import { Trip } from '@/services/tripService';
import { ShareTripModal } from './ShareTripModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { toast } from 'sonner';

interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const navigate = useNavigate();
  const { deleteTrip, setCurrentTripById } = useTrips();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLoadTrip = () => {
    setCurrentTripById(trip.id!);
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      await deleteTrip(trip.id!);
      toast.success('Trip deleted successfully');
    } catch (error) {
      toast.error('Failed to delete trip');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDistance = (meters: number) => {
    const miles = meters * 0.000621371;
    return `${miles.toFixed(1)} mi`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between">
            <h3
              className="font-serif text-lg font-normal cursor-pointer hover:text-primary"
              onClick={handleLoadTrip}
            >
              {trip.name}
            </h3>
            {trip.isShared && (
              <Badge variant="secondary" className="ml-2">
                <Share2 className="h-3 w-3 mr-1" />
                Shared
              </Badge>
            )}
          </div>
          {trip.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{trip.description}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{trip.waypoints.length} stops</span>
            </div>

            {trip.metrics && (
              <>
                <div className="flex items-center gap-2">
                  <Route className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDistance(trip.metrics.totalDistance)}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDuration(trip.metrics.totalDuration)}</span>
                </div>
              </>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Updated {formatDate(trip.updatedAt)}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={handleLoadTrip} className="flex-1" size="sm">
            Load Trip
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowShareModal(true)}
            title="Share trip"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
            title="Delete trip"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {showShareModal && (
        <ShareTripModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          trip={trip}
        />
      )}

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        tripName={trip.name}
      />
    </>
  );
};
