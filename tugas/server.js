const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');

const { readData } = require('./db/models/task-model');
const {
  read,
  create,
  delete: deleteTask,
  update
} = require('./controllers/task.service');

//Task service module here

// async function dbconnect(){
//     try {
//         const client = await db.connect()

//         stdout.write('Connected to db');
//     } catch (err) {
//         stdout.write(err)
//     }
// }

// dbconnect()

const server = createServer((req, res) => {
  req.params = {};
  let method = req.method;
  // route service
  let message = 'tidak ditemukan data';
  let statusCode = 200;
  const uri = url.parse(req.url, true);
  const respond = async () => {
    // const data = await readData();
    res.setHeader('content-type', 'application/json');
    res.statusCode = statusCode;
    res.write(message);
    res.end();
  };

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
    case uri.pathname.includes('/task'):
      req.params.id = uri.pathname.split('/')[2];
      if(method === 'DELETE'){
        deleteTask(req, res);
      } else if (method === 'PUT'){
        update(req, res)
      }
      break;
    default:
      statusCode = 404;
      respond();
  }
});

const PORT = 9999;
server.listen(PORT, () => {
  stdout.write(`server listening on port ${PORT}\n`);
});
