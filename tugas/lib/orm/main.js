/* eslint-disable no-unused-vars */
const { getConnection, createConnection } = require('typeorm');
const { TaskSchema, Task } = require('./entities/task-model');
const { WorkerSchema } = require('./entities/worker-model');
const path = require('path');

function init() {
    return createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'sanbercode',
        // type: 'postgres',
        // host: 'localhost',
        // port: 5432,
        // username: 'postgres',
        // password: 'postgres',
        // database: 'sanbercode2',
        // type: "sqlite",
        // database: path.resolve(__dirname, '../../../../sanbercode.db'),
        synchronize: true,
        // dropSchema: true,
        timezone: 'Asia/Jakarta',
        entities: [TaskSchema, WorkerSchema],
    });
}

async function writeWorker(data) {
    const conn = await init();
    const worker = conn.getRepository('Worker');
    const create = worker.create(data);
    await worker.save(create);

    conn.close();
}

async function writeTask(data) {
    const conn = await init();
    const task = conn.getRepository('Task');
    const create = task.create(data);
    await task.save(create);

    conn.close();
}

async function readTask() {
  const conn = await init();
  const task = conn.getRepository('Task');
  let jobs = await task.find({ relations: ['assignee'] });
  conn.close();
  return JSON.stringify(jobs);
}

async function readWorker() {
  const conn = await init();
  const worker = conn.getRepository('Worker');
  let workers = await worker.find();
  conn.close();
  return JSON.stringify(workers);
}

async function deleteWorker(id) {
  const conn = await init();
  await conn
    .createQueryBuilder()
    .delete()
    .from('Worker')
    .where(' id = :id', { id })
    .execute();
  conn.close();
}

async function updateTask(data, id) {
  const conn = await init();
  await conn
    .createQueryBuilder()
    .update('Task')
    .set(data)
    .where(' id = :id', { id })
    .execute();
  conn.close();
}

module.exports = {
  writeWorker,
  writeTask,
  readTask,
  readWorker,
  deleteWorker,
  updateTask,
};
