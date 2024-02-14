const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/websocket', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    message = message.toString('utf-8');
    ws.send(message);
  });
});


server.listen(3000, function listening() {
  console.log('WebSocket server is listening on port 3000');
});