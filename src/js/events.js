
const io = require('socket.io-client');
const socket = io(`http://173.79.124.86:8080`, { reconnect: false, transports: [ "websocket" ] });

let room = null;

socket.on('error', (e) => {
  console.log(e); // not displayed
});

socket.on('player', (data) => {
  console.log("OK received renderer"); // not displayed
  console.log(data)
});

socket.on('connect', () => {
  console.log("connected renderer"); // displayed
  socket.emit("load", { message: "Hoi" })
});