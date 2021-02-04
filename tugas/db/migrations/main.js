// const {connection} = require('../connection')
const {defineTask} = require('./task')
const {connection} = require('../connection')

let task

async function migrate() {
    // worker = defineWorker();
        const connect = await connection();
        defineTask(connect);
        await connect.drop({cascade: true});
        await connect.sync({force: true, alter: true})

    // task.belongsTo(worker, { // relationnya belum
    //     onDelete: 'cascade',
    //     foreignKey: 'WorkerId',
    // });
}
migrate()

module.exports = {task}