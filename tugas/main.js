/* eslint-disable no-unused-vars */
const { getConnection, createConnection } = require('typeorm');
const { TaskSchema, Task } = require('./task/task');
const { WorkerSchema } = require('../materi/orm/typeorm/entities/worker');
const path = require('path');

function init() {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    // password: '',
    database: 'dubsium',
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
    entities: [TaskSchema],
  });
}

async function writeData() {
  const task = getConnection().getRepository('Task');
  const t1 = task.create({
    job: 'minum',
    desc: 'memakan nasi goreng',
  });

  await task.save(t1);
}

async function readData(conn) {
  const task = await getConnection().getRepository('Task');

  let jobs = await task.find();
  console.log(jobs);
}

async function main() {
  const conn = await init();
  await writeData();
  await readData();
  conn.close();
  // getConnection().close();
}

module.exports = {
  main,
};
