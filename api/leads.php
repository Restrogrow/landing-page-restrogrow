<?php
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
if (!hash_equals($pass, (string)(body()['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

try {
    $rows = db()->query('SELECT * FROM leads ORDER BY id DESC')->fetchAll();
} catch (Throwable $e) {
    error_log('lead load failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not load leads']);
}

json_out(200, ['leads' => array_map(function ($r) {
    return [
        'id' => (int)$r['id'], 'status' => $r['status'], 'notes' => (string)$r['notes'],
        'time' => str_replace(' ', 'T', $r['created_at']) . 'Z',
        'name' => $r['name'], 'phone' => $r['phone'], 'brand' => $r['brand'], 'location' => $r['location'],
        'outlets' => $r['outlets'], 'orders' => $r['orders_day'], 'turnover' => $r['turnover'], 'budget' => $r['budget'],
        'utm_source' => (string)$r['utm_source'], 'utm_medium' => (string)$r['utm_medium'], 'utm_campaign' => (string)$r['utm_campaign'],
        'utm_content' => (string)$r['utm_content'], 'utm_term' => (string)$r['utm_term'],
        'gclid' => (string)$r['gclid'], 'fbclid' => (string)$r['fbclid'], 'page' => (string)$r['page'],
        'ad_params' => (string)$r['ad_params'], 'referrer' => (string)$r['referrer'], 'landing' => (string)$r['landing'],
        'is_demo' => (int)$r['is_demo'],
        'email' => (string)($r['email'] ?? ''), 'business' => (string)($r['business_type'] ?? ''),
        'wa_status' => (string)$r['wa_status'], 'wa_note' => (string)$r['wa_note'],
    ];
}, $rows)]);
