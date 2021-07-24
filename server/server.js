var express = require("express");
const serve   = require('express-static');
var app = express();
var server = require("http").createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




app.get(["/","/jeu"], function (req, res) {
    res.render("index");
})



app.use(serve(__dirname + '/public'));


server.listen(process.env.PORT || 8081,()=>{
    console.log("server is listening");
});