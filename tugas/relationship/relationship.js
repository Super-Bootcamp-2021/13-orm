
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const { defineTask } = require('../tasks/main');
const { defineWorker } = require('../workers/main');

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

  module.exports = {
    setupRelationship()
  };