const { createServer } = require('http');
const { stdout } = require('process');
const url = require('url');
const { respond, ERROR_REGISTER_DATA, ERROR_WORKER_NOT_FOUND } = require('./utils');

let server;

function run() {
  server = createServer((req, res) => {
    try {
      const uri = url.parse(req.url, true);
      switch (uri.pathname) {
        case '/register':
          if (req.method === 'POST') {
            return registerWorker(req, res);
          } else {
            respond(404);
          }
          break;
        case '/list':
          if (req.method === 'GET') {
            return workerList(req, res);
          } else {
            respond(404);
          }
          break;
        case '/remove':
          if (req.method === 'DELETE') {
            return disMember(req, res);
          } else {
            respond(404);
          }
          break;
        case '/add-task':
          if (req.method === 'POST') {
            return addTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/update-task':
          if (req.method === 'PUT') {
            return updateTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/drop-task':
          if (req.method === 'DELETE') {
            return dropTask(req, res);
          } else {
            respond(404);
          }
          break;
        default:
          respond(404);
      }
    } catch (err) {
      respond(500, 'unkown server error');
    }
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
