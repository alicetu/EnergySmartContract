const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiler = require('./build/MeterContractFactory.json');

const provider = new HDWalletProvider(
  'card script maple twenty august frequent ramp merge digital hedgehog misery arrive',
  'https://rinkeby.infura.io/v3/555ca2f4a3fc43b180cee9d463fb4c6e'
);
const web3 = new Web3(provider);

var newDate = new Date();
var timestamp = newDate.getTime();

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(compiler.interface))
    	.deploy({ data: '0x' + compiler.bytecode })
		.send({ from: accounts[0] });
	console.log('Contract deployed to', result.options.address);
};
deploy();
