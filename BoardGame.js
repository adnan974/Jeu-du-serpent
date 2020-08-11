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
    this.height = 300;
    this.width = 300;
    this.borderWitdh = "1";

    this.create = function () {
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
        this.canvasContext.clearRect(310,0,200,200);        
        this.canvasContext.font = "30px Arial";
        this.canvasContext.fillText("Score:"+score,330,30);
    }
}

export {BoardGame};