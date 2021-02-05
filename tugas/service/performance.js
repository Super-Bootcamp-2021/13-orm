const {read, save}= require('../database/kv/kv');

async function registerLog(log){
    let logs = await read('log')
    if (!logs){
        logs = []
    }
   logs.push(log);
   await save('log',logs)
   return logs
}

module.exports = {
    registerLog,
}