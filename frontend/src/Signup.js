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
      email: '',
      text: '',
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
      fetch('http://127.0.0.1:4200/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          username: this.state.text,
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
      this.state.text.length > 5 &&
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="" onChange={ this.handleChange }/>
              <Form.Text className="text-muted">
                Nous ne partagerons jamais votre e-mail avec qui que ce soit.              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control type="text" placeholder="" onChange={ this.handleChange }/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="" onChange={ this.handleChange }/>
            </Form.Group>
            <Button variant="primary" disabled={(this.state.disabled) ? 'disabled' : ''}
              onClick={this.handleSubmit} >
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

}