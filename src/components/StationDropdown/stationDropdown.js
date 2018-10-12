import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class StationDropdown extends Component {
  state = { value: '' };

  componentDidMount() {
    const { selectStation, location, stations } = this.props;
    const firstStation = stations[0]['station-code'];
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
      key: station['station-code'],
      text: station.name,
      value: station['station-code']
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
