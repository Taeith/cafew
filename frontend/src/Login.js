import React from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

import { post } from './Utils.js';

export default class Login extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true
    }    
  }

  handleChange = (event) => {
    this.setState({
      [event.target.type]: event.target.value,        
    }, () => {      
      this.setState({        
        disabled: !this.isValid()
      });
    });
  };

  handleSubmit = () => {
    post('/auth/login/',
      JSON.stringify({
        email: this.state.email,
        password: this.state.password
    }))
    .then(data => {
      if (data.token != undefined && data.username != undefined) {
        this.props.signin(data.username);
        window.sessionStorage.setItem('CafewUserId', data.userId);
        window.sessionStorage.setItem('CafewUsername', data.username);
        window.sessionStorage.setItem('CafewToken', data.token);
      }     
    })
    .catch(error => {
      console.log(error);
      this.props.handleShowToast("danger", "L'adresse e-mail ou le mot de passe est incorrect.");
    });
  };

  isValid() {
    return this.state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null &&
      this.state.password.length > 5;
  }

  render() {
    return (
      <Modal 
        show={ this.props.showLogin } 
        onHide={ this.props.handleCloseLogin }>
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
            <Button 
              variant = "primary" 
              disabled = { (this.state.disabled) ? 'disabled' : '' }
              onClick = { this.handleSubmit } >
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}