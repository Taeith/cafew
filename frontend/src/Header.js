import React from 'react';
import { useState } from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Modal, Button, Form } from 'react-bootstrap';

import './Header.css';

export default function Header() {

  // use to open and close signup modal
  const [showSignup, setShowSignup] = useState(false);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  // use to open and close login modal
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><span role="img">☕</span> Cafew</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link className="header-link" onClick={handleShowSignup}>Inscription</Nav.Link>
          <Nav.Link className="header-link" onClick={handleShowLogin}>Connexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>

      <Modal show={showSignup} onHide={handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="" />
              <Form.Text className="text-muted">
                Nous ne partagerons jamais votre e-mail avec qui que ce soit.              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Valider
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Navbar>
  );
}