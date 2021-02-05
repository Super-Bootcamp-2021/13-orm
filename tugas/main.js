const server = require('./server');
const {connection} = require('./db/connection');


/**
 * main routine
 * @returns {Promise<void>}
 */
async function main() {
  try {
    console.log('connect to db service...');
    await connection.authenticate();
    console.log('db connected');
  } catch (err) {
    console.error('db connection failed');
    return;
  }

  console.log('running service...');
  server.run();
}

main();