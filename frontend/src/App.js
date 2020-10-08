import React from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';

// leaflet
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
import { Map, TileLayer } from "react-leaflet";

import './App.css';
import './footer.css';
import './header.css';

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
      <Footer />    
    </div>
  );
}

export default App;
