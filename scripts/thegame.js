
var theGame = (function(){
    var theGame = function(game){
    };

    var background,
        gunny,
        walkingLeftGroup,
        walkingRightGroup,
        flyingLeftGroup,
        flyingRightGroup,
        bossGroup,
        phoenixLeftGroup,
        phoenixRightGroup,
        shootingGunSound,
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

            walkingLeftGroup = this.game.add.group();
            walkingRightGroup = this.game.add.group();
            flyingLeftGroup = this.game.add.group();
            flyingRightGroup = this.game.add.group();
            bossGroup = this.game.add.group();
            phoenixLeftGroup = this.game.add.group();
            phoenixRightGroup = this.game.add.group();

            shootingGunSound = this.game.add.audio('shootingSound');
            shootingGunSound.allowMultiple = true;

            hitAnimalSound = this.game.add.audio('hittedCreatureSound');
            hitAnimalSound.allowMultiple = true;

            music = this.game.add.audio('backgroundSound');
            music.play();

            background.inputEnabled = true;
            background.events.onInputDown.add(function () {
                shootingGunSound.play();
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

            walkingLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingLeftGroup.addAll('x', -3);

            walkingRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingRightGroup.addAll('x', 3);

            flyingLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingLeftGroup.addAll('x', -3);

            flyingRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingRightGroup.addAll('x', 3);

            bossGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            bossGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            bossGroup.addAll('x', -3);

            phoenixLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixLeftGroup.addAll('x', -3);

            phoenixRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixRightGroup.addAll('x', 3);

            this.gameOver();

        },
        gameOver: function(){
            if(score==3) {
                this.game.state.start("GameOver", true, false, score);
            }
        },
        killAnimal: function(currentDog){
            shootingGunSound.play();
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
            walkingLeftGroup.create(750, 450 - Math.random() * 100, walkingLeftSprites[Math.random() * 2 | 0]);
            walkingLeftGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            walkingLeftGroup.setAll('inputEnabled', true);
        },
        createWalkingRightAnimals: function() {
            walkingRightGroup.create(30, 450 - Math.random() * 100, walkingRightSprites[Math.random() * 3 | 0]);
            walkingRightGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            walkingRightGroup.setAll('inputEnabled', true);
        },
        createFlyingLeftAnimals: function() {
            flyingLeftGroup.create(750,  Math.random() * 200, flyingLeftSprites[0]);
            flyingLeftGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            flyingLeftGroup.setAll('inputEnabled', true);
        },
        createFlyingRightAnimals: function() {
            flyingRightGroup.create(30, Math.random() * 200, flyingRightSprites[0]);
            flyingRightGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2]);
            flyingRightGroup.setAll('inputEnabled', true);
        },
        createBoss: function() {
            bossGroup.create(750,  450 - Math.random() * 100, bossSprites[0]);
            bossGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 4, 5]);
            bossGroup.setAll('inputEnabled', true);
        },
        createPhoenixLeftAnimals: function() {
            phoenixLeftGroup.create(750,  Math.random() * 200, phoenixLeftSprites[0]);
            phoenixLeftGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3]);
            phoenixLeftGroup.setAll('inputEnabled', true);
        },
        createPhoenixRightAnimals: function() {
            phoenixRightGroup.create(30, Math.random() * 200, phoenixRightSprites[0]);
            phoenixRightGroup.callAll('animations.add', 'animations', 'walk', [0, 1, 2, 3]);
            phoenixRightGroup.setAll('inputEnabled', true);
        }
    };

    return theGame;
}());
