import { combineReducers } from 'redux';
import addressReducer from './addressReducer';
import stationsReducer from './stationsReducer';
import tripReducer from './tripReducer';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  address: addressReducer,
  stations: stationsReducer,
  trips: tripReducer,
  weather: weatherReducer
});

export default rootReducer;
