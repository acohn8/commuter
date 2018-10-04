import propTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import AddressMap from '../../components/AddressMap/AddressMap';
import styles from './AddressMapContainer.module.css';

class AddressMapContainer extends Component {
  formatPoint = () => {
    const { address, coords } = this.props;
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
                coordinates: coords
              },
              properties: {
                title: address,
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
        <AddressMap points={this.formatPoint()} />
      </div>
    );
  }
}

AddressMapContainer.propTypes = {
  address: propTypes.string,
  coords: propTypes.arrayOf(propTypes.number)
};

const mapStateToProps = state => ({
  address: state.address.selectedAddress,
  coords: state.address.selectedCoords
});

export default connect(mapStateToProps)(AddressMapContainer);
