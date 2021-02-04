const http = require("http");

const PORT = 6000;

function createTask(data) {  
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}/task/write?data=${JSON.stringify(data)}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString();
      });
      res.on("end", () => {        
        resolve(data);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
    req.end();
  });
}

async function init() {
  const orm1 = new Sequelize('sanbercode2', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    logging: false,
  });
  const orm = orm1;
  await orm.authenticate();
  //   setupRelationship(orm);
  task = defineTask(orm);
  await orm.sync();
}
//createTask({assignee_id: 3, job: 'ngoding', attachment: 'file.jpg', done: true});


async function updateTask(data) {
  await task.update(
    {
      job: data.job,
      attachment: data.attachment,
      done: data.done,
      cancel: data.cancel,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
}

async function readData(id) {
  const taskdb = await task.findAll({
    where: {
      id: id,
    },
  });

  return taskdb;
}

async function taskDone(data) {
  await task.update(
    {
      done: 1, //1 or true
    },
    {
      where: {
        id: data.id,
      },
    }
  );
}

async function taskCancel(data) {
  await task.update(
    {
      cancel: 1, //1 or true
    },
    {
      where: {
        id: data.id,
      },
    }
  );

function updateTask(data) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}/task/update?data=${JSON.stringify(data)}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString();
      });
      res.on("end", () => {        
        resolve(data);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
    req.end();
  });
}

//updateTask({id: 1, job: 'bermain', attachment: 'file.jpg', done: true});

function cancelTask(id) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}/task/delete?id=${id}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString();
      });
      res.on("end", () => {        
        resolve(data);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
    req.end();
  });
}

//cancelTask(4);

function doneTask(data) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:${PORT}/task/done?data=${JSON.stringify(data)}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk.toString();
      });
      res.on("end", () => {        
        resolve(data);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
    req.end();
  });
}


async function dropTable() {
  await init();
  await task.drop();
}

async function read(id) {
  await init();
  const taskr = await readData(id);
  return taskr[0].dataValues;
}

module.exports = {
  main,
  updateDB,
  doneDB,
  cancelDB,
  init,
  dropTable,
  read,
  createTask,
  updateTask,
  cancelTask,
  doneTask,
}