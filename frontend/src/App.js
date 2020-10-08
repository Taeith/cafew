import React from 'react';
import { useState } from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';

// leaflet
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import Markers from './Markers';

import './App.css';
import './header.css';
import './footer.css';
import './showcase.css';

function Header() {

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

function Footer() {
  return (
      <Container className="footer">
        <Row className="footer-top">
          <Col>
            <span role="img" className="logo">☕</span>
            <p className="footer-top-text">
              Cafew, l'application de recyclage de marc de café
            </p>
          </Col>
        </Row>
        <Row className="footer-down">
          <Col className="footer-down-text">© 2020 <a href="https://github.com/Taeith" target="_blank">Taeith</a>. All Rights Reserved</Col>
        </Row>
      </Container>
    );
}

function ShowCase() {
  return (
    <Container className="showcase">
      <Row>
        <Col>
          <h1>Comment ça marche ?</h1>
          <p>Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <h2>Comment recycler mon marc de café ?</h2>
          <p>Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <h2>Comment devenir recycleur ?</h2>
          <p>Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <div>

        <Map center={[48.85, 2.6]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers />
        </Map>
        

      </div>
      <ShowCase />
      <Footer /> 
    </div>
  );
}

export default App;
