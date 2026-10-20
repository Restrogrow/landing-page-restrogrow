<?php
require __DIR__ . '/config.php';
require __DIR__ . '/calls_lib.php';

// Admin -> Analyse: call recordings, their transcripts and the written analysis.
// Kept in storage/calls/ (blocked from the web, never in git: the repo is public). Served only here, behind the admin password.
// POST {password, action: list}            -> analysis.json (calls, transcripts, report)
// POST {password, action: audio, file: x}  -> the recording itself (audio/mp4)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$dir = calls_dir();
$data = calls_data();
$action = (string)($b['action'] ?? 'list');

if ($action === 'list') json_out(200, $data);

if ($action === 'audio') {
    $f = basename((string)($b['file'] ?? ''));
    $known = array_column($data['calls'], 'file');
    if (!in_array($f, $known, true) || !is_file($dir . '/' . $f)) json_out(404, ['error' => 'Recording not found']);
    header('Content-Type: audio/mp4');
    header('Content-Length: ' . filesize($dir . '/' . $f));
    header('Cache-Control: no-store');
    readfile($dir . '/' . $f);
    exit;
}
json_out(400, ['error' => 'Unknown action']);
