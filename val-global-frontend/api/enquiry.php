<?php
header('Content-Type: application/json');

$config = require '/home/zcmtsivgo8mu/secure-config.php';

$smtpHost = $config['smtp_host'];
$smtpPort = $config['smtp_port'];
$smtpUsername = $config['smtp_username'];
$smtpPassword = $config['smtp_password'];
$smtpTimeout = 20;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request body']);
    exit;
}

function clean_text($value) {
    return trim(str_replace(["\r", "\n"], ' ', (string) ($value ?? '')));
}

function clean_message($value) {
    return trim((string) ($value ?? ''));
}

function smtp_read($socket) {
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') break;
    }
    return $response;
}

function smtp_expect($socket, $expectedCode) {
    $response = smtp_read($socket);
    $code = (int) substr($response, 0, 3);
    if ($code !== $expectedCode) {
        throw new Exception('SMTP expected ' . $expectedCode . ', got ' . trim($response));
    }
}

function smtp_command($socket, $command, $expectedCode) {
    fwrite($socket, $command . "\r\n");
    smtp_expect($socket, $expectedCode);
}

function smtp_address($email, $name = '') {
    $encodedName = $name !== '' ? '=?UTF-8?B?' . base64_encode($name) . '?= ' : '';
    return $encodedName . '<' . $email . '>';
}

function smtp_send_mail($config, $to, $from, $fromName, $replyTo, $replyToName, $subject, $body) {

    $transport = ($config['port'] == 465) ? 'ssl://' : 'tcp://';

    $socket = stream_socket_client(
        $transport . $config['host'] . ':' . $config['port'],
        $errno,
        $errstr,
        $config['timeout'],
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new Exception('SMTP connection failed: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, $config['timeout']);

    try {
        smtp_expect($socket, 220);
        smtp_command($socket, 'EHLO valglobalcommodities.com', 250);

        // Only STARTTLS for port 587
        if ($config['port'] != 465) {
            smtp_command($socket, 'STARTTLS', 220);

            if (!stream_socket_enable_crypto(
                $socket,
                true,
                STREAM_CRYPTO_METHOD_TLS_CLIENT
            )) {
                throw new Exception('SMTP STARTTLS failed');
            }

            smtp_command($socket, 'EHLO valglobalcommodities.com', 250);
        }

        smtp_command($socket, 'AUTH LOGIN', 334);
        smtp_command($socket, base64_encode($config['username']), 334);
        smtp_command($socket, base64_encode($config['password']), 235);

        smtp_command($socket, 'MAIL FROM:<' . $from . '>', 250);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', 250);
        smtp_command($socket, 'DATA', 354);

        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: ' . smtp_address($from, $fromName),
            'To: ' . smtp_address($to),
            'Reply-To: ' . smtp_address($replyTo, $replyToName),
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: VAL Global Commodities Website',
        ];

        $message = implode("\r\n", $headers) . "\r\n\r\n" . $body;
        $message = str_replace(["\r\n.", "\n."], ["\r\n..", "\n.."], $message);

        fwrite($socket, $message . "\r\n.\r\n");

        smtp_expect($socket, 250);
        smtp_command($socket, 'QUIT', 221);

        fclose($socket);
        return true;

    } catch (Exception $e) {
        fclose($socket);
        throw $e;
    }
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
    echo json_encode(['success' => false, 'message' => 'Please provide name and email.']);
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

try {
    $sent = smtp_send_mail(
        [
            'host' => $smtpHost,
            'port' => $smtpPort,
            'username' => $smtpUsername,
            'password' => $smtpPassword,
            'timeout' => $smtpTimeout,
        ],
        $to,
        $from,
        'VAL Global Commodities',
        $email,
        $name,
        $subject,
        $body
    );
} catch (Exception $e) {
    error_log('Authenticated SMTP failed: ' . $e->getMessage());
    $sent = false;
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Enquiry sent successfully.']);
    exit;
}

http_response_code(500);
echo json_encode([
    'success' => false,
    'message' => 'Could not send enquiry. Please email info@valglobalcommodities.com directly.'
]);
