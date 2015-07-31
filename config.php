<?php
$db = array(
    "dbname" => "gameusers",
    "username" => "root",
    "password" => "",
    "host" => "localhost",
    "port" => "3306"
);
$conn = mysqli_connect($db['host'], $db['username'], $db['password'], $db['dbname'], $db['port']);
if (isset($_POST['submit'])) {

    function redirect_to($new_location)
    {
        header('Location:' . $new_location);
        exit;
    }

    function escapeAll($arr, $conn)
    {
        $finalArr = [];
        foreach ($arr as $value) {
            $finalArr[$value] = mysqli_real_escape_string($conn, $value);
        }
        return $finalArr;
    }

    function processInput($input)
    {
        $input = trim($input);
        $input = strip_tags($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        return $input;
    }


    $score = $_GET['score'];
    $uname = processInput($_POST['username']);
    //check whether a user exists
    $queryUser = "SELECT Name FROM Users WHERE Name = '$uname';";

    $selected = mysqli_query($conn, $queryUser);


    $arr = escapeAll([$uname, $score], $conn);



    if ($selected->num_rows) {

            echo "<script>alert('There is already such user')</script>";

    } else {
        //create new user
        $query = "INSERT INTO Users (Name, Score)
    VALUES ('{$arr[$uname]}','{$arr[$score]}')";

        $result = mysqli_query($conn, $query);
        if ($result) {
            redirect_to('JustShootMe.php');
        } else {
            echo mysqli_error($conn);
        }
    }
}
