const { serve } = require('./lib/server');
const { init } = require('./lib/orm/main');

async function main() {
  await init();
  serve();
}

main();
