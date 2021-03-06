import React from 'react';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

import './footer.css';

export default function Footer() {
  return (
      <Container className="footer">
        <Row className="footer-top">
          <Col>
            <img src="/coffee.png" className="logo" />
            <p className="footer-top-text">
              Caféw, l'application de recyclage de marc de café
            </p>
          </Col>
        </Row>
        <Row className="footer-down">
          <Col className="footer-down-text">© 2020 <a href="https://github.com/Taeith" target="_blank">Taeith</a>. All Rights Reserved</Col>
        </Row>
      </Container>
    );
}