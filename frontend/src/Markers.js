import React from 'react';

// leaflet
import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';

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
    // initialiser markers
    this.setState({
      markers: [
        {
          longitude: 48.85,
          latitude: 2.6,
          message: "aaaaaaa"
        },
        {
          longitude: 48.85,
          latitude: 2.62,
          message: "qsdgghqs"
        },
      ]
    })
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