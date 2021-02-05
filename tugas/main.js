
const { init } = require('./lib/orm/main');
const server = require('./server');

async function main() {
  try {
    console.log('Connecting to ORM...');
    await init();
    console.log('ORM connected');
  } catch (err) {
    console.error('ORM connection failed');
    await init().close();
  }

  console.log('running service...');
  server.run();
}

main();
