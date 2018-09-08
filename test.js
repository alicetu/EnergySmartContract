const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  'card script maple twenty august frequent ramp merge digital hedgehog misery arrive',
  'https://rinkeby.infura.io/v3/555ca2f4a3fc43b180cee9d463fb4c6e'
);
const web3 = new Web3(provider);

const contractAddress='0xe5175711D116e88F335A42C5a394d05362946C08';
const ABI = JSON.parse('');

const sendData = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to send transaction from account', accounts[0]);
    const dataContract = await new web3.eth.Contract(ABI, contractAddress);
    await dataContract.methods.sendReading('Sun Aug 26 2018',2450,2182,90052)
    .send({ 
        from: accounts[0]
        , function(error, transactionHash){
            console.log(error);
        }
    });

    console.log("Exit");
};

const getData = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to retrieve data');
    const dataContract = await new web3.eth.Contract(ABI, contractAddress);
    const reading = await dataContract.methods.readings(0).call();

    console.log(reading);
};

sendData();
getData();

//0xDE147161288E23B926300b63f636AB0383363Df6
/*
[{
    "constant": false,
    "inputs": [{
        "name": "timestamp",
        "type": "string"
    }, {
        "name": "temperature",
        "type": "uint256"
    }, {
        "name": "humidity",
        "type": "uint256"
    }, {
        "name": "pressure",
        "type": "uint256"
    }],
    "name": "sendReading",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "manager",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
    }],
    "name": "readings",
    "outputs": [{
        "name": "timestamp",
        "type": "string"
    }, {
        "name": "sender",
        "type": "address"
    }, {
        "name": "temperature",
        "type": "uint256"
    }, {
        "name": "humidity",
        "type": "uint256"
    }, {
        "name": "pressure",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}]
*/