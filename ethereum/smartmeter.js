import web3 from './web3';
import SmartMeter from './build/SmartMeter.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(SmartMeter.interface), address);
};
