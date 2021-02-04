const { server } = require("sinon");
const { init } = require("./database/typeorm/main");
const { initServer } = require("./service/service");

async function main(){
    await init();
    await initServer();
}

main()