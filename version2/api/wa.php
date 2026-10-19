<?php
require_once __DIR__ . '/config.php';

// WhatsApp confirmation through RepeatGrow: template WACRM_TEMPLATE (restrogrow_demo_confirmation),
// {{1}} = customer name, {{2}} = restaurant name. Its "Book Demo" button triggers the RepeatGrow automation,
// which sends restrogrow_demo_booked (set up inside RepeatGrow, not here).
// WACRM_BASE_URL is the full messages endpoint, e.g. https://repeatgrow.com/api/v1/messages

// One attempt. Returns [status, note, retryable]: status is sent / failed / not set up.
function wa_once($name, $brand, $phone, $tpl = null, $params = null) {
    if (env('Api') === '' || env('WACRM_BASE_URL') === '') return ['not set up', 'Api key or WACRM_BASE_URL is empty in the server .env', false];
    $payload = [
        'to' => '91' . $phone,
        'type' => 'template',
        'template' => [
            'name' => $tpl ?: env('WACRM_TEMPLATE', 'restrogrow_demo_confirmation'),
            'language' => env('WACRM_LANG', 'en_US'),
            'params' => $params ?: [$name, $brand],   // fills {{1}} and {{2}}
        ],
    ];
    $ch = curl_init(env('WACRM_BASE_URL'));
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . env('Api'), 'Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    if ($code >= 200 && $code < 300) return ['sent', mb_substr((string)$res, 0, 400), false];
    error_log("whatsapp send failed ($code): $res $err");
    // Network trouble, rate limit or a server error on their side: worth trying again. A 4xx (bad key, bad template) is not.
    $retry = $code === 0 || $code === 429 || $code >= 500;
    return ['failed', 'HTTP ' . $code . ' ' . ($err !== '' ? $err . ' ' : '') . mb_substr((string)$res, 0, 400), $retry];
}

// Tries up to 3 times (now, +2s, +5s) so a brief outage on either side does not lose the message.
function wa_send($name, $brand, $phone) {
    $waits = [0, 2, 5];
    foreach ($waits as $i => $w) {
        if ($w) sleep($w);
        try {
            $r = wa_once($name, $brand, $phone);
        } catch (Throwable $e) {
            $r = ['failed', $e->getMessage(), true];
        }
        if ($r[0] === 'sent' || !$r[2]) return [$r[0], ($i ? 'attempt ' . ($i + 1) . ': ' : '') . $r[1]];
    }
    return [$r[0], 'after 3 attempts: ' . $r[1]];
}

function wa_save($eid, $wa) {
    try {
        db()->prepare('UPDATE v2_leads SET wa_status = ?, wa_note = ? WHERE event_id = ?')->execute([$wa[0], mb_substr($wa[1], 0, 500), $eid]);
    } catch (Throwable $e) {
        error_log('wa status save failed: ' . $e->getMessage());
    }
}
