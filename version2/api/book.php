<?php
require __DIR__ . '/config.php';
require __DIR__ . '/wa.php';
require __DIR__ . '/meet.php';

// Version 2: the lead picks a slot. POST {e: event_id, ts: slot start (unix seconds)}.
// Creates the Calendar event + Meet link, then sends the link to the lead and the alert to the agent.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$b = body();
$eid = substr(preg_replace('/[^A-Za-z0-9_-]/', '', (string)($b['e'] ?? '')), 0, 64);
$ts = (int)($b['ts'] ?? 0);
if ($eid === '' || $ts <= 0) json_out(400, ['error' => 'Please pick a slot.']);

try {
    $st = db()->prepare('SELECT * FROM v2_leads WHERE event_id = ? LIMIT 1');
    $st->execute([$eid]);
    $row = $st->fetch();
} catch (Throwable $e) {
    error_log('book lookup failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Something went wrong. Please try again.']);
}
if (!$row) json_out(404, ['error' => 'This link is not valid.']);
if (!empty($row['slot_start'])) {
    json_out(200, ['ok' => true, 'already' => true, 'label' => slot_label(strtotime($row['slot_start'] . ' UTC')), 'link' => (string)$row['meet_link']]);
}

list($tok, $tokNote) = google_token();
if (!slot_is_free($tok, $ts)) json_out(409, ['error' => 'Sorry, that slot was just taken. Please pick another one.']);

try {
    $m = slot_book($eid, $row['name'], $row['brand'], $ts, $tok, $tokNote);
} catch (Throwable $e) {
    error_log('book save failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Something went wrong. Please try again.']);
}
if ($m[0] === '' && $m[1] === 'already booked') json_out(409, ['error' => 'This demo is already booked.']);
if ($m[0] === '') json_out(502, ['error' => 'Could not book this slot right now. Please try again in a minute.', 'detail' => mb_substr($m[1], 0, 300)]);

// Answer the visitor first, then send the WhatsApp messages in the background.
$label = $m[0];
ignore_user_abort(true);
@set_time_limit(40);
$out = json_encode(['ok' => true, 'label' => $label, 'link' => $m[1]], JSON_UNESCAPED_UNICODE);
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

try {
    slot_booked_messages($eid, ['name' => $row['name'], 'brand' => $row['brand'], 'location' => $row['location'], 'outlets' => $row['outlets'],
        'orders' => $row['orders_day'], 'turnover' => $row['turnover'], 'budget' => $row['budget'],
        'email' => (string)($row['email'] ?? ''), 'business' => (string)($row['business_type'] ?? '')], $row['phone'], $m[1], $label);
} catch (Throwable $e) {
    error_log('book messages failed: ' . $e->getMessage());
}
