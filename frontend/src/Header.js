import React from 'react';
import { Link } from "react-router-dom";

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
      username: username,
      showSignup: false,
      setShowSignup: false,
      showLogin: false,
      setShowLogin: false
    };
  }

  signin = (username) => {
    this.setState({
      username: username
    });
    this.handleCloseLogin();
    this.props.setIsLoggedIn(true);
  };
  
  signout = () => {
    window.sessionStorage.removeItem('CafewToken');
    window.sessionStorage.removeItem('CafewUsername');
    this.props.setIsLoggedIn(false);
    this.props.handleShowToast("success", "La session a été supprimée.");
  };

  handleCloseSignup = () => {
    this.setState({
      setShowSignup: false, 
      showSignup: false
    });
  };

  handleShowSignup = () => {
    this.setState({
      setShowSignup: true, 
      showSignup: true
    });
  };

  handleCloseLogin = () => {
    this.setState({
      setShowLogin: false, 
      showLogin: false
    });
  };

  handleShowLogin = () => {
    this.setState({
      setShowLogin: true, 
      showLogin: true
    });
  };

  render() {
    if (this.props.isLoggedIn) {
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
                <Link to="/" >
                 <Button 
                  onClick = { this.signout }
                  variant = "outline-danger" 
                  className = "signoutButton" >
                  Déconnexion
                </Button>
                </Link>
                
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
            handleShowToast = { this.props.handleShowToast } />
          <Login 
              showLogin = { this.state.showLogin } 
              handleCloseLogin = { this.handleCloseLogin } 
              signin = { this.signin }
              handleShowToast = { this.props.handleShowToast } />
        </Navbar>
      );
    }
  }

}