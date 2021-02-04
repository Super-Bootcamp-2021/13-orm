const { getConnection, createConnection } = require('typeorm');
const { TaskSchema, Task } = require('./task');
const { WorkerSchema, Worker } = require('./worker');
const path = require('path');

function init() {
  return createConnection({
    //Connection
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345',
    database: 'dubnium',
    //Settings
    synchronize: true,
    // dropSchema: true,
    timezone: 'Asia/Jakarta',
    entities: [TaskSchema, WorkerSchema],
  });
}

async function writeData(db, data) {
  const dbName = getConnection().getRepository(db);
  const assign = dbName.create({ name: data.name });
  let temp = data.name;
  console.log('temp: ' + temp);

  if (db === 'Worker') {
    const workerData = new Worker(
      null,
      data.name,
      data.email,
      data.nohp,
      data.address,
      data.photo,
      data.bio
    );
    await dbName.save(workerData);
  } else {
    await dbName.save({
      job: data.job,
      done: data.done,
      cancel: data.cancel,
      attachment: data.attachment,
      assignee: temp,
    });
    temp = '';
  }
}

async function readAllData(db) {
  const dbName = getConnection().getRepository(db);

  if (db === 'Worker') {
    dbDatas = await dbName.createQueryBuilder(db).getMany();
    for (const dbData of dbDatas) {
      console.log(dbData);
    }
  } else {
    dbDatas = await dbName
      .createQueryBuilder(db)
      .leftJoinAndSelect('Task.assignee', 'assignee')
      .getMany();
    for (const dbData of dbDatas) {
      console.log(dbData);
    }
  }
}

async function readOneData(db, id) {
  const dbName = getConnection().getRepository(db);

  dbDatas = await dbName
    .createQueryBuilder(db)
    .where('worker.id = :id', { id: id })
    .getOne();
  console.log(dbDatas);
}

async function deleteData(db, id) {
  const dbName = getConnection().getRepository(db);

  dbDatas = await dbName
    .createQueryBuilder()
    .delete(Worker)
    .where('id = :id', { id: id })
    .execute();
}

async function updateDataDone(db, id, done) {
  const dbName = getConnection().getRepository(db);

  dbDatas = await dbName
    .createQueryBuilder()
    .update(Task)
    .set({ done: done })
    .where('id = :id', { id: id })
    .execute();
}

async function updateDataCancel(db, id, cancel) {
  const dbName = getConnection().getRepository(db);

  dbDatas = await dbName
    .createQueryBuilder()
    .update(Task)
    .set({ cancel: cancel })
    .where('id = :id', { id: id })
    .execute();
}

module.exports = {
  init,
  writeData,
  readAllData,
  readOneData,
  deleteData,
  updateDataDone,
  updateDataCancel,
};
