import {BoardGame} from "./BoardGame.js";
import {Fruit} from "./Fruit.js";
import {Snake} from "./Snake.js";


// = Agrégation ??
// Car j'affecte les objets depuis le constructeur. Cad que j'utilise un objet qui existe déjà quelque part
function Physics(snake,boardGame,fruit) {

    this.snake = snake;
    this.boardGame = boardGame;
    this.fruit = fruit;

    this.checkBoardColision = function(){
        console.log("newX :"+snake.newX,"newY :"+snake.newY);
        if((snake.newX== -5 || snake.newY == -5)||snake.newX == boardGame.width||snake.newY == boardGame.height){
            return true;
        }
    this.checkSnakeColision = function(){
        
        for(let i=0;i<snake.arrayBody.length-1;i++){
            if(snake.newX == snake.arrayBody[i][0] && snake.newY == snake.arrayBody[i][1]){
                return true;
            }

        }
    }

    this.checkFruitColision = function(){
        if (fruit.x == snake.newX && fruit.y == snake.newY) {
            return true;
        }
    }
        
    }

}

export {Physics};