const initialState = {
  nextTrains: []
};

const tripReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_NEXT_TRAINS':
      return {
        ...previousState,
        nextTrains: action.trains
      };
    default:
      return previousState;
  }
};

export default tripReducer;
