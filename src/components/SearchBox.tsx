import React, { useRef, useCallback, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBoxProps {
  onPlaceSelected: (position: any, address: string) => void;
  isLoaded: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onPlaceSelected, isLoaded }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle autocomplete load
  const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  // Handle place selection
  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        const position = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        const address = place.formatted_address || place.name || '';

        // Call the parent callback
        onPlaceSelected(position, address);

        // Clear the input
        setSearchValue('');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }
  }, [autocomplete, onPlaceSelected]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle input clear
  const handleClear = () => {
    setSearchValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // Don't render Autocomplete until Google Maps is loaded
  if (!isLoaded) {
    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          disabled
          placeholder="Loading search..."
          className="pl-10"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: 'us' },
          fields: ['formatted_address', 'geometry', 'name']
        }}
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search location..."
          value={searchValue}
          onChange={handleInputChange}
          className="pl-10 pr-10 h-10 md:h-11 text-sm md:text-base bg-background/50 border-border/60 focus:bg-background transition-colors"
        />
      </Autocomplete>
      {searchValue && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted/50"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBox;
