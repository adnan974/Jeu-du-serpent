
import {Canvas} from "./Canvas.js";
import {BoardGame} from "./BoardGame.js";
import {getRandomInt} from "./FunctionCollection.js"

function Fruit(canvasId,color="blue",width=5,height=5,x=0,y=0) {

    Canvas.call(this,canvasId);
    
    this.color = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    // Compositon ?
    // Pas mieux de faire une agrégation ?
    this.boardGame = new BoardGame(canvasId);

    this.setColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }

    this.getColor = () => this.color;

    this.getRandomIntOf5Table = function(){
        let randomInt = getRandomInt(5, this.boardGame.width - 5);
        
        return randomInt-randomInt%5;
    }

    this.create = function () {
        this.x = this.getRandomIntOf5Table();
        this.y = this.getRandomIntOf5Table();

        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }


}

export {Fruit};