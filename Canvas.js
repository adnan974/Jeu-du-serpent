// Question que je me pose : est-ce que l'héritage est une bonne idée ?
// Je peux aussi créer une classe statique sur Canva
function Canvas() {
    this.canvasId = "#canvas";
    // TODO: ajouter un setter
    this.canvasElement = document.querySelector(this.canvasId);
    this.canvasContext = this.canvasElement.getContext('2d');

    // TODO: a utiliser; il faut que j'ajoute les méthodes lors de l'héritage
    this.clearContext = function(){
        this.canvasContext.clearRect(0,0,this.canvasElement.width,this.canvasElement.height);
    }
}

export {Canvas};