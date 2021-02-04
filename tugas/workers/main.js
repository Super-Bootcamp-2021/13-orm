const { Sequelize } = require('sequelize');
const path = require('path');
const { defineWorker } = require('./model');
const { setupRelationship } = require('../relationship/relationship');

//initialize database
async function init() {
    const con = new Sequelize('', '', '', {
        host: '',
        port: ,
        dialect: '',
        logging: ,
    });
}

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