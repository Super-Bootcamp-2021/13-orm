const {createServer} =  require('http') 
const {stdout} =  require('process') 


function serve(){
    const server = createServer((req, res) => {
        res.end()
    })
    
    const PORT = 1979
    server.listen(PORT, (val) => {
        stdout.pipe(`listening to PORT ${PORT}`)
    })
}


exports.serve = serve