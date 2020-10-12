import React from 'react';

import { Button } from 'react-bootstrap';

export default class Parameters extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>Paramètres</h1>
				<p>Cette page permet de modifier les données du compte utilisateur.</p>
				<Button variant="danger">Supprimer mon compte</Button> 
			</div>
		);
	}

}