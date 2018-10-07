import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { Chart } from 'primereact/chart';
import { Form, Card, Grid, Button, Input, Message } from 'semantic-ui-react';
import { Link } from '../routes';
import Layout from '../components/Layout';
import SmartMeter from '../ethereum/smartmeter';


class SmartMeterAccount extends Component {
  state = {
    errorMessage:'',
    loading: false,
    inputAddress: '',
    smartMeterAddress: '',
    manager: '',
    property: 'Property Name',
    startDate: 'Start Date',
    unitPrice: 0,
    noOfReadings: 0,
    lastReading: 0,
    labelArray: [],
    usageArray: []
  };

  static async getInitialProps(props) {
    const input = props.query.address;
    return { input };
  }


  onSubmit = async event => {
    event.preventDefault();

    this.setState({ 
      loading: true,
      errorMessage: '',
      labelArray: [],
      usageArray: []
    });


    try {
      const account = SmartMeter(this.state.inputAddress);
      const summary = await account.methods.getSummary().call();
      const date = new Date(parseInt(summary[2]));
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const convertDate = date.getDate() +" "+ months[date.getMonth()]+" "+date.getFullYear();

      this.setState({
        smartMeterAddress: this.state.inputAddress,
        manager: summary[0],
        property: summary[1],
        startDate: convertDate,
        unitPrice: summary[3],
        noOfReadings: summary[4]
      });

      var tempLastReading;
      if (this.state.noOfReadings == 0) {
        tempLastReading = 0;
      } else {
        const temp = await account.methods.readings(summary[4] - 1).call();
        tempLastReading = temp["kWh"]/100;
      }

      this.setState({
        lastReading: tempLastReading
      });

      if (this.state.noOfReadings != 0) {
        var readingArray = [];
        var dateArray =[];
        var usageArr = []
        var i;
        var j;

        for (i = 0; i < this.state.noOfReadings; i++) {
          var reading = await account.methods.readings(i).call();
          var readingkWh = reading["kWh"]/100;
          readingArray.push(readingkWh);

          var readingDate = new Date(parseInt(reading["timestamp"]));
          var convertReadingDate = readingDate.getDate()+ " " +months[readingDate.getMonth()] + " " + readingDate.getFullYear();
          dateArray.push(convertReadingDate);
        }

        for (j = 0; j < readingArray.length - 1; j++) {
          console.log(readingArray.length);
          console.log(readingArray[j]);
          if (j == 0) {
            var usage = readingArray[j] - 160;
            usageArr.push(usage);
          }
          var usage = readingArray[j+1] - readingArray[j];
          usageArr.push(usage);
        }

        this.setState({
          usageArray: [ ...this.state.usageArray, ...usageArr ],
          labelArray: [ ...this.state.labelArray, ...dateArray ]
        });
      }



    }

    catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err);
    }

    this.setState({ loading: false });
  };

  renderCards() {
    const items = [
      {
        header: this.state.property,
        meta: 'Property Name',
        description:
          'The name of the property/location where this smart meter registers consumption'
      },
      {
        header: this.state.startDate,
        meta: 'Start Date',
        description:
          'The date when this contract is activated'
      },
      {
        header: this.state.noOfReadings,
        meta: 'Number of Readings',
        description:
          'Total number of energy reading recorded to the contract'
      },
      {
        header: this.state.lastReading + ' kWh',
        meta: 'Last Reading',
        description:
          'The last reading of energy consumption on this smart meter'
      }
    ];

    return <Card.Group items={items} />;
  }

  renderChart() {
    const data = {
            labels: this.state.labelArray,
            datasets: [
                {
                    label: 'Energy Consumption',
                    backgroundColor: '#2185d0',
                    data: this.state.usageArray,
                }
            ]   
    };

    const axisOptions = {
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        min: 0
                    }
                }]
            }
    }
    return <Chart type="bar" data={data} options={axisOptions}/>;
  }


  render() {
    return (
      <Layout >
        <h2 style={{textAlign: "center"}}>Smart Meter Account</h2>
        <br/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
            <div className = "AccountDetails">
              <h3>Account Details</h3>
              <p>Smart Meter Contract Address: {this.state.smartMeterAddress}</p>
              <p>Provider Address: {this.state.manager}</p>
              <p>Unit Price: {this.state.unitPrice} cent/kWh</p>
            </div>
            </Grid.Column>
            <Grid.Column width={7}>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <Input
                    label="Smart Meter Address"
                    labelPosition="left"
                    value={this.props.input}
                    onChange={event =>
                      this.setState({ inputAddress: event.target.value })}
                    placeholder='Enter address starting with 0x...'
                  />
                </Form.Field>
                <Button floated="right" loading = {this.state.loading} primary>
                  View Details
                </Button>
              <Message error header="Oops!" content={this.state.errorMessage} />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>  
            <Grid.Column width={9}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={7}>{this.renderChart()}</Grid.Column>
          </Grid.Row>
        </Grid>

      </Layout>
      
    );
  }
}

export default SmartMeterAccount;