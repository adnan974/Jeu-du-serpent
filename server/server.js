var express = require("express");
var session = require('express-session');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);


var test = [];

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index.ejs");
})

io.sockets.on('connection', function (socket) {
    socket.on("test", function (message) {
        console.log(message);
    })

    socket.on("EmitsnakeBody", function (snakeBody) {
        /*test.push(snakeBody[snakeBody.length -1]);
        console.log("test   :   "+test);*/

        socket.broadcast.emit("snakeBodyToAll", snakeBody);
    })
})

server.listen(8080);