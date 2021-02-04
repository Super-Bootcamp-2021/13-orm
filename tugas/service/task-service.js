const Busboy = require('busboy');
const url = require('url');
const { register, ERROR_REGISTER_DATA_INVALID } = require('./task-logic');
const { upload } = require('../database/typeorm/storage');
const { Writable } = require('stream');


function storeTaskService(req, res) {
  const busboy = new Busboy({ headers: req.headers });
  res.setHeader('content-type', 'application/json');
  const data = {
    job: '',
    detail: '',
    attach: '',
    assignee: '',
  };

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'attach':
        upload(data, fieldname, file, mimetype, abort);
    }
  });

  busboy.on('field', (fieldname, val) => {
    if (['job', 'detail', 'attach', 'assignee'].includes(fieldname)) {
      data[fieldname] = val;
    }
  });

  busboy.on('finish', async () => {
      try {
        const task = await register(data);
        await res.write(JSON.stringify(task));
      } catch (err) {
        if (err === ERROR_REGISTER_DATA_INVALID) {
          res.statusCode = 401;
        } else {
          res.statusCode = 500;
        }
        res.write(err);
      }
      await res.end();
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

// async function getTaskByNameService(req, res) {
//   const uri = url.parse(req.url, true);
//   const filename = uri.pathname.replace('/cari/', '');
//   if (!filename) {
//     res.statusCode = 400;
//     res.write('request tidak sesuai');
//     res.end();
//   }

//   const value = await getTaskByName(filename);
//   res.setHeader('Content-Type', 'application/json');
//   const data = JSON.stringify(value);
//   res.statusCode = 200;
//   res.write(data);
//   res.end();
// }

async function upTaskByNameService(req, res) {
  const uri = url.parse(req.url, true);
  const filename = uri.pathname.replace('/update/', '');
  if (!filename) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }

  const value = await upTaskByName(filename);
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify(value);
  setValueToDb();
  res.statusCode = 200;
  res.write(data);
  res.end();
}


async function getTaskService(req, res) {
  const value = await readTask();
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify(value.task);
  res.statusCode = 200;
  res.write(data);
  res.end();
}
async function softDeleteTaskService(req, res) {
  const uri = url.parse(req.url, true);
  const filename = uri.pathname.replace('/update/', '');
  if (!filename) {
    res.statusCode = 400;
    res.write('request tidak sesuai');
    res.end();
  }

  const value = await softDeleteTask(filename);
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify(value);
  setValueToDb();
  res.statusCode = 200;
  res.write(data);
  res.end();
}


module.exports = {
  storeTaskService,
  getTaskService,
  upTaskByNameService,
  softDeleteTaskService
};
