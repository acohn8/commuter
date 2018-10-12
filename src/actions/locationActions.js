import axios from 'axios';

import * as constants from '../constants';
import { setStationOptions } from './stationActions';

const fetchAddressSuggestions = address => async dispatch => {
  if (address.length) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A&country=us&bbox=-77.44849350586648%2C38.629297792389735%2C-76.59430649414608%2C39.16369685437627&proximity=-77.0369%2C38.9072&types=poi%2Cpoi.landmark%2Caddress%2Cplace&autocomplete=true`;
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

const setSelectedAddress = ({ address, coords }, location) => dispatch => {
  let addressType;
  if (location === 'to') {
    addressType = constants.SET_TO_ADDRESS_SELECTION;
  } else if (location === 'from') {
    addressType = constants.SET_FROM_ADDRESS_SELECTION;
  }
  dispatch({
    type: addressType,
    address,
    coords,
    location
  });
  dispatch(setStationOptions(coords, location));
};

const setFocusedField = focusedSearchField => dispatch =>
  dispatch({ type: constants.SET_FOCUSED_SEARCH_FIELD, focusedSearchField });

export {
  fetchAddressInfo,
  fetchAddressSuggestions,
  setSelectedAddress,
  setFocusedField
};
