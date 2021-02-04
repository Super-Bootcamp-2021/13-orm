// const {connection} = require('../connection')
const {defineTask} = require('./task')
const {connection} = require('../connection')

let task

async function setupRelationship() {
    // worker = defineWorker();
    const connect = await connection();
    await connect.drop({cascade: true});
    await connect.sync({force: true, alter: true});

    task = defineTask(connect);

    task.belongsTo(worker, { // relationnya belum
        onDelete: 'cascade',
        foreignKey: 'WorkerId',
    });
}
setupRelationship()

module.exports = {task}