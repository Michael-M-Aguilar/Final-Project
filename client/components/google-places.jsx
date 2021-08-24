import React from 'react';

// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from 'react-places-autocomplete';

export default class GooglePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
}
