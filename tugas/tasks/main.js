const { Sequelize } = require('sequelize');
const path = require('path');
const { init } = require('../relationship/relationship');

//store function
async function storeData() {}

//read function
async function readData() {}

async function mainTasks() {
  await init();
  await storeData();
  await readData();
}

module.exports = {
  mainTasks,
};
