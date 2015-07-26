/**
 * Created by Тито on 26/07/2015.
 */
var theGame = function(game){


     score = 0;
};

theGame.prototype = {
    create: function(){

            this.game.add.sprite(0,0,'background');
            if(score==3) {

                this.game.state.start("GameOver", true, false, score);
            }

    }
};