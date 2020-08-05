function Canvas() {
    this.canvasId = "#canvas";
    // TODO: ajouter un setter
    this.canvasElement = document.querySelector(this.canvasId);
    this.canvasContext = this.canvasElement.getContext('2d');
}

// Question que je me pose : est-ce que l'héritage est une bonne idée ?
// Je peux aussi créer une classe statique sur Canva

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
    this.height = 500;
    this.width = 900;

    this.create = function () {

        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(0, 0, this.height, this.width);
    }
}

function Snake() {
    Canvas.call(this);
    this.color = "red";
    this.x = 0;
    this.y = 0;
    this.xSpeed = 5;
    this.width = 10;
    this.height = 10;

    //TODO: Définir cette fonction à l'aide d'un prototype ?
    this.draw = function () {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    };
    this.clear = function(){
        this.canvasContext.clearRect(this.x, this.y, this.width, this.height);
        
    }
    this.moove = function(){
        setInterval(() => {
            this.canvasContext.fillRect(this.xSpeed, this.y, this.width, this.height);
            this.x = this.xSpeed;
            this.xSpeed += 5;
        }, 500); 
        
        
    }
}


(function () {
    var boardGame = new BoardGame();
    var snake = new Snake();

    boardGame.create();
    snake.draw();

    snake.moove();

})()






