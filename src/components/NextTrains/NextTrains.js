import React from 'react';
import { Card, List } from 'semantic-ui-react';

const NextTrains = ({ trains, line, color }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>{line}</Card.Header>
      </Card.Content>
      <Card.Content>
        <List>
          {trains.slice(0, 3).map(train => (
            <List.Item key={train.trainId}>
              <List.Icon name="train" color={color} />
              <List.Content>
                <List.Header>{train.Destination}</List.Header>
                {Math.round(train.minutesAway)} minutes
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export default NextTrains;
