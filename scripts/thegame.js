
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
        scoreCount,
        scoreText,
        svg,
        svgLivesCounter,
        svgLivesString,
        walkingLeftSprites = ['turtleLeft', 'raccoon'],
        walkingRightSprites = ['turtle', 'camel', 'fox'],
        flyingLeftSprites = ['blueBirdLeft'],
        flyingRightSprites = ['blueBirdRight'],
        bossSprites = ['boss'],
        phoenixLeftSprites = ['phoenixLeft'],
        phoenixRightSprites = ['phoenixRight'],
        score = 0,
        lives = 5,
        that=this;

    theGame.prototype = {

        create: function(){
            this.game.canvas.style.cursor = 'none';
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.setBoundsToWorld();
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
            music.loop=true;
            music.play();


            background.inputEnabled = true;
            background.events.onInputDown.add(function () {
                shootingGunSound.play();
            }, this);

            pause = this.game.add.sprite(0, 530, "pause");
            pause.scale.setTo(0.1,0.1);
            pause.inputEnabled = true;
            pause.events.onInputUp.add(function () {
                this.game.paused = true;
            }, this);
            this.game.input.onDown.add(function () {
                if (this.game.paused)this.game.paused = false;
            }, this);

            this.game.time.events.loop(Phaser.Timer.SECOND, this.enemyFactory, this);
            
            svg = document.getElementById('the-svg');
            scoreText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            scoreText.setAttribute('x', '0');
            scoreText.setAttribute('y', '50');
            scoreText.setAttribute('fill', 'white');
            scoreText.setAttribute('font-size', '20');
            scoreText.textContent = 'SCORE';
            svg.appendChild(scoreText);
            
            scoreCount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            scoreCount.setAttribute('x', '120');
            scoreCount.setAttribute('y', '50');
            scoreCount.setAttribute('fill', 'white');
            scoreCount.setAttribute('font-size', '20');
            scoreCount.textContent = score;
            svg.appendChild(scoreCount);
            
            svgLivesString = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            svgLivesString.setAttribute('x', '0');
            svgLivesString.setAttribute('y', '15');
            svgLivesString.setAttribute('fill', 'white');
            svgLivesString.setAttribute('font-size', '20');
            svgLivesString.textContent = 'Lives';
            svg.appendChild(svgLivesString);
            
            svgLivesCounter = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            svgLivesCounter.setAttribute('x', '120');
            svgLivesCounter.setAttribute('y', '15');
            svgLivesCounter.setAttribute('fill', 'white');
            svgLivesCounter.setAttribute('font-size', '20');
            svgLivesCounter.textContent = lives;
            svg.appendChild(svgLivesCounter);


        },
        update: function(){
            this.game.input.addMoveCallback(this.moveTheGun, gunny);

            aim.x = this.game.input.mousePointer.x - aim.width / 2;
            aim.y = this.game.input.mousePointer.y - aim.width / 2;

            walkingLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingLeftGroup.addAll('x', -3);
            walkingLeftGroup.setAll('checkWorldBounds', true);
            walkingLeftGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            walkingRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            walkingRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            walkingRightGroup.addAll('x', 3);
            walkingRightGroup.setAll('checkWorldBounds', true);
            walkingRightGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            flyingLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingLeftGroup.addAll('x', -3);
            flyingLeftGroup.setAll('checkWorldBounds', true);
            flyingLeftGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);
            
            flyingRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            flyingRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            flyingRightGroup.addAll('x', 3);
            flyingRightGroup.setAll('checkWorldBounds', true);
            flyingRightGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            bossGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            bossGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            bossGroup.addAll('x', -3);
            bossGroup.setAll('checkWorldBounds', true);
            bossGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            phoenixLeftGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixLeftGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixLeftGroup.addAll('x', -3);
            phoenixLeftGroup.setAll('checkWorldBounds', true);
            phoenixLeftGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            phoenixRightGroup.callAll('animations.play', 'animations', 'walk', 10, true);
            phoenixRightGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.killAnimal, this);
            phoenixRightGroup.addAll('x', 3);
            phoenixRightGroup.setAll('checkWorldBounds', true);
            phoenixRightGroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.gameOver, this);

            scoreCount.textContent = score;
            svgLivesCounter.textContent = lives;
            gunny.bringToTop();
        },
        gameOver: function(){
            lives -= 1;
            if(lives === 0) {
                this.game.state.start("GameOver", true, false, score);
                scoreCount.remove();
                svgLivesCounter.remove();
                score = 0;
                lives = 5;
            }
        },

        killAnimal: function(currentAnimal){
            var hole = this.game.add.sprite(currentAnimal.x, currentAnimal.y, "bulletHole");
            hole.alpha = 1;
            hole.scale.setTo(0.5, 0.5);
            this.game.add.tween(hole).to( { alpha: 0 }, 1000, "Linear", true);
            shootingGunSound.play();
            hitAnimalSound.play();
            currentAnimal.kill();
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
