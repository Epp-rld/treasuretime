<?php
session_start();
include "config.php"; // Database connection configuration

$user_id = $_SESSION["user_id"];

// Resets the tokens
$query = "UPDATE users SET tokens = 10, tokens_earned = 0, tokens_spent = 0 WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Database error"]);
}
?>
