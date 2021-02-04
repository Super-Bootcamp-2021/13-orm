const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');

const {readData} = require('./db/models/task-model')


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
  let method = req.method;
  // route service
  let message = 'tidak ditemukan data';
  let statusCode = 200;
  const uri = url.parse(req.url, true);
  const respond = async () => {
      
    const data = await readData()
    res.statusCode = statusCode;
    res.setHeader('content-type', 'application/json')
    res.write(JSON.stringify(data));
    res.end();
  };

  switch (true) {
    case uri.pathname === '/task':
      if (method === 'GET') {
        message = 'GET TASK';
        respond();
      } else if (method === 'POST') {
        message = 'POST TASK';
        respond();
      } else {
        message = 'Method tidak tersedia';
        respond();
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
