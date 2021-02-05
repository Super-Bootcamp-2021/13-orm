const { writeWorker } = require('../../lib/orm/main');

async function register(data) {
  if (
    !data.name ||
    !data.alamat ||
    !data.biografi ||
    !data.email ||
    !data.photo ||
    !data.telepon
  ) {
    return 'data pekerja tidak lengkap';
  }

  await writeWorker(data);
  return 'data pekerja berhasil disimpan.';
}

module.exports = {
  register,
};
