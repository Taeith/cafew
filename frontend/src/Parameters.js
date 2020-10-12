import React from 'react';

import { Button } from 'react-bootstrap';

import { remove } from './Utils.js'

export default class Parameters extends React.Component {

	constructor(props) {
		super(props);
	}

	deleteAccount = () => {
		remove('/user/' + window.sessionStorage.getItem('CafewUserId'))
	    .then((response) => {
	      this.props.handleShowToast("success", "Votre compte utilisateur à été supprimé.");
	    })
	    .catch(error => {
	      this.props.handleShowToast("danger", "Votre compte n'a pas pu être supprimé."
	    )});
	}

	render() {
		return (
			<div>
				<h1>Paramètres</h1>
				<p>Cette page permet de modifier les données du compte utilisateur.</p>
				<Button 
					variant="danger" 
					onClick = { this.deleteAccount }>
					Supprimer mon compte
				</Button> 
			</div>
		);
	}

}