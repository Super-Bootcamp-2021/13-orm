const { defineTask } = require('../migrations/task');
const { connection } = require('../connection');

// async function findAll() {
//   const connect = await connection();
//   let task = defineTask(connect);
//   const res = await task.findAll();
//   return res;
// }

// async function create(data){
//     const connect = await connection();
//     let task = defineTask(connect);
//     const res = await task.create(data);
//     return res;
// }

// module.exports = {findAll, create};
module.exports = async () => {
      const connect = await connection();
      let task = defineTask(connect);
      return task
}
