<?php
// Initialize the session
session_start();
include "config.php"; // Database connection configuration
 
// Check if the user is logged in, if not then redirect the user to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
