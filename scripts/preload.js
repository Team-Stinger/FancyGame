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
        this.game.load.spritesheet("turtle","resources/images/turtleSpriteRight.png",85,66);
        this.game.load.spritesheet("camel","resources/images/camalSprite.png",80,57);
        this.game.load.spritesheet("fox","resources/images/foxSpriteRight.png",48,29);
        this.game.load.spritesheet("blueBird","resources/images/blueBirdLeft.png",109,82);
        this.game.load.spritesheet("raccoon","resources/images/raccoonSpriteLeft.png",32,18);
        this.game.load.spritesheet("turtleLeft","resources/images/turtleSpriteLeft.png",85,64);
        this.game.load.image("background","resources/images/bg.jpg");
        this.game.load.image("gametitle","resources/images/Title.png");
        this.game.load.image("play","resources/images/playButton.jpg");
        this.game.load.image("gun","resources/images/machineGun.png");
        this.game.load.image("gameover","resources/images/Game_over.jpg");
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
};