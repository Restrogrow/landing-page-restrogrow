<?php
// Call recordings + transcripts + analysis, stored in storage/calls/ (see api/calls.php).

function calls_dir() {
    $root = __DIR__ . '/../storage';
    if (!is_dir($root . '/calls')) @mkdir($root . '/calls', 0750, true);
    // same guard as the lead backup: nothing in storage/ can be opened from a browser
    if (!is_file($root . '/.htaccess')) @file_put_contents($root . '/.htaccess', "Require all denied\n");
    return $root . '/calls';
}

function calls_data() {
    $f = calls_dir() . '/analysis.json';
    $d = is_file($f) ? json_decode((string)file_get_contents($f), true) : null;
    if (!is_array($d)) $d = [];
    return $d + ['calls' => [], 'leads' => [], 'report' => '', 'context' => '', 'updated' => ''];
}
