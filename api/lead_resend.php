<?php
require __DIR__ . '/wa.php';

// Admin: send the WhatsApp confirmation again. POST {password, id} for one lead, or {password, all: true} for every lead
// whose message failed (up to 10 per call). Never touches leads that already show "sent".
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);
@set_time_limit(120);

try {
    $pdo = db();
    if (!empty($b['all'])) {
        $rows = $pdo->query("SELECT id, event_id, name, brand, phone FROM leads WHERE wa_status IS NULL OR wa_status <> 'sent' ORDER BY id LIMIT 10")->fetchAll();
    } else {
        $st = $pdo->prepare('SELECT id, event_id, name, brand, phone FROM leads WHERE id = ?');
        $st->execute([(int)($b['id'] ?? 0)]);
        $rows = $st->fetchAll();
    }
} catch (Throwable $e) {
    error_log('resend load failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not load leads']);
}
if (!$rows) json_out(200, ['results' => []]);

$out = [];
foreach ($rows as $r) {
    $wa = wa_send($r['name'], $r['brand'], $r['phone']);
    try {
        $pdo->prepare('UPDATE leads SET wa_status = ?, wa_note = ? WHERE id = ?')->execute([$wa[0], mb_substr($wa[1], 0, 500), $r['id']]);
    } catch (Throwable $e) {
        error_log('resend save failed: ' . $e->getMessage());
    }
    $out[] = ['id' => (int)$r['id'], 'status' => $wa[0], 'note' => $wa[1]];
}
json_out(200, ['results' => $out]);
