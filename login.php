<?php
header("Content-Type: application/json");
session_start();
include "config.php";  // Database connection configuration

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

if (empty($_POST["email"]) || empty($_POST["password"])) {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit;
}

$email = $_POST["email"];
$password = $_POST["password"];

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// SQL query to find the user by email
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($password, $user["password_hash"])) {
    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
    exit;
}

// If login is successful, store session variables
$_SESSION["user_id"] = $user["id"];
$_SESSION["user_name"] = $user["name"];

echo json_encode(["success" => true]);
exit;
?>


