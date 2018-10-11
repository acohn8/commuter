import propTypes from 'prop-types';
import React from 'react';
import { Form } from 'semantic-ui-react';

const SearchBar = ({ value, handleChange, location, label }) => (
  <Form.Input
    label={label}
    icon="search"
    placeholder="Search..."
    value={value}
    fluid
    onChange={e => handleChange(e, location)}
  />
);

SearchBar.propTypes = {
  value: propTypes.string,
  location: propTypes.string,
  handleChange: propTypes.func,
  label: propTypes.string
};

export default SearchBar;
