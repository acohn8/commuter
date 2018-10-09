import { debounce } from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import {
  fetchAddressSuggestions,
  fetchAddressInfo,
  setSelectedAddress,
  setFocusedField
} from '../../actions/locationActions';
import AddressSuggestionList from '../../components/AddressSuggestionList/AddressSuggestionList';
import AddressMapContainer from '../AddressMapContainer/AddressMapContainer';

class SearchContainer extends Component {
  handleChange = (event, location) => {
    const address = event.target.value;
    if (location === 'to') {
      this.props.setFocusedField('to');
    } else if (location === 'from') {
      this.props.setFocusedField('from');
    }

    this.props.fetchAddressInfo(address, location);

    const debounceChange = debounce(
      () => this.props.fetchAddressSuggestions(address),
      600
    );
    debounceChange();
  };

  handleClick = address => {
    this.props.setSelectedAddress(address, this.props.focusedSearchField);
  };

  determineSearchValue = location => {
    const {
      fromAddress,
      fromAddressSearch,
      toAddress,
      toAddressSearch
    } = this.props;
    if (location === 'from' && !fromAddress) {
      return fromAddressSearch;
    } else if (location === 'from' && fromAddress) {
      return fromAddress;
    } else if (location === 'to' && !toAddress) {
      return toAddressSearch;
    } else if (location === 'to' && toAddress) {
      return toAddress;
    }
  };

  render() {
    const { addressSuggestions } = this.props;
    return (
      <div>
        <form>
          <p>From:</p>
          <SearchBar
            value={this.determineSearchValue('from')}
            handleChange={this.handleChange}
            location={'from'}
          />
          <p>To:</p>
          <SearchBar
            value={this.determineSearchValue('to')}
            handleChange={this.handleChange}
            location={'to'}
          />
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
          <div>
            <AddressMapContainer />
          </div>
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
  toAddress: propTypes.string,
  fromAddress: propTypes.string,
  focusedSearchField: propTypes.string,
  setSelectedAddress: propTypes.func
};

const mapStateToProps = state => ({
  toAddressSearch: state.address.toAddressSearch,
  fromAddressSearch: state.address.fromAddressSearch,
  addressSuggestions: state.address.addressSuggestions,
  focusedSearchField: state.address.focusedSearchField,
  toAddress: state.address.toAddress.address,
  toStations: state.stations.toStationOptions
});

const mapDispatchToProps = dispatch => ({
  fetchAddressSuggestions: address =>
    dispatch(fetchAddressSuggestions(address)),
  fetchAddressInfo: (address, location) =>
    dispatch(fetchAddressInfo(address, location)),
  setSelectedAddress: (address, location) =>
    dispatch(setSelectedAddress(address, location)),
  setFocusedField: field => dispatch(setFocusedField(field))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
