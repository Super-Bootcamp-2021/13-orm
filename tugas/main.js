const { connect } = require('./lib/orm');
const { TaskSchema } = require('./tasks/task.model');
const { WorkerSchema } = require('./worker/worker.model');
const workerServer = require('./worker/server');

/**
 * main routine
 * @returns {Promise<void>}
 */
async function main() {
  try {
    console.log('connect to database');
    await connect([WorkerSchema, TaskSchema], {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'sanbercode2',
    });
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }

  // run server
  workerServer.run();
}

main();
