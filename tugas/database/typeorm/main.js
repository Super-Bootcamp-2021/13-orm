/* eslint-disable no-unused-vars */
const { getConnection, createConnection } = require('typeorm');
const { TaskSchema, Task } = require('./entities/task');
const { WorkerSchema, Worker } = require('./entities/worker');
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
    dropSchema: true,
    timezone: 'Asia/Jakarta',
    entities: [TaskSchema, WorkerSchema],
  });
}

async function writeDataWorkerDB(connection, obj) {
  const worker = connection.getRepository('Worker');

  const isiWorker = new Worker(
    null,
    obj.name,
    obj.profile,
    obj.email,
    obj.nohp,
    obj.biografi,
    obj.photo
  );
  await worker.save(isiWorker);
}

async function writeDataTaskDB(connection, obj) {
  const task = connection.getRepository('Task');
  const isiTask = new Task(null, obj.job, obj.detail, obj.attach, obj.assignee);
  await task.save(isiTask);
}

async function readData() {
  const task = getConnection().getRepository('Task');
  let jobs = await task.find({ relations: ['assignee'] });
  for (const job of jobs) {
    console.log(job);
  }

  jobs = await task
    .createQueryBuilder('Task')
    .leftJoinAndSelect('Task.assignee', 'assignee')
    .getMany();
  for (const job of jobs) {
    console.log(job);
  }
}

async function writeDataWorker(obj) {
  try {
    const conn = await init();
    await writeDataWorkerDB(conn, obj);
    conn.close();
  } catch (err) {
    console.error(err);
  }

  // getConnection().close();
}
async function writeDataTask(obj) {
  try {
    const conn = await init();
    await writeDataTaskDB(conn, obj);
    conn.close();
  } catch (err) {
    console.error(err);
  }

  // getConnection().close();
}

module.exports = {
  writeDataWorker,
  writeDataTask,
};
