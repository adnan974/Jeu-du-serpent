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
    this.height = 300;
    this.width = 300;
    this.borderWitdh = "2";

    this.create = function () {
        this.canvasContext.lineWidth = this.borderWitdh;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);
    }
}

function Snake() {
    Canvas.call(this);
    this.color = "red";

    this.newX = 5;
    this.newY = 5;

    this.width = 10;
    this.height = 10;

    this.growthNumber = 5;

    this.direction = "right";
    this.previousDirection = null;

    this.arrayBody = [[this.newX, this.newY]];



    // TODO: setter (?)
    this.selectColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }



    this.draw = function () {
        this.arrayBody.forEach(element => {
            this.canvasContext.fillRect(element[0], element[1], this.width, this.height);
        });
    }

    this.clearBody = function () {
        let xPreviousPos = this.arrayBody[0][0];
        let yPreviousPos = this.arrayBody[0][1];
        this.canvasContext.clearRect(xPreviousPos, yPreviousPos, this.width, this.height);
        this.arrayBody.shift();
    }

    this.mooveDirection = function () {

        switch (this.direction) {
            case "right":
                if (this.previousDirection == "left") {
                    this.direction = "left";
                    this.newX -= 5;
                }
                else {
                    this.newX += 5;
                }
                break;

            case "left":
                if (this.previousDirection == "right") {
                    this.direction = "right";
                    this.newX += 5;

                }
                else {
                    this.newX -= 5;
                }
                break;

            case "up":
                if (this.previousDirection == "down") {
                    this.direction = "down";
                    this.newY += 5;

                }
                else {
                    this.newY -= 5;
                }
                break;
            case "down":
                if (this.previousDirection == "up") {
                    this.direction = "up";
                    this.newY -= 5;

                }
                else {
                    this.newY += 5;
                }
                break;
        }
        this.previousDirection = this.direction;
        this.arrayBody.push([this.newX, this.newY]);
    }



    this.listenEvent = function () {
        const asciiMooveLeftCode = 37;
        const asciiMooveRightCode = 39;
        const asciiMooveUpCode = 38;
        const asciiMooveDownCode = 40;
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case asciiMooveLeftCode:
                    // Todo: ajoute run setter ?
                    this.direction = "left";
                    break;
                case asciiMooveRightCode:
                    this.direction = "right";
                    break;
                case asciiMooveUpCode:
                    this.direction = "up";
                    break;
                case asciiMooveDownCode:
                    this.direction = "down";
                    break;
            }

        })
    }

    this.grow = function () {
        this.growthNumber++;
        this.arrayBody.push([null, null]);
        console.log(this.arrayBody.length);

    }




}

function Fruit() {
    Canvas.call(this);
    this.color = "black";
    this.width = 10;
    this.height = 10;
    this.x = 0;
    this.y = 0;
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
        this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
    }
}

function Physics(snake,boardGame,fruit) {

    this.snake = snake;
    this.boardGame = boardGame;
    this.fruit = fruit;

    this.checkBoardColision = function(){
        if((snake.newX==0 || snake.newY == 0)||snake.newX == boardGame.width||snake.newY == boardGame.height){
            console.log("GAME OVER");
            return true;
        }
    this.checkSnakeColision = function(){
        
    }
        
    }

}

// TODO: A ranger ?
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


(function () {
    var boardGame = new BoardGame();
    var snake = new Snake();
    var fruit = new Fruit();

    // A analyse: des lecons interessante à en tirer dans la maniere dont j'ai crée cette clase.
    var physicsGame = new Physics(snake,boardGame,fruit);



    boardGame.create();
    snake.selectColor("red");
    snake.draw();

    fruit.selectColorF("blue");
    fruit.create();


    setInterval(() => {

        const asciiMooveLeftCode = 37;
        const asciiMooveRightCode = 39;
        const asciiMooveUpCode = 38;
        const asciiMooveDownCode = 40;
        document.addEventListener('keydown', function (e) {
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

        // snake.listenEvent();
        physicsGame.checkBoardColision();
        snake.clearBody();
        snake.mooveDirection();
        snake.selectColor('red');
        snake.draw();
        if (fruit.x == snake.newX && fruit.y == snake.newY) {
            snake.grow();
            fruit.create();
        }

        

    }, 50);



    /* snake.mooveInit();
 
     fruit.selectColor("blue");
     fruit.initFruit();*/



})()








