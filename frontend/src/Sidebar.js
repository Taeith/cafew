import React from 'react';

import { BrowserRouter as Router, Link } from "react-router-dom";

import { Nav, Navbar } from 'react-bootstrap';
import './Sidebar.css';

import { post } from './Utils.js';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar 
        collapseOnSelect e
        xpand="sm" 
        variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="col-sm-4 col-md-12 d-md-block">
          <Nav.Item>
              <Nav.Link 
                eventKey="link-1" >
                <Link to="/profile" >
                  Profile
                </Link>
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link 
                eventKey="link-2" >
                <Link to="/contacts" >
                  Contacts
                </Link>
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link 
                eventKey="link-3"
                onClick = { this.dsdsq } >
                <Link to="/messages" >
                  Messages
                </Link>
              </Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link
                eventKey="link-4" >
                <Link to="/parametres" >
                  Paramètres
                </Link>
              </Nav.Link>
          </Nav.Item>
            </Nav>            
          </Navbar.Collapse>
      </Navbar>
    );
  }

}