<?php
// 1. HEADERS (The Handshake)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// 2. Handle the "Pre-flight" request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 3. DATABASE CONNECTION (The Model)
$conn = new mysqli("localhost", "root", "", "davao_cao");

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Database Connection Failed"]));
}

// 4. GET DATA FROM REACT (The View)
$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['name'], $data['email'], $data['message'])) {
    // Using Prepared Statements for Security
    $stmt = $conn->prepare("INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['name'], $data['email'], $data['message']);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid Input Data"]);
}

$conn->close();
?>