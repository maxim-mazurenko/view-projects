<?php
$_POST = json_decode(file_get_contents("php://input"), true);
$user = $_POST;



echo var_dump($user);





?>