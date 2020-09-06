import { Snake } from "./Snake.js";

function SocketIoManagement() {

    this.multiplayerSnake = new Snake("canvas");

    this.updateOtherClientSnake = function () {


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
        
        // Solution : A FAIRE
        socket.on("snakeBodyToAll", function (otherClientSnakeBody) {
            if(this.multiplayerSnake.arrayBody.length > 0){
                this.multiplayerSnake.clearBody();
            }
            this.multiplayerSnake.arrayBody = otherClientSnakeBody;
            this.multiplayerSnake.draw();
        })


    }
    this.emitSnakeBody = function (snakeBody) {
        socket.emit("snakeBody", snakeBody);
    }
}



export { SocketIoManagement };