const { createServer } = require('http');
const { stdout } = require('process');

const routers = require('./routers')

const server = createServer((req, res) => {
  routers(req, res);
});

const PORT = 9999;
server.listen(PORT, () => {
  stdout.write(`server listening on port ${PORT}\n`);
});

module.exports = server
