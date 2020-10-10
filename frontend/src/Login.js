import React from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

export default class Login extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.type]: event.target.value,        
      }, () => {
        this.setState({
          disabled: !this.isValid()
        });
      });
    };
    this.handleSubmit = () => {
      fetch('http://127.0.0.1:4200/api/auth/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then(data => {
        if (data.token != undefined && data.username != undefined) {
          window.sessionStorage.setItem('CafewToken', data.token);
          window.sessionStorage.setItem('CafewUsername', data.username);
          props.handleAuthentification(data.username);
        }        
      });
    };
  }

  isValid() { // nils.pernet@hotmail.com Edaerown
    return this.state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null &&
      this.state.password.length > 5;
  }

  render() {
    return (
      <Modal show={ this.props.showLogin } onHide={ this.props.handleCloseLogin }>
        <Modal.Header className="modal-header text-center" closeButton>
          <Modal.Title className="modal-title w-100">Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control type="email" onChange={ this.handleChange }/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" onChange={ this.handleChange }/>
            </Form.Group>
            <Button variant="primary" disabled={(this.state.disabled) ? 'disabled' : ''}
              onClick={ this.handleSubmit }>
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}