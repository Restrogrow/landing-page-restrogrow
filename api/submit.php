<?php
require __DIR__ . '/config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);

$b = body();
$fields = ['name', 'phone', 'brand', 'location', 'outlets', 'orders', 'turnover', 'budget'];
$lead = [];
foreach ($fields as $k) $lead[$k] = mb_substr(trim((string)($b[$k] ?? '')), 0, 200);

foreach ($fields as $k) if ($lead[$k] === '') json_out(400, ['error' => 'Please fill in all fields.']);
$digits = preg_replace('/\D/', '', $lead['phone']);
$phone = substr($digits, -10);
if (!preg_match('/^[6-9]\d{9}$/', $phone)) json_out(400, ['error' => 'Enter a valid 10 digit mobile number.']);

try {
    $st = db()->prepare('INSERT INTO leads (created_at, name, phone, brand, location, outlets, orders_day, turnover, budget, page)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $st->execute([gmdate('Y-m-d H:i:s'), $lead['name'], $phone, $lead['brand'], $lead['location'],
                  $lead['outlets'], $lead['orders'], $lead['turnover'], $lead['budget'],
                  mb_substr((string)($b['page'] ?? ''), 0, 300)]);
} catch (Throwable $e) {
    error_log('lead save failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not save your details. Please try again.']);
}

// Sends the WACRM_TEMPLATE WhatsApp template ({{1}} = name) to the number from the form.
// WACRM_BASE_URL is the full messages endpoint, e.g. https://repeatgrow.com/api/v1/messages
function send_confirmation($name, $phone) {
    if (env('Api') === '' || env('WACRM_BASE_URL') === '') return;
    $payload = [
        'to' => '91' . $phone,
        'type' => 'template',
        'template' => [
            'name' => env('WACRM_TEMPLATE', 'enquiry_confirmation'),
            'language' => ['code' => 'en'],
            'components' => [[
                'type' => 'body',
                'parameters' => [['type' => 'text', 'text' => $name]],
            ]],
        ],
    ];
    $ch = curl_init(env('WACRM_BASE_URL'));
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . env('Api'), 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300) error_log("whatsapp send failed ($code): $res");
}
try { send_confirmation($lead['name'], $phone); } catch (Throwable $e) { error_log('whatsapp failed: ' . $e->getMessage()); }

json_out(200, ['ok' => true]);
