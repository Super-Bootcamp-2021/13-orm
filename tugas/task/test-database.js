/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const { defineTask } = require('./model');

let task;

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
}

async function writeData(data) {
  await task.create({
    job: data.job,
    attachment: data.attachment,
    done: data.done,
    cancel: data.cancel,
  });
}

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
}

async function updateDB(data) {
  await init();
  await taskDone(data);
}

module.exports = {
  main,
  updateDB,
};
