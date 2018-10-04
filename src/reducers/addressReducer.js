const initialState = {
  addressSearch: '',
  addressSuggestions: [],
  selectedAddress: '',
  selectedCoords: []
};

const addressReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_ADDRESS_SEARCH':
      return {
        ...previousState,
        addressSearch: action.address
      };
    case 'SET_ADDRESS_SUGGESTIONS':
      return {
        ...previousState,
        addressSuggestions: action.addressSuggestions
      };
    case 'RESET_ADDRESS_SUGGESTIONS':
      return {
        ...previousState,
        addressSearch: '',
        addressSuggestions: []
      };
    case 'SET_ADDRESS_SELECTION':
      return {
        ...previousState,
        selectedAddress: action.address,
        selectedCoords: action.coords
      };
    default:
      return previousState;
  }
};

export default addressReducer;
