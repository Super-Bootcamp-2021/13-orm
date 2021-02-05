const Model = require('../db/models/task-model');
const Busboy = require('busboy');
const { saveFile } = require('../storage/storage');
const { register, listTask,completedTask,removeTask } = require('../lib/task');
const fs = require('fs');
const url = require('url')
const path = require('path');
const mime = require('mime-types');

class TaskController {
  static async read(req, res) {
    try {
      const result = await listTask();  
      res.statusCode = 200;
      res.write(JSON.stringify(result));
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    }
  }

  static create(req, res) {
    const busboy = new Busboy({ headers: req.headers })

    let data = {
        assigneeId :'',        
        name: '',
        attachment: '',
    }

    let finished = false;
    function abort() {
        req.unpipe(busboy)
        if (!req.aborted) {
            res.statusCode = 413
            res.end()
        }
    }

    busboy.on('field', (fieldname, val) => {
        data[fieldname] = val
    })

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        switch (fieldname) {
            case 'attachment':
                try {
                  const folder = 'attachment';
                  data.attachment = "localhost:9999/attachment/"+await saveFile(file, mimetype,folder);
                } catch (err) {
                  abort();
                }
                if (finished) {
                  try {
                    const task = register(data);     // add insert task here
                    res.setHeader('content-type', 'application/json');
                    res.write(JSON.stringify({
                        status: 'success',
                        message: 'success add data',
                    }));
                  } catch (err) {
                    //add error handling
                    // if (err === ERROR_REGISTER_DATA_INVALID) {
                    //   res.statusCode = 401;
                    // } else {
                    //   res.statusCode = 500;
                    // }
                    res.write('401');
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
    
    busboy.on('finish', async () => {
        finished = true;
    });

    req.on('aborted', abort)
    busboy.on('error', abort)

    req.pipe(busboy)
  }

  static async delete(req, res) {
    const id = +req.params.id;

    try {
      const Task = await removeTask(id);
      const output = JSON.stringify({
        msg: `Task with id = ${id} has been deleted.`,
      });
      res.write(output);
      res.statusCode = 200;
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    }
  }

  static async completed(req, res) {
    const id = +req.params.id;
    try {
      const result = await completedTask(id)
      res.statusCode = 200;
      res.write(JSON.stringify({
        msg: `Task with id = ${id} has been finished.`,
      }));
      res.end();
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    }
  }

  static attachmentService(req, res) {
    const uri = url.parse(req.url, true);
    const filename = uri.pathname.replace('/attachment/', '');
    if (!filename) {
      res.statusCode = 400;
      res.write('request tidak sesuai');
      res.end();
    }
    const file = path.resolve(__dirname, `../storage/attachment/${filename}`);
    const exist = fs.existsSync(file);
    if (!exist) {
      res.statusCode = 404;
      res.write('file tidak ditemukan');
      res.end();
    }
    const fileRead = fs.createReadStream(file);
    res.setHeader('Content-Type', mime.lookup(filename));
    res.statusCode = 200;
    fileRead.pipe(res);
  }
}

module.exports = TaskController;
