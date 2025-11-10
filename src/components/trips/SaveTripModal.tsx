import React, { useState, useEffect } from 'react';
import { useTrips } from '@/contexts/TripContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Trip, Waypoint, TripSettings } from '@/services/tripService';

interface SaveTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  waypoints: Waypoint[];
  settings: TripSettings;
  route: any;
  existingTrip?: Trip | null;
}

export const SaveTripModal: React.FC<SaveTripModalProps> = ({
  isOpen,
  onClose,
  waypoints,
  settings,
  route,
  existingTrip,
}) => {
  const { saveTrip, updateCurrentTrip } = useTrips();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Pre-fill form when editing existing trip
  useEffect(() => {
    if (existingTrip) {
      setName(existingTrip.name || '');
      setDescription(existingTrip.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [existingTrip, isOpen]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a trip name');
      return;
    }

    if (name.length > 100) {
      toast.error('Trip name must be less than 100 characters');
      return;
    }

    if (description.length > 500) {
      toast.error('Description must be less than 500 characters');
      return;
    }

    try {
      setLoading(true);

      if (existingTrip?.id) {
        // Update existing trip
        await updateCurrentTrip({
          name: name.trim(),
          description: description.trim(),
          waypoints,
          settings,
          metrics: route ? {
            totalDistance: route.totalDistance || 0,
            totalDuration: route.totalDuration || 0,
            legs: route.legs?.length || 0,
          } : undefined,
        });
        toast.success('Trip updated successfully!');
      } else {
        // Save new trip
        await saveTrip(name.trim(), description.trim(), waypoints, settings, route);
        toast.success('Trip saved successfully!');
      }

      onClose();
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !loading) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {existingTrip?.id ? 'Update Trip' : 'Save Trip'}
          </DialogTitle>
          <DialogDescription>
            Give your trip a name and optional description to remember it by.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="trip-name">Trip Name *</Label>
            <Input
              id="trip-name"
              placeholder="e.g., Blue Ridge Parkway Adventure"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {name.length}/100 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trip-description">Description (optional)</Label>
            <Textarea
              id="trip-description"
              placeholder="Add notes about your trip..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={500}
              rows={4}
            />
            <p className="text-xs text-muted-foreground text-right">
              {description.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || !name.trim()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              existingTrip?.id ? 'Update' : 'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
