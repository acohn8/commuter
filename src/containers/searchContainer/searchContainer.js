import { debounce } from 'lodash';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

import {
  fetchAddressSuggestions,
  fetchAddressInfo,
  setSelectedAddress,
  setFocusedField
} from '../../actions/locationActions';
import AddressSuggestionList from '../../components/AddressSuggestionList/AddressSuggestionList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { selectStation } from '../../actions/stationActions';
import styles from './SearchContainer.module.css';
import StationDropdown from '../../components/StationDropdown/StationDropdown';

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
    const {
      addressSuggestions,
      fromStations,
      toStations,
      selectStation
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <SearchBar
                value={this.determineSearchValue('from')}
                handleChange={this.handleChange}
                location={'from'}
                label={'From'}
              />
            </Form.Field>
            {fromStations.length > 0 && (
              <StationDropdown
                stations={fromStations}
                selectStation={selectStation}
                location={'from'}
              />
            )}
          </Form.Group>
          {this.props.fromAddress && (
            <Form.Group widths="equal">
              <Form.Field>
                <SearchBar
                  value={this.determineSearchValue('to')}
                  handleChange={this.handleChange}
                  location={'to'}
                  label={'To'}
                  />
              </Form.Field>
              {toStations.length > 0 && (
                <StationDropdown
                stations={toStations}
                selectStation={selectStation}
                location={'to'}
                />
                )}
        </Form.Group>
          )}
        </Form>
        {this.props.addressSuggestions && (
          <div className={styles.suggestionOverlay}>
            {addressSuggestions.map(suggestion => (
              <AddressSuggestionList
                key={suggestion.id}
                address={suggestion.place_name}
                coords={suggestion.center}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

SearchContainer.propTypes = {
  addressSearch: propTypes.string,
  addressSuggestions: propTypes.array,
  toAddress: propTypes.string,
  fromAddress: propTypes.string,
  focusedSearchField: propTypes.string,
  fromStations: propTypes.array,
  toStations: propTypes.array,
  setSelectedAddress: propTypes.func,
  fetchAddressSuggestions: propTypes.func,
  fetchAddressInfo: propTypes.func,
  selectStation: propTypes.func
};

const mapStateToProps = state => ({
  toAddressSearch: state.address.toAddressSearch,
  fromAddressSearch: state.address.fromAddressSearch,
  addressSuggestions: state.address.addressSuggestions,
  focusedSearchField: state.address.focusedSearchField,
  toAddress: state.address.toAddress.address,
  fromAddress: state.address.fromAddress.address,
  fromStations: state.stations.fromStationOptions,
  toStations: state.stations.toStationOptions
});

const mapDispatchToProps = dispatch => ({
  fetchAddressSuggestions: address =>
    dispatch(fetchAddressSuggestions(address)),
  fetchAddressInfo: (address, location) =>
    dispatch(fetchAddressInfo(address, location)),
  setSelectedAddress: (address, location) =>
    dispatch(setSelectedAddress(address, location)),
  setFocusedField: field => dispatch(setFocusedField(field)),
  selectStation: (station, location) =>
    dispatch(selectStation(station, location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
