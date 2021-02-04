/* eslint-disable no-undef */
function respond(statusCode, message) {
  res.statusCode = statusCode || 200;
  res.write(message || '');
  res.end();
}
const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

module.exports = {
  respond,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_NOT_FOUND,
};
