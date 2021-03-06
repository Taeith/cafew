import React from 'react';

// routes
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// components
import Header from './Header';
import CustomMap from './CustomMap';
import Showcase from './Showcase';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Parameters from './Parameters';
import Profile from './Profile';
import Contacts from './Contacts';
import Messages from './Messages';
import CustomToast from './CustomToast';

import './App.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		const username = window.sessionStorage.getItem('CafewUsername');
		this.state = {
			isLoggedIn: username != null,			
			customToast: {
	        	type: '',
	        	message: '',
	        	show: false,
	        	setShow: false
	      	}
		};
	}

	setIsLoggedIn = (isLoggedIn) => {
		this.setState({
			isLoggedIn: isLoggedIn
		});
	};

	handleShowToast = (type, message) => {
      this.setState({
        customToast: {
          type: type,
          message: message,
          show: true, 
          setShow: true
        }
      });
    };

	handleCloseToast = () => this.setState(prevState => ({
      customToast: {
        ...prevState.customToast,
        show: false, 
        setShow: false
      }
    }));    

	render() {
		return (
			<div className="app">
				<Router>
					<Header
						isLoggedIn = { this.state.isLoggedIn }
						setIsLoggedIn = { this.setIsLoggedIn } 
						handleShowToast = { this.handleShowToast } />
					<Container fluid style={{'margin-bottom':'30px', 'min-height':'700px'}}>
						<Row> {
							this.state.isLoggedIn ? 
								(<Col xs = { 12 } md = { 2 } id = "sidebar-wrapper" ><Sidebar /></Col>) :
								''
							}
							<Col 
								xs = { 12 } 
								md = { this.state.isLoggedIn ? 10 : 12 }
								lg = { this.state.isLoggedIn ? 8 : 12 } 
								id = "page-content-wrapper" >							
								<Switch>
									<Route path="/profile">
										<Profile
								            showProfile = { this.state.showProfile } 
								            handleCloseProfile = { this.handleCloseProfile } 
								            handleShowToast = { this.handleShowToast } />
									</Route>
									<Route path="/contacts">
										<Contacts 
											handleShowToast = { this.handleShowToast } />
									</Route>
									<Route path="/messages">
										<Messages />
									</Route>
									<Route path="/parametres">
										<Parameters 
											handleShowToast = { this.handleShowToast } />
									</Route>
									<Route path="/">
										<CustomMap />
										<Showcase />
									</Route>
								</Switch>
							</Col>
						</Row>
					</Container> 
					<Footer />
					<CustomToast
		            	handleCloseToast = { this.handleCloseToast } 
		            	showToast = { this.state.customToast.show }
		            	type = { this.state.customToast.type }
		            	message = { this.state.customToast.message } />
				</Router>			
			</div>		
  		);
	}
}

export default App;
