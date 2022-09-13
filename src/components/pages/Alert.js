import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

 const Alerts=(props)=> {

  if (show) {
    console.log("meaasaef alert")
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>
          {props.message}
        </p>
      </Alert>
    );
  }
}

export default Alerts;