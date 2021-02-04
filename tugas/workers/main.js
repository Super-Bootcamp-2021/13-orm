/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const { init } = require('../relationship/relationship');

//store function
async function storeData() {
}

//read function
async function readData() {
}

async function main() {
    await init();
    await storeData();
    await readData();
}

module.exports = {
    main,
};