import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

import getStationInfo from '../../actions/tripActions';
import getWeather from '../../actions/weatherActions';
import { lines, colors } from '../../helpers/Lines';
import NextTrains from '../../components/NextTrains/NextTrains';
import WeatherChartContainer from '../WeatherChartContainer/WeatherChartContainer';

class TripInfoContainer extends Component {
  componentDidMount() {
    const { fromStation, getStationInfo, getWeather } = this.props;
    getStationInfo(fromStation);
    getWeather();
  }

  componentDidUpdate(prevProps) {
    const { fromStation, getStationInfo } = this.props;
    if (fromStation !== prevProps.fromStation) {
      getStationInfo(fromStation);
    }
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
    const { hourlyWeather } = this.props;
    return (
      <div>
        <Card.Group centered itemsPerRow={4}>
          {tracks.map(track => [
            <NextTrains
              key={`${track}1`}
              trains={trains[track]['1']}
              line={lines[track]}
              color={colors[track]}
            />,
            <NextTrains
              key={`${track}2`}
              trains={trains[track]['2']}
              line={lines[track]}
              color={colors[track]}
            />
          ])}
        </Card.Group>
        <div style={{ height: '600px' }}>
          {hourlyWeather.data !== undefined && <WeatherChartContainer />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fromStation: state.stations.selectedFromStation,
  nextTrains: state.trips.nextTrains,
  hourlyWeather: state.weather.hourly
});

const mapDispatchToProps = dispatch => ({
  getStationInfo: stationId => dispatch(getStationInfo(stationId)),
  getWeather: () => dispatch(getWeather())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripInfoContainer);
