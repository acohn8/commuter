import React from 'react';
import { ResponsiveBar, tooltip } from '@nivo/bar';

const WeatherChart = ({ data, filter }) => {
  const allTemps = data.map(day => day[filter]);
  return (
    <ResponsiveBar
      data={data}
      width={900}
      height={500}
      margin={{
        top: 60,
        right: 80,
        bottom: 60,
        left: 80
      }}
      indexBy="time"
      minValue={Math.min(...allTemps) - 10}
      maxValue={Math.max(...allTemps) + 10}
      keys={[filter]}
      padding={0.2}
      labelTextColor="inherit:darker(1.4)"
      labelSkipWidth={16}
      labelSkipHeight={16}
      tooltip={tooltip}
    />
  );
};

export default WeatherChart;
