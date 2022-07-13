const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected' + JSON.stringify(socket.client.id));

  socket.on('chat message', msg => {
    console.log(msg)
    io.emit('chat message', msg);
  });

  socket.on('Client 2 Server Message', msg => {
    console.log(msg)
    io.emit('Server 2 Client Message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

function emitEvent(type, msg) {
  io.emit(type, msg);
}

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

module.exports = { emitEvent };
