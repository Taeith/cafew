import React from 'react';

import { Toast } from 'react-bootstrap';

import './CustomToast.css';

export default function CustomToast(props) {
  return(
    <div
    	className = 'customToast' >
	    <Toast
	        onClose = { props.handleCloseToast } 
	        show = { props.showToast }
	        delay = { 3000 }	        
	        autohide>
	      <Toast.Header
	      	className = { (props.type == 'success' ? 'customToast-success' : 'customToast-danger') } >
	        <strong className="mr-auto">Notification</strong>
	        <small>Maintenant</small>
	      </Toast.Header>
	      <Toast.Body>
	        { props.message }
	      </Toast.Body>
	    </Toast>
    </div>
  );
}