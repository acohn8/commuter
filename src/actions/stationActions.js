import * as constants from '../constants';

const setStationOptions = (stations, location) => dispatch => {
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
