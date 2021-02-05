const url = require('url')
const taskRoutes = require('./task.route');
const workerRoutes = require('./worker.route');
const storageRoutes = require('./storage.route');



function main(req, res){
    let message = 'tidak ditemukan data';
    let statusCode = 200;
    const uri = url.parse(req.url, true);

    const respond = async () => {
      res.statusCode = 404;
      res.write(message);
      res.end();
    };

    if(uri.pathname.includes('/worker')){
      workerRoutes(req, res); 
      return
    }

    if(uri.pathname.includes('/task')){
        taskRoutes(req, res); 
        return
    }

    if(uri.pathname.includes('/photo') || uri.pathname.includes('/attachment')){
      storageRoutes(req, res); 
      return
  }

    respond()
    // workers routes
}

module.exports = main