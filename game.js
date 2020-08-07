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
    this.tourNumber = 0;

    this.create = function () {

        this.canvasContext.fillStyle = this.color;
        this.canvasContext.strokeRect(0, 0, this.height, this.width);
    }
}

function Snake() {
    Canvas.call(this);
    this.color = "red";

    this.newX = 0;
    this.newY = 0;

    this.width = 10;
    this.height = 10;

    this.growthNumber = 5;

    this.arrayBody = [[this.newX, this.newY]];



    // TODO: setter (?)
    this.selectColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }

    //TODO: Définir cette fonction à l'aide d'un prototype ?
    this.drawInit = function () {
        this.arrayBody.forEach(element => {
            this.canvasContext.fillRect(element[0], element[1], this.width, this.height);
        });
    };

    this.newDraw = function () {
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

    this.mooveDirection = function (direction) {
        switch (direction) {
            case "right":
                this.newX += 5;
                break;

            case "left":
                this.newX -= 5;
                break;

            case "up":
                this.newY -= 5;
                break;

            case "down":
                this.newY += 5;
                break;
        }
        this.newDraw();


    }


    this.mooveInit = function () {

        const asciiMooveLeftCode = 37;
        const asciiMooveRightCode = 39;
        const asciiMooveUpCode = 38;
        const asciiMooveDownCode = 40;

        // Todo : ajouter un attribut en mode protedted dans la classe board game ?
        let nbItr = 0;
        let direction = "right";

        setInterval(() => {
            if (nbItr > 0) {
                this.clearBody();

            }

            this.mooveDirection(direction);
            this.arrayBody.push([this.newX, this.newY]);
            this.grow();

            nbItr++;

            document.addEventListener('keydown', function (e) {
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
        }, 50);

    }

    var test = 0;
    this.grow = function () {
        test += 1;
        if (test%5 == 0) {
            this.growthNumber++;
            this.arrayBody.push([1, 0]);
            console.log(this.arrayBody.length);
        }
    }




}

function Fruit(){
    Canvas.call(this);
    this.color = "black";
    this.width = 10;
    this.height = 10;
    this.x = 50;
    this.y= 50;

    this.selectColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }

    this.initFruit = function(){
        this.canvasContext.fillRect(this.x,this.y,this.width,this.height);
    }
}


(function () {
    var boardGame = new BoardGame();
    var snake = new Snake();
    var fruit = new Fruit();


   boardGame.create();
    snake.selectColor("red");
    snake.drawInit();

    snake.mooveInit();

    fruit.selectColor("blue");
    fruit.initFruit();



})()








