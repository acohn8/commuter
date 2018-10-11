import propTypes from 'prop-types';
import React from 'react';

import styles from './AddressSuggestions.module.css';

const AddressSuggestionList = ({ address, handleClick, coords }) => (
  <div
    className={styles.addressItem}
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
