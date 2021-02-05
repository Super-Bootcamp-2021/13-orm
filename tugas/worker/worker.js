const {
  writeData,
  readAllData,
  readOneData,
  deleteData,
  updateDataDone,
  updateDataCancel,
} = require('../lib/orm/main');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * Worker type definition
 */

/**
 * register new worker
 */
async function register(data) {
  if (
    !data.name ||
    !data.email ||
    !data.nohp ||
    !data.address ||
    !data.photo ||
    !data.bio
  ) {
    throw ERROR_REGISTER_DATA_INVALID;
  }
  let workers = await readAllData('Worker');
  if (!workers) {
    workers = [];
  }
  const worker = {
    name: data.name,
    email: data.email,
    nohp: data.nohp,
    address: data.address,
    photo: data.photo,
    bio: data.bio,
  };
  workers.push(worker);
  await writeData('Worker', workers);
  return worker;
}

/**
 * get list of registered workers
 */
async function list() {
  let workers = await readAllData('worker');
  if (!workers) {
    workers = [];
  }
  return workers;
}

/**
 * remove a worker by an id
 */
async function remove(id) {
  let workers = await readAllData('worker');
  if (!workers) {
    throw ERROR_WORKER_NOT_FOUND;
  }

  await deleteData('Worker', id);
  const existData = await readOneData('Worker', id);
  return existData;
}

module.exports = {
  register,
  list,
  remove,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_NOT_FOUND,
};
