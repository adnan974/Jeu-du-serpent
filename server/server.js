var express = require("express");
//var session = require('express-session');
const serve   = require('express-static');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(8081)

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




app.get(["/","/jeu"], function (req, res) {
    res.render("index");
})

// io.sockets.on('connection', function (socket) {
//     socket.on("test", function (message) {
//         console.log(message);
//     })

//     socket.on("EmitsnakeBody", function (snakeBody) {
 
//         socket.broadcast.emit("snakeBodyToAll", snakeBody);
//     })

// })

app.use(serve(__dirname + '/public'));


server.listen(8080,()=>{
    console.log("server is listening");
});