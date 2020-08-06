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
    this.newX = 5;
    this.newY = this.y;
    this.width = 10;
    this.height = 10;

    // TODO: setter (?)
    this.selectColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }

    //TODO: Définir cette fonction à l'aide d'un prototype ?
    this.drawInit = function () {
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newDraw = function () {
        this.canvasContext.fillRect(this.newX, this.newY, this.width, this.height);
    }

    this.clear = function () {
        this.canvasContext.clearRect(this.x, this.y, this.width, this.height);

    }

    this.mooveDirection = function (direction) {
        switch (direction) {
            case "right":
                this.newX += 5;
                this.x = this.newX;
                break;

            case "left":
                this.newX -= 5;
                this.x = this.newX;
                break;

            case "up":
                this.newY -=5;
                this.y = this.newY;

                break;

            case "down":
                this.newY +=5;
                this.y = this.newY;

                break;
            }
        this.newDraw();
        

    }


    this.mooveInit = function () {

        const asciiMooveLeftCode = 37;
        const asciiMooveRightCode = 39;
        const asciiMooveUpCode = 38;
        const asciiMooveDownCode = 40;

        let direction = "right";

        setInterval(() => {

            this.clear();
            this.mooveDirection(direction);
            

            document.addEventListener('keydown', function (e) {
                console.log(e.keyCode);
                switch (e.keyCode) {
                    case asciiMooveLeftCode:
                        direction = "left";
                        break;
                    case asciiMooveRightCode:
                        direction = "right";
                        break;
                    case asciiMooveUpCode:
                        direction = "up";
                        break;
                    case asciiMooveDownCode:
                        direction = "down";
                        break;
                }

            })
        }, 500);

    }

}


(function () {
    var boardGame = new BoardGame();
    var snake = new Snake();

    boardGame.create();
    snake.selectColor("red");
    snake.drawInit();

    snake.mooveInit();

})()








