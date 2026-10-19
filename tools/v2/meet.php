<?php
// Google Meet link for a new lead: creates a Calendar event with a Meet room and returns its link.
// Needs GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env. Never blocks the lead if Google fails.

function meet_post($url, $headers, $body) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $body, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 12, CURLOPT_HTTPHEADER => $headers]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return [$code, (string)$res, $err];
}

// Returns [link, note]; link is '' when it could not be made.
function meet_create($name, $brand) {
    if (env('GOOGLE_CLIENT_ID') === '' || env('GOOGLE_CLIENT_SECRET') === '' || env('GOOGLE_REFRESH_TOKEN') === '') return ['', 'not set up'];
    list($code, $res, $err) = meet_post('https://oauth2.googleapis.com/token', ['Content-Type: application/x-www-form-urlencoded'], http_build_query([
        'client_id' => env('GOOGLE_CLIENT_ID'), 'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'refresh_token' => env('GOOGLE_REFRESH_TOKEN'), 'grant_type' => 'refresh_token',
    ]));
    $tok = json_decode($res, true)['access_token'] ?? '';
    if ($code !== 200 || $tok === '') return ['', 'token HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 200)];

    $start = new DateTime('+1 day', new DateTimeZone('Asia/Kolkata'));
    $start->setTime(11, 0);
    $end = (clone $start)->modify('+30 minutes');
    $event = [
        'summary' => 'RestroGrow demo: ' . $brand . ' (' . $name . ')',
        'description' => 'Demo call booked from the landing page.',
        'start' => ['dateTime' => $start->format('c'), 'timeZone' => 'Asia/Kolkata'],
        'end' => ['dateTime' => $end->format('c'), 'timeZone' => 'Asia/Kolkata'],
        'conferenceData' => ['createRequest' => ['requestId' => bin2hex(random_bytes(8)), 'conferenceSolutionKey' => ['type' => 'hangoutsMeet']]],
    ];
    list($code, $res, $err) = meet_post('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
        ['Authorization: Bearer ' . $tok, 'Content-Type: application/json'], json_encode($event));
    $link = json_decode($res, true)['hangoutLink'] ?? '';
    if ($code >= 200 && $code < 300 && $link !== '') return [$link, 'ok'];
    return ['', 'calendar HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 200)];
}

// Sends the Meet link on its own template (WACRM_MEET_TEMPLATE: {{1}} name, {{2}} link), separate from the confirmation message.
// Does nothing until that template is set in .env, so the existing messages are never affected.
function meet_whatsapp($name, $phone, $link) {
    if ($link === '' || env('WACRM_MEET_TEMPLATE') === '') return '';
    require_once __DIR__ . '/wa.php';
    foreach ([0, 2] as $w) {
        if ($w) sleep($w);
        $r = wa_once($name, '', $phone, env('WACRM_MEET_TEMPLATE'), [$name, $link]);
        if ($r[0] === 'sent') return 'link sent on WhatsApp';
        if (!$r[2]) break;
    }
    return 'WhatsApp link ' . $r[0] . ': ' . $r[1];
}

// Tells the sales agent (AGENT_PHONE) about every new lead, with the details and the meeting link.
// AGENT_TEMPLATE set: sends that template ({{1}} name, {{2}} restaurant, {{3}} phone, {{4}} city, {{5}} budget, {{6}} link).
// Empty: sends a plain text message, which WhatsApp only delivers if the agent chatted with the business in the last 24 hours.
function agent_notify($lead, $phone, $link) {
    $to = preg_replace('/\D/', '', env('AGENT_PHONE', '8447705467'));
    if ($to === '' || env('Api') === '' || env('WACRM_BASE_URL') === '') return '';
    $link = $link !== '' ? $link : 'not available';
    require_once __DIR__ . '/wa.php';
    if (env('AGENT_TEMPLATE') !== '') {
        $r = wa_once($lead['name'], '', substr($to, -10), env('AGENT_TEMPLATE'), [$lead['name'], $lead['brand'], $phone, $lead['location'], $lead['budget'], $link]);
        return 'agent ' . $r[0] . ($r[0] === 'sent' ? '' : ': ' . $r[1]);
    }
    $body = "Hello Nishchay, new lead!
Name: {$lead['name']}
Restaurant: {$lead['brand']}
Phone: +91 $phone
City: {$lead['location']}
Outlets: {$lead['outlets']}
Orders/day: {$lead['orders']}
Turnover: {$lead['turnover']}
Budget: {$lead['budget']}
Meeting link: $link";
    list($code, $res, $err) = meet_post(env('WACRM_BASE_URL'), ['Authorization: Bearer ' . env('Api'), 'Content-Type: application/json'],
        json_encode(['to' => '+91' . substr($to, -10), 'type' => 'text', 'text' => $body], JSON_UNESCAPED_UNICODE));
    return $code >= 200 && $code < 300 ? 'agent sent' : 'agent failed: HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 150);
}

function meet_save($eid, $m) {
    try {
        db()->prepare('UPDATE leads SET meet_link = ?, meet_note = ? WHERE event_id = ?')->execute([$m[0], mb_substr($m[1], 0, 300), $eid]);
    } catch (Throwable $e) {
        error_log('meet save failed: ' . $e->getMessage());
    }
}
