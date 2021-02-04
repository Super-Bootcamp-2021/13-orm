const Busboy = require('busboy');
const { ERROR_REGISTER_DATA_INVALID } = require('../../route/utils');
const { writeData } = require('../../database/main');

const { Writable } = require('stream');

function addWorker(req, res) {
  const data = {
    name: '',
    address: '',
    phone: '',
    email: '',
    bio: '',
    photo: '',
  };
  const busboy = new Busboy({ headers: req.headers });

  let finished = false;

  function abort() {
    req.unpipe(busboy);
    if (!req.aborted) {
      res.statusCode = 413;
      res.end();
    }
  }
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    switch (filename) {
      case 'photo':
        try {
          data.photo = await saveFile(file, mimetype);
        } catch (err) {
          abort();
        }
        if (finished) {
          try {
            const registrant = writeData(data);
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify(registrant));
          } catch (err) {
            if (err === ERROR_REGISTER_DATA_INVALID) {
              res.statusCode = 401;
            } else {
              res.statusCode = 500;
            }
            res(err);
          }
          res.end();
        }
        break;
      default: {
        const noop = new Writable({
          write(chunk, encoding, callback) {
            setImmediate(callback);
          },
        });
        file.pipe(noop);
      }
    }
  });
  busboy.on('field', (fieldname, val) => {
    if (['name', 'address', 'phone', 'email', 'bio'].includes(fieldname)) {
      data[fieldname] = val;
    }
  });

  busboy.on('finish', async () => {
    finished = true;
  });

  req.on('aborted', abort);
  busboy.on('error', abort);

  req.pipe(busboy);
}

async function workerList(req, res) {
  try {
    const workers = await readData();
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(workers));
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

async function disMember(req, res) {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const worker = await remove(id);
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(worker));
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

module.exports= { addWorker, workerList, disMember };
