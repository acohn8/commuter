import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class StationDropdown extends Component {
  state = { value: '' };

  componentDidMount() {
    const { selectStation, location, stations } = this.props;
    // transfer stations have multiple codes, but only one is necessary to get all the trains.
    const firstStation = stations[0].station_codes[0].station_code;
    this.setState(
      {
        value: firstStation
      },
      () => selectStation(firstStation, location)
    );
  }

  handleChange = (e, { value }) => {
    const { selectStation, location } = this.props;
    this.setState({ value }, selectStation(value, location));
  };

  render() {
    const stations = this.props.stations.map(station => ({
      key: station.station_codes[0].station_code,
      text: station.name,
      value: station.station_codes[0].station_code
    }));

    return (
      <Form.Select
        options={stations}
        fluid
        label="Station"
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}
