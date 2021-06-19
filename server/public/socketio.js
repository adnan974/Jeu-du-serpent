
const socket = io('http://localhost:8081');

socket.emit("test","un client s'est connecté");