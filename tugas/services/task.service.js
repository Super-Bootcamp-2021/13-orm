const {respond} = require('../route/utils')
const {url} = require('url')

async function taskServices(req, res){
try {
    const uri = url.parse(req.url, true);
    switch (uri.pathname) {
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
}

exports.taskServices = taskServices