import { debounce } from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar/SearchBar';
import {
  fetchAddressSuggestions,
  fetchAddressInfo,
  setSelectedAddress
} from '../../actions/locationActions';
import AddressSuggestionList from '../../components/AddressSuggestionList/AddressSuggestionList';
import AddressMapContainer from '../AddressMapContainer/AddressMapContainer';

class SearchContainer extends Component {
  state = { focus: '' };

  handleChange = (event, location) => {
    const address = event.target.value;
    if (location === 'to') {
      this.setState({ focus: 'to' });
    } else if (location === 'from') {
      this.setState({ focus: 'from' });
    }
    this.props.fetchAddressInfo(address, location);
    const debounceChange = debounce(
      () => this.props.fetchAddressSuggestions(address),
      600
    );
    debounceChange();
  };

  handleClick = address => {
    this.props.setSelectedAddress(address, this.state.focus);
  };

  render() {
    const {
      toAddressSearch,
      fromAddressSearch,
      addressSuggestions
    } = this.props;
    return (
      <div>
        <form>
          <p>From:</p>
          <SearchBar
            value={fromAddressSearch}
            handleChange={this.handleChange}
            location={'from'}
          />
          <p>To:</p>
          <SearchBar
            value={toAddressSearch}
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
  setSelectedAddress: propTypes.func
};

const mapStateToProps = state => ({
  toAddressSearch: state.address.toAddressSearch,
  fromAddressSearch: state.address.fromAddressSearch,
  addressSuggestions: state.address.addressSuggestions
});

const mapDispatchToProps = dispatch => ({
  fetchAddressSuggestions: address =>
    dispatch(fetchAddressSuggestions(address)),
  fetchAddressInfo: (address, location) =>
    dispatch(fetchAddressInfo(address, location)),
  setSelectedAddress: (address, location) =>
    dispatch(setSelectedAddress(address, location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
