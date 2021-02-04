// const {connection} = require('../connection')
const {defineTask} = require('./task')
const {connection} = require('../connection')
// const connect = connection();

let task

async function setupRelationship() {
    // worker = defineWorker();
    const connect = await connection();
    task = defineTask(connect);
    connect.sync({force: true});

    // task.belongsTo(worker, {
    //     onDelete: 'cascade',
    //     foreignKey: 'assigneeId',
    // });
}
setupRelationship()

module.exports = {task}