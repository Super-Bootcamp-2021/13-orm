const { respond } = require('../route/utils');
const { url } = require('url');
const { registerWorker, workerList, disMember} = require('../lib/task-services')

async function workerServices(req, res) {
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
      default:
        respond(404);
    }
  } catch (err) {
    respond(500, 'unkown server error');
  }
}

exports.workerServices = workerServices;
