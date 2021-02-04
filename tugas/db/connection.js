const { Sequelize } = require('sequelize');
// const {} = require('../db/migrations/task')

async function connection() {
  const orm = new Sequelize('sanbercode1', 'testing', '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });
  return orm;
}

module.exports = { connection };
