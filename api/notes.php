<?php
require __DIR__ . '/config.php';

// Shared notes board used by /text. No password: anyone who has the /text link can read and write, so keep the link private.
// POST {action: list | add | delete | pin, ...}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$b = body();

$action = (string)($b['action'] ?? 'list');
try {
    $pdo = db();
    if ($action === 'add') {
        $text = mb_substr(trim((string)($b['body'] ?? '')), 0, 5000);
        $author = mb_substr(trim((string)($b['author'] ?? '')), 0, 60);
        if ($text === '') json_out(400, ['error' => 'Write something first']);
        $pdo->prepare("INSERT INTO notes (created_at, kind, author, body) VALUES (?, 'msg', ?, ?)")
            ->execute([gmdate('Y-m-d H:i:s'), $author, $text]);
    } elseif ($action === 'delete') {
        $pdo->prepare("DELETE FROM notes WHERE id = ? AND kind = 'msg'")->execute([(int)($b['id'] ?? 0)]);
    } elseif ($action === 'pin') {
        $text = mb_substr(trim((string)($b['body'] ?? '')), 0, 10000);
        $author = mb_substr(trim((string)($b['author'] ?? '')), 0, 60);
        $pdo->exec("DELETE FROM notes WHERE kind = 'pin'");
        if ($text !== '') {
            $pdo->prepare("INSERT INTO notes (created_at, kind, author, body) VALUES (?, 'pin', ?, ?)")
                ->execute([gmdate('Y-m-d H:i:s'), $author, $text]);
        }
    } elseif ($action !== 'list') {
        json_out(400, ['error' => 'Unknown action']);
    }
    $rows = $pdo->query('SELECT id, created_at, kind, author, body FROM notes ORDER BY id')->fetchAll();
} catch (Throwable $e) {
    error_log('notes failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not load notes']);
}

$pin = null; $msgs = [];
foreach ($rows as $r) {
    $o = ['id' => (int)$r['id'], 'time' => str_replace(' ', 'T', $r['created_at']) . 'Z', 'author' => $r['author'], 'body' => $r['body']];
    if ($r['kind'] === 'pin') $pin = $o; else $msgs[] = $o;
}
json_out(200, ['pin' => $pin, 'messages' => $msgs]);
