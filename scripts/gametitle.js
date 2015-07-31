
var gameTitle = (function () {
    var gameTitle = function (game) { };

    gameTitle.prototype = {
        create: function () {
            var bg = this.game.add.sprite(0, 0, 'background');
            var gameTitle = this.game.add.sprite(0, 0, "gametitle");
            gameTitle.scale.set(2);
            gameTitle.x = this.game.canvas.width/2-gameTitle.width/2;
            gameTitle.y = gameTitle.height/2;
            gameTitle.anchor.setTo(0, 0);
            var playButton = this.game.add.button(0, 0, "play", this.playTheGame, this);
            playButton.scale.set(0.5,0.5);
            playButton.x = this.game.canvas.width/2-playButton.width/2;
            playButton.y = this.game.canvas.height/2 -playButton.height/2;
            playButton.anchor.setTo(0, 0);
        },
        playTheGame: function () {
            this.game.state.start("TheGame");
        }
    };

    return gameTitle;
}());
