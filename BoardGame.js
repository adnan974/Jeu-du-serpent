import { Canvas } from "./Canvas.js"
function BoardGame() {
    Canvas.call(this);
    // ancienne version
    /*
    this.boardColor = "black"; 
    this.boardHeight = 500;
    this.boardWidth = 900;
    */
    // nouvelle version
    // Pq ce changement: principe du clean code(?), ajouter "board" crée de la redondance
    this.color = "black";
    this.height = 150;
    this.width = 150;
    this.borderWitdh = "1";
    this.score = -10;

    this.create = function () {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);

        // Cette fonction double la taille de tous les éléments du context
        // Todo: A ranger quelque part d'autre ? dans le constructeur de la classe canva ?
        this.canvasContext.scale(2, 2);



        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);
    }

    // TODO a supprimer qd plus utilisé. Je dois utilisé la méthode présente dans la classe Canvas
    this.clear = function () {
        console.log(": " + this.canvasElement.width + ";" + ": " + this.canvasElement.height);
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

    this.setupHomePage = function () {
        this.canvasContext.scale(2, 2);

        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);

        this.canvasContext.fillStyle = "black";

        this.canvasContext.font = "8px Arial";
        this.canvasContext.fillText("Appuyez sur 'Y' pour commencer", this.width / 7, this.height / 2);
        

    }

    this.setupGameOverPage = function(){
        this.clear();
        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);

        this.canvasContext.fillStyle = "black";

        this.canvasContext.font = "8px Arial";
        this.canvasContext.fillText("GAME OVER", this.width/5, this.height / 2);
    }



}


export { BoardGame };