import React from 'react';

import { Modal, Button, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { get, put } from './Utils.js';
import './Profile.css';

export default class Profile extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      quantity: '',
      street: '',
      city: '',
      day: '',
      hour: '',
      disabled: false,
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,        
    }, () => {
      this.setState({
        disabled: !this.isValid()
      });
    });
  };

  handleSubmit = () => {
    put('/auth/user/' + window.sessionStorage.getItem('CafewUserId'),
      JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        quantity: this.state.quantity,
        street: this.state.street,
        city: this.state.city,
        day: this.state.day,
        hour: this.state.hour,
    }))
    .then((response) => {  
      this.props.handleCloseProfile(); 
      this.props.handleShowToast("success", "La modification a été validée");
    })
    .catch(error => {
      this.props.handleShowToast("danger", "Le serveur est temporairement indisponible."
    )});
  };

  load = () => {
    get('/auth/user/' + window.sessionStorage.getItem('CafewUserId'))
    .then(user => {
       this.setState({
        email: user.email,
        username: user.username,
        quantity: user.quantity,
        street: user.street,
        city: user.city,
        day: user.day,
        hour: user.hour
       });
    });
  }

  isValid() {
    return (
      this.state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null &&
      this.state.username.length > 5);
  }

  render() {
    const days = Array.from({length: 31}, (_, i) => i + 1)
    .map(day => <option>{ day }</option>);
    const hours = Array.from({length: 18}, (_, i = 5) => i + 6)
    .map(hour => <option>{ hour }:00</option>);
    return (
      <Modal
        onEnter = { this.load }
        show = { this.props.showProfile } 
        onHide = { this.props.handleCloseProfile }
        className = "profile" >
        <Modal.Header className="modal-header text-center" closeButton>
          <Modal.Title className="modal-title w-100">Mes informations personnelles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>            
            <Container>
              <h5>Qui ?</h5>
              <Row>                
                <Col>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Adresse e-mail</Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl 
                        type = "text"
                        id = "email" 
                        placeholder = "Adresse e-mail"
                        onChange = { this.handleChange }
                        value = { this.state.email } />
                   </InputGroup>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Nom d'utilisateur</Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>🙂</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl 
                        type = "text"
                        id = "username" 
                        placeholder = "Nom d'utilisateur"
                        onChange = { this.handleChange }
                        value = { this.state.username } />
                   </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <h5>Combien ?</h5>
              <Row>
                <Col>
                  <Form.Group controlId="formQuantity">
                    <Form.Label>La quantité d'engrais (en grammes)</Form.Label>
                    <Form.Control 
                      as = "select"
                      id = "quantity"
                      onChange={ this.handleChange }
                      value = { this.state.quantity } >
                      <option>500</option>
                      <option>750</option>
                      <option>1000</option>
                      <option>1250</option>
                      <option>1500</option>
                      <option>2000</option>
                      <option>3000</option>
                      <option>5000</option>
                    </Form.Control>
                  </Form.Group>
                </Col>                
              </Row>
              <h5>Où ?</h5>
              <Row>
                <Col>
                  <Form.Group controlId="formStreet">
                    <Form.Label>Rue</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="5 Boulevard Descartes"
                      onChange={ this.handleChange }
                      id = "street" 
                      value = { this.state.street }  />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formCity">
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="77420"
                      onChange={ this.handleChange }
                      id = "city"
                      value = { this.state.city } />
                  </Form.Group>
                </Col>
              </Row>
              <h5>Quand ?</h5>
              <Row>
                <Col>
                  <Form.Group controlId="formDay">
                    <Form.Label>Jour</Form.Label>
                    <Form.Control 
                      as="select"
                      id = "day"
                      onChange={ this.handleChange }
                      value = { this.state.day } >
                      { days }
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formHour">
                    <Form.Label>Heure</Form.Label>
                    <Form.Control 
                      as = "select"
                      id = "hour"
                      onChange={ this.handleChange }
                      value = { this.state.hour } >
                      { hours }
                    </Form.Control>
                  </Form.Group>
                </Col>                
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className = "profile-bottom" >
          <Button 
            variant="warning"
            onClick={ this.handleSubmit } 
            disabled={(this.state.disabled) ? 'disabled' : ''} >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}