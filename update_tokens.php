<?php
session_start();
include "config.php"; // Database connection configuration

// Check if the user is logged in
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "error" => "User not logged in"]);
    exit;
}

// If there are errors, the errors are returned in JSON format
$data = json_decode(file_get_contents("php://input"), true);

if ($data === null) {
    echo json_encode(["success" => false, "error" => "No data received or invalid JSON"]);
    exit;
}

// Kontrollige, kas tegevus on määratud
$action = isset($data["action"]) ? $data["action"] : null;
if ($action !== "earn" && $action !== "spend") {
    echo json_encode(["success" => false, "error" => "Invalid action"]);
    exit;
}

$user_id = $_SESSION["user_id"];

// Tegevuste täitmine
if ($action == "earn") {
    $query = "UPDATE users SET tokens = tokens + 1, tokens_earned = tokens_earned + 1 WHERE id = ?";
} elseif ($action == "spend") {
    $query = "UPDATE users SET tokens = GREATEST(tokens - 1, 0), tokens_spent = tokens_spent + 1 WHERE id = ?";
}

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$success = $stmt->execute();

if ($success) {
    // Tagasta uus kristallide arv
    $stmt = $conn->prepare("SELECT tokens FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    echo json_encode(["success" => true, "tokens" => $row["tokens"]]);
} else {
    echo json_encode(["success" => false, "error" => "Database error"]);
}
?>
