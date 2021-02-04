const { getConnection } = require('typeorm');
const { Worker } = require('./worker.model');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * Worker type definition
 * @typedef {Object} WorkerData
 * @property {[string]} id
 * @property {string} name
 * @property {number} age
 * @property {string} bio
 * @property {string} address
 * @property {string} photo
 */

/**
 * register new worker
 * @param {Worker} data worker profile
 * @returns {Promise<Worker>} new worker profile with id
 */
async function register(data) {
  if (!data.name || !data.age || !data.bio || !data.address || !data.photo) {
    throw ERROR_REGISTER_DATA_INVALID;
  }
  const workerRepo = getConnection().getRepository('Worker');
  const worker = new Worker(
    null,
    data.name,
    parseInt(data.age, 10),
    data.bio,
    data.address,
    data.photo
  );
  await workerRepo.save(worker);
  return worker;
}

/**
 * get list of registered workers
 * @returns {Promise<Worker[]>} list of registered workers
 */
function list() {
  const workerRepo = getConnection().getRepository('Worker');
  return workerRepo.find();
}

/**
 * remove a worker by an id
 * @param {string} id worker id
 * @returns {Promise<Worker>} removed worker
 */
async function remove(id) {
  const workerRepo = getConnection().getRepository('Worker');
  const worker = await workerRepo.findOne(id);
  if (!worker) {
    throw ERROR_WORKER_NOT_FOUND;
  }
  await workerRepo.delete(id);
  return worker;
}

module.exports = {
  register,
  list,
  remove,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_NOT_FOUND,
};
