/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const { defineTask } = require('../tasks/model');
const { defineWorker } = require('../workers/model');
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
  const orm1 = new Sequelize('', '', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    logging: false,
  });
  const orm = orm3;
  await orm.authenticate();
  setupRelationship(orm);
  await orm.drop({ cascade: true });
  await orm.sync({ force: true, alter: true });
}

  module.exports = {
    init,
  };