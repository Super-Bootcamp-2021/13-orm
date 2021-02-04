const Busboy = require('busboy');
const { ERROR_REGISTER_DATA_INVALID } = require('../../route/utils');
const { register, saveFile } = require('./read-worker');
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
            const registrant = register(data);
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
}

exports.addWorker = addWorker;
