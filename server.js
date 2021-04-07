const express = require('express')
const ws = require('ws')
const port = process.env.PORT || 8080;

const app = express();

const server = app.listen(port);

app.use(express.static(__dirname + '/public'));

const wsServer = new ws.Server({ server });

wsServer.on('connection', function connection(socket) {
    socket.on('message', data => {
        wsServer.clients
            .forEach(client => {
                client.send(data);
            });
    });
});

