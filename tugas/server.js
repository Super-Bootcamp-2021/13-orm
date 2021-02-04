const { createServer } = require('http');
const { stdout } = require('process');

const routers = require('./routers')

//Task service module here

const server = createServer((req, res) => {
  req.params = {};
  routers(req, res);
});

const PORT = 9999;
server.listen(PORT, () => {
  stdout.write(`server listening on port ${PORT}\n`);
});
