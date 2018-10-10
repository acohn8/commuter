import { combineReducers } from 'redux';
import addressReducer from './addressReducer';
import stationsReducer from './stationsReducer';
import tripReducer from './tripReducer';

const rootReducer = combineReducers({
  address: addressReducer,
  stations: stationsReducer,
  trips: tripReducer
});

export default rootReducer;
