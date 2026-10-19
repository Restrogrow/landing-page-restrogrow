<?php
// Version 2 only. Demo slots + Google Meet link.
// Flow: lead -> one WhatsApp (with a "choose your slot" link) -> lead picks a slot on book.html -> Calendar event with
// a Meet room at that time -> link on WhatsApp to the lead and an alert to the sales agent.
// Needs GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env. Nothing here ever blocks a lead.

const SLOT_TZ = 'Asia/Kolkata';

function meet_post($url, $headers, $body) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $body, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 12, CURLOPT_HTTPHEADER => $headers]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return [$code, (string)$res, $err];
}

function meet_get($url, $tok) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 12, CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $tok]]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return [$code, (string)$res];
}

// Returns [access token, note].
function google_token() {
    if (env('GOOGLE_CLIENT_ID') === '' || env('GOOGLE_CLIENT_SECRET') === '' || env('GOOGLE_REFRESH_TOKEN') === '') return ['', 'not set up'];
    list($code, $res, $err) = meet_post('https://oauth2.googleapis.com/token', ['Content-Type: application/x-www-form-urlencoded'], http_build_query([
        'client_id' => env('GOOGLE_CLIENT_ID'), 'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'refresh_token' => env('GOOGLE_REFRESH_TOKEN'), 'grant_type' => 'refresh_token',
    ]));
    $tok = json_decode($res, true)['access_token'] ?? '';
    if ($code !== 200 || $tok === '') return ['', 'token HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 200)];
    return [$tok, 'ok'];
}

function slot_cfg() {
    return [
        'from' => max(0, min(23, (int)env('SLOT_START_HOUR', '11'))),
        'to' => max(1, min(24, (int)env('SLOT_END_HOUR', '19'))),
        'step' => max(5, (int)env('SLOT_STEP_MIN', '15')),
        'len' => max(5, (int)env('SLOT_MINUTES', '30')),
        'days' => max(1, min(14, (int)env('SLOT_DAYS', '3'))),
        'notice' => max(0, (int)env('SLOT_NOTICE_MIN', '30')),
    ];
}

// Busy periods [startTs, endTs] from the calendar and from slots already given to other leads.
function slot_busy($tok, $fromTs, $toTs) {
    $busy = [];
    if ($tok !== '') {
        $q = http_build_query(['timeMin' => gmdate('c', $fromTs), 'timeMax' => gmdate('c', $toTs), 'singleEvents' => 'true', 'maxResults' => 250]);
        list($code, $res) = meet_get('https://www.googleapis.com/calendar/v3/calendars/primary/events?' . $q, $tok);
        if ($code === 200) foreach ((json_decode($res, true)['items'] ?? []) as $ev) {
            if (($ev['status'] ?? '') === 'cancelled' || ($ev['transparency'] ?? '') === 'transparent') continue;
            if (empty($ev['start']['dateTime']) || empty($ev['end']['dateTime'])) continue;
            $busy[] = [strtotime($ev['start']['dateTime']), strtotime($ev['end']['dateTime'])];
        }
    }
    try {
        $len = slot_cfg()['len'] * 60;
        $st = db()->prepare('SELECT slot_start FROM v2_leads WHERE slot_start IS NOT NULL AND slot_start BETWEEN ? AND ?');
        $st->execute([gmdate('Y-m-d H:i:s', $fromTs - $len), gmdate('Y-m-d H:i:s', $toTs)]);
        foreach ($st->fetchAll() as $r) { $t = strtotime($r['slot_start'] . ' UTC'); $busy[] = [$t, $t + $len]; }
    } catch (Throwable $e) {
        error_log('slot busy db failed: ' . $e->getMessage());
    }
    return $busy;
}

// Free start times, grouped by day: [ ['day' => 'Tue 20 Oct', 'slots' => [['ts' => 123, 'label' => '11:15 AM'], ...]], ... ]
function slots_free($tok) {
    $c = slot_cfg();
    $tz = new DateTimeZone(SLOT_TZ);
    $now = time() + $c['notice'] * 60;
    $first = new DateTime('today', $tz);
    $last = (clone $first)->modify('+' . $c['days'] . ' days');
    $busy = slot_busy($tok, $first->getTimestamp(), $last->getTimestamp());
    $out = [];
    for ($d = 0; $d < $c['days']; $d++) {
        $day = (clone $first)->modify("+$d days");
        $slots = [];
        $t = (clone $day)->setTime($c['from'], 0);
        $end = (clone $day)->setTime(0, 0)->modify('+' . $c['to'] . ' hours');
        for (; $t->getTimestamp() + $c['len'] * 60 <= $end->getTimestamp(); $t->modify('+' . $c['step'] . ' minutes')) {
            $s = $t->getTimestamp(); $e = $s + $c['len'] * 60;
            if ($s < $now) continue;
            $clash = false;
            foreach ($busy as $b) if ($s < $b[1] && $e > $b[0]) { $clash = true; break; }
            if (!$clash) $slots[] = ['ts' => $s, 'label' => $t->format('g:i A')];
        }
        if ($slots) $out[] = ['day' => $day->format('D j M'), 'slots' => $slots];
    }
    return $out;
}

function slot_label($ts) {
    return (new DateTime('@' . $ts))->setTimezone(new DateTimeZone(SLOT_TZ))->format('D j M, g:i A') . ' IST';
}

// Creates the Calendar event with a Meet room at $startTs. Returns [link, note].
function meet_create($name, $brand, $startTs, $tok) {
    if ($tok === '') return ['', 'no Google token'];
    $tz = new DateTimeZone(SLOT_TZ);
    $start = (new DateTime('@' . $startTs))->setTimezone($tz);
    $end = (clone $start)->modify('+' . slot_cfg()['len'] . ' minutes');
    $event = [
        'summary' => 'RestroGrow demo: ' . $brand . ' (' . $name . ')',
        'description' => 'Demo call booked from the landing page.',
        'start' => ['dateTime' => $start->format('c'), 'timeZone' => SLOT_TZ],
        'end' => ['dateTime' => $end->format('c'), 'timeZone' => SLOT_TZ],
        'conferenceData' => ['createRequest' => ['requestId' => bin2hex(random_bytes(8)), 'conferenceSolutionKey' => ['type' => 'hangoutsMeet']]],
    ];
    list($code, $res, $err) = meet_post('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
        ['Authorization: Bearer ' . $tok, 'Content-Type: application/json'], json_encode($event));
    $link = json_decode($res, true)['hangoutLink'] ?? '';
    if ($code >= 200 && $code < 300 && $link !== '') return [$link, 'ok'];
    return ['', 'calendar HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 200)];
}

function book_url($eid) {
    $base = env('BOOK_BASE_URL');
    if ($base === '') {
        $host = $_SERVER['HTTP_HOST'] ?? 'demo.restrogrow.com';
        $dir = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/version2/api/x.php')), '/');
        $base = 'https://' . $host . $dir . '/book.html';
    }
    return $base . '?e=' . rawurlencode($eid);
}

// The one message a new lead gets. With WACRM_V2_TEMPLATE set it is that template ({{1}} name, {{2}} restaurant, {{3}} slot link);
// otherwise the normal confirmation without a link. Returns [status, note] for wa_save().
function confirm_send($name, $brand, $phone, $eid) {
    require_once __DIR__ . '/wa.php';
    $tpl = env('WACRM_V2_TEMPLATE');
    if ($tpl === '') return wa_send($name, $brand, $phone);
    foreach ([0, 2, 5] as $i => $w) {
        if ($w) sleep($w);
        try { $r = wa_once($name, $brand, $phone, $tpl, [$name, $brand, book_url($eid)]); } catch (Throwable $e) { $r = ['failed', $e->getMessage(), true]; }
        if ($r[0] === 'sent' || !$r[2]) return [$r[0], ($i ? 'attempt ' . ($i + 1) . ': ' : '') . $r[1]];
    }
    return [$r[0], 'after 3 attempts: ' . $r[1]];
}

// Meet link to the lead on its own template (WACRM_MEET_TEMPLATE: {{1}} name, {{2}} link).
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

// Alert to the sales agent (AGENT_PHONE) when a slot is booked.
// AGENT_TEMPLATE set: that template ({{1}} name, {{2}} restaurant, {{3}} phone, {{4}} city, {{5}} budget, {{6}} link).
// Empty: plain text (WhatsApp only delivers that if the agent messaged the business in the last 24 hours).
function agent_notify($lead, $phone, $link, $when) {
    $to = preg_replace('/\D/', '', env('AGENT_PHONE', '8447705467'));
    if ($to === '' || env('Api') === '' || env('WACRM_BASE_URL') === '') return '';
    $link = $link !== '' ? $link : 'not available';
    require_once __DIR__ . '/wa.php';
    if (env('AGENT_TEMPLATE') !== '') {
        $r = wa_once($lead['name'], '', substr($to, -10), env('AGENT_TEMPLATE'), [env('AGENT_NAME', 'Nishchay'), $lead['brand'] . ' (' . $lead['name'] . ')', $phone, $lead['location'], $lead['budget'], $link]);
        return 'agent ' . $r[0] . ($r[0] === 'sent' ? '' : ': ' . $r[1]);
    }
    $body = "Hello Nishchay, demo booked!\nWhen: $when\nName: {$lead['name']}\nRestaurant: {$lead['brand']}\nBusiness: " . ($lead['business'] ?? '') . "\nPhone: +91 $phone\nEmail: " . ($lead['email'] ?? '') . "\nCity: {$lead['location']}\nOutlets: {$lead['outlets']}\nOrders/day: {$lead['orders']}\nTurnover: {$lead['turnover']}\nBudget: {$lead['budget']}\nMeeting link: $link";
    list($code, $res, $err) = meet_post(env('WACRM_BASE_URL'), ['Authorization: Bearer ' . env('Api'), 'Content-Type: application/json'],
        json_encode(['to' => '+91' . substr($to, -10), 'type' => 'text', 'text' => $body], JSON_UNESCAPED_UNICODE));
    return $code >= 200 && $code < 300 ? 'agent sent' : 'agent failed: HTTP ' . $code . ' ' . $err . ' ' . mb_substr($res, 0, 150);
}
