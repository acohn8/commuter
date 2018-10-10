const initialState = {
  fromStationOptions: [],
  toStationOptions: [],
  selectedFromStation: '',
  selectedToStation: ''
};

const stationsReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_TO_STATION_OPTIONS':
      return {
        ...previousState,
        toStationOptions: action.stations
      };
    case 'SET_FROM_STATION_OPTIONS':
      return {
        ...previousState,
        fromStationOptions: action.stations
      };
    case 'SET_SELECTED_FROM_STATION':
      return {
        ...previousState,
        selectedFromStation: action.station
      };
    case 'SET_SELECTED_TO_STATION':
      return {
        ...previousState,
        selectedToStation: action.station
      };
    default:
      return previousState;
  }
};

export default stationsReducer;
