const Busboy = require('busboy');
const { Writable } = require('stream');
const { saveFile } = require('../../lib/storage');
const { writeTask, updateTask, readTask } = require('../../lib/orm/main');

async function addTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  let obj = {};

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'attachment':
        {
          try {
            const attachment = await saveFile(file, mimetype, fieldname);
            obj[`${fieldname}`] = attachment;
          } catch (err) {
            abort();
          }
        }
        break;
      default: {
        const noop = new Writable({
          write(chunk, encding, callback) {
            setImmediate(callback);
          },
        });
        file.pipe(noop);
      }
    }
  });

  busboy.on('field', async (fieldname, val) => {
    obj[`${fieldname}`] = val;
  });

  busboy.on('finish', async () => {
    console.log('objek addnya : ', obj);
    await writeTask(obj);
    res.write('data pekerjaan berhasil disimpan');
    res.end();
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function finishTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  let id;

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('field', async (fieldname, val) => {
    id = val;
  });

  busboy.on('finish', async () => {
    await updateTask({ done: true }, id);
    res.statusCode = 200;
    res.write(`pekerjaan dengan id ${id} berhasil diselesaikan`);
    res.end();
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function cancelTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  let id;

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('field', async (fieldname, val) => {
    id = val;
  });

  busboy.on('finish', async () => {
    await updateTask({ cancel: true }, id);
    res.statusCode = 200;
    res.write(`pekerjaan ${id} telah dibatalkan`);
    res.end();
  });

  req.on('aborted', abort);
  busboy.on('error', abort);
  req.pipe(busboy);
}

async function readTaskService(req, res) {
  const data = await readTask();
  res.setHeader('Content-Type', 'application/json');
  res.write(data);
  res.statusCode = 200;
  res.end();
}

module.exports = {
  addTaskService,
  readTaskService,
  finishTaskService,
  cancelTaskService,
};
