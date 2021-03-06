<!doctype html>
<html>
<head>
    <script type="text/javascript" src="bower_components/phaser/build/phaser.min.js"></script>
    <script type="text/javascript" src="scripts/boot.js"></script>
    <script type="text/javascript" src="scripts/preload.js"></script>
    <script type="text/javascript" src="scripts/gametitle.js"></script>
    <script type="text/javascript" src="scripts/thegame.js"></script>
    <script type="text/javascript" src="scripts/gameover.js"></script>
    <script type="text/javascript" src="bower_components/jquery/dist/jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/styleSVG.css">
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
</head>
<body>
    <svg id="the-svg" width="150" height="200"></svg>
 </body>
<script>
    (function () {
        var game;
        game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");
//        $(game).css("cursor", "pointer");

        game.state.add("Boot", boot);
        game.state.add("Preload", preload);
        game.state.add("GameTitle", gameTitle);
        game.state.add("TheGame", theGame);
        game.state.add("GameOver", gameOver);
        game.state.start("Boot");

    })();
</script>
</html>