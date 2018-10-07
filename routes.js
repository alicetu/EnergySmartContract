const routes = require('next-routes')();

routes
  .add('/about', '/about')
  .add('/newaccount', '/newaccount')
  .add('/management', '/management');

module.exports = routes;
