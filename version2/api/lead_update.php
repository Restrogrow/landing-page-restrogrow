<?php
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$statuses = ['New', 'Called', 'Not answered', 'Follow-up', 'Interested', 'Converted', 'Not interested'];
$id = (int)($b['id'] ?? 0);
$status = (string)($b['status'] ?? '');
$notes = mb_substr((string)($b['notes'] ?? ''), 0, 2000);
if ($id < 1 || !in_array($status, $statuses, true)) json_out(400, ['error' => 'Invalid input']);

try {
    $pdo = db();
    $q = $pdo->prepare('SELECT status, notes FROM v2_leads WHERE id = ?');
    $q->execute([$id]);
    $old = $q->fetch();
    if (!$old) json_out(404, ['error' => 'Lead not found']);
    $pdo->prepare('UPDATE v2_leads SET status = ?, notes = ? WHERE id = ?')->execute([$status, $notes, $id]);
} catch (Throwable $e) {
    error_log('lead update failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not save']);
}

// History (separate table). A failure here never undoes the save above.
$log = [];
$now = gmdate('Y-m-d H:i:s');
if ($old['status'] !== $status) $log[] = ['status', $old['status'] . ' → ' . $status];
if ((string)$old['notes'] !== $notes) $log[] = ['note', mb_substr($notes, 0, 300)];
$out = [];
foreach ($log as $e) {
    try {
        $pdo->prepare('INSERT INTO v2_lead_activity (lead_id, created_at, kind, detail) VALUES (?, ?, ?, ?)')->execute([$id, $now, $e[0], $e[1]]);
        $out[] = ['time' => str_replace(' ', 'T', $now) . 'Z', 'kind' => $e[0], 'detail' => $e[1]];
    } catch (Throwable $x) {
        error_log('lead history failed: ' . $x->getMessage());
    }
}
json_out(200, ['ok' => true, 'log' => $out]);
