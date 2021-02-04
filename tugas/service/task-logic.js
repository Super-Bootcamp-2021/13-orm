const { writeDataTask } = require('../database/typeorm/main');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

async function register(data) {
    if (!data.job || !data.detail || !data.attach || !data.assignee ) {
        throw ERROR_REGISTER_DATA_INVALID;
    }

    const task = {
        job: data.job,
        detail: data.detail,
        attach: data.attach,
        assignee: data.assignee,
    };
    await writeDataTask(task);
    return task;
}

// async function list() {
//     let workers = await read('worker');
//     if (!workers) {
//       workers = [];
//     }
//     return workers;
// }

// async function remove(id) {
//     let workers = await read('worker');
//     if (!workers) {
//       throw ERROR_WORKER_NOT_FOUND;
//     }
//     const idx = workers.findIndex((w) => w.id === id);
//     if (idx === -1) {
//       throw ERROR_WORKER_NOT_FOUND;
//     }
//     const deleted = workers.splice(idx, 1);
//     await save('worker', workers);
//     return deleted;
//   }

module.exports = {
    register,
    //list,
    //remove,
    ERROR_REGISTER_DATA_INVALID,
    ERROR_WORKER_NOT_FOUND,
}; 