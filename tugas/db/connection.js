const { Sequelize } = require('sequelize');
// const {} = require('../db/migrations/task')

async function connection() {
  const orm1 = new Sequelize('sanbercode1', 'testing', '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });
  const orm = orm1;
  await orm.authenticate();
  //   await orm.drop({ cascade: true });
  //   await orm.sync({ force: true, alter: true });
  return orm;
}

module.exports = { connection };
