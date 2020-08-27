var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("index.ejs");
})

io.sockets.on('connection', function (socket) {

})

server.listen(8080);