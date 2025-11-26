<?php
header("Content-Type: application/json");
session_start();
$errors = [];

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

if (empty($_POST["name"])) {
    $errors[] = "Name is required";
}

if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required";
}

if (strlen($_POST["password"]) < 8) {
    $errors[] = "Password must be at least 8 characters";
}

if (!preg_match("/[a-z]/i", $_POST["password"])) {
    $errors[] = "Password must contain at least one letter";
}

if (!preg_match("/[0-9]/", $_POST["password"])) {
    $errors[] = "Password must contain at least one number";
}

if ($_POST["password"] !== $_POST["password_confirmation"]) {
    $errors[] = "Passwords must match";
}

// If there are errors, we return them in JSON format
if (!empty($errors)) {
    echo json_encode(["success" => false, "errors" => $errors]);
    exit;
}

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
include "config.php";

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
$stmt = $conn->stmt_init();

if (!$stmt->prepare($sql)) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit;
}

$stmt->bind_param("sss", $_POST["name"], $_POST["email"], $password_hash);

try {
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
        exit;
    }
} catch (mysqli_sql_exception $e) {
    if ($conn->errno === 1062) {
        echo json_encode(["success" => false, "message" => "This email address is already taken"]);
    } else {
        echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    }
    exit;
}
?>

