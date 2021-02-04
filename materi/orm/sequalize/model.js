const { DataTypes } = require('sequelize');
// eslint-disable-next-line no-unused-vars
const { Sequelize, Model } = require('sequelize');

/**
 * @typedef {Object} Worker
 * @property {string} name
 * @property {number} id
 */

/**
 * define worker models
 * @param {Sequelize} orm sequalize instance
 * @returns {Model<Worker>}
 */
function defineWorker(orm) {
  return orm.define(
    'worker',
    {
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'workers',
    }
  );
}

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} job
 * @property {boolean} done
 * @property {Date} addedAt
 */

/**
 * define task models
 * @param {Sequelize} orm sequalize instance
 * @returns {Model<Task>}
 */
function defineTask(orm) {
  return orm.define(
    'task',
    {
      job: DataTypes.TEXT,
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      addedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
      tableName: 'tasks',
    }
  );
}

module.exports = {
  defineWorker,
  defineTask,
};
