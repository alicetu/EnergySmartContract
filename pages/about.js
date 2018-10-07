import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';

class SmartMeterAccount extends Component {
  
  render() {
    return (
      <Layout >
        <h2 style={{textAlign: "center"}}>Project: Smart Contract Application for Smart Meter</h2>
          <div style={{textAlign: "center"}}>
          <p><b>Research Topic - Blockchain Application for Mobile Edge Computing Networks</b></p>
          <p><b>Author:</b> Alice Hoang Mai Tu</p>
          <p><b>Supervisor:</b> Hoang Dinh & Diep Nguyen</p>
          <p><b>Project Description:</b> This project is conducted for Research Project Subject of University of Technology Sydney</p>
        </div>
      </Layout>
      
    );
  }
}

export default SmartMeterAccount;