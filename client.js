const io = require('socket.io-client')
const { emitEvent } = require('./index')
const socket = io("https://app-scl.five9.com", {
  path: '/appsvcs/ws',
  transports: ['websocket'],
  headers: {
    Authorization: 'Bearer ef7dce90-01ec-11ed-c6cf-8e72ba441f4d',
    farmId: "71",
  }
});

socket.on("connect_error", (err) => {
  console.log(err.type + ': ' + err.message + ' ' + err.description.message);
  emitEvent('Server 2 Client Message', {
    errorType: err.type,
    errorMessage: err.message,
    errorDescription: err.description.message
  })
});

socket.on("connect", () => {
  console.log('Connected')
});

socket.on('chat message', msg => {
  console.log(msg)
});

socket.on('Server 2 Client Message', msg => {
  console.log(msg)
});

socket.on('disconnect', () => {
  console.log('user disconnected');
});
