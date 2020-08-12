import { Canvas } from "./Canvas.js";
import { BoardGame } from "./BoardGame.js";
import { Snake } from "./Snake.js"
import { Fruit } from "./Fruit.js";
import { Physics } from "./Physics.js";

// Question que je me pose : est-ce que l'héritage est une bonne idée ?
// Je peux aussi créer une classe statique sur Canva



(function gameSetup() {
    // Créer un objet score
    var score = 0;
    var scoreElement = document.getElementById("score");

    var speed = 17;
    var boardGame = new BoardGame();
    var snake = new Snake();
    var fruit = new Fruit();
    // A analyse: des lecons interessante à en tirer dans la maniere dont j'ai crée cette clase.
    var physicsGame = new Physics(snake, boardGame, fruit);


    scoreElement.textContent = "Score: " + score;

    boardGame.clear();
    //boardGame.beginPath();


    boardGame.create();
    boardGame.updateScoreInterface(score);

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
            score += 10;
            boardGame.updateScoreInterface(score);

            scoreElement.textContent = "score: " + score;
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





})()








