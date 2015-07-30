/**
 * Created by ���� on 26/07/2015.
 */
var theGame = function(game){
     score = 0;
     doggy=null;
};

var rightAnimals = ['turtle', 'camel', 'fox'],
    leftAnimals = ['blueBird', 'turtleLeft', 'raccoon'];

theGame.prototype = {

    create: function(){
            score=0;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
			background = this.game.add.sprite(0, 0, 'background');
            gunny = this.game.add.sprite(400,450,"gun");
            this.game.physics.arcade.enable(gunny);

            rightMovingEnemies = this.game.add.group();
            leftMovingEnemies = this.game.add.group();

            rightMovingEnemies.create(30, 450, 'turtle');
            rightMovingEnemies.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            rightMovingEnemies.setAll('inputEnabled', true);

            leftMovingEnemies.create(550, 50, 'turtleLeft');
            leftMovingEnemies.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            leftMovingEnemies.setAll('inputEnabled', true);
			
			shootingGun = this.game.add.audio('shootingSound');
			shootingGun.allowMultiple = true;
			
			hitAnimalSound = this.game.add.audio('hittedCreatureSound');
			hitAnimalSound.allowMultiple = true;

			music = this.game.add.audio('backgroundSound');
			music.play();

			background.inputEnabled = true;
			background.events.onInputDown.add(function () {
			   shootingGun.play();
			}, this);
			
			pause = this.game.add.sprite(0, 523, "pause");
			pause.inputEnabled = true;
            pause.events.onInputUp.add(function () {
            this.game.paused = true;
            }, this);
            this.game.input.onDown.add(function () {
            if (this.game.paused)this.game.paused = false;
            }, this);

            this.game.time.events.loop(Phaser.Timer.SECOND, this.enemyFactory, this);


    },
    update: function(){
        this.game.input.addMoveCallback(this.moveTheGun, gunny);

        rightMovingEnemies.callAll('animations.play', 'animations', 'walk', 10, true);
        rightMovingEnemies.callAll('events.onInputDown.add', 'events.onInputDown', this.killDog, this);
        rightMovingEnemies.addAll('x', 3);

        leftMovingEnemies.callAll('animations.play', 'animations', 'walk', 10, true);
        leftMovingEnemies.callAll('events.onInputDown.add', 'events.onInputDown', this.killDog, this);
        leftMovingEnemies.addAll('x', -3);
        this.gameOver();

    },
    gameOver: function(){
        if(score==3) {
            this.game.state.start("GameOver", true, false, score);
        }
    },
    killDog: function(currentDog){
		shootingGun.play();
		hitAnimalSound.play();
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
        rightMovingEnemies.create(30, Math.random() * 450, rightAnimals[Math.random() * 3 | 0]);
        rightMovingEnemies.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
        rightMovingEnemies.setAll('inputEnabled', true);

        leftMovingEnemies.create(550, Math.random() * 450, leftAnimals[Math.random() * 3 | 0]);
        leftMovingEnemies.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
        leftMovingEnemies.setAll('inputEnabled', true);
    }
};