import React, { Component } from 'react';
import { connect } from 'react-redux';

import getStationInfo from '../../actions/tripActions';

class TripInfoContainer extends Component {
  componentDidMount() {
    const { fromStation, getStationInfo } = this.props;
    getStationInfo(fromStation.stationId);
  }
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  fromStation: state.stations.selectedFromStation
});

const mapDispatchToProps = dispatch => ({
  getStationInfo: stationId => dispatch(getStationInfo(stationId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripInfoContainer);
