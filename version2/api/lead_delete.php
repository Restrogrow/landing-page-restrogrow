<?php
require __DIR__ . '/config.php';

// Admin: permanently delete one lead (e.g. a test lead). POST {password, id}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$id = (int)($b['id'] ?? 0);
if ($id < 1) json_out(400, ['error' => 'Invalid input']);

try {
    db()->prepare('DELETE FROM v2_leads WHERE id = ?')->execute([$id]);
} catch (Throwable $e) {
    error_log('lead delete failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not delete']);
}
json_out(200, ['ok' => true]);
