import React from 'react';

const NextTrains = ({ train }) => (
  <div>
    {train.Destination}: {Math.round(train.minutesAway, 2)}
  </div>
);

export default NextTrains;
