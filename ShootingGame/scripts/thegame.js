/**
 * Created by Тито on 26/07/2015.
 */
var theGame = function(game){
     score = 0;
     doggy=null;
};

theGame.prototype = {

    create: function(){
            score=0;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(0,0,'background');
            this.game.add.sprite(400,450,"gun");
            doggy= this.game.add.sprite(30, 470, 'dog');
            doggy.animations.add('walk', [0, 1, 2, 3, 4, 5]);
            this.game.physics.arcade.enable(doggy);
            doggy.inputEnabled=true;


    },
    update: function(){

        doggy.animations.play('walk',10,true);
        doggy.body.velocity.x = + 100;
        doggy.events.onInputDown.add(this.killDog, this);
        this.gameOver();

    },
    gameOver: function(){
        if(score==1) {
            this.game.state.start("GameOver", true, false, score);
        }
    },
    killDog: function(){
        
         doggy.kill();
         score++;
    }
};