import React, { Component } from 'react';
import { connect } from 'react-redux';

import getStationInfo from '../../actions/tripActions';
import NextTrains from '../../components/NextTrains/NextTrains';
import styles from './TripInfoContainer.module.css';

class TripInfoContainer extends Component {
  componentDidMount() {
    const { fromStation, getStationInfo } = this.props;
    getStationInfo(fromStation.stationId);
  }

  groupTrainsByTrack = () => {
    const { nextTrains } = this.props;
    const lines = Array.from(new Set(nextTrains.map(train => train.Line)));
    const sortedTrains = {};
    lines.forEach(line => {
      sortedTrains[line] = {};
      const firstTrack = nextTrains.filter(
        train => train.Line === line && train.Group === '1'
      );
      const secondTrack = nextTrains.filter(
        train => train.Line === line && train.Group === '2'
      );
      sortedTrains[line][1] = firstTrack;
      sortedTrains[line][2] = secondTrack;
    });
    return sortedTrains;
  };

  render() {
    const trains = this.groupTrainsByTrack();
    const tracks = Object.keys(trains);
    return (
      <div>
        {tracks.map(track => (
          <div>
            <h4>{track}</h4>
            <div className={styles.trainsContainer}>
              {trains[track]['1'].map(train => (
                <div className={styles.nextTrains}>
                  <NextTrains train={train} />
                </div>
              ))}
              {trains[track]['2'].map(train => (
                <div className={styles.nextTrains}>
                  <NextTrains train={train} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fromStation: state.stations.selectedFromStation,
  nextTrains: state.trips.nextTrains
});

const mapDispatchToProps = dispatch => ({
  getStationInfo: stationId => dispatch(getStationInfo(stationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripInfoContainer);
