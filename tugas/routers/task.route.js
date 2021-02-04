const url = require('url');
const {
  read,
  create,
  delete: deleteTask,
  update,
} = require('../controllers/task.service');

function taskRoutes(req, res){
    let method = req.method;
    let message = 'tidak ditemukan data';
    let statusCode = 200;
    const uri = url.parse(req.url, true);    

    const respond = async () => {
      res.statusCode = statusCode;
      res.write(message);
      res.end();
    };

    if(method !== 'GET'){
        req.params = {}
    }

    switch (true) {
        
      case uri.pathname === '/task':
        res.setHeader('content-type', 'application/json');
        if (method === 'GET') {
          message = 'GET TASK';
          // respond();
          read(req, res);
        } else if (method === 'POST') {
          message = 'POST TASK';
          // respond();
          create(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case /task*/.test(uri.pathname):
        res.setHeader('content-type', 'application/json');
        req.params.id = uri.pathname.split('/')[2];
        if (method === 'DELETE') {
          deleteTask(req, res);
        } else if (method === 'PUT') {
          update(req, res);
        } else {
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      default:
        statusCode = 404;
        respond();
    }
}

module.exports = taskRoutes