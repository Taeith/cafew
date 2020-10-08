import React from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';

// leaflet
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
import { Map, TileLayer } from "react-leaflet";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><span role="img">☕</span> Cafew</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="#deets">Inscription</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">Connexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

function App() {
  return (
    <div>
      <Header />
      <div>
        <Map center={[48.85, 2.6]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
      </div>      
    </div>
  );
}

export default App;
