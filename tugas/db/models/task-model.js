const { defineTask } = require('../migrations/task');
const { connection } = require('../connection');


async function readData() {
    const connect = await connection();
    let task = defineTask(connect);
    const res = await task.findAll();
    console.log('number of tasks ', res.count);
    return res
    // console.log(res[0].job)
    // for (const row of res.rows) {
    //     console.log({
    //         id: row.id,
    //         job: row.job,
    //         done: row.done,
    //         worker: {
    //             id: row.worker.id,
    //             name: row.worker.name,
    //         },
    //     });
    // }
}

module.exports = {readData}