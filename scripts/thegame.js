
var theGame = (function(){
    var theGame = function(game){
    };

    var background,
        gunny,
        walkingLeft,
        walkingRight,
        flyingLeft,
        flyingRight,
        boss,
        phoenixLeft,
        phoenixRight,
        shootingGun,
        hitAnimalSound,
        music,
        pause,
        aim,
        walkingLeftSprites = ['turtleLeft', 'raccoon'],
        walkingRightSprites = ['turtle', 'camel', 'fox'],
        flyingLeftSprites = ['blueBirdLeft'],
        flyingRightSprites = ['blueBirdRight'],
        bossSprites = ['boss'],
        phoenixLeftSprites = ['phoenixLeft'],
        phoenixRightSprites = ['phoenixRight'],
        score = 0;

    theGame.prototype = {

        create: function(){
            this.game.canvas.style.cursor = 'none';
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            background = this.game.add.sprite(0, 0, 'background');
            gunny = this.game.add.sprite(400,450,"gun");
            this.game.physics.arcade.enable(gunny);

            aim = this.game.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, 'aim');
            aim.scale.set(0.1, 0.1);

            walkingLeft = this.game.add.group();
            walkingRight = this.game.add.group();
            flyingLeft = this.game.add.group();
            flyingRight = this.game.add.group();
            boss = this.game.add.group();
            phoenixLeft = this.game.add.group();
            phoenixRight = this.game.add.group();

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

            aim.x = this.game.input.mousePointer.x - aim.width / 2;
            aim.y = this.game.input.mousePointer.y - aim.width / 2;

            walkingLeft.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingLeft.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingLeft.addAll('x', -3);

            walkingRight.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingRight.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingRight.addAll('x', 3);

            flyingLeft.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingLeft.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingLeft.addAll('x', -3);

            flyingRight.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingRight.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingRight.addAll('x', 3);

            boss.callAll('animations.play', 'animations', 'walk', 10, true);
            boss.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            boss.addAll('x', -3);

            phoenixLeft.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixLeft.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixLeft.addAll('x', -3);

            phoenixRight.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixRight.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixRight.addAll('x', 3);

            this.gameOver();

        },
        gameOver: function(){
            if(score==3) {
                this.game.state.start("GameOver", true, false, score);
            }
        },
        killAnimal: function(currentDog){
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
            var random = Math.random() * 2 | 0,
                bossRandom = Math.random() * 100 | 0;

            if(bossRandom % 10 === 0) {
                this.createBoss();
            }

            switch(random) {
                case 0: this.createFlyingLeftAnimals();
                    this.createWalkingRightAnimals(); break;

                case 1: this.createPhoenixRightAnimals();
                    this.createWalkingLeftAnimals(); break;

                case 2: this.createFlyingRightAnimals();
                    this.createPhoenixLeftAnimals(); break;
            }
        },
        createWalkingLeftAnimals: function() {
            walkingLeft.create(750, 450 - Math.random() * 100, walkingLeftSprites[Math.random() * 2 | 0]);
            walkingLeft.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            walkingLeft.setAll('inputEnabled', true);
        },
        createWalkingRightAnimals: function() {
            walkingRight.create(30, 450 - Math.random() * 100, walkingRightSprites[Math.random() * 3 | 0]);
            walkingRight.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            walkingRight.setAll('inputEnabled', true);
        },
        createFlyingLeftAnimals: function() {
            flyingLeft.create(750,  Math.random() * 200, flyingLeftSprites[0]);
            flyingLeft.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            flyingLeft.setAll('inputEnabled', true);
        },
        createFlyingRightAnimals: function() {
            flyingRight.create(30, Math.random() * 200, flyingRightSprites[0]);
            flyingRight.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            flyingRight.setAll('inputEnabled', true);
        },
        createBoss: function() {
            boss.create(750,  450 - Math.random() * 100, bossSprites[0]);
            boss.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 4, 5]);
            boss.setAll('inputEnabled', true);
        },
        createPhoenixLeftAnimals: function() {
            phoenixLeft.create(750,  Math.random() * 200, phoenixLeftSprites[0]);
            phoenixLeft.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3]);
            phoenixLeft.setAll('inputEnabled', true);
        },
        createPhoenixRightAnimals: function() {
            phoenixRight.create(30, Math.random() * 200, phoenixRightSprites[0]);
            phoenixRight.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3]);
            phoenixRight.setAll('inputEnabled', true);
        }
    };

    return theGame;
}());
