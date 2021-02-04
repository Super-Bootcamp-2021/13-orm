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

async function writeData(connection, name, profile, email, nohp, biografi) {
  const worker = connection.getRepository('Worker');

  const isiWorker = new Worker(null, name, profile, email, nohp, biografi);
  await worker.save(isiWorker);
  // const budi = worker.create({ name: 'budi' });
  // const susi = worker.create({ name: 'susi' });
  // await worker.save([budi, susi]);

  // const task = connection.getRepository('Task');
  // const t1 = new Task(null, 'makan', budi);
  // await task.save(t1);

  // await task.save([
  //   { job: 'minum', assignee: susi },
  //   { job: 'belajar', assignee: { id: budi.id } },
  // ]);
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

async function writeDataWorker(name, profile, email, nohp, biografi) {
  try {
    const conn = await init();
    await writeData(conn, name, profile, email, nohp, biografi);
    conn.close();
  } catch (err) {
    console.error(err);
  }

  // getConnection().close();
}


module.exports = {
  writeDataWorker,
};
