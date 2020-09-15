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
            console.log("otherSnakeBody  x : "+otherClientSnakeBody[0][0]+" y :"+otherClientSnakeBody[0][1]);
            this.multiplayerSnake.testLastSnakeBody.push(otherClientSnakeBody[0]);
            console.log("Reception du snake body de l'autre client : "+otherClientSnakeBody);
            this.multiplayerSnake.arrayBody = otherClientSnakeBody;
            this.multiplayerSnake.draw();

        }).bind(this))
    }

    this.emitSnakeBody = function (snakeBody) {
        socket.emit("EmitsnakeBody", snakeBody);
    }

    this.clearOtherSnakeBody = function(){

        //console.log("clear other snake body : "+this.testClearOtherSnakeFirstBody);
        this.multiplayerSnake.testClearOtherSnakeFirstBody();
        }.bind(this)
    }




export { SocketIoManagement };