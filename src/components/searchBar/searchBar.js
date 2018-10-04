import propTypes from 'prop-types';
import React from 'react';

import styles from './SearchBar.module.css';

const SearchBar = ({ value, handleChange }) => (
  <input
    className={styles.searchBar}
    value={value}
    onChange={e => handleChange(e)}
  />
);

SearchBar.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func
};

export default SearchBar;
