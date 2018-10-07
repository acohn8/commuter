const initialState = {
  toAddressSearch: '',
  fromAddressSearch: '',
  addressSuggestions: [],
  toAddress: { address: '', coords: [] },
  fromAddress: { address: '', coords: [] }
};

const addressReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case 'SET_TO_ADDRESS_SEARCH':
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
    case 'SET_TO_ADDRESS_SELECTION':
      return {
        ...previousState,
        toAddress: { address: action.address, coords: action.coords }
      };
    case 'SET_FROM_ADDRESS_SELECTION':
      console.log(action);
      return {
        ...previousState,
        fromAddress: { address: action.address, coords: action.coords }
      };
    default:
      return previousState;
  }
};

export default addressReducer;
