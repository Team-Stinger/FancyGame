
var gameTitle = function(game){};

gameTitle.prototype = {
    create: function(){
       
    },
    playTheGame: function(){
        this.game.state.start("TheGame");
    }
};