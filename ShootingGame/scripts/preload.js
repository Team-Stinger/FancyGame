/**
 * Created by Тито on 26/07/2015.
 */
var preload = function(game){};

preload.prototype = {
    preload: function(){
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.spritesheet("dog","assets/dog.png",30,24,11);
        this.game.load.image("background","assets/bg.jpg");
        this.game.load.image("gametitle","assets/Title.png");
        this.game.load.image("play","assets/playButton.jpg");
        this.game.load.image("gameover","assets/gameover.png");
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
};