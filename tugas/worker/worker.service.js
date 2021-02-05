const Busboy = require('busboy');
const url = require('url');
const { Writable } = require('stream');
const {
  register,
  list,
  remove,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_NOT_FOUND,
} = require('./worker');
const { saveFile } = require('../lib/storage/storage');
// eslint-disable-next-line no-unused-vars
const { IncomingMessage, ServerResponse } = require('http');

/**
 * service to register new worker
 */
function registerService(req, res) {
  const busboy = new Busboy({ headers: req.headers });

  const data = {
    name: '',
    email: '',
    nohp: '',
    address: '',
    photo: '',
    bio: '',
  };

  let finished = false;

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (fieldname) {
      case 'photo':
        try {
          data.photo = await saveFile(file, mimetype);
        } catch (err) {
          abort();
        }
        if (finished) {
          try {
            //command
            const worker = await register(data);
            res.setHeader('content-type', 'application/json');
            console.log(JSON.stringify(worker));
            const message = JSON.stringify(worker);
            res.write(message);
          } catch (err) {
            if (err === ERROR_REGISTER_DATA_INVALID) {
              res.statusCode = 401;
            } else {
              res.statusCode = 500;
            }
            res.write(err);
          }
          res.end();
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

  busboy.on('field', (fieldname, value) => {
    if (['name', 'email', 'nohp', 'address', 'bio'].includes(fieldname)) {
      data[fieldname] = value;
    }
  });

  busboy.on('finish', async () => {
    finished = true;
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

/**
 * service to get list of workers
 */
async function listService(req, res) {
  try {
    //command
    const workers = await list();
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(workers);
    res.write(message);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

/**
 * service to remove a worker by it's id
 */
async function removeService(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    //command
    const worker = await remove(id);
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    const message = JSON.stringify(worker);
    res.write(message);
    res.end();
  } catch (err) {
    if (err === ERROR_WORKER_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.end();
    return;
  }
}

module.exports = {
  listService,
  registerService,
  removeService,
};
