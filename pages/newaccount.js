import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Router } from '../routes';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';


class NewContract extends Component {
  state = {
    input:'',
    errorMessage:'',
    loading: false
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const newDate = new Date().getTime();
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createMeterContract(this.state.input, newDate)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };


  render() {
    return (
      <Layout >
        <h2 style={{textAlign: "center"}}>Create New Smart-Meter Contract</h2>

        <div className ="CreateContract">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <Input
                label="Property Name"
                labelPosition="left"
                value={this.state.input}
                onChange={event =>
                  this.setState({ input: event.target.value })}
              />
            </Form.Field>
            <Button floated="right" loading = {this.state.loading} primary>
              Create New Meter Contract
            </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
          </Form>
        </div>

      </Layout>
      
    );
  }
}

export default NewContract;