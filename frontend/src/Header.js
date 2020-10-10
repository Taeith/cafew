import React from 'react';

import { Nav, Navbar, Button } from 'react-bootstrap';

import $ from 'jquery';

import './Header.css';

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
      isLoggedIn: true,//username != null,
      username: "Taeith"//username
    };  
    this.handleCloseSignup = () => this.setState({setShowSignup: false, showSignup: false});
    this.handleShowSignup = () => this.setState({setShowSignup: true, showSignup: true});
    this.handleCloseLogin = () => this.setState({setShowLogin: false, showLogin: false});
    this.handleShowLogin = () => this.setState({setShowLogin: true, showLogin: true});
    this.handleCloseProfile = () => this.setState({setShowProfile: false, showProfile: false});
    this.handleShowProfile = () => this.setState({setShowProfile: true, showProfile: true});
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
        <Navbar collapseOnSelect expand="sm" variant="dark">
          <Brand />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse 
            id="responsive-navbar-nav"
            className="justify-content-end" >    
            <Nav className="ml-auto">
              <Nav className="buttons">
                <Navbar.Text>
                  Connecté en tant que : <span className="white">{ this.state.username }</span>
                </Navbar.Text>
              </Nav>              
              <Nav className="buttons">
                <Button 
                  onClick = { this.handleShowProfile } 
                  variant = "outline-primary" 
                  className = "profileButton">
                  Mon profil
                </Button>
                <Button 
                  onClick = { this.signout }
                  variant = "outline-danger" 
                  className = "signoutButton" >
                  Déconnexion
                </Button>
              </Nav>
            </Nav>
          </Navbar.Collapse>
          <Profile
            showProfile={ this.state.showProfile } 
            handleCloseProfile={ this.handleCloseProfile } />
        </Navbar>
      );
    } else {
      return (
        <Navbar collapseOnSelect expand="sm" variant="dark">
          <Brand />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link 
                className="header-link" 
                onClick={ this.handleShowSignup }>Inscription
              </Nav.Link>
              <Nav.Link 
                className="header-link" 
                onClick={ this.handleShowLogin }>Connexion
              </Nav.Link>
            </Nav>            
          </Navbar.Collapse>
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