<?php
require __DIR__ . '/config.php';

// Public tracking IDs only (they are visible in page source anyway). Never add tokens, passwords or keys here.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=300');
echo json_encode([
    'meta_pixel_id' => env('META_PIXEL_ID'),
    'google_ads_id' => env('GOOGLE_ADS_ID'),
    'ga4_id' => env('GA4_ID'),
]);
