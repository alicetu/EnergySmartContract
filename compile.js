const path = require('path');
const fs = require('fs');
const solc = require('solc');

const dataPath = path.resolve(__dirname, 'contracts', 'Energy.sol');
const source = fs.readFileSync(dataPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Energy'];