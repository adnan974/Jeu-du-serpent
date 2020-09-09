import { Snake } from "./Snake.js";

function SocketIoManagement() {

    this.multiplayerSnake = new Snake("canvas");

    // PB: Ici "this" est dans une callback function, ce qui veut dire qu'elle n'est pas assignée à la propriété "multiplayerSnake" car c'est comme 
    // ça que fonctionne "this" (Voir documentation internet)
    // Solution : on utilise la methode "bind"

    // Code qui pose PB:
        /*socket.on("snakeBodyToAll", function (otherClientSnakeBody) {
            if(this.multiplayerSnake.arrayBody.length > 0){
                this.multiplayerSnake.clearBody();
            }
            this.multiplayerSnake.arrayBody = otherClientSnakeBody;
            this.multiplayerSnake.draw();
        })*/
        
    // Solution : on utilise uneFontion.bind(unObjet) pou associer les this de la fonction à un objet en particulier
    // Autre solution : Utiliser les fonctions fléchées. Le mc "this" dans une FF conrrespond au this qui englobe la fonction. 

    this.drawOtherClientSnake = function () {
        socket.on("snakeBodyToAll", (function (otherClientSnakeBody) {
            /*if(this.multiplayerSnake.arrayBody.length > 0){
                this.multiplayerSnake.clearBody();
            }*/
            console.log("body recu:"+otherClientSnakeBody);
            this.multiplayerSnake.arrayBody = otherClientSnakeBody;
            this.multiplayerSnake.draw();

            //socket.emit("EmitclearBodyForDeplacement")
        }).bind(this))
    }

    this.emitSnakeBody = function (snakeBody) {
        socket.emit("EmitsnakeBody", snakeBody);
    }

    this.clearOtherClientSnakeBody = function(snakeBody){
        this.multiplayerSnake.arrayBody = snakeBody;
        console.log("snake body envoyé : "+"x = "+this.multiplayerSnake.arrayBody[0]+" y ="+this.multiplayerSnake.arrayBody[1]);
        this.multiplayerSnake.clearBody();
        
    }.bind(this)
}



export { SocketIoManagement };