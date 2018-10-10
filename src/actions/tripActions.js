import axios from 'axios';

import * as constants from '../constants';

const getStationInfo = stationId => async dispatch => {
  const config = {
    headers: { apiKey: 'bffa0ad2-d611-4025-a289-2bb5a50ee8e7' }
  };
  const response = await axios.get(
    `https://dcmetrohero.com/api/v1//metrorail/stations/${stationId}/trains`,
    config
  );
  const nextTrains = response.data;
  dispatch({ type: constants.SET_NEXT_TRAINS, trains: nextTrains });
};

export default getStationInfo;
