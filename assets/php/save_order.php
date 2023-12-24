<?php
// Retrieve data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

// Connect to your MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database_name";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize card details to prevent SQL injection
$cartItems = json_encode($data['cartItems']); // Convert cartItems array to JSON
$cartTotal = $data['cartTotal'];
$cardDetails = json_encode($data['cardDetails']); // Convert cardDetails array to JSON

$cartItems = $conn->real_escape_string($cartItems);
$cartTotal = $conn->real_escape_string($cartTotal);
$cardDetails = $conn->real_escape_string($cardDetails);

// Save cart details and card details to the 'orders' table
$sql = "INSERT INTO orders (cart_items, cart_total, card_details) VALUES ('$cartItems', $cartTotal, '$cardDetails')";

if ($conn->query($sql) === TRUE) {
    echo "Order saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
