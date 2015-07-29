/**
 * Created by ���� on 26/07/2015.
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
            gunny = this.game.add.sprite(400,450,"gun");
            this.game.physics.arcade.enable(gunny);
            doggy= this.game.add.sprite(30, 470, 'dog');
            doggy.animations.add('walk', [0, 1, 2, 3, 4, 5]);
            this.game.physics.arcade.enable(doggy);
            doggy.inputEnabled=true;

            this.game.time.events.loop(Phaser.Timer.SECOND, this.enemyFactory, this);


    },
    update: function(){
        this.game.input.addMoveCallback(this.moveTheGun, gunny);

        doggy.animations.play('walk',10,true);
        doggy.body.velocity.x = + 100;
        doggy.events.onInputDown.add(this.killDog, this);
        //this.gameOver();

    },
    gameOver: function(){
        if(score==1) {
            this.game.state.start("GameOver", true, false, score);
        }
    },
    killDog: function(currentDog){

        currentDog.kill();
         score++;
    },
    moveTheGun: function () {
        if (gunny.x < this.game.input.mousePointer.x) {
            gunny.x += 1;
        }
        else if (gunny.x > this.game.input.mousePointer.x) {
            gunny.x -= 1;
        }

        if(gunny.y < this.game.input.mousePointer.y && gunny.y < 495) {
            gunny.y += 1;
        }
        else if (gunny.y > this.game.input.mousePointer.y && gunny.y > 350) {
            gunny.y -= 1;
        }
    },
    enemyFactory: function() {
        doggy = this.game.add.sprite(30, Math.random() * 470, 'dog');
        doggy.animations.add('walk', [0, 1, 2, 3, 4, 5]);
        this.game.physics.arcade.enable(doggy);
        doggy.inputEnabled = true;
    }
};