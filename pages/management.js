import React, { Component } from 'react';
import { Table, Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import ContractRow from '../components/ContractRow';

class Management extends Component {
  static async getInitialProps() {
    const contracts = await factory.methods.getDeployedMeters().call();
    return { contracts };
  }

  renderRows() {
    return this.props.contracts.map((address, index) => {
      return (
        <ContractRow
          id={index + 1}
          address={address}
        />
      );
    });

  }


  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h2 style={{textAlign: "center"}}>Contract Management</h2>
          <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Contract Address</HeaderCell>
              <HeaderCell>View Details</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        </div>
      </Layout>
    );
  }
}

export default Management;
