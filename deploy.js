const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'card script maple twenty august frequent ramp merge digital hedgehog misery arrive',
  'https://rinkeby.infura.io/v3/555ca2f4a3fc43b180cee9d463fb4c6e'
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(interface))
    	.deploy({ data: '0x' + bytecode })
		.send({ from: accounts[0] });

	console.log(interface);
	console.log('Contract deployed to', result.options.address);
};
deploy();

//0x3bc87b76403fc4074cfc001f5cA78982A8898F13
/*
[{"constant":false,"inputs":[{"name":"timestamp","type":"string"},{"name":"temperature","type":"uint256"},{"name":"humidity","type":"uint256"},{"name":"pressure","type":"uint256"}],"name":"sendReading","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"readings","outputs":[{"name":"timestamp","type":"string"},{"name":"sender","type":"address"},{"name":"temperature","type":"uint256"},{"name":"humidity","type":"uint256"},{"name":"pressure","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
*/