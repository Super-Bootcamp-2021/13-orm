const ERROR_CREATE_DATA_INVALID = 'data pekerjaan tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'pekerjaan tidak ditemukan';
const { main } = require('./orm');

function create(data) {
    if(!data.job) {
        throw ERROR_CREATE_DATA_INVALID;
    }

    const task = {
        job: data.job,
        attachment: data.attachment,
        done: data.done,
        cancel: data.cancel,
      };
      console.log(task);
      main(task);
      return task;
}

module.exports = {
    ERROR_CREATE_DATA_INVALID,
    ERROR_TASK_NOT_FOUND,
    create,
}