<?php
session_start();
include "config.php";  // Database connection configuration

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "User not logged in"]);
    exit;
}

$user_id = $_SESSION["user_id"];

// Query for getting the user data from the database
$sql = "SELECT tokens, tokens_earned, tokens_spent FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["error" => "User not found"]);
    exit;
}


    // Calculations of money saved and tokens spent
    $money_saved = $user["tokens"] * 0.5; // The monetary value of each token is 0,5 €
    $screen_time_used = $user["tokens_spent"] * 30; // Every spent token equals with 30 min of screen time
    $reading_time = $user["tokens_earned"] * 30;  // Every earned token equals with 30 min of reading time

    // Return data
    echo json_encode([
        "earned_tokens" => $user["tokens_earned"],
        "spent_tokens" => $user["tokens_spent"],
        "reading_time" => $reading_time,
        "money_saved" => $money_saved,
        "screen_time_used" => $screen_time_used
    ]);

?>
