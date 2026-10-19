<?php
require __DIR__ . '/config.php';
require __DIR__ . '/meet.php';

// Version 2: free demo slots for one lead. GET ?e=<event_id>  (the secret link sent on WhatsApp)
header('Cache-Control: no-store');
$eid = substr(preg_replace('/[^A-Za-z0-9_-]/', '', (string)($_GET['e'] ?? '')), 0, 64);
if ($eid === '') json_out(400, ['error' => 'This link is not valid.']);
try {
    $st = db()->prepare('SELECT name, slot_start, meet_link FROM v2_leads WHERE event_id = ? LIMIT 1');
    $st->execute([$eid]);
    $lead = $st->fetch();
} catch (Throwable $e) {
    error_log('slots lookup failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Something went wrong. Please try again.']);
}
if (!$lead) json_out(404, ['error' => 'This link is not valid.']);
$first = explode(' ', trim($lead['name']))[0];
if (!empty($lead['slot_start'])) {
    json_out(200, ['name' => $first, 'booked' => ['label' => slot_label(strtotime($lead['slot_start'] . ' UTC')), 'link' => (string)$lead['meet_link']]]);
}
list($tok) = google_token();
json_out(200, ['name' => $first, 'booked' => null, 'days' => slots_free($tok), 'minutes' => slot_cfg()['len']]);
