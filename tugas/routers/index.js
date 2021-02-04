
const taskRoutes = require('./task.route');

function main(req, res){
    taskRoutes(req, res); 
    // workers routes
}

module.exports = main