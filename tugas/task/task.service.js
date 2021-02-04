/* eslint-disable no-unused-vars */
const { getConnection, createConnection } = require('typeorm');
const { TaskSchema, Task } = require('./task');

function init() {
  return createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    // password: '',
    database: 'dubsium',
    // type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // username: 'postgres',
    // password: 'postgres',
    // database: 'sanbercode2',
    // type: "sqlite",
    // database: path.resolve(__dirname, '../../../../sanbercode.db'),
    synchronize: true,
    // dropSchema: true,
    timezone: 'Asia/Jakarta',
    entities: [TaskSchema],
  });
}

async function writeData(req, res) {
  //   getConnection().isConnected;
  const task = getConnection().getRepository('Task');

  let body = '';
  let job, desc;
  req.on('data', async (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    body = JSON.parse(body);
    job = body['job'];
    desc = body['desc'];

    let hasil = JSON.stringify({ job, desc });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Method', 'POST');
    res.statusCode = 200;
    res.write(hasil);
    res.end();
    await task.save({ job, desc });
  });
  //   await task.save({ job, desc });
}

async function readData(req, res) {
  const task = await getConnection().getRepository('Task');
  let jobs = await task.find();
  let arr = [];
  for (const job of jobs) {
    arr.push(job);
  }
  res.statusCode = 200;
  //   res.write(arr);
}

async function main(req, res) {
  //   const conn = await init();
  await writeData(req, res);
  //   await readData(req, res);
  //   conn.close();
  // getConnection().close();
}

module.exports = {
  main,
  init,
  writeData,
};
