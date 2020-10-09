import React from 'react';

import { Nav, Navbar, Button } from 'react-bootstrap';

import $ from 'jquery';

import './Header.css';

import Signup from './Signup';
import Login from './Login';

function Brand() {
  return (
    <Navbar.Brand href="#home">
      <span className="brand-logo" role="img">☕</span>
      <span className="brand-name">Caféw Carnaval</span>
    </Navbar.Brand>
  );
}

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    const username = window.sessionStorage.getItem('CafewUsername');
    this.state = {
      showSignup: false,
      setShowSignup: false,
      showLogin: false,
      setShowLogin: false,
      isLoggedIn: username != null,
      username: username
    };  
    this.handleCloseSignup = () => this.setState({setShowSignup: false, showSignup: false});
    this.handleShowSignup = () => this.setState({setShowSignup: true, showSignup: true});
    this.handleCloseLogin = () => this.setState({setShowLogin: false, showLogin: false});
    this.handleShowLogin = () => this.setState({setShowLogin: true, showLogin: true});
    this.handleAuthentification = (username) => {
      this.setState({
        isLoggedIn: true,
        username: username
      });
    }
    this.signout = () => {
      window.sessionStorage.removeItem('CafewToken');
      window.sessionStorage.removeItem('CafewUsername');
      this.setState({
        isLoggedIn: false,
        username: ''
      });
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Navbar bg="dark" variant="dark">
          <Brand />
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">            
            <Navbar.Text>
              Connecté en tant que : <span className="white">{ this.state.username }</span>
            </Navbar.Text>
            <Button variant="outline-primary" className="profileButton">Mon profil</Button>
            <Button onClick={ this.signout }variant="outline-danger" className="signoutButton">Déconnexion</Button>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Brand />
          <Nav.Link className="header-link ml-auto" onClick={ this.handleShowSignup }>Inscription</Nav.Link>
          <Nav.Link className="header-link" onClick={ this.handleShowLogin }>Connexion</Nav.Link>
          <Signup 
            showSignup={ this.state.showSignup } 
            handleCloseSignup={ this.handleCloseSignup } />
          <Login 
              showLogin={ this.state.showLogin } 
              handleCloseLogin={ this.handleCloseLogin } 
              handleAuthentification={ this.handleAuthentification }/>
        </Navbar>
      );
    }
  }

}