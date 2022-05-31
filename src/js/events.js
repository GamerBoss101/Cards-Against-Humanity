

const io = require('socket.io-client');
const socket = io(`http://173.79.124.86:8080`, { reconnect: false, transports: [ "websocket" ] });

let room, creator, qCards, ACards, username;

socket.on('error', (e) => {
  console.log(e); // not displayed
});

socket.on('creatorJoin', (data) => {
    console.log(data)
    room = data.game.id
    creator = data.game.username
    username = localStorage.getItem('username')
    document.getElementById("game").innerHTML = "Welcome to " + data.game.id;
});

socket.on('playerJoin', (data) => {
    console.log(data)
    room = data.game.id
    document.getElementById("game").innerHTML = "Welcome to " + data.game.id;
});

socket.on('connect', () => {
  console.log("connected renderer"); 
});