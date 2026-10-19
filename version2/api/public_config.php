<?php
require __DIR__ . '/config.php';

// Public tracking IDs only (they are visible in page source anyway). Never add tokens, passwords or keys here.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo json_encode([
    'meta_pixel_id' => tag_id('META_PIXEL_ID'),
    'google_ads_id' => tag_id('GOOGLE_ADS_ID'),
    'ga4_id' => tag_id('GA4_ID'),
]);
