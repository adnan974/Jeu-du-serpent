
import {Canvas} from "./Canvas.js";
import {BoardGame} from "./BoardGame.js";
import {getRandomInt} from "./Function collection.js"

function Fruit() {
    Canvas.call(this);
    this.color = "black";
    this.width = 10;
    this.height = 10;
    this.x = 0;
    this.y = 0;
    this.NbOfFruitApparition = 0;
    // Compositon ?
    // Pas mieux de faire une agrégation ?
    this.boardGame = new BoardGame();

    this.selectColorF = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }

    this.create = function () {
        this.x = getRandomInt(5, this.boardGame.width - 5);
        this.x -= this.x % 5;
        this.y = getRandomInt(5, this.boardGame.height - 5);
        this.y -= this.y % 5;
        this.NbOfFruitApparition++;
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }
}

export {Fruit};