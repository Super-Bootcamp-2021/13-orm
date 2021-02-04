const { createServer } = require('http');
const { stdout } = require('process');
const taskServices = require('../services/task.service');
const workerServices = require('../services/worker.service');
/**
 * run server
 */
let server;

function run() {
  server = createServer((req, res) => {
    taskServices(req, res);
    workerServices(req, res);
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
