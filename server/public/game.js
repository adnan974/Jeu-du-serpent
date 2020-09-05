import { Canvas } from "./Canvas.js";
import { BoardGame } from "./BoardGame.js";
import { Snake } from "./Snake.js"
import { Fruit } from "./Fruit.js";
import { Physics } from "./Physics.js";


var canvaId = "canvas";

// TODO: créer un objet ? 
(function gameInit() {

    var boardGame = new BoardGame(canvaId);

    boardGame.createHomePage();

    document.addEventListener("keypress", function (e) {
        console.log(e.keyCode);
        if (e.keyCode == 121) {
            gameSetup();
        }
    })



})()

/*
function gameOver(){
    var boardGame = new BoardGame();
    
    boardGame.createGameOverPage();

    document.addEventListener("keypress",function(e){
        if(e.keyCode == 121){
            gameSetup();

        }
        
    })
}
*/

function gameSetup() {
    // Créer un objet score ?
    // var scoreElement = document.getElementById("score");


    var speed = 140;
    var boardGame = new BoardGame(canvaId);
    var snake = new Snake(canvaId);
    var fruit = new Fruit(canvaId);

    // TODO: a mettre dans un objet qui gere le multijoueur 
    var multiplayerSnake = new Snake(canvaId)

    // A analyse: des lecons interessante à en tirer dans la maniere dont j'ai crée cette clase.
    var physicsGame = new Physics(snake, boardGame, fruit);

    //scoreElement.textContent = "Score: " + boardGame.score;

    boardGame.clear();
    //boardGame.beginPath();


    boardGame.createBoder();
    boardGame.updateScoreInterface();

    snake.setColor("red");
    snake.draw();

    fruit.setColor("blue");
    fruit.create();


    const asciiMooveLeftCode = 37;
    const asciiMooveRightCode = 39;
    const asciiMooveUpCode = 38;
    const asciiMooveDownCode = 40;
    
    document.addEventListener('keydown', function (e) {

        // TODO: mettre ça dans une fonction ?
        switch (e.keyCode) {
            case asciiMooveLeftCode:
                // Todo: ajoute run setter ?
                snake.setDirection("left");
                break;
            case asciiMooveRightCode:
                snake.setDirection("right");
                break;
            case asciiMooveUpCode:
                snake.setDirection("up");
                break;
            case asciiMooveDownCode:
                snake.setDirection("down");
                break;
        }


    })

     // TEST
     socket.on("snakeBodyToAll",function(snakeBody){
        if (multiplayerSnake.arrayBody.length > 0){
            multiplayerSnake.clearBody();
        }
       
        multiplayerSnake.arrayBody = snakeBody;
        multiplayerSnake.draw();        
    })

    function animation() {

        socket.emit("snakeBody",snake.arrayBody);

       
        
        snake.clearBody();
        snake.mooveDirection();

        // Je préfére mettre : "this.setColor("red");" en dehors de la fonction "draw()" car je ne veux pas que celle ait un side effect
        snake.setColor("red");
        snake.draw();

        if (physicsGame.checkBoardColision()) {
            return gameSetup();
        }

        if (snake.growthNumber >= 4) {
            if (physicsGame.checkSnakeColision()) {
                return gameSetup();
            }
        }

        if (physicsGame.checkFruitColision()) {
            boardGame.updateScoreInterface();

            //   scoreElement.textContent = "score: " + score;
            snake.grow();

            // TEST
            socket.emit("snakeBody",snake.arrayBody);
            
            
            
            fruit.setColor("blue");
            fruit.create();
        }
        //snake.grow();

        // TODO: A améliorer ?
        setTimeout(() => {
            requestAnimationFrame(animation);

        }, speed);
    }

    requestAnimationFrame(animation);





}








