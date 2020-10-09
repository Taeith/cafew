import React from 'react';

// leaflet
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';

// jquery
import $ from 'jquery';

export const pointerIcon = new L.Icon({
  iconUrl: './recycling-center.png',
  iconRetinaUrl: './recycling-center.png',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [35, 35],
})

export default class Markers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    this.Markers();
  }

  Markers() {
    $.getJSON('http://127.0.0.1:4200/')
     .then((results) => {
        this.setState({ markers: results.markers });
     });
  }

  render() {
    const markers = this.state.markers.map(marker => (
      <Marker position={[marker.longitude, marker.latitude]} icon={pointerIcon}>
        <Popup>
          {marker.message}
        </Popup>
      </Marker>
    ));
    return (<div>{ markers }</div>); 
  }

}