<?php
require __DIR__ . '/config.php';

// Admin: add 10 clearly-marked DEMO leads (to try the filters, groups and charts) or remove them again.
// POST {password, action: add | remove}. Demo leads never send WhatsApp messages and never fire any ad conversion.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);
$action = (string)($b['action'] ?? '');
if (!in_array($action, ['add', 'remove'], true)) json_out(400, ['error' => 'Unknown action']);

$H = 'https://demo.restrogrow.com/';
// [days ago, name, brand, city, outlets, orders, turnover, budget, status, notes, page, source, params, wa]
$rows = [
    [0,  'Rahul Sharma',  'Spice Route',          'Andheri, Mumbai', '2 to 3', '50–100 Orders', '₹10 Lakhs – ₹25 Lakhs', '₹50,000 to ₹1 L',  'New',       '',                    '',                       'meta',    ['utm_campaign' => 'Diwali Direct Ordering', 'adset_name' => 'Mumbai Owners 25-55', 'ad_name' => 'Video A Calculator', 'placement' => 'instagram_reels'], 'sent'],
    [0,  'Priya Nair',    'Cafe Mocha Lane',      'Koramangala, Bengaluru', '1', '20–30 Orders', 'Below ₹5 Lakhs', '₹25,000 to ₹30,000', 'Called', 'Call back after 5 pm', 'lp/whatsapp.html',      'google',  ['utm_campaign' => 'Search_Direct_Ordering', 'adgroup' => 'direct-ordering', 'keyword' => 'restaurant ordering software', 'matchtype' => 'p', 'device' => 'm'], 'sent'],
    [1,  'Amit Verma',    'Biryani House',        'Lajpat Nagar, Delhi', '4 to 10', '100+ Orders', '₹25 Lakhs+', '₹1 L+', 'Converted', 'Signed up for 90 days', 'lp/own-website.html',   'meta',    ['utm_campaign' => 'Diwali Direct Ordering', 'adset_name' => 'Delhi Owners Broad', 'ad_name' => 'Carousel Savings', 'placement' => 'facebook_feed'], 'sent'],
    [2,  'Sneha Kulkarni', 'Pune Pav Co.',       'Baner, Pune', '1', '30–50 Orders', '₹5 Lakhs – ₹10 Lakhs', '₹30,000 to ₹50,000', 'Not answered', '',                    'lp/loyalty.html',        'meta',    ['utm_campaign' => 'Loyalty Retention Test', 'adset_name' => 'Pune Cafes Interest', 'ad_name' => 'Static Regulars', 'placement' => 'instagram_stories'], 'sent'],
    [3,  'Imran Sheikh',  'Kebab Junction',       'Charminar, Hyderabad', '2 to 3', '50–100 Orders', '₹10 Lakhs – ₹25 Lakhs', '₹50,000 to ₹1 L', 'Follow-up', 'Wants a demo on Saturday', 'lp/profit-audit.html', 'google',  ['utm_campaign' => 'Search_Profit_Audit', 'adgroup' => 'zomato-commission', 'keyword' => 'zomato commission too high', 'matchtype' => 'e', 'device' => 'd'], 'failed'],
    [4,  'Neha Gupta',    'Dessert Diaries',      'Salt Lake, Kolkata', '1', '20–30 Orders', 'Below ₹5 Lakhs', '₹25,000 to ₹30,000', 'Not interested', 'Budget too low', '',                       'youtube', ['utm_campaign' => 'YouTube_Video_Test', 'adgroup' => 'in-stream', 'placement' => 'youtube_instream', 'device' => 'm'], 'sent'],
    [5,  'Karan Mehta',   'Tandoor Tales',        'Navrangpura, Ahmedabad', '4 to 10', '100+ Orders', '₹25 Lakhs+', '₹1 L+', 'Called', 'Sent proposal', 'lp/own-website.html', 'google',  ['utm_campaign' => 'Search_Direct_Ordering', 'adgroup' => 'own-website', 'keyword' => 'own ordering website restaurant', 'matchtype' => 'b', 'device' => 'd'], 'sent'],
    [7,  'Divya Reddy',   'Idli Express',         'Madhapur, Hyderabad', '2 to 3', '30–50 Orders', '₹5 Lakhs – ₹10 Lakhs', '₹30,000 to ₹50,000', 'New', '',                    '',                       'direct',  [], 'sent'],
    [9,  'Rohit Jain',    'Momo Magic',           'Sector 18, Noida', '1', '20–30 Orders', 'Below ₹5 Lakhs', '₹25,000 to ₹30,000', 'New', '',                    'lp/whatsapp.html',      'meta',    ['utm_campaign' => 'WhatsApp Slow Hours', 'adset_name' => 'NCR Cloud Kitchens', 'ad_name' => 'Video B Chat', 'placement' => 'facebook_reels'], 'sent'],
    [12, 'Anjali Singh',  'Chai & Chaat Corner',  'Hazratganj, Lucknow', '1', '30–50 Orders', '₹5 Lakhs – ₹10 Lakhs', '₹30,000 to ₹50,000', 'Converted', 'Started onboarding', '',                       'direct',  [], 'sent'],
];

try {
    $pdo = db();
    $pdo->exec('DELETE FROM leads WHERE is_demo = 1');   // adding again never doubles up
    if ($action === 'remove') json_out(200, ['ok' => true, 'removed' => true]);

    $st = $pdo->prepare('INSERT INTO leads (created_at, name, phone, brand, location, outlets, orders_day, turnover, budget, page, event_id,
                                            utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid,
                                            ad_params, referrer, landing, status, notes, wa_status, wa_note, is_demo)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)');
    foreach ($rows as $i => $r) {
        list($days, $name, $brand, $city, $outlets, $orders, $turn, $budget, $status, $notes, $page, $src, $params, $wa) = $r;
        $n = $i + 1;
        $params = $params ? array_merge(['utm_source' => ($src === 'meta' ? 'facebook' : $src), 'utm_medium' => ($src === 'meta' ? 'paid' : 'cpc')], $params) : [];
        if ($src === 'meta') $params['fbclid'] = 'DEMOfb' . $n;
        if ($src === 'google' || $src === 'youtube') $params['gclid'] = 'DEMOg' . $n;
        $url = $H . $page . ($params ? '?' . http_build_query($params) : '');
        $time = gmdate('Y-m-d H:i:s', time() - $days * 86400 - ($n * 1800));
        $st->execute([$time, $name, '900000' . sprintf('%04d', $n), $brand, $city, $outlets, $orders, $turn, $budget, $url, 'demo-' . $n,
            $params['utm_source'] ?? null, $params['utm_medium'] ?? null, $params['utm_campaign'] ?? null, $params['adset_name'] ?? ($params['adgroup'] ?? null), $params['keyword'] ?? null,
            $params['gclid'] ?? null, $params['fbclid'] ?? null,
            $params ? json_encode($params, JSON_UNESCAPED_UNICODE) : null, $src === 'meta' ? 'https://l.facebook.com/' : ($src === 'direct' ? null : 'https://www.google.com/'), $url,
            $status, $notes, $wa, $wa === 'sent' ? 'demo lead, no message sent' : 'demo lead: HTTP 401 invalid API key (example)']);
    }
} catch (Throwable $e) {
    error_log('demo leads failed: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not add demo leads']);
}
json_out(200, ['ok' => true, 'added' => count($rows)]);
