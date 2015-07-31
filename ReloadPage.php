<?php require_once("config.php");?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>ShootingGame</title>
    <link href="styles/styles.css" rel="stylesheet"/>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script type="text/javascript" src="bower_components/phaser/build/phaser.min.js"></script>
    <script type="text/javascript" src="scripts/gameover.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="bower_components/jquery/src/jquery.js"></script>
</head>
<body>
<div class="buttons container">
        <button type="button" class="game" data-toggle="modal" data-target="#myModal">Register score</button>
        <button id="highscores" class="game">Highscores</button>
        <button id="play" class="game">Play</button>

</div>
<div class="container">

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Enter your nickname</h4>
                </div>
                <div class="modal-body">
                    <form method="post">
                        <label for="user">Nickname:</label>
                        <input type="text" name="username" placeholder="Enter your name">
                        <input id="submit" type="submit" name="submit" value="Submit">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>


            </div>
        </div>
    </div>
</div>

<div id="scores" class="hidden">
    <ol>HIGHSCORES:<?php
        $queryUsers = "SELECT * FROM Users ORDER BY Users.Score DESC, Users.Name ;";
        $selected = mysqli_query($conn, $queryUsers);
        mysqli_fetch_all($selected,MYSQLI_ASSOC);
        foreach ($selected as $key) : ?>
            <li><?php echo $key['Name'] . ' - ' . $key['Score'] ?></li>
        <?php endforeach; ?>
        </ol>
</div>

<script>
    $('#highscores').on('click', function (e) {
        $('#scores').toggleClass('hidden');
    });

    $('#play').on('click',function(){
        window.location = 'JustShootMe.php';
    })

</script>
<!--<script>-->
<!--(function () {-->
<!--var game;-->
<!--game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");-->
<!--//        $(game).css("cursor", "pointer");-->


<!--game.state.add("GameOver", gameOver);-->


<!--})();-->
<!--</script>-->

</body>
</html>
