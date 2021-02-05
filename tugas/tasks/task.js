const { read, write, del } = require('../lib/relationship');
const { ERROR_WORKER_NOT_FOUND } = require('../workers/worker');

const ERROR_REGISTER_DATA_TASK_MISSING = 'data task tidak lengkap';
const ERROR_REGISTER_DATA_TASK_INVALID = 'data task invalid';
const ERROR_WORKER_ID_INVALID = 'data pekerja invalid';
const ERROR_TASK_NOT_FOUND = 'task tidak ditemukan';
const INFO_TASK_WORKER_WAS_SUBMITTED =
  'task sudah diassigne ke pekerja tersebut';

async function registerTask(data) {
  if (!data.job || !data.status || !data.workerId || !data.document) {
    throw ERROR_REGISTER_DATA_TASK_MISSING;
  }
  const task = {
    job: data.job,
    status: data.status,
    assignee_id: data.workerId,
    document: data.document,
  };

  if (isNaN(data.workerId)) {
    throw ERROR_WORKER_ID_INVALID;
  }
  if (!['progress', 'cancel', 'done'].includes(data.status.toLowerCase())) {
    throw ERROR_REGISTER_DATA_TASK_INVALID;
  }

  let workers = await read('worker');
  var findWorker = workers.find((worker) => {
    return worker.id == data.workerId;
  });
  if (!findWorker) {
    throw ERROR_WORKER_NOT_FOUND;
  }

  let tasks = await read('task');
  var findTask = tasks.rows.find((taskData) => {
    return taskData.job == data.job && taskData.assignee_id == data.workerId;
  });
  if (findTask) {
    throw INFO_TASK_WORKER_WAS_SUBMITTED;
  }
  await write('task', task);
  return task;
}

async function listTask() {
  let tasks = await read('task');
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

module.exports = {
  registerTask,
  listTask,
  ERROR_REGISTER_DATA_TASK_MISSING,
  ERROR_REGISTER_DATA_TASK_INVALID,
  ERROR_WORKER_ID_INVALID,
  ERROR_TASK_NOT_FOUND,
  INFO_TASK_WORKER_WAS_SUBMITTED,
};
