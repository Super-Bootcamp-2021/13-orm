const { CONFIG } = require('./config');
const { Sequelize } = require('sequelize');
const { defineWorker, defineTask } = require('./model');

let task, worker;

function setupRelationship(orm) {
  worker = defineWorker(orm);
  task = defineTask(orm);

  task.belongsTo(worker, {
    onDelete: 'cascade',
    foreignKey: 'assigneeId',
  });
}

async function init() {
  const orm = new Sequelize(
    CONFIG.DATABASE,
    CONFIG.USERNAME,
    CONFIG.PASSWORD,
    CONFIG.DB_CONFIG
  );
  await orm.authenticate();
  setupRelationship(orm);
  await orm.drop({ cascade: true });
  await orm.sync({ force: true });
}

async function writeData() {
  const A = await worker.create({
    name: 'a',
    alamat: 'jl bla',
    email: 'a.gmail.com',
    telp: '0851258',
    bio: 'aku adalah A',
  });
  const B = await worker.create({
    name: 'b',
    alamat: 'jl ini',
    email: 'b.gmail.com',
    telp: '123456',
    bio: 'aku adalah B',
  });

  await task.bulkCreate([
    { assigneeId: A.id, job: 'makan' },
    { assigneeId: B.id, job: 'minum' },
    { assigneeId: A.id, job: 'belajar' },
  ]);
}

async function readData() {
  const res = await task.findAndCountAll({
    include: worker,
  });
  console.log('number of tasks ', res.count);
  for (const row of res.rows) {
    console.log({
      id: row.id,
      job: row.job,
      done: row.done,
      worker: {
        id: row.worker.id,
        name: row.worker.name,
      },
    });
  }
}

async function main() {
  await init();
  await writeData();
  await readData();
}

module.exports = {
  main,
};
