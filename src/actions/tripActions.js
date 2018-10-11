import axios from 'axios';

import * as constants from '../constants';

const getStationInfo = stationId => async dispatch => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/stations/${stationId}`
  );
  const nextTrains = response.data;
  dispatch({ type: constants.SET_NEXT_TRAINS, trains: nextTrains });
};

export default getStationInfo;
