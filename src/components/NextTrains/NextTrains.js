import React from 'react';

const NextTrains = ({ train }) => (
  <div>
    {train.Destination}: {train.minutesAway}
  </div>
);

export default NextTrains;
