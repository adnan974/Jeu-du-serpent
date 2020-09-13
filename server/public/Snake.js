import { Canvas } from "./Canvas.js";
function Snake(canvasId, initX = 5, initY = 5, width = 5, height = 5) {
    Canvas.call(this, canvasId);


    this.color = "red";

    this.newX = initX;
    this.newY = initY;

    this.width = width;
    this.height = height;

    this.direction = "right";
    this.previousDirection = null;

    this.growthNumber = 0;

    this.arrayBody = [[this.newX, this.newY]];



    // var snake = document.getElementById("snake_head");

    this.setColor = function (color) {
        this.canvasContext.fillStyle = color;
        this.color = color;
    }


    this.getColor = () => this.color;

    this.setDirection = function (direction) {
        if (direction === "right" || direction === "left" || direction === "up" || direction === "down") {
            this.direction = direction;
        }
    }

    this.getDirection = () => this.direction;

    this.getGrowthNumber = () => this.growthNumber;


    this.draw = function () {
        this.arrayBody.forEach(element => {
            this.canvasContext.fillRect(element[0], element[1], this.width, this.height);
            //this.canvasContext.drawImage(snake, element[0], element[1], this.width, this.height);
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
        this.growthNumber++;
        this.previousDirection = this.direction;
        this.arrayBody.push([this.newX, this.newY]);
    }



    this.listenEvent = function () {
        const asciiMooveLeftCode = 37;
        const asciiMooveRightCode = 39;
        const asciiMooveUpCode = 38;
        const asciiMooveDownCode = 40;
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


    }

    this.grow = function () {
        this.arrayBody.push([0,0]);

    }




}

export { Snake };