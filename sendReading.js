// Get required components
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  'card script maple twenty august frequent ramp merge digital hedgehog misery arrive',
  'https://rinkeby.infura.io/v3/555ca2f4a3fc43b180cee9d463fb4c6e'
);
const web3 = new Web3(provider);


// Declare contract address and interface
const contractAddress='0xCFE184F2ddfF56273D7b0ECDa117b8bBE13128E5';
const ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"startDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"property","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSummary","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"timestamp","type":"uint256"},{"name":"kWh","type":"uint256"}],"name":"sendReading","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"readings","outputs":[{"name":"timestamp","type":"uint256"},{"name":"kWh","type":"uint256"},{"name":"readingBill","type":"uint256"},{"name":"dueDate","type":"uint256"},{"name":"paymentReceived","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"payBill","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"propertyName","type":"string"},{"name":"contractDate","type":"uint256"},{"name":"provider","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

// Declare variables
const async = require('async');
const timestamp = new Date().getTime();
console.log(timestamp);
var energyReadingkWh;


// Get energy reading from smart meter
// Create an empty modbus client
const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

// Open connection to a serial port
client.connectRTUBuffered("/dev/ttyUSB0", {baudRate: 9600, parity: 'none'});
client.setID(1);
client.open();

// Read smart meter
async function read() {
    try {
        reading = await client.readInputRegisters(256,1);
        energyReadingkWh = reading.data[0]
        console.log(energyReadingkWh);

    } catch (err) {
        console.log(err);
    }
}

setTimeout(read, 5000);

// Send reading to smart contract
const sendData = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to send transaction of energy reading from accuont', accounts[0]);
    const dataContract = await new web3.eth.Contract(ABI, contractAddress);
    await dataContract.methods.sendReading(timestamp,energyReadingkWh)
    .send({
        gas: '1000000',
        from: accounts[0]
        , function(error, transactionHash){
            console.log("Failed to send reading, error is /n" + error);
        }
    });

    console.log("Send reading attempt completed");
};

setTimeout(sendData,10000);
