const {connection} = require('../connection');
const {defineWorker} = require('./worker.migration');



async function migrate(){
    await connection.authenticate();
    const worker = defineWorker(connection);
    //add task

    connection.sync({force: true});
}

migrate();
