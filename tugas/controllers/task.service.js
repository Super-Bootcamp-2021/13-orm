const Model = require('../db/models/task-model');

class TaskController {
  static async read(req, res) {
    try {
      const Task = await Model();
      const result = await Task.findAll();
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
    let data = {};

    req.on('data', (chunk) => {
      data = chunk;
    });

    req.on('end', async () => {
      const Task = await Model();
      data = JSON.parse(data);
      res.setHeader('content-type', 'application/json');
      try {
        const result = await Task.create(data);
        res.statusCode = 201;
        res.write(JSON.stringify(result));
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.write('error');
        res.end();
      }
    });

    req.on('error', (err) => {
      console.log(err);
      res.statusCode = 500;
      res.end();
    });
  }

  static async delete(req, res) {
    const id = +req.params.id;

    try {
      const Task = await Model();
      await Task.destroy({ where: { id } });
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

  static update(req, res) {
    const id = +req.params.id;
    let data = {};

    req.on('data', (chunk) => {
      data = chunk;
    });

    req.on('end', async () => {
      const Task = await Model();
      data = JSON.parse(data);
      res.setHeader('content-type', 'application/json');
      try {
        const result = await Task.update(data, { where: { id } });
        res.write(JSON.stringify(result));
        res.statusCode = 200;
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.write('error');
        res.end();
      }
    });

    req.on('error', (err) => {
      console.log(err);
      res.statusCode = 500;
      res.end();
    });
  }
}

module.exports = TaskController;
