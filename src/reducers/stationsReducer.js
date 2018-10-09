const initialState = {
  fromStationOptions: [],
  toStationOptions: []
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
    default:
      return previousState;
  }
};

export default stationsReducer;
