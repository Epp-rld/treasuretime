<?php
session_start();
include "config.php"; // Database connection configuration

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION["user_id"];
$query = "SELECT name, tokens FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user) {
    echo json_encode($user);
} else {
    echo json_encode(["error" => "User not found"]);
}
?>
