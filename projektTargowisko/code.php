<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$password = "";
$database = "sigmaDB";

$connection = mysqli_connect($host, $user, $password, $database);
if (!$connection) {
    echo json_encode(["error" => "Connection failed: " . mysqli_connect_error()]);
    exit();
}

$sql = "SELECT * FROM sigmaStoiska;";
$result = mysqli_query($connection, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

mysqli_close($connection);
echo json_encode($data);
?>
