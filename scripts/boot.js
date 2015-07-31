var boot = (function(){
    var boot = function(game){
        console.log("%cStarting my awesome game", "color:white; background:red");
    };

    boot.prototype = {
        preload: function(){

            this.game.load.image("loading","resources/images/load.png");
        },
        create: function(){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            // this.game.scale.setScreenSize();
            this.game.state.start("Preload");
        }
    };

    return boot;
}());
