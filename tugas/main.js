const { init } = require('./task/task.service');
const { run } = require('./server');
async function main() {
  try {
    console.log('connecting....');
    await init();
    console.log('Server connected');
  } catch (err) {
    console.error('Koneksi error = ', err);
    return;
  }
  run();
}

main();
