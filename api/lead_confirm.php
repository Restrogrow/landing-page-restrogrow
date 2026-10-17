<?php
require __DIR__ . '/config.php';

// Called once by the thank-you page. Returns fire=true only the FIRST time a given event_id is claimed,
// so refreshing or sharing the thank-you link never counts the lead again.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$eid = (string)(body()['eid'] ?? '');
if (!preg_match('/^[A-Za-z0-9-]{8,64}$/', $eid)) json_out(200, ['fire' => false]);

try {
    $st = db()->prepare('UPDATE leads SET pixel_fired_at = ? WHERE event_id = ? AND pixel_fired_at IS NULL AND created_at >= ?');
    $st->execute([gmdate('Y-m-d H:i:s'), $eid, gmdate('Y-m-d H:i:s', time() - 86400)]);
    $fire = $st->rowCount() === 1;
} catch (Throwable $e) {
    error_log('lead confirm failed: ' . $e->getMessage());
    json_out(200, ['fire' => false]);
}
json_out(200, ['fire' => $fire && env('META_PIXEL_ID') !== '', 'pixel_id' => env('META_PIXEL_ID'), 'event_id' => $eid]);
