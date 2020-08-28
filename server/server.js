var express = require("express");
var session = require('express-session');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index.ejs");
})

io.sockets.on('connection', function (socket) {
    socket.on("test",function(message){
        console.log(message);
    })

    // CECI EST UN TEST
    socket.on("snakeBody",function(snakeBody){
        socket.broadcast.emit("snakeBodyToAll",snakeBody);
    })
})

server.listen(8080);