import React from 'react';

import { ListGroup, Button } from 'react-bootstrap';

import { get, put } from './Utils.js';

export default class Contacts extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			requests: '',
			friends: ''
		}
	}

	componentDidMount() {
		this.load();
	}

	refuseRequest = () => {
		alert("La requête à été refusée !");
	}

	acceptRequest = (id) => {
		put('/request/' + id,
	      JSON.stringify({
	        state: 'FRIENDS'
	    }))
	    .then((response) => {
	    	this.load();
	    	this.props.handleShowToast("success", "La requête à été acceptée !");
	    })
	    .catch(error => {
	      this.props.handleShowToast("danger", "Le serveur est temporairement indisponible."
	    )});
	}

	load = () => {
		// LOAD REQUESTS
		get('/request/recycler/' + window.sessionStorage.getItem('CafewUserId') + '/PENDING')
	    .then(requests => {
	    	const reqs = requests.map(request => (
	       		<ListGroup.Item>
			  		{ request.producerAlias }
			  		<Button 
			  			onClick = { this.refuseRequest }
			  			variant = "outline-danger" 
			  			className = "float-right" 
			  			style = {{'margin-right':'10px'}} >
			  			❌
			  		</Button>
			  		<Button 
			  			onClick = { () => this.acceptRequest(request._id) }
			  			variant = "outline-success" 
			  			className = "float-right" 
			  			style = {{'margin-right':'10px'}}>
			  			✅
			  		</Button>
			  	</ListGroup.Item>
	       	));
	       this.setState({
	       	requests: reqs
	       });
	    });
	    // LOAD FRIENDS
	    get('/request/recycler/' + window.sessionStorage.getItem('CafewUserId') + '/FRIENDS')
	    .then(requests => {
	    	const friends = requests.map(friend => (
	    		<ListGroup>
				  <ListGroup.Item>
				  	{ friend.producerAlias }
				  	<Button 
				  		variant="outline-danger" 
				  		className="float-right" 
				  		style={{'margin-right':'10px'}}>
				  		❌
				  	</Button>
				  </ListGroup.Item>
				</ListGroup>
	       	));
	       this.setState({
	       	friends: friends
	       });
	    });
	}

	render() {
		return (
			<div>
				<h4>Demandes</h4>
				<ListGroup>
					{ this.state.requests }
				</ListGroup>
				<br/>
				<h4>Clients</h4>
					{ this.state.friends }
				<br/>
			</div>
		);
	}

}


/*
{"_id":{"$oid":"5f84bff7f88548d3bc8349b9"},"producer":"5f84bf1a0543db17b839587f","producerAlias":"AdèleVeronnet","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"PENDING"}
{"_id":{"$oid":"5f84c906f88548d3bc8349bf"},"producer":"5f84bf1a0543db17b839587t","producerAlias":"NicolasPetit","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"PENDING"}
{"_id":{"$oid":"5f84cc6ef88548d3bc8349c0"},"producer":"5f84bf1a05s3db17b839587t","producerAlias":"EmmaStone","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"FRIENDS"}
*/