const { connect } = require('./lib/orm/main');
const { serve } = require('./lib/server');

async function main() {
  connect();
  serve();
}

main();
