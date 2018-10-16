import dateFns from 'date-fns';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import WeatherChart from '../../components/WeatherChart/WeatherChart';

class WeatherChartContainer extends Component {
  filterWeather = filter => {
    const { hourlyWeather } = this.props;
    console.log(hourlyWeather);
    const formattedWeather = hourlyWeather.data.map(weather => {
      const weatherEvent = {};
      weatherEvent.time = dateFns.format(
        new Date(weather.time * 1000),
        'dd h:mm'
      );
      weatherEvent[filter] = weather[filter];
      return weatherEvent;
    });
    return formattedWeather;
  };

  render() {
    const weatherData = this.filterWeather('temperature');
    const filter = Object.keys(weatherData[0])[1];
    console.log(weatherData);
    return <WeatherChart data={weatherData} filter={filter} />;
  }
}

const mapStateToProps = state => ({
  minutelyWeather: state.weather.minutely,
  hourlyWeather: state.weather.hourly
});

export default connect(mapStateToProps)(WeatherChartContainer);
