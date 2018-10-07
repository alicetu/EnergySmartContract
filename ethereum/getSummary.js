// Get required components
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  'card script maple twenty august frequent ramp merge digital hedgehog misery arrive',
  'https://rinkeby.infura.io/v3/555ca2f4a3fc43b180cee9d463fb4c6e'
);
const web3 = new Web3(provider);
const compiler = require('./build/SmartMeter.json');
const MeterContractFactory = require('./build/MeterContractFactory.json');

// Declare contract address and interface
const contractAddress = '0xCFE184F2ddfF56273D7b0ECDa117b8bBE13128E5';
const ABI = compiler.interface;

// Read the latest reading submitted to smart contract
const getContractSummary = async () => {
    console.log('Attempting to retrieve last reading');
    const dataContract = await new web3.eth.Contract(JSON.parse(ABI), contractAddress);
    const summary = await dataContract.methods.getSummary().call();
    const arrayLength = summary[4];
    
    console.log(summary);
    console.log("The manager of this contract is " + summary[0]);
    console.log("For property nmea " + summary[1]);
    console.log("Contract start date is " + summary[2]);
    console.log("Contract unit price is " + summary[3]);
    if (arrayLength == 0) {
        console.log("No reading has been submitted");
    } else {
        var reading = await dataContract.methods.readings(arrayLength - 1).call();
        console.log("The last reading successfully sent to smart contract is " + reading.kWh);
    }
    console.log("ABI:" + compiler.interface)
    
};

setTimeout(getContractSummary,1000);
