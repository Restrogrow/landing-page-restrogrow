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

// One id per real submit. The same id goes to the thank-you page (browser Pixel) and to Meta from here (server),
// so Meta counts it once.
$eid = (string)($b['event_id'] ?? '');
if (!preg_match('/^[A-Za-z0-9-]{8,64}$/', $eid)) $eid = bin2hex(random_bytes(16));

try {
    $st = db()->prepare('INSERT INTO leads (created_at, name, phone, brand, location, outlets, orders_day, turnover, budget, page, event_id)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $st->execute([gmdate('Y-m-d H:i:s'), $lead['name'], $phone, $lead['brand'], $lead['location'],
                  $lead['outlets'], $lead['orders'], $lead['turnover'], $lead['budget'],
                  mb_substr((string)($b['page'] ?? ''), 0, 300), $eid]);
} catch (PDOException $e) {
    // Same event_id again (double click / retry): already saved, so don't count or message twice.
    if ($e->getCode() === '23000') json_out(200, ['ok' => true, 'event_id' => $eid]);
    error_log('lead save failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not save your details. Please try again.']);
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
            'language' => 'en',
            'params' => [$name],   // fills {{1}}
        ],
    ];
    $ch = curl_init(env('WACRM_BASE_URL'));
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . env('Api'), 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300) error_log("whatsapp send failed ($code): $res");
}
// Answer the visitor first so the form never waits on the WhatsApp API, then send in the background.
ignore_user_abort(true);
@set_time_limit(30);
$out = json_encode(['ok' => true, 'event_id' => $eid]);
http_response_code(200);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Connection: close');
header('Content-Length: ' . strlen($out));
echo $out;
while (ob_get_level() > 0) @ob_end_flush();
flush();
if (function_exists('fastcgi_finish_request')) fastcgi_finish_request();
elseif (function_exists('litespeed_finish_request')) litespeed_finish_request();

try { send_confirmation($lead['name'], $phone); } catch (Throwable $e) { error_log('whatsapp failed: ' . $e->getMessage()); }

// Meta Conversions API: server-side Lead with the same event_id. Ad blockers / iPhone privacy can't hide it,
// and Meta merges it with the browser Pixel event instead of counting twice.
function client_ip() {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $h) {
        if (!empty($_SERVER[$h])) {
            $ip = trim(explode(',', $_SERVER[$h])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
        }
    }
    return '';
}
function send_meta_lead($eid, $name, $phone, $page) {
    $pixel = env('META_PIXEL_ID');
    $token = env('META_CAPI_TOKEN');
    if ($pixel === '' || $token === '') return;
    $fbc = $_COOKIE['_fbc'] ?? '';
    if ($fbc === '' && preg_match('/[?&]fbclid=([^&#]+)/', $page, $m)) $fbc = 'fb.1.' . round(microtime(true) * 1000) . '.' . $m[1];
    $first = strtolower(trim(explode(' ', trim($name))[0]));
    $user = array_filter([
        'ph' => [hash('sha256', '91' . $phone)],
        'fn' => $first !== '' ? [hash('sha256', $first)] : null,
        'country' => [hash('sha256', 'in')],
        'client_ip_address' => client_ip(),
        'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'fbp' => $_COOKIE['_fbp'] ?? '',
        'fbc' => $fbc,
    ]);
    $payload = ['data' => [[
        'event_name' => 'Lead', 'event_time' => time(), 'event_id' => $eid,
        'action_source' => 'website', 'event_source_url' => $page, 'user_data' => $user,
    ]]];
    if (env('META_TEST_EVENT_CODE') !== '') $payload['test_event_code'] = env('META_TEST_EVENT_CODE');
    $ch = curl_init('https://graph.facebook.com/v21.0/' . rawurlencode($pixel) . '/events?access_token=' . rawurlencode($token));
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code < 200 || $code >= 300) error_log("meta capi failed ($code): $res");
}
try { send_meta_lead($eid, $lead['name'], $phone, mb_substr((string)($b['page'] ?? ''), 0, 500)); } catch (Throwable $e) { error_log('meta capi error: ' . $e->getMessage()); }
