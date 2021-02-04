/* eslint-disable no-unused-vars */
const { getConnection, createConnection } = require('typeorm');
const { TaskSchema } = require('./entities/task-model');
const { WorkerSchema } = require('./entities/worker-model');

let conn;

function init() {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sanbercode',
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities: [TaskSchema, WorkerSchema],
  });
}

async function writeWorker(data) {
  const worker = getConnection().getRepository('Worker');
  const create = worker.create(data);
  await worker.save(create);
}

async function writeTask(data) {
  const task = getConnection().getRepository('Task');
  const create = task.create(data);
  await task.save(create);
}

async function readTask() {
  const task = getConnection().getRepository('Task');
  let jobs = await task.find({ relations: ['assignee'] });
  return JSON.stringify(jobs);
}

async function readWorker() {
  const worker = getConnection().getRepository('Worker');
  let workers = await worker.find();
  return JSON.stringify(workers);
}

async function deleteWorker(id) {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from('Worker')
    .where(' id = :id', { id })
    .execute();
}

async function updateTask(data, id) {
  await getConnection()
    .createQueryBuilder()
    .update('Task')
    .set(data)
    .where(' id = :id', { id })
    .execute();
}

async function connect() {
  conn = await init();
}

async function close() {
  conn.close();
}

module.exports = {
  connect,
  close,
  writeWorker,
  writeTask,
  readTask,
  readWorker,
  deleteWorker,
  updateTask,
};
