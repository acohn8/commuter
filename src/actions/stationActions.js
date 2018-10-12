import axios from 'axios';

import * as constants from '../constants';

const setStationOptions = (coords, location) => async dispatch => {
  const [lng, lat] = coords;
  const url = `stations/lat/${lat}/lng/${lng}`;
  const response = await axios.get(`http://localhost:3000/api/v1/${url}`);
  const stations = response.data.data.map(station => station.attributes);

  console.log(stations);
  if (location === 'to') {
    dispatch({ type: constants.SET_TO_STATION_OPTIONS, stations });
  } else if (location === 'from') {
    dispatch({ type: constants.SET_FROM_STATION_OPTIONS, stations });
  }
};

const selectStation = (station, location) => dispatch => {
  if (location === 'from') {
    dispatch({ type: constants.SET_SELECTED_FROM_STATION, station });
  } else if (location === 'to') {
    dispatch({ type: constants.SET_SELECTED_TO_STATION, station });
  }
};

export { setStationOptions, selectStation };
