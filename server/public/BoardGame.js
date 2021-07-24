import { Canvas } from "./Canvas.js"

// TODO séparer cette classe en plusieurs classes. Une qui gère, le board, l'autre le score etc... avec une interface
function BoardGame(canvasId, color = "black", height = 150, width = 150, borderWitdh = "0") {

    Canvas.call(this, canvasId);


    // ancienne version
    /*
    this.boardColor = "black"; 
    this.boardHeight = 500;
    this.boardWidth = 900;
    */
    // nouvelle version
    // Pq ce changement: principe du clean code(?), ajouter "board" crée de la redondance
    this.color = color;
    this.height = height;
    this.width = width;
    this.borderWitdh = borderWitdh;
    this.score = -10;

    this.createBorder = function () {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);

        // Cette fonction double la taille de tous les éléments du context
        // Todo: A ranger quelque part d'autre ? dans le constructeur de la classe canva ?
        this.canvasContext.scale(2, 2);



        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.rect(10, 10, this.height, this.width);
        this.canvasContext.stroke();
        //this.canvasContext.strokeRect(0, 0, this.height, this.width);
    }

    // TODO a supprimer qd plus utilisé. Je dois utilisé la méthode présente dans la classe Canvas
    this.clear = function () {
        this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    this.updateScoreInterface = function () {
        this.score += 10;
        // Y'a pas une meilleure maniere de faire ?
        this.canvasContext.clearRect(170, 0, 200, 200);
        this.canvasContext.fillStyle = "black";

        this.canvasContext.font = "15px Arial";
        this.canvasContext.fillText("Score:" + this.score, 200, 30);
    }

    this.createHomePage = function () {
        this.canvasContext.scale(2, 2);

        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(10, 10, this.height, this.width);

        this.canvasContext.fillStyle = "black";

        this.canvasContext.font = "8px Arial";
        this.canvasContext.fillText("Appuyez sur 'Y' pour commencer", this.width / 7, this.height / 2);


    }

    this.createGameOverPage = function () {
        this.clear();
        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);

        this.canvasContext.fillStyle = "black";

        this.canvasContext.font = "8px Arial";
        this.canvasContext.fillText("GAME OVER", this.width / 5, this.height / 2);
    }



}


export { BoardGame };