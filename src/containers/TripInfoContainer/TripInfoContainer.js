import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';

import getStationInfo from '../../actions/tripActions';
import { lines, colors } from '../../helpers/Lines';
import NextTrains from '../../components/NextTrains/NextTrains';

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
      const firstTrack = nextTrains
        .filter(train => train.Line === line && train.Group === '1')
        .sort((a, b) => a.minutesAway - b.minutesAway);
      const secondTrack = nextTrains
        .filter(train => train.Line === line && train.Group === '2')
        .sort((a, b) => a.minutesAway - b.minutesAway);
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
        <Card.Group centered itemsPerRow={4}>
          {tracks.map(track => [
            <NextTrains
              trains={trains[track]['1']}
              line={lines[track]}
              color={colors[track]}
            />,
            <NextTrains
              trains={trains[track]['2']}
              line={lines[track]}
              color={colors[track]}
            />
          ])}
        </Card.Group>
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
