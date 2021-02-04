const { writeDataWorker } = require('../database/typeorm/main');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

async function register(data) {
    if (!data.name || !data.email || !data.biografi || !data.address || !data.nohp || !data.photo) {
      throw ERROR_REGISTER_DATA_INVALID;
    }
    let workers = await read('worker');
    if (!workers) {
      workers = [];
    }
    const worker = {
      id: Math.round(Math.random() * 1000).toString(),
      name: data.name,
      email: data.email,
      biografi: data.biografi,
      address: data.address,
      nohp: data.nohp,
      photo: data.photo,
    };
    workers.push(worker);
    await writeDataWorker('worker', workers);
    return worker;
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