import React from 'react';

import { Modal, Button, Form } from 'react-bootstrap';

function status(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isRecycler: false,
      email: '',
      username: '',
      password: '',
      disabled: true
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.id]: event.target.id == 'isRecycler' ? event.target.value == 'true' : event.target.value  
      }, () => {
        this.setState({
          disabled: !this.isValid()
        });
      });
    };
    this.handleSubmit = () => {
      fetch('http://127.0.0.1:4200/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isRecycler: this.state.isRecycler,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(status)
      .then((response) => {
        this.props.handleCloseSignup();
        this.props.handleShowToast("success", "L'inscription a été validée, vous pouvez vous connecter.");
      })
      .catch(error => this.props.handleShowToast("danger", "L'adresse e-mail ou le nom d'utilisateur saisi n'est pas disponible."));
    };
  }

  isValid() {
    return this.state.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null &&
      this.state.username.length > 5 &&
      this.state.password.length > 5;
  }

  render() {
    return (
      <Modal 
        show = { this.props.showSignup } 
        onHide = { this.props.handleCloseSignup } >        
        <Modal.Header className="modal-header text-center" closeButton>
          <Modal.Title className="modal-title w-100">Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="isRecycler">
              <Form.Label>Objectif</Form.Label>
              <Form.Control as = "select" onChange = { this.handleChange } >
                <option value = "false" >Je veux recycler mon marc de café</option>
                <option value = "true" >Je souhaite obtenir de l'engrais</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control className="sqddsd" type="email" placeholder="" onChange={ this.handleChange }/>
              <Form.Text className="text-muted">
                Nous ne partagerons jamais votre e-mail avec qui que ce soit.              </Form.Text>
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control type="text" placeholder="" onChange={ this.handleChange }/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="" onChange={ this.handleChange }/>
            </Form.Group>
            <Button variant="primary" disabled={(this.state.disabled) ? 'disabled' : ''}
              onClick={ this.handleSubmit } >
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

}