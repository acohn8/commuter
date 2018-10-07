const initialState = {
  toAddressSearch: '',
  fromAddressSearch: '',
  addressSuggestions: [],
  selectedAddress: '',
  selectedCoords: []
};

const addressReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_TO_ADDRESS_SEARCH':
      console.log(action);
      return {
        ...previousState,
        toAddressSearch: action.address
      };
    case 'SET_FROM_ADDRESS_SEARCH':
      return {
        ...previousState,
        fromAddressSearch: action.address
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
