const { init } = require("./database/typeorm/main");
const { initServer } = require("./service/service");

async function main(){
    const connection = await init();
    initServer(connection);
}

main()