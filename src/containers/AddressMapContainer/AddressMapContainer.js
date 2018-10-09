import propTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import AddressMap from '../../components/AddressMap/AddressMap';
import styles from './AddressMapContainer.module.css';

class AddressMapContainer extends Component {
  formatPoint = () => {
    const { toAddress, fromAddress } = this.props;
    return {
      id: 'location',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: toAddress.coords
              },
              properties: {
                title: toAddress.address,
                icon: 'marker'
              }
            },
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: fromAddress.coords
              },
              properties: {
                title: fromAddress.address,
                icon: 'marker'
              }
            }
          ]
        }
      },
      paint: {
        'circle-color': '#76CEF0',
        'circle-radius': 6,
        'circle-stroke-width': 1.7,
        'circle-stroke-color': '#ffffff'
      }
    };
  };

  render() {
    return (
      <div className={styles.mapContainer}>
        <AddressMap
          points={this.formatPoint()}
          from={this.props.fromAddress}
          to={this.props.toAddress}
        />
      </div>
    );
  }
}

AddressMapContainer.propTypes = {
  toAddress: propTypes.object,
  fromAddress: propTypes.object
};

const mapStateToProps = state => ({
  toAddress: state.address.toAddress,
  fromAddress: state.address.fromAddress
});

export default connect(mapStateToProps)(AddressMapContainer);
