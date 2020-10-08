import React from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

// components
import Header from './Header';
import CustomMap from './CustomMap';
import Showcase from './Showcase';
import Footer from './Footer';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <CustomMap />
      <Showcase />
      <Footer /> 
    </div>
  );
}

export default App;
