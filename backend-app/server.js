require('dotenv').config();
require('./Configs/db.config.js');
require('./Configs/globals');
const cors= require("cors");
const express = require('express'); 
const bodyParser = require('body-parser');
const http = require('http');
const { setupRabbitMQ } = require('./services/rabbitmqService');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 9999;

app.use(cors("*"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// RESPONSE HANDLER
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})

// ROUTES
const appRoutes = require('./Routes')
appRoutes(app)


async function startServer() {
    try {
        const server = http.createServer(app);
        await setupRabbitMQ();
        global.io = socketIo(server, {cors: {origin: "*"}});
        server.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error initializing server:', error);
    }
}

startServer();
