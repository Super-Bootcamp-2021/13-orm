const { Sequelize } = require('sequelize');
const { defineTask, defineWorker } = require('./model');

let task, worker;

/**
 * setup relation ship
 * @param {Sequelize} orm sequalize instance
 */
function setupRelationship(orm) {
  worker = defineWorker(orm);
  task = defineTask(orm);

  task.belongsTo(worker, {
    onDelete: 'cascade',
    foreignKey: 'assigneeId',
  });
}

async function init() {
  const orm = new Sequelize('sanbercode2', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });
  await orm.authenticate();
  setupRelationship(orm);
  await orm.drop({ cascade: true });
  await orm.sync({ force: true, alter: true });
}

async function writeData() {
  const budi = await worker.create({ name: 'budi' });
  const susi = await worker.create({ name: 'susi' });

  await task.bulkCreate([
    { assigneeId: budi.id, job: 'makan' },
    { assigneeId: susi.id, job: 'minum' },
    { assigneeId: budi.id, job: 'belajar' },
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
