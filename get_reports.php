<?php
// 1. HEADERS (The Handshake)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// 2. DATABASE CONNECTION (The Model)
// Ensure your database name is exactly 'davao_cao'
$conn = new mysqli("localhost", "root", "", "davao_cao");

// If connection fails, tell React exactly why
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "MySQL Connection Failed: " . $conn->connect_error]));
}

// 3. LOGIC (The Controller)
$year = isset($_GET['year']) ? intval($_GET['year']) : 0;

if ($year === 0) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("SELECT month_name, file_path FROM reports WHERE report_year = ?");
$stmt->bind_param("i", $year);
$stmt->execute();
$result = $stmt->get_result();

$reports = [];
while ($row = $result->fetch_assoc()) {
    $reports[] = $row;
}

// 4. THE VIEW DATA
echo json_encode($reports);

$stmt->close();
$conn->close();
?>