var gameOver = (function(){
    var gameOver = function(game){};

    gameOver.prototype = {
        init: function(score){

        },
        create: function(){
            var bg= this.game.add.sprite(0,0,"background");
            var gameOverTitle = this.game.add.sprite(0,0,"gameover");
            gameOverTitle.scale.set(0.5);
            gameOverTitle.x = this.game.canvas.width/2-gameOverTitle.width/2;
            gameOverTitle.y = gameOverTitle.height;
            gameOverTitle.anchor.setTo(0,0);
            var playButton = this.game.add.button(0, 0, "play", window.location('ReloadPage.php'), this);
            playButton.scale.set(0.5,0.5);
            playButton.x = this.game.canvas.width/2-playButton.width/2;
            playButton.y = this.game.canvas.height/2 -playButton.height/2;
            playButton.anchor.setTo(0, 0);
        },
        playTheGame: function(){
            this.game.state.start("TheGame");
        }
    };

    return gameOver;
}());
