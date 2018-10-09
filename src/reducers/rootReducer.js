import { combineReducers } from 'redux';
import addressReducer from './addressReducer';
import stationsReducer from './stationsReducer';

const rootReducer = combineReducers({
  address: addressReducer,
  stations: stationsReducer
});

export default rootReducer;
