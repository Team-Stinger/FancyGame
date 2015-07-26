
var theGame = function(game){

};

theGame.prototype = {
    create: function(){
        this.game.state.start("GameOver",true,false,score);
    },
