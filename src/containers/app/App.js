import { connect } from 'react-redux';
import React from 'react';

import styles from './App.module.css';
import SearchContainer from '../SearchContainer/SearchContainer';
import AddressMapContainer from '../AddressMapContainer/AddressMapContainer';
import TripInfoContainer from '../TripInfoContainer/TripInfoContainer';

const App = ({ fromStation }) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <SearchContainer />
      <AddressMapContainer />
      {fromStation.stationId !== undefined && <TripInfoContainer />}
    </div>
  </div>
);

const mapStateToProps = state => ({
  fromStation: state.stations.selectedFromStation
});

export default connect(mapStateToProps)(App);
