<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed',
    ]);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request body',
    ]);
    exit;
}

function clean_text($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string) ($value ?? '')));
}

function clean_message($value) {
    return trim((string) ($value ?? ''));
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
        'message' => 'Please provide name and email.',
    ]);
    exit;
}

$to = 'info@valglobalcommodities.com';
$from = 'info@valglobalcommodities.com';
$name = trim($firstName . ' ' . $lastName);
$subject = 'New Enquiry - ' . $name;

$body = "New enquiry received from the VAL Global Commodities website.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Phone: {$phone}\n"
    . "Company: {$company}\n"
    . "Country: {$country}\n"
    . "Product Interest: {$productInterest}\n"
    . "Catalogue Requested: {$catalogueRequested}\n\n"
    . "Message:\n{$message}\n";

$headers = [
    'From: VAL Global Commodities <' . $from . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Enquiry sent successfully.',
    ]);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'Could not send enquiry. Please email info@valglobalcommodities.com directly.',
]);
