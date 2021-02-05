const { writeTask } = require('../../lib/orm/main');

async function addJob(data) {
  if (!data.job || !data.assignee) {
    return 'data pekerjaan tidak lengkap';
  }

  await writeTask(data);
  return 'data pekerjaan berhasil disimpan.';
}

module.exports = {
  addJob,
};
