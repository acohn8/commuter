import distance from '@turf/distance';
import mapboxgl from 'mapbox-gl';
import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A';

export default class AddressMap extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.map.on('load', () => {
      this.addMetroLayers();
    });
  }

  componentDidUpdate() {
    if (this.map.getLayer('location')) {
      this.map.removeLayer('location');
    }
    if (this.map.getSource('location')) {
      this.map.removeSource('location');
    }
    this.map.addLayer(this.props.points);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  addMetroLayers = () => {
    this.map.addSource('stations', {
      url: 'mapbox://adamcohn.apen5at2',
      type: 'vector'
    });

    this.map.addSource('lines', {
      url: 'mapbox://adamcohn.dkewbo9p',
      type: 'vector'
    });

    this.map.addLayer({
      id: 'metro-lines',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://adamcohn.dkewbo9p'
      },
      'source-layer': 'Metro_Lines',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ff69b4',
        'line-width': 1
      }
    });

    this.map.addLayer({
      id: 'metro-stations',
      type: 'circle',
      source: {
        type: 'vector',
        url: 'mapbox://adamcohn.apen5at2'
      },
      'source-layer': 'Metro_Stations_Regional',
      paint: {
        'circle-color': '#F15A2D',
        'circle-radius': 6,
        'circle-stroke-width': 1.7,
        'circle-stroke-color': '#ffffff'
      }
    });
  };

  render() {
    const style = {
      position: 'relative',
      top: 0,
      bottom: 0,
      width: '100%',
      height: '500px'
    };
    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}
