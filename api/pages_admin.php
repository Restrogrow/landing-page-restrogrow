<?php
require __DIR__ . '/legal_lib.php';

// Admin: list and edit the legal pages. POST {password, action: list | save, slug, title, body}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$defaults = legal_defaults();
if (($b['action'] ?? 'list') === 'save') {
    $slug = (string)($b['slug'] ?? '');
    $title = mb_substr(trim((string)($b['title'] ?? '')), 0, 160);
    $text = mb_substr(str_replace("\r\n", "\n", (string)($b['body'] ?? '')), 0, 60000);
    if (!isset($defaults[$slug]) || $title === '' || trim($text) === '') json_out(400, ['error' => 'Title and text are required']);
    try {
        db()->prepare('INSERT INTO pages (slug, title, body, updated_at) VALUES (?, ?, ?, ?)
                       ON DUPLICATE KEY UPDATE title = VALUES(title), body = VALUES(body), updated_at = VALUES(updated_at)')
            ->execute([$slug, $title, $text, gmdate('Y-m-d H:i:s')]);
    } catch (Throwable $e) {
        error_log('page save failed: ' . $e->getMessage());
        json_out(500, ['error' => 'Could not save']);
    }
}

$out = [];
foreach ($defaults as $slug => $d) {
    $p = legal_get($slug);
    $out[] = ['slug' => $slug, 'title' => $p['title'], 'body' => $p['body'], 'updated' => $p['updated_at'] ? str_replace(' ', 'T', $p['updated_at']) . 'Z' : null];
}
json_out(200, ['pages' => $out]);
