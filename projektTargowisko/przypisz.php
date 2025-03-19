<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "sigmaDB";

$connection = mysqli_connect($host, $user, $password, $database);
if (!$connection) {
    echo json_encode(["success" => false, "error" => "Connection failed: " . mysqli_connect_error()]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Debugowanie: sprawdź, jakie dane otrzymujesz
    file_put_contents('debug.log', "path: " . $_POST['path'] . ", rekord: " . $_POST['rekord'] . PHP_EOL, FILE_APPEND);

    if (!isset($_POST['path']) || !isset($_POST['rekord'])) {
        echo json_encode(["success" => false, "error" => "Brak wymaganych danych"]);
        exit();
    }

    $path = mysqli_real_escape_string($connection, $_POST['path']);
    $rekord = intval($_POST['rekord']);

    // Sprawdzenie, czy rekord o danym ID istnieje
    $check_sql = "SELECT id FROM sigmaStoiska WHERE id = $rekord";
    $result = mysqli_query($connection, $check_sql);

    if (mysqli_num_rows($result) == 0) {
        echo json_encode(["success" => false, "error" => "Rekord o takim id nie istnieje"]);
        exit();
    }

    // Przygotowanie zapytania do aktualizacji rekordu
    $sql = "UPDATE sigmaStoiska SET guid = ? WHERE id = ?";

    // Przygotowanie zapytania
    if ($stmt = mysqli_prepare($connection, $sql)) {
        mysqli_stmt_bind_param($stmt, "si", $path, $rekord);

        // Wykonanie zapytania
        if (mysqli_stmt_execute($stmt)) {
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                echo json_encode(["success" => true]);
            } else {
                echo json_encode(["success" => false, "error" => "Rekord istnieje, ale nie został zaktualizowany. Sprawdź wartości."]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Błąd aktualizacji: " . mysqli_stmt_error($stmt)]);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(["success" => false, "error" => "Błąd przygotowania zapytania: " . mysqli_error($connection)]);
    }
}

mysqli_close($connection);

?>
