import React from 'react';

import { ListGroup, Button } from 'react-bootstrap';

export default class Contacts extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<h4>Demandes</h4>
				<ListGroup>
				  <ListGroup.Item>
				  	@Taeith
				  	<Button variant="outline-danger" className="float-right" style={{'margin-right':'10px'}}>❌</Button>
				  	<Button variant="outline-success" className="float-right" style={{'margin-right':'10px'}}>✅</Button>
				  </ListGroup.Item>
				  <ListGroup.Item>@Edaeron
					  <Button variant="outline-danger" className="float-right" style={{'margin-right':'10px'}}>❌</Button>
					  <Button variant="outline-success" className="float-right" style={{'margin-right':'10px'}}>✅</Button>
				  </ListGroup.Item>
				  <ListGroup.Item>@Karwen
				  	<Button variant="outline-danger" className="float-right" style={{'margin-right':'10px'}}>❌</Button>
				  	<Button variant="outline-success" className="float-right" style={{'margin-right':'10px'}}>✅</Button>
				  </ListGroup.Item>
				</ListGroup>
				<br/>
				<h4>Clients</h4>
				<ListGroup>
				  <ListGroup.Item>@Lightowar
				  <Button variant="outline-danger" className="float-right" style={{'margin-right':'10px'}}>❌</Button></ListGroup.Item>
				</ListGroup>
				<br/>
			</>
		);
	}

}