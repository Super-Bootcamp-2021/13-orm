const { main } = require('./database/main');
const { run } = require('./route/server');

function serve() {
  main();
  run();
}

serve();
