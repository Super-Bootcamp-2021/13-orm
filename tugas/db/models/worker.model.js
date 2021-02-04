const { defineWorker } = require('../migrations/worker.migration')
const {connection} = require('../connection')

const workers = defineWorker(connection);

async function writeData(data) {
    await workers.create(data)
}

module.exports = { writeData }
