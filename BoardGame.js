import {Canvas} from "./Canvas.js"
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

    this.create = function () {
        this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);

        // Cette fonction double la taille de tous les éléments du context
        this.canvasContext.scale(2,2);



        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);
    }

    // TODO a supprimer qd plus utilisé. Je dois utilisé la méthode présente dans la classe Canvas
    this.clear = function(){
        console.log(": "+this.canvasElement.width+";"+": "+this.canvasElement.height);        
        this.canvasContext.clearRect(0,0,this.canvasElement.width,this.canvasElement.height);
    }

    this.updateScoreInterface = function(score){
        // Y'a pas une meilleure maniere de faire ?
        this.canvasContext.clearRect(170,0,200,200); 
        this.canvasContext.fillStyle = "black";
       
        this.canvasContext.font = "15px Arial";
        this.canvasContext.fillText("Score:"+score,200,30);
    }
}

export {BoardGame};