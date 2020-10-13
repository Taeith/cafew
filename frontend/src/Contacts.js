import React from 'react';

import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

import { get, put, remove } from './Utils.js';

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

	refuseRequest = (id) => {
		remove('/request/' + id)
	    .then((response) => {
	    	this.load();
	      this.props.handleShowToast("success", "La requête à été supprimée.");
	    })
	    .catch(error => {
	      this.props.handleShowToast("danger", "Votre compte n'a pas pu être supprimé."
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
			  			onClick = { () => this.refuseRequest(request._id) }
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
				  		onClick = { () => this.refuseRequest(friend._id) }
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
			<Container>
				<Row>
					<Col>
						<h4>Invitations</h4>
						<p>Ces personnes souhaitent rentrer en contact avec vous :</p>
						<ListGroup>
							{ this.state.requests }
						</ListGroup>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<h4>Contacts</h4>
						<p>Ces personnes constituent votre réseau de recyclage :</p>
						<ListGroup>
							{ this.state.friends }
						</ListGroup>
					</Col>
				</Row>
			</Container>
		);
	}

}


/*
{"_id":{"$oid":"5f84bff7f88548d3bc8349b9"},"producer":"5f84bf1a0543db17b839587f","producerAlias":"AdèleVeronnet","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"PENDING"}
{"_id":{"$oid":"5f84c906f88548d3bc8349bf"},"producer":"5f84bf1a0543db17b839587t","producerAlias":"NicolasPetit","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"PENDING"}
{"_id":{"$oid":"5f84cc6ef88548d3bc8349c0"},"producer":"5f84bf1a05s3db17b839587t","producerAlias":"EmmaStone","recycler":"5f8321487d979720d4d55a07","recyclerAlias":"a14a14","state":"FRIENDS"}
*/