
const socket = io('http://localhost:8080');

socket.emit("test","un client s'est connecté");