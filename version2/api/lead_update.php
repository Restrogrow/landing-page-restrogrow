<?php
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$statuses = ['New', 'Called', 'Not answered', 'Follow-up', 'Converted', 'Not interested'];
$id = (int)($b['id'] ?? 0);
$status = (string)($b['status'] ?? '');
$notes = mb_substr((string)($b['notes'] ?? ''), 0, 2000);
if ($id < 1 || !in_array($status, $statuses, true)) json_out(400, ['error' => 'Invalid input']);

try {
    db()->prepare('UPDATE v2_leads SET status = ?, notes = ? WHERE id = ?')->execute([$status, $notes, $id]);
} catch (Throwable $e) {
    error_log('lead update failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not save']);
}
json_out(200, ['ok' => true]);
