const Busboy = require('busboy');
const { Writable } = require('stream');
const { saveFile } = require('../lib/storage');
const { create, update, ERROR_CREATE_DATA_INVALID } = require('./task-main');

function createSvc(req, res) {
  const busboy = new Busboy({ headers: req.headers });

  const data = {
    job: '',
    attachment: '',
    done: '',
    cancel: '',
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
      case 'attachment':
        try {
          data.attachment = await saveFile(file, mimetype);
        } catch (err) {
          abort();
        }
        if (finished) {
          try {
            const task = await create(data);
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify(task));
          } catch (err) {
            if (err === ERROR_CREATE_DATA_INVALID) {
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

  busboy.on('field', async (fieldname, val) => {
    if (['job', 'done', 'cancel'].includes(fieldname)) {
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

function updateSvc(req, res) {
  const busboy = new Busboy({ headers: req.headers });

  const data = {
    job: '',
    attachment: '',
    done: '',
    cancel: '',
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
      case 'attachment':
        try {
          data.attachment = await saveFile(file, mimetype);
        } catch (err) {
          abort();
        }
        if (finished) {
          try {
            const task = await update(data);
            res.setHeader('content-type', 'application/json');
            res.write(JSON.stringify(task));
          } catch (err) {
            if (err === ERROR_CREATE_DATA_INVALID) {
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

  busboy.on('field', async (fieldname, val) => {
    if (['job', 'done', 'cancel', 'id'].includes(fieldname)) {
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

module.exports = {
  createSvc,
  updateSvc,
};
