import * as constants from '../constants';

const setStationOptions = (stations, location) => dispatch => {
  if (location === 'to') {
    dispatch({ type: constants.SET_TO_STATION_OPTIONS, stations });
  } else if (location === 'from') {
    dispatch({ type: constants.SET_FROM_STATION_OPTIONS, stations });
  }
};

export default setStationOptions;
