<?php
require __DIR__ . '/config.php';

// Called by the thank-you page.
//  valid: this event_id belongs to a real saved lead (so the page may be shown).
//  fire : true only the FIRST time the id is claimed (within 24h), so a refresh or a shared link never counts twice.
// Public tag IDs are returned for any valid visit (PageView). The conversion label and the hashed phone are
// returned only when fire is true, and the raw phone is never returned.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$eid = (string)(body()['eid'] ?? '');
if (!preg_match('/^[A-Za-z0-9-]{8,64}$/', $eid)) json_out(200, ['valid' => false, 'fire' => false]);

try {
    $pdo = db();
    $st = $pdo->prepare('UPDATE v2_leads SET pixel_fired_at = ? WHERE event_id = ? AND pixel_fired_at IS NULL AND created_at >= ?');
    $st->execute([gmdate('Y-m-d H:i:s'), $eid, gmdate('Y-m-d H:i:s', time() - 86400)]);
    $fire = $st->rowCount() === 1;
    $ex = $pdo->prepare('SELECT phone FROM v2_leads WHERE event_id = ? LIMIT 1');
    $ex->execute([$eid]);
    $row = $ex->fetch();
} catch (Throwable $e) {
    // Database unreachable: still show the thank-you page (the lead was kept in the file fallback), but count nothing.
    error_log('lead confirm failed: ' . $e->getMessage());
    json_out(200, ['valid' => true, 'fire' => false, 'event_id' => $eid,
        'meta_pixel_id' => tag_id('META_PIXEL_ID'), 'google_ads_id' => tag_id('GOOGLE_ADS_ID'), 'ga4_id' => tag_id('GA4_ID')]);
}
if (!$row) json_out(200, ['valid' => false, 'fire' => false]);

$out = [
    'valid' => true, 'fire' => $fire, 'event_id' => $eid,
    'meta_pixel_id' => tag_id('META_PIXEL_ID'), 'google_ads_id' => tag_id('GOOGLE_ADS_ID'), 'ga4_id' => tag_id('GA4_ID'),
];
if ($fire) {
    $out['google_ads_lead_label'] = tag_id('GOOGLE_ADS_LEAD_LABEL');
    $out['ph_sha256'] = hash('sha256', '91' . $row['phone']);            // Meta format: 91XXXXXXXXXX
    $out['ph_e164_sha256'] = hash('sha256', '+91' . $row['phone']);      // Google enhanced conversions format: +91XXXXXXXXXX
}
json_out(200, $out);
