import React from 'react';

import { Tab, Row, Col, ListGroup, Button } from 'react-bootstrap';

export default class Messages extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
			  <Row>
			    <Col sm={4}>
			      <ListGroup>
			        <ListGroup.Item action href="#link1">
			          Link 1
			        </ListGroup.Item>
			        <ListGroup.Item action href="#link2">
			          Link 2
			        </ListGroup.Item>
			      </ListGroup>
			    </Col>
			    <Col sm={8}>
			      <Tab.Content>
			        <Tab.Pane eventKey="#link1">
			          sdsdqsdqssqsd sqsdqsdq dqsdsdsqsqd sqddsds
			        </Tab.Pane>
			        <Tab.Pane eventKey="#link2">
			          sdsdqsdqssqsd sqsdqsdq dqsdsdsqsqd sqddsds
			        </Tab.Pane>
			      </Tab.Content>
			    </Col>
			  </Row>
			</Tab.Container>
		);
	}

}