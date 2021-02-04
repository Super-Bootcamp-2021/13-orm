const Model = require('../db/models/task-model');

class TaskController {
  static async read(req, res) {
    console.log('read');

    try {
      const Task = await Model();
      const result = await Task.findAll();
      res.write(JSON.stringify(result));
      res.end();
    } catch (err) {
      console.log(err);
      res.end();
    }
  }

  static create(req, res) {
    console.log('create');
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
        res.write(JSON.stringify(result));
      } catch (err) {
        res.write('error');
      }
      res.end();
    });

    req.on('error', (err) => {
      console.log(err);
    });
  }

  static async delete(req, res) {
    console.log('delete');
    const id = +req.params.id;

    try {
      const Task = await Model();
      await Task.destroy({ where: { id } });
      res.end();
    } catch (err) {
      console.log(err);
      res.end();
    }
  }

  static update(req, res){
    console.log('update')
    const id = +req.params.id;
    let data = {};

    req.on('data', (chunk) => {
      data = chunk;
    });

    req.on('end', async () => {
      const Task = await Model();
      data = JSON.parse(data);
      // res.setHeader('content-type', 'application/json');
      try {
        const result = await Task.update(data, {where: {id}});
        res.write(JSON.stringify(result));
      } catch (err) {
        res.write('error');
      }
      res.end();
    });

    req.on('error', (err) => {
      console.log(err);
      res.end()
    });
  }
}

module.exports = TaskController;
