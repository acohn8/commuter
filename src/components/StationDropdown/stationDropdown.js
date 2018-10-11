import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class StationDropdown extends Component {
  state = { value: {} };

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
    const stations = this.props.stations.map(station => ({
      key: station.GIS_ID,
      value: station,
      text: station.NAME
    }));
    return (
      <Form.Select
        options={stations}
        fluid
        label="Station"
        value={this.state.value}
      />
    );
  }
}
