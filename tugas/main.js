const relationship = require('./lib/relationship');
const server = require('./workers/server');

/**
 * main routine
 * @returns {Promise<void>}
 */
async function main() {
  try {
    console.log('connect to relational database service...');
    await relationship.init();
    console.log('relational database connected');
  } catch (err) {
    console.log(err);
    console.error('relational database connection failed');
    return;
  }

  console.log('running service...');
  server.run();
}

main();
