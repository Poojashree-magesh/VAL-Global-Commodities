<?php

header('Content-Type: application/json');

$config = require '/home/zcmtsivgo8mu/secure-config.php';

$apiKey = $config['brevo_api_key'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request body'
    ]);
    exit;
}

function clean_text($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string)($value ?? '')));
}

function clean_message($value) {
    return trim((string)($value ?? ''));
}

$firstName = clean_text($data['firstName'] ?? '');
$lastName = clean_text($data['lastName'] ?? '');
$email = filter_var(clean_text($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = clean_text($data['phone'] ?? '');
$company = clean_text($data['company'] ?? '');
$country = clean_text($data['country'] ?? '');
$productInterest = clean_text($data['productInterest'] ?? ($data['product'] ?? ''));
$message = clean_message($data['message'] ?? '');
$catalogueRequested = !empty($data['catalogueRequested']) ? 'Yes' : 'No';

if ($firstName === '' || $lastName === '' || !$email) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide name and email.'
    ]);
    exit;
}

$name = trim($firstName . ' ' . $lastName);

$emailBody =
    "New enquiry received from the VAL Global Commodities website.\n\n" .
    "Name: {$name}\n" .
    "Email: {$email}\n" .
    "Phone: {$phone}\n" .
    "Company: {$company}\n" .
    "Country: {$country}\n" .
    "Product Interest: {$productInterest}\n" .
    "Catalogue Requested: {$catalogueRequested}\n\n" .
    "Message:\n{$message}\n";

$payload = [
    'sender' => [
        'name' => 'VAL Global Commodities',
        'email' => 'enquiries@valglobalcommodities.com'
    ],
    'to' => [
        [
            'email' => 'info@valglobalcommodities.com'
        ]
    ],
    'subject' => 'New Enquiry - ' . $name,
    'textContent' => $emailBody,
    'replyTo' => [
        'email' => $email,
        'name' => $name
    ]
];

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.brevo.com/v3/smtp/email',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        'accept: application/json',
        'api-key: ' . $apiKey,
        'content-type: application/json'
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $error
    ]);
    exit;
}

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode([
        'success' => true,
        'message' => 'Enquiry sent successfully.'
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => $response
]);