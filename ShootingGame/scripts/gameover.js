
var gameOver = function(game){};

gameOver.prototype = {
    init: function(score){
        alert("You scored: "+score)
    },
    create: function(){
       
    },
    playTheGame: function(){
        this.game.state.start("TheGame");
    }
};