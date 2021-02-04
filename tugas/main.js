const { main } = require('./database/main')
const {run, stop} = require('./route/server')

function serve(){
    main();
    run()
    
}

serve()




