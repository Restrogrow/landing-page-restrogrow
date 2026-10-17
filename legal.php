<?php
// Public legal page: /privacy-policy, /terms-and-services, /refund-policy (rewritten to legal.php?slug=...).
require __DIR__ . '/api/legal_lib.php';

$slug = (string)($_GET['slug'] ?? '');
$page = legal_get($slug);
if (!$page) { http_response_code(404); $page = ['title' => 'Page not found', 'body' => 'This page does not exist.', 'updated_at' => null]; $slug = ''; }

$links = ['privacy-policy' => 'Privacy Policy', 'terms-and-services' => 'Terms & Services', 'refund-policy' => 'Refund & Cancellation'];
$updated = $page['updated_at'] ? date('j F Y', strtotime($page['updated_at'] . ' UTC')) : null;
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= legal_h($page['title']) ?> | RestroGrow</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--o:#FC5301;--ink:#00000C;--cream:#FBF6F1;--tx:#1A1A26;--mu:#5E5E70;--ln:#ECE6DF}
*{box-sizing:border-box}
body{margin:0;font:400 16px/1.75 'Poppins',system-ui,sans-serif;color:var(--tx);background:var(--cream)}
.top{background:#fff;border-bottom:1px solid var(--ln)}
.top .in{max-width:860px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.logo{font:800 1.15rem 'Montserrat',sans-serif;color:var(--ink);text-decoration:none}
.logo b{color:var(--o)}
.back{color:var(--o);font-weight:600;text-decoration:none;font-size:.92rem}
main{max-width:860px;margin:0 auto;padding:40px 20px 24px}
h1{font:800 clamp(1.7rem,5vw,2.4rem)/1.2 'Montserrat',sans-serif;margin:0 0 6px}
.upd{color:var(--mu);font-size:.88rem;margin:0 0 28px}
h2{font:700 1.2rem 'Montserrat',sans-serif;margin:30px 0 8px}
p{margin:0 0 14px}
ul{margin:0 0 14px;padding-left:22px}li{margin-bottom:6px}
.card{background:#fff;border:1px solid var(--ln);border-radius:18px;padding:clamp(20px,4vw,40px)}
footer{max-width:860px;margin:0 auto;padding:8px 20px 40px;color:var(--mu);font-size:.88rem;display:flex;gap:8px 18px;flex-wrap:wrap}
footer a{color:var(--mu)}footer a:hover{color:var(--o)}
</style>
</head>
<body>
<div class="top"><div class="in"><a class="logo" href="/">Restro<b>Grow</b></a><a class="back" href="/">&larr; Back to home</a></div></div>
<main>
  <div class="card">
    <h1><?= legal_h($page['title']) ?></h1>
    <?php if ($updated): ?><p class="upd">Last updated: <?= legal_h($updated) ?></p><?php endif; ?>
    <?= legal_render($page['body']) ?>
  </div>
</main>
<footer>
  <span>&copy; <?= date('Y') ?> Restro Grow</span>
  <?php foreach ($links as $s => $t): ?><a href="/<?= legal_h($s) ?>"><?= legal_h($t) ?></a><?php endforeach; ?>
</footer>
</body>
</html>
