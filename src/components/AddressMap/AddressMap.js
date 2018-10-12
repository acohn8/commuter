import bbox from '@turf/bbox';
import mapboxgl from 'mapbox-gl';
import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRhbWNvaG4iLCJhIjoiY2pod2Z5ZWQzMDBtZzNxcXNvaW8xcGNiNiJ9.fHYsK6UNzqknxKuchhfp7A';

export default class AddressMap extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/adamcohn/cjmur7tfa3m1s2rnuz48wq9qc',
      center: [-77.0214, 38.897],
      zoom: 9
    });
    this.map.on('load', () => {
      this.addMetroLayers();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.points !== prevProps.points) {
      if (this.map.getLayer('location')) {
        this.map.removeLayer('location');
      }
      if (this.map.getSource('location')) {
        this.map.removeSource('location');
      }
      this.map.addLayer(this.props.points);
      this.zoomToSelection();
    }
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
      url: 'mapbox://adamcohn.aqrkj8wv',
      type: 'vector'
    });

    this.map.addLayer({
      id: 'metro-lines',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://adamcohn.aqrkj8wv'
      },
      'source-layer': 'Metro_Lines_Regional',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-offset': {
          property: 'Order',
          type: 'categorical',

          stops: [[1, 0], [2, 5], [3, 10]]
        },
        'line-color': [
          'match',
          ['get', 'NAME'],
          'red',
          '#ff0100',
          'yellow',
          '#feff00',
          'orange',
          '#f28227',
          'green',
          '#02B050',
          'blue',
          '#0070c0',
          'orange - rush +',
          '#f28227',
          'silver',
          '#a6a6a6',
          /* other */ '#ccc'
        ],
        'line-width': 8
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
        'circle-radius': 4.5,
        'circle-stroke-width': 1.7,
        'circle-stroke-color': '#000',
        'circle-color': '#ffffff'
      }
    });
  };

  zoomToSelection = () => {
    if (this.props.points.source.data.features.length === 1) {
      this.map.flyTo({
        center: this.props.points.source.data.features[0].geometry.coordinates,
        zoom: 9
      });
    } else if (this.props.points.source.data.features.length === 2) {
      const bounds = bbox(this.map.getSource('location')._data);
      this.map.fitBounds(bounds, { padding: 50 });
    }
  };

  getStationsFromTile = () => {
    return this.map.queryRenderedFeatures({
      layers: ['metro-stations-regional']
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
