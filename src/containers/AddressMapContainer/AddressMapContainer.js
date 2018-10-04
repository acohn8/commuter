import React, { Component } from 'react';

import AddressMap from '../../components/AddressMap/AddressMap';
import styles from './AddressMapContainer.module.css';

export default class AddressMapContainer extends Component {
  render() {
    return (
      <div className={styles.mapContainer}>
        <AddressMap />
      </div>
    );
  }
}
