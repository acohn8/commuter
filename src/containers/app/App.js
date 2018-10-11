import { connect } from 'react-redux';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import SearchContainer from '../SearchContainer/SearchContainer';
import AddressMapContainer from '../AddressMapContainer/AddressMapContainer';
import TripInfoContainer from '../TripInfoContainer/TripInfoContainer';

const App = ({ fromStation }) => (
  <Container>
    <Grid>
      <Grid.Row centered columns={2}>
        <SearchContainer />
      </Grid.Row>
      {fromStation.stationId !== undefined && (
        <Grid.Row columns={1}>
          <Grid.Column>
            <TripInfoContainer />
          </Grid.Column>
        </Grid.Row>
      )}
      <Grid.Row>
        <AddressMapContainer />
      </Grid.Row>
    </Grid>
  </Container>
);

const mapStateToProps = state => ({
  fromStation: state.stations.selectedFromStation
});

export default connect(mapStateToProps)(App);
