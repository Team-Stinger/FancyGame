/**
 * Created by Тито on 26/07/2015.
 */
var boot = function(game){
    console.log("%cStarting my awesome game", "color:white; background:red");
};

boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/load.png");
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
};