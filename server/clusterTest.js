const cluster = require('cluster');
const http = require('http');
const {availableParallelism} = require('os')
const process = require('process')

const numCPUs = availableParallelism();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers equal to number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Worker process creates an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello from worker ${process.pid}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}