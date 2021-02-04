/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const { defineTask } = require('./task.shcema');

let task;

/**
 * setup relation ship
 * @param {Sequelize} orm sequalize instance
 */
// function setupRelationship(orm) {
//   worker = defineWorker(orm);
//   task = defineTask(orm);

//   task.belongsTo(worker, {
//     onDelete: 'cascade',
//     foreignKey: 'assigneeId',
//   });
// }

async function init() {
  const orm1 = new Sequelize('sanbercode2', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    logging: false,
  });
  const orm = orm1;
  await orm.authenticate();
  //   setupRelationship(orm);
  task = defineTask(orm);
  // await orm.drop({ cascade: true });
  // await orm.sync({ force: true, alter: true });
}

async function writeData(data) {
  await task.create({
    job: data.job,
    attachment: data.attachment,
    done: data.done,
    cancel: data.cancel,
  });
}

// async function readData() {
//   const res = await task.findAndCountAll({
//     include: worker,
//   });
//   console.log('number of tasks ', res.count);
//   for (const row of res.rows) {
//     console.log({
//       id: row.id,
//       job: row.job,
//       done: row.done,
//       worker: {
//         id: row.worker.id,
//         name: row.worker.name,
//       },
//     });
//   }
// }

async function taskDone(data) {
  await task.update(
    {
      job: data.job,
      attachment: data.attachment,
      done: data.done,
      cancel: data.cancel,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
}

async function main(data) {
  await init();
  await writeData(data);
  //   await readData();
}

async function updateDB(data) {
  await init();
  await taskDone(data);
  //   await readData();
}

module.exports = {
  main,
  updateDB,
};
