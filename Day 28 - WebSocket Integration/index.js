const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/websocket", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Create an array to store connected clients
const clients = [];

wss.on("connection", function connection(ws) {
    // Add the new client to the array
    clients.push(ws);

    ws.on("message", function incoming(message) {
        message = message.toString("utf-8");        
        // Broadcast the message to all connected clients
        clients.forEach(client => {
            client.send(message);
        });
    });
});

server.listen(3000, function listening() {
    console.log("WebSocket server is listening on port 3000");
});
