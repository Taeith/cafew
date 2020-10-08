import React from 'react';

// leaflet
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
import { Map, TileLayer } from "react-leaflet";
import L from 'leaflet';

// components
import Markers from './Markers';

import './CustomMap.css';

export default class CustomMap extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.CustomMap();
	}

	CustomMap() {
		// TO DO
		// récupérer la position -> centrer la carte
	}

	render() {
		return (
			<Map center={[48.85, 2.6]} zoom={13}>
	          <TileLayer
	            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	          />
	          <Markers />
	        </Map>
		);
	}

}