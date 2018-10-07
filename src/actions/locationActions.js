import axios from 'axios';

import * as constants from '../constants';

const fetchAddressSuggestions = address => async (dispatch, getState) => {
  if (address.length) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us&types=address&autocomplete=true`;
    const response = await axios.get(url);
    return dispatch({
      type: constants.SET_ADDRESS_SUGGESTIONS,
      addressSuggestions: response.data.features
    });
  }
  return dispatch({ type: constants.RESET_ADDRESS_SUGGESTIONS });
};

const fetchAddressInfo = (address, location) => dispatch => {
  if (location === 'to') {
    console.log(address, location);
    dispatch({
      type: constants.SET_TO_ADDRESS_SEARCH,
      address
    });
  } else if (location === 'from') {
    dispatch({
      type: constants.SET_FROM_ADDRESS_SEARCH,
      address
    });
  }
};

const setSelectedAddress = ({ address, coords }) => dispatch => {
  dispatch({
    type: constants.SET_ADDRESS_SELECTION,
    address,
    coords
  });
};

export { fetchAddressInfo, fetchAddressSuggestions, setSelectedAddress };
