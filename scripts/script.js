(function () {
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 500
    });

    var backgroundLayer = new Kinetic.Layer(),
         enemyLayer = new Kinetic.Layer(),
         trashLayer = new Kinetic.Layer(),
         scoreCounter = 0;

    function animation() {
        var circle = new Kinetic.Circle({
            x: Math.random() * (stage.getWidth() - 30) + 15,
            y: 150,
            radius: 30,
            fill: 'black'
        });

        circle.on('click', function () {
            addLittleRects(this.getX(), this.getY());
            trashLayer.add(this);
            moveLittleRects();
            enemyLayer.draw();
            scoreCounter += 1;
            scoreResult.setText(scoreCounter);
        });

        enemyLayer.add(circle);
        enemyLayer.draw();
        setTimeout(animation, 1000);
    }

    animation();


    function addLittleRects(x, y) {
        var littleRect = new Kinetic.Rect({
            x: x,
            y: y,
            width: 5,
            height: 5,
            fill: 'black'
        });
        enemyLayer.add(littleRect);
    }

    function moveLittleRects() {
        enemyLayer.find('Rect').forEach(function (currentRect) {
            var currentY = currentRect.getY();
            if (currentRect.getY() < 0) {
                trashLayer.add(currentRect);
            }
            currentRect.setY(currentY - 5);
        });

        enemyLayer.draw();
        if (enemyLayer.find('Rect').length > 0) {
            requestAnimationFrame(moveLittleRects);
        }
    }

    var scoreResult = new Kinetic.Text({
        x: stage.width() - 50,
        y: 15,
        text: '0',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'black'
    });

    enemyLayer.add(scoreResult);
    enemyLayer.draw();

    var gun = new Image();
    gun.onload = function () {
        var gunImage = new Kinetic.Image({
            x: 400,
            y: 400,
            image: gun,
            width: 200,
            height: 100
        });

        enemyLayer.add(gunImage);
        enemyLayer.draw();
    };

    var background = new Image();
    background.onload = function () {
        var backgroundImage = new Kinetic.Image({
            x: 0,
            y: 0,
            image: background,
            width: 800,
            height: 500
        });

        backgroundLayer.add(backgroundImage);
        backgroundLayer.draw();
    };

    stage.add(backgroundLayer);
    stage.add(enemyLayer);
    background.src = 'resources/images/desert-Background.jpg';
    gun.src = 'resources/images/gun.png';

}());
