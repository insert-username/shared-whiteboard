const uuid = require('uuid')
const express = require('express')
const ws = require('ws')
const randomWords = require('random-words')
const port = process.env.PORT || 8080;

const app = express();

const server = app.listen(port);

app.use(express.static(__dirname + '/public'));

const wsServer = new ws.Server({ server });

const clientNames = [];

wsServer.on('connection', function connection(socket) {

    socket.id = uuid.v4();

    clientName = randomWords({ exactly: 2, join: '-'});
    clientNames[socket.id] = clientName;

    console.log("New client connected, clientNames are now: ");
    console.log(clientNames);

    socket.send(
        JSON.stringify(
            { clientAssignment:
                { name: clientName }
            }));

    wsServer.clients.forEach(client => {
            otherClients = [];
            wsServer.clients.forEach(c => {
                    if(c != client) {
                        otherClients.push(c);
                    }
                });
            otherClientNames = otherClients.map(oc => clientNames[oc.id]);

            messageObject = { clientAssignment: {
                    otherNames: otherClientNames
                }};

            client.send(JSON.stringify(messageObject));
        });


    socket.on('message', data => {
        messageObject = JSON.parse(data);

        if (messageObject.keepAlive) {
            // keeping the connection open/heroku app up, so ignore.
            console.log("Keepalive from client: " + clientNames[socket.id]);
            return true;
        }


        // forward draw commands to the other clients.
        if (messageObject.drawCommand) {
            wsServer.clients
                .forEach(client => {
                    client.send(data);
                });
        }
    });
});

