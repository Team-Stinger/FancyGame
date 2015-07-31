
var gameTitle = (function(){
    var gameTitle = function(game){};

    gameTitle.prototype = {
        create: function(){
            var bg=this.game.add.sprite(0,0,'background');
            var gameTitle = this.game.add.sprite(160,160,"gametitle");
            gameTitle.anchor.setTo(-1,0);
            var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
            playButton.anchor.setTo(-1,0);
        },
        playTheGame: function(){
            this.game.state.start("TheGame");
        }
    };

    return gameTitle;
}());
