import propTypes from 'prop-types';
import React from 'react';

const AddressSuggestionList = ({ address, handleClick, coords }) => (
  <div
    className="address-item"
    onClick={() => handleClick({ coords: coords, address: address })}
  >
    {address}
  </div>
);

AddressSuggestionList.propTypes = {
  address: propTypes.string,
  handleClick: propTypes.func,
  coords: propTypes.arrayOf(propTypes.number)
};

export default AddressSuggestionList;
