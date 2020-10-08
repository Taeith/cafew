import React from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';

// leaflet
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
import { Map, TileLayer } from "react-leaflet";

import './App.css';
import './header.css';
import './footer.css';
import './showcase.css';

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><span role="img">☕</span> Cafew</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link className="header-link" href="">Inscription</Nav.Link>
          <Nav.Link className="header-link" eventKey={2} href="">Connexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
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
      </Map>
      </div>
      <ShowCase />
      <Footer />    
    </div>
  );
}

export default App;
