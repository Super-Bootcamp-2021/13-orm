const { createServer } = require('http');
const { stdout } = require('process');
const {router} = require('./router');
/**
 * run server
 */
let server;

function run() {
  server = createServer((req, res) => {
    router(req, res);
  });

  // run server
  const PORT = 1979;
  server.listen(PORT, () => {
    stdout.write(`🚀 server listening on port ${PORT}\n`);
  });
}

/**
 * stop server
 */
function stop() {
  if (server) {
    server.close();
  }
}

module.exports = { run, stop };
