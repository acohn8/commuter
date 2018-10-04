import { debounce } from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import React, { Component } from 'react';

import styles from './SearchContainer.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  fetchAddressSuggestions,
  fetchAddressInfo,
  setSelectedAddress
} from '../../actions/locationActions';
import AddressSuggestionList from '../../components/AddressSuggestionList/AddressSuggestionList';

class SearchContainer extends Component {
  handleChange = event => {
    this.props.fetchAddressInfo(event.target.value);
    const debounceChange = debounce(this.props.fetchAddressSuggestions, 600);
    debounceChange();
  };

  handleClick = address => {
    this.props.setSelectedAddress(address);
  };

  render() {
    const { addressSearch, addressSuggestions } = this.props;
    return (
      <div>
        <form>
          <small >Where are you?</small>
          <SearchBar value={addressSearch} handleChange={this.handleChange} />
        </form>
        <div>
          {addressSuggestions.map(suggestion => (
            <AddressSuggestionList
              key={suggestion.id}
              address={suggestion.place_name}
              coords={suggestion.center}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  addressSearch: propTypes.string,
  addressSuggestions: propTypes.array,
  fetchAddressSuggestions: propTypes.func,
  fetchAddressInfo: propTypes.func,
  setSelectedAddress: propTypes.func
};

const mapStateToProps = state => ({
  addressSearch: state.address.addressSearch,
  addressSuggestions: state.address.addressSuggestions
});

const mapDispatchToProps = dispatch => ({
  fetchAddressSuggestions: () => dispatch(fetchAddressSuggestions()),
  fetchAddressInfo: address => dispatch(fetchAddressInfo(address)),
  setSelectedAddress: address => dispatch(setSelectedAddress(address))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
