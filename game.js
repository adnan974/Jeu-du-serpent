import { Canvas } from "./Canvas.js";
import { BoardGame } from "./BoardGame.js";
import { Snake } from "./Snake.js"
import { Fruit } from "./Fruit.js";
import { Physics } from "./Physics.js";




// TODO: créer un objet ? 
(function gameInit(){
    let pressStartButton=false;
    var boardGame = new BoardGame();
    
    boardGame.setupHomePage();

    document.addEventListener("keypress",function(e){
        console.log(e.keyCode);
        if(e.keyCode==121){
            gameSetup();
        }
    })

    

})()

/*
function gameOver(){
    var boardGame = new BoardGame();
    
    boardGame.setupGameOverPage();

    document.addEventListener("keypress",function(e){
        if(e.keyCode == 121){
            gameSetup();

        }
        
    })
}
*/

function gameSetup() {
    // Créer un objet score
   // var scoreElement = document.getElementById("score");


    var speed = 34;
    var boardGame = new BoardGame();
    var snake = new Snake();
    var fruit = new Fruit();
    // A analyse: des lecons interessante à en tirer dans la maniere dont j'ai crée cette clase.
    var physicsGame = new Physics(snake, boardGame, fruit);


    //scoreElement.textContent = "Score: " + boardGame.score;

    boardGame.clear();
    //boardGame.beginPath();


    boardGame.create();
    boardGame.updateScoreInterface();

    snake.selectColor("red");
    snake.draw();

    fruit.selectColorF("blue");
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
                snake.direction = "left";
                break;
            case asciiMooveRightCode:
                snake.direction = "right";
                break;
            case asciiMooveUpCode:
                snake.direction = "up";
                break;
            case asciiMooveDownCode:
                snake.direction = "down";
                break;
        }


    })

    function animation() {
        snake.clearBody();
        snake.mooveDirection();
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








