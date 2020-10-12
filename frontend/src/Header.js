import React from 'react';

import { Nav, Navbar, Button } from 'react-bootstrap';

import $ from 'jquery';

import './header.css';

import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';

function Brand() {
  return (
    <Navbar.Brand>
      <img src="/coffee.png" className="brand-logo"/>
      <span className="brand-name">Caféw</span>
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
      showProfile: false,
      setShowProfile: false,
      isLoggedIn: username != null,
      username: username
    };
    // Modals
    this.handleCloseSignup = () => this.setState({setShowSignup: false, showSignup: false});
    this.handleShowSignup = () => this.setState({setShowSignup: true, showSignup: true});
    this.handleCloseLogin = () => this.setState({setShowLogin: false, showLogin: false});
    this.handleShowLogin = () => this.setState({setShowLogin: true, showLogin: true});
    this.handleCloseProfile = () => this.setState({setShowProfile: false, showProfile: false});
    
    this.handleShowProfile = () => {
      this.setState({
        setShowProfile: true, 
        showProfile: true
      });
    };
    this.handleAuthentification = (username) => {
      this.handleCloseLogin();
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
      this.handleShowToast("success", "La session a été supprimée.");
    };
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Navbar expand="sm" variant="dark">      
          <Brand />
            <Nav className="ml-auto justify-content-end">
              <Nav className="buttons">
                <Navbar.Text className="d-none d-sm-block">
                  Connnecté en tant que : <span className="white">{ this.state.username }</span>
                </Navbar.Text>
              </Nav>              
              <Nav className="buttons">
                <Button 
                  onClick = { this.signout }
                  variant = "outline-danger" 
                  className = "signoutButton" >
                  Déconnexion
                </Button>
              </Nav>
            </Nav>
        </Navbar>
      );
    } else {
      return (
        <Navbar variant="dark">
          <Brand />
          <Nav className="ml-auto justify-content-end">
            <Nav.Link 
              className="header-link" 
              onClick={ this.handleShowSignup } >
              Inscription
            </Nav.Link>
            <Nav.Link 
              className="header-link" 
              onClick={ this.handleShowLogin } >
              Connexion
            </Nav.Link>
          </Nav>            
          <Signup 
            showSignup = { this.state.showSignup } 
            handleCloseSignup = { this.handleCloseSignup } 
            handleShowToast = { this.handleShowToast } />
          <Login 
              showLogin = { this.state.showLogin } 
              handleCloseLogin = { this.handleCloseLogin } 
              handleAuthentification = { this.handleAuthentification }
              handleShowToast = { this.handleShowToast } />
        </Navbar>
      );
    }
  }

}

/*
  <Button 
    onClick = { this.handleShowProfile } 
    variant = "outline-primary" 
    className = "profileButton">
    Mon profil
  </Button>
  <Button 
    onClick = { this.handleShowProfile } 
    variant = "outline-primary" 
    className = "profileButton">
    Contacts
  </Button>
*/