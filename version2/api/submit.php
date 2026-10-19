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

// Ad attribution sent by the page (cookies + click ids + UTMs). Trimmed and length-limited; empty becomes NULL.
$attr = [];
foreach (['fbp' => 200, 'fbc' => 300, 'gclid' => 300, 'fbclid' => 300, 'utm_source' => 200, 'utm_medium' => 200,
          'utm_campaign' => 200, 'utm_content' => 200, 'utm_term' => 200] as $k => $max) {
    $v = mb_substr(trim((string)($b[$k] ?? '')), 0, $max);
    $attr[$k] = $v === '' ? null : $v;
}
// All URL parameters of the ad click (campaign / ad set / ad names and ids, placement, keyword ...) as a small JSON object.
$ad = json_decode((string)($b['ad_params'] ?? ''), true);
$clean = [];
if (is_array($ad)) foreach (array_slice($ad, 0, 40, true) as $k => $v) {
    if (is_string($k) && is_scalar($v) && strlen($k) < 40) $clean[mb_substr($k, 0, 40)] = mb_substr((string)$v, 0, 200);
}
$attr['ad_params'] = $clean ? mb_substr(json_encode($clean, JSON_UNESCAPED_UNICODE), 0, 4000) : null;
$ref = mb_substr(trim((string)($b['referrer'] ?? '')), 0, 300);
$land = mb_substr(trim((string)($b['landing'] ?? '')), 0, 500);
$attr['referrer'] = $ref === '' ? null : $ref;
$attr['landing'] = $land === '' ? null : $land;
if ($attr['fbp'] === null && !empty($_COOKIE['_fbp'])) $attr['fbp'] = mb_substr((string)$_COOKIE['_fbp'], 0, 200);
if ($attr['fbc'] === null && !empty($_COOKIE['_fbc'])) $attr['fbc'] = mb_substr((string)$_COOKIE['_fbc'], 0, 300);

// Bots fill the hidden "hp" field; pretend it worked but save and report nothing.
if (trim((string)($b['hp'] ?? '')) !== '') json_out(200, ['ok' => true, 'event_id' => $eid]);

// Obvious fake numbers (9999999999, 1234567890, 6789898989 ...) are not real customers.
$seq = '01234567890123456789';
if (count(array_unique(str_split($phone))) <= 2 || strpos($seq, $phone) !== false || strpos(strrev($seq), $phone) !== false)
    json_out(400, ['error' => 'Enter a valid 10 digit mobile number.']);

// A number is accepted once, ever. A retry of the same submit (same event_id) is fine; a different attempt is refused,
// so no repeat lead, WhatsApp message or ad conversion is paid for.
try {
    $dup = db()->prepare('SELECT event_id FROM v2_leads WHERE phone = ? ORDER BY id LIMIT 1');
    $dup->execute([$phone]);
    if (false && $row = $dup->fetch()) {
        if ((string)$row['event_id'] === $eid) json_out(200, ['ok' => true, 'event_id' => $eid]);
        json_out(409, ['error' => 'This number is already registered. Our team will contact you shortly.']);
    }
} catch (Throwable $e) {
    error_log('dup check failed: ' . $e->getMessage());
}

try {
    $st = db()->prepare('INSERT INTO v2_leads (created_at, name, phone, brand, location, outlets, orders_day, turnover, budget, page, event_id,
                                            fbp, fbc, gclid, fbclid, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
                                            ad_params, referrer, landing)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $st->execute([gmdate('Y-m-d H:i:s'), $lead['name'], $phone, $lead['brand'], $lead['location'],
                  $lead['outlets'], $lead['orders'], $lead['turnover'], $lead['budget'],
                  mb_substr((string)($b['page'] ?? ''), 0, 300), $eid,
                  $attr['fbp'], $attr['fbc'], $attr['gclid'], $attr['fbclid'], $attr['utm_source'],
                  $attr['utm_medium'], $attr['utm_campaign'], $attr['utm_content'], $attr['utm_term'],
                  $attr['ad_params'], $attr['referrer'], $attr['landing']]);
} catch (PDOException $e) {
    // Same event_id again (double click / retry): already saved, so don't count or message twice.
    if ($e->getCode() === '23000') json_out(200, ['ok' => true, 'event_id' => $eid]);
    error_log('lead save failed, using file fallback: ' . $e->getMessage());
    save_fallback($lead, $phone, $eid, $b, $attr);
} catch (Throwable $e) {
    error_log('lead save failed, using file fallback: ' . $e->getMessage());
    save_fallback($lead, $phone, $eid, $b, $attr);
}

// If the database is unreachable the lead is still kept (one JSON line per lead in storage/), so the form
// keeps working and no lead is lost. Import them later; storage/ is blocked from the web by its own .htaccess.
function save_fallback($lead, $phone, $eid, $b, $attr) {
    $dir = __DIR__ . '/../storage';
    if (!is_dir($dir)) @mkdir($dir, 0750, true);
    if (!is_file($dir . '/.htaccess')) @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    $row = array_merge($lead, ['phone' => $phone, 'event_id' => $eid, 'page' => mb_substr((string)($b['page'] ?? ''), 0, 300),
                               'created_at' => gmdate('c')], $attr);
    if (@file_put_contents($dir . '/leads-fallback.jsonl', json_encode($row, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX) === false) {
        json_out(500, ['error' => 'Could not save your details. Please try again.']);
    }
}

require_once __DIR__ . '/wa.php';
require_once __DIR__ . '/meet.php';
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

wa_save($eid, confirm_send($lead['name'], $lead['brand'], $phone, $eid));

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
function send_meta_lead($eid, $name, $phone, $page, $attr) {
    $pixel = tag_id('META_PIXEL_ID');
    $token = env('META_CAPI_TOKEN');
    if ($pixel === '' || $token === '') return;
    $fbc = (string)$attr['fbc'];
    if ($fbc === '' && $attr['fbclid'] !== null) $fbc = 'fb.1.' . round(microtime(true) * 1000) . '.' . $attr['fbclid'];
    $first = strtolower(trim(explode(' ', trim($name))[0]));
    $user = array_filter([
        'ph' => [hash('sha256', '91' . $phone)],
        'fn' => $first !== '' ? [hash('sha256', $first)] : null,
        'country' => [hash('sha256', 'in')],
        'client_ip_address' => client_ip(),
        'client_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'fbp' => (string)$attr['fbp'],
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
try { send_meta_lead($eid, $lead['name'], $phone, mb_substr((string)($b['page'] ?? ''), 0, 500), $attr); } catch (Throwable $e) { error_log('meta capi error: ' . $e->getMessage()); }
