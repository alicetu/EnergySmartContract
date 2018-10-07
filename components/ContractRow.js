import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import SmartMeter from '../ethereum/smartmeter';
import { Link } from '../routes';

class ContractRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, address } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{address}</Cell>
        <Cell>
          <Link route={`/`}>
            <a>View Details</a>
          </Link>
        </Cell>
      </Row>
    );
  }
}

export default ContractRow;
