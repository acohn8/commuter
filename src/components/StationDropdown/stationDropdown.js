import React, { Component } from 'react';

export default class StationDropdown extends Component {
  state = { toStation: {}, fromStation: {} };

  componentDidMount() {
    const { selectStation, location } = this.props;
    this.setState({ selection: this.props.stations[0] }, () =>
      selectStation(this.state.selection, location)
    );
  }

  handleChange = event => {
    const { selectStation, location } = this.props;
    const station = event.targetValue;
    this.setState({ selection: station }, () =>
      selectStation(station, location)
    );
  };

  render() {
    const { stations } = this.props;
    return (
      <select>
        {stations.map(station => (
          <option value={station.NAME}>{station.NAME}</option>
        ))}
      </select>
    );
  }
}
