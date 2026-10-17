<?php
require_once __DIR__ . '/config.php';

// Legal pages (privacy, terms, refund): text lives in the `pages` table so it can be edited from Admin -> Pages.
// If the database is unreachable, or a page was never saved, the built-in defaults are used.
function legal_defaults() {
    static $d = null;
    if ($d === null) $d = require __DIR__ . '/legal_defaults.php';
    return $d;
}

function legal_get($slug) {
    $d = legal_defaults();
    if (!isset($d[$slug])) return null;
    $fallback = ['title' => $d[$slug]['title'], 'body' => $d[$slug]['body'], 'updated_at' => null];
    try {
        $pdo = db();
        $st = $pdo->prepare('SELECT title, body, updated_at FROM pages WHERE slug = ?');
        $st->execute([$slug]);
        if ($row = $st->fetch()) return $row;
        return $fallback;
    } catch (Throwable $e) {
        return $fallback;
    }
}

function legal_h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

// "## Heading", "- bullet", blank line = new paragraph. Everything is escaped, so no HTML can be injected.
function legal_render($body) {
    $out = ''; $para = []; $list = [];
    $flush = function () use (&$out, &$para, &$list) {
        if ($para) { $out .= '<p>' . implode('<br>', $para) . '</p>'; $para = []; }
        if ($list) { $out .= '<ul>' . implode('', $list) . '</ul>'; $list = []; }
    };
    foreach (preg_split('/\R/', (string)$body) as $line) {
        $t = trim($line);
        if ($t === '') { $flush(); continue; }
        if (strpos($t, '## ') === 0) { $flush(); $out .= '<h2>' . legal_h(substr($t, 3)) . '</h2>'; continue; }
        if (strpos($t, '- ') === 0) {
            if ($para) { $out .= '<p>' . implode('<br>', $para) . '</p>'; $para = []; }
            $list[] = '<li>' . legal_h(substr($t, 2)) . '</li>';
            continue;
        }
        if ($list) { $out .= '<ul>' . implode('', $list) . '</ul>'; $list = []; }
        $para[] = legal_h($t);
    }
    $flush();
    return $out;
}
