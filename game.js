import {Canvas} from "./Canvas.js";
import {BoardGame} from "./BoardGame.js";
import {Snake} from "./Snake.js"
import {Fruit} from "./Fruit.js";
import {Physics} from "./Physics.js";

// Question que je me pose : est-ce que l'héritage est une bonne idée ?
// Je peux aussi créer une classe statique sur Canva



(function gameSetup () {
    var score = 0;
    var boardGame = new BoardGame();
    var snake = new Snake();
    var fruit = new Fruit();
    console.log(snake.newX);
    // A analyse: des lecons interessante à en tirer dans la maniere dont j'ai crée cette clase.
    var physicsGame = new Physics(snake,boardGame,fruit);

    boardGame.clear();



    boardGame.create();
    snake.selectColor("red");
    snake.draw();

    fruit.selectColorF("blue");
    fruit.create();


    const asciiMooveLeftCode = 37;
    const asciiMooveRightCode = 39;
    const asciiMooveUpCode = 38;
    const asciiMooveDownCode = 40;
    document.addEventListener('keydown', function (e) {
        boardGame.clear();

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
    setInterval(() => {

        // snake.listenEvent();
        snake.clearBody();
        snake.mooveDirection();
        snake.selectColor('red');
        snake.draw();
        if(physicsGame.checkBoardColision()){
            return gameSetup();
        }
        if(snake.growthNumber >= 4){
            physicsGame.checkSnakeColision();
        }

        if (physicsGame.checkFruitColision()){
            score += 1;
            snake.grow();
            fruit.create();
        }
        

        

    }, 50);



    /* snake.mooveInit();
 
     fruit.selectColor("blue");
     fruit.initFruit();*/



})()








