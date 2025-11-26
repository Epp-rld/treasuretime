<?php
session_start();
include "config.php"; // Database connection configuration
header("Content-Type: application/json");

$response = [
    "loggedIn" => isset($_SESSION['user_id']),
    "userId" => $_SESSION['user_id'] ?? null
];

session_write_close(); // !!! Aitab vältida sessioonilukke

echo json_encode($response);
?>
