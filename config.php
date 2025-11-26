<?php
$servername = "localhost";
$username = "root";
$password = "";    // muuda vastavalt oma konfile, vaja võib-olla parooliks root panna?
$database = "treasuretime_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection error: " . $conn->connect_error);
}
?>
