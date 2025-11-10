import React, { useState, useEffect } from 'react';
import { useTrips } from '@/contexts/TripContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Copy, Share2 } from 'lucide-react';
import { Trip } from '@/services/tripService';
import {
  enableTripSharing,
  disableTripSharing,
  generateShareURL,
} from '@/services/shareService';

interface ShareTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const ShareTripModal: React.FC<ShareTripModalProps> = ({ isOpen, onClose, trip }) => {
  const { updateCurrentTrip } = useTrips();
  const [isShared, setIsShared] = useState(trip.isShared);
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsShared(trip.isShared);
    if (trip.isShared && trip.shareToken) {
      setShareUrl(generateShareURL(trip.shareToken));
    } else {
      setShareUrl('');
    }
  }, [trip]);

  const handleToggleSharing = async (enabled: boolean) => {
    if (!trip.id) return;

    try {
      setLoading(true);

      if (enabled) {
        // Enable sharing
        const shareToken = await enableTripSharing(trip.id);
        const url = generateShareURL(shareToken);
        setShareUrl(url);
        setIsShared(true);

        // Update local state
        await updateCurrentTrip({
          isShared: true,
          shareToken,
        });

        toast.success('Sharing enabled!');
      } else {
        // Disable sharing
        await disableTripSharing(trip.id);
        setShareUrl('');
        setIsShared(false);

        // Update local state
        await updateCurrentTrip({
          isShared: false,
        });

        toast.success('Sharing disabled');
      }
    } catch (error) {
      console.error('Error toggling sharing:', error);
      toast.error('Failed to update sharing settings');
      setIsShared(!enabled); // Revert on error
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Trip
          </DialogTitle>
          <DialogDescription>
            Create a shareable link for "{trip.name}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sharing-toggle">Enable Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to view this trip with a link
              </p>
            </div>
            <Switch
              id="sharing-toggle"
              checked={isShared}
              onCheckedChange={handleToggleSharing}
              disabled={loading}
            />
          </div>

          {isShared && shareUrl && (
            <div className="space-y-2">
              <Label htmlFor="share-url">Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  title="Copy link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with this link can view your trip
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
