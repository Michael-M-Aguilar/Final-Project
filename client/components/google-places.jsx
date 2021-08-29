import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default function GooglePlaces({ isLoaded, isSuccess }) {
  const [address, setAddress] = React.useState('');

  const handleChange = value => {
    setAddress(value);
  };

  const handleSelect = value => {
    setAddress(value);
  };
  if (isLoaded && isSuccess) {
    return <div>
      <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input {...getInputProps({
              placeholder: 'Enter Address ...'
            })}/>
          </div>
        )}
      </PlacesAutocomplete>
    </div>;
  } else {
    return <div></div>;
  }
}
