import propTypes from 'prop-types';
import React from 'react';

const SearchBar = ({ value, handleChange }) => (
  <input value={value} onChange={e => handleChange(e)} />
);

SearchBar.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func
};

export default SearchBar;
