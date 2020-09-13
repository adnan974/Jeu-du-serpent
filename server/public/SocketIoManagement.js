import { Snake } from "./Snake.js";

function SocketIoManagement() {

    this.multiplayerSnake = new Snake("canvas");
    this.testLastSnakeBody = [];

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
            console.log("Reception du snake body de l'autre client : "+otherClientSnakeBody);
            this.multiplayerSnake.arrayBody = otherClientSnakeBody;
            this.multiplayerSnake.draw();

        }).bind(this))
    }

    this.emitSnakeBody = function (snakeBody) {
        socket.emit("EmitsnakeBody", snakeBody);
    }

    this.clearOtherSnakeBody = function(){
        socket.on("clearResponseOtherSnakeBodyForDeplacement",function(snakeBody){
            this.multiplayerSnake.test = snakeBody;
            this.multiplayerSnake.clearAllBody();

            

        }.bind(this))
    }
}



export { SocketIoManagement };