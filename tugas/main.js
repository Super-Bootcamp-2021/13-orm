const { createServer } = require('http');
const url = require('url');
const { main } = require('./task/task.service');
const { stdout } = require('process');

const server = createServer(async (req, res) => {
  //   let method = req.method;
  // route service
  let message = 'tidak ditemukan data';
  let statusCode = 200;
  const uri = url.parse(req.url, true);
  const respond = () => {
    res.statusCode = statusCode;
    res.write(message);
    res.end();
  };
  switch (uri.pathname) {
    case '/task':
      await main(req, res);
      res.end();

      break;
    default:
      statusCode = 404;
      respond();
  }
});

const PORT = 1212;
server.listen(PORT, () => {
  stdout.write('server jalan di port ' + PORT);
});
