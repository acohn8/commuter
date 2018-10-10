import React from 'react';

const StationDropdown = ({ stations }) => {
  return (
    <select>
      {stations.map(station => (
        <option value={station.properties.NAME}>
          {station.properties.NAME}
        </option>
      ))}
    </select>
  );
};

export default StationDropdown;
