<?php
require __DIR__ . '/config.php';

// Admin: adds one entry to a lead's history (Call tapped, WhatsApp opened, follow-up time or meeting link set or cleared).
// Writes only to v2_lead_activity; the lead itself is never changed here.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$id = (int)($b['id'] ?? 0);
$kind = (string)($b['kind'] ?? '');
$detail = mb_substr(trim((string)($b['detail'] ?? '')), 0, 300);
if ($id < 1 || !in_array($kind, ['call', 'whatsapp', 'followup', 'meet'], true)) json_out(400, ['error' => 'Invalid input']);
// follow-up: a time (ISO, UTC) or empty to clear it
if ($kind === 'followup' && $detail !== '') {
    $t = strtotime($detail);
    if ($t === false) json_out(400, ['error' => 'Invalid follow-up time']);
    $detail = gmdate('Y-m-d\TH:i:s\Z', $t);
}
// meeting link: a web link (Google Meet, Zoom...) or empty to clear it
if ($kind === 'meet' && $detail !== '' && (!preg_match('~^https?://~i', $detail) || !filter_var($detail, FILTER_VALIDATE_URL))) {
    json_out(400, ['error' => 'Paste the full meeting link, starting with https://']);
}

$now = gmdate('Y-m-d H:i:s');
try {
    $pdo = db();
    $q = $pdo->prepare('SELECT id FROM v2_leads WHERE id = ?');
    $q->execute([$id]);
    if (!$q->fetch()) json_out(404, ['error' => 'Lead not found']);
    $pdo->prepare('INSERT INTO v2_lead_activity (lead_id, created_at, kind, detail) VALUES (?, ?, ?, ?)')->execute([$id, $now, $kind, $detail]);
} catch (Throwable $e) {
    error_log('lead log failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not save']);
}
json_out(200, ['ok' => true, 'log' => [['time' => str_replace(' ', 'T', $now) . 'Z', 'kind' => $kind, 'detail' => $detail]]]);
