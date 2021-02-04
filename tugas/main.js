const server = require('./server');

/**
 * main routine
 * @returns {Promise<void>}
 */
function main() {
//   try {
//     console.log('connect to KV service...');
//     await kv.connect();
//     console.log('KV connected');
//   } catch (err) {
//     console.error('KV connection failed');
//     return;
//   }

  console.log('running service...');
  server.run();
}

main();