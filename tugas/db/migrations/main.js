const {startConnection, getConnection} = require('../connection');
const {defineWorker} = require('./worker.migration');



async function migrate(){
    await startConnection();
    const connect = getConnection();
    const worker = defineWorker(connect);
    //add task

    connect.sync({force: true});
}

migrate();