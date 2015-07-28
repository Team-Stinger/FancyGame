/**
 * Created by ���� on 26/07/2015.
 */
var preload = function(game){};

preload.prototype = {
    preload: function(){
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.spritesheet("dog","resources/images/dog.png",30,24);
        this.game.load.image("background","resources/images/bg.jpg");
        this.game.load.image("gametitle","resources/images/Title.png");
        this.game.load.image("play","resources/images/playButton.jpg");
        this.game.load.image("gun","resources/images/machineGun.png");
        this.game.load.image("gameover","resources/images/gameOver.png");
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
};