import axios from 'axios';

import * as constants from '../constants';

const getWeather = () => async (dispatch, getState) => {
  const [lng, lat] = getState().address.fromAddress.coords;
  const response = await axios.get(
    `http://localhost:3000/api/v1/forecasts/lat/${lat}/lng/${lng}`
  );
  const weather = response.data;
  const { hourly, minutely } = weather;
  dispatch({ type: constants.SET_WEATHER, hourly, minutely });
};

export default getWeather;
