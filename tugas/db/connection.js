/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');

let connection;
async function startConnection() {
  const orm1 = new Sequelize('sanbercode1', 'masdimya', '1234567890', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });
  const orm = orm1;
  await orm.authenticate();
  connection = orm;
}

function getConnection(){
    return connection;
}

module.exports = {
    startConnection,getConnection
};

