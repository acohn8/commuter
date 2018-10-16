const initialState = {
  hourly: {},
  minutely: {}
};

const weatherReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        ...previousState,
        hourly: action.hourly,
        minutely: action.minutely
      };
    default:
      return previousState;
  }
};

export default weatherReducer;
