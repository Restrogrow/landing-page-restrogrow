<?php
require __DIR__ . '/config.php';
require __DIR__ . '/google.php';

// Admin -> Meetings. POST {password, action}:
//  list:   Google Calendar events (30 days back, 90 ahead), demos booked from the version 2 form, and meeting links saved on leads.
//  create: {title, start (ISO), minutes, email?, lead_id?, notes?} -> Calendar event with a Google Meet link.
//          With a lead, the link is also added to that lead's history (lead_activity only; the lead row is never changed).
//  cancel: {id} -> deletes an event, only one that was created from this page.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);
$action = (string)($b['action'] ?? 'list');

function utc_iso($s) { return str_replace(' ', 'T', $s) . 'Z'; }

if ($action === 'list') {
    list($tok, $note) = gcal_token();
    $events = [];
    if ($tok !== '') {
        $q = http_build_query(['timeMin' => gmdate('c', time() - 30 * 86400), 'timeMax' => gmdate('c', time() + 90 * 86400),
            'singleEvents' => 'true', 'orderBy' => 'startTime', 'maxResults' => 500]);
        list($code, $j, $raw) = gcal_req('GET', GCAL_URL . '?' . $q, $tok);
        if ($code === 200) {
            foreach ($j['items'] ?? [] as $ev) {
                if (($ev['status'] ?? '') === 'cancelled') continue;
                $p = $ev['extendedProperties']['private'] ?? [];
                $link = (string)($ev['hangoutLink'] ?? '');
                if ($link === '') foreach ($ev['conferenceData']['entryPoints'] ?? [] as $ep) if (($ep['entryPointType'] ?? '') === 'video') { $link = (string)$ep['uri']; break; }
                $events[] = [
                    'id' => (string)$ev['id'], 'title' => (string)($ev['summary'] ?? '(no title)'),
                    'start' => (string)($ev['start']['dateTime'] ?? $ev['start']['date'] ?? ''),
                    'end' => (string)($ev['end']['dateTime'] ?? $ev['end']['date'] ?? ''),
                    'all_day' => empty($ev['start']['dateTime']),
                    'link' => $link, 'url' => (string)($ev['htmlLink'] ?? ''), 'desc' => mb_substr((string)($ev['description'] ?? ''), 0, 600),
                    'guests' => array_values(array_filter(array_map(function ($a) { return (string)($a['email'] ?? ''); }, $ev['attendees'] ?? []), function ($e) { return $e !== ''; })),
                    'mine' => ($p['rg'] ?? '') === 'admin', 'lead_id' => (int)($p['rg_lead'] ?? 0),
                ];
            }
            $note = 'ok';
        } else {
            $note = 'Could not read Google Calendar (HTTP ' . $code . '): ' . $raw;
        }
    }

    // Demos the leads booked themselves in the version 2 form (read only).
    $v2 = [];
    try {
        foreach (db()->query('SELECT id, name, phone, brand, location, email, slot_start, meet_link FROM v2_leads WHERE slot_start IS NOT NULL ORDER BY slot_start DESC LIMIT 500')->fetchAll() as $r) {
            $v2[] = ['id' => (int)$r['id'], 'name' => $r['name'], 'phone' => $r['phone'], 'brand' => $r['brand'], 'location' => $r['location'],
                'email' => (string)$r['email'], 'start' => utc_iso($r['slot_start']), 'link' => (string)$r['meet_link']];
        }
    } catch (Throwable $e) {
        error_log('meetings v2 load failed: ' . $e->getMessage());
    }

    // Latest meeting link saved on each main-site lead (pasted in the lead panel or created here).
    $linked = [];
    try {
        $rows = db()->query("SELECT a.lead_id, a.detail, a.created_at FROM lead_activity a WHERE a.kind = 'meet' ORDER BY a.id")->fetchAll();
        $last = [];
        foreach ($rows as $r) $last[(int)$r['lead_id']] = $r;
        $last = array_filter($last, function ($r) { return $r['detail'] !== ''; });
        if ($last) {
            $ids = implode(',', array_map('intval', array_keys($last)));
            foreach (db()->query("SELECT id, name, phone, brand, location, email FROM leads WHERE id IN ($ids)")->fetchAll() as $l) {
                $r = $last[(int)$l['id']];
                $linked[] = ['id' => (int)$l['id'], 'name' => $l['name'], 'phone' => $l['phone'], 'brand' => $l['brand'], 'location' => $l['location'],
                    'email' => (string)($l['email'] ?? ''), 'link' => $r['detail'], 'saved' => utc_iso($r['created_at'])];
            }
        }
    } catch (Throwable $e) {
        error_log('meetings links load failed: ' . $e->getMessage());
    }

    json_out(200, ['google' => $note, 'events' => $events, 'v2' => $v2, 'linked' => $linked]);
}

if ($action === 'create') {
    $title = mb_substr(trim((string)($b['title'] ?? '')), 0, 200);
    $t = strtotime((string)($b['start'] ?? ''));
    $mins = (int)($b['minutes'] ?? 30);
    $email = trim((string)($b['email'] ?? ''));
    $leadId = (int)($b['lead_id'] ?? 0);
    $notes = mb_substr(trim((string)($b['notes'] ?? '')), 0, 2000);
    if ($title === '') json_out(400, ['error' => 'Give the meeting a title.']);
    if ($t === false) json_out(400, ['error' => 'Pick a date and time.']);
    if ($t < time() - 3600) json_out(400, ['error' => 'That time is in the past.']);
    if ($mins < 5 || $mins > 480) json_out(400, ['error' => 'Length must be between 5 minutes and 8 hours.']);
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) json_out(400, ['error' => 'That email address is not valid.']);

    $lead = null;
    if ($leadId > 0) {
        try {
            $q = db()->prepare('SELECT id, name, phone, brand, location FROM leads WHERE id = ?');
            $q->execute([$leadId]);
            $lead = $q->fetch() ?: null;
        } catch (Throwable $e) {
            error_log('meetings lead lookup failed: ' . $e->getMessage());
        }
        if (!$lead) json_out(404, ['error' => 'Lead not found']);
    }

    list($tok, $note) = gcal_token();
    if ($tok === '') json_out(503, ['error' => $note]);

    $tz = new DateTimeZone(GCAL_TZ);
    $start = (new DateTime('@' . $t))->setTimezone($tz);
    $end = (clone $start)->modify('+' . $mins . ' minutes');
    $desc = $notes;
    if ($lead) $desc = trim("Lead: {$lead['name']} ({$lead['brand']}, {$lead['location']})\nPhone: +91 {$lead['phone']}\n\n" . $notes);
    $event = [
        'summary' => $title,
        'description' => $desc,
        'start' => ['dateTime' => $start->format('c'), 'timeZone' => GCAL_TZ],
        'end' => ['dateTime' => $end->format('c'), 'timeZone' => GCAL_TZ],
        'conferenceData' => ['createRequest' => ['requestId' => bin2hex(random_bytes(8)), 'conferenceSolutionKey' => ['type' => 'hangoutsMeet']]],
        'extendedProperties' => ['private' => ['rg' => 'admin', 'rg_lead' => (string)($lead ? $lead['id'] : '')]],
    ];
    if ($email !== '') $event['attendees'] = [['email' => $email]];
    list($code, $j, $raw) = gcal_req('POST', GCAL_URL . '?conferenceDataVersion=1&sendUpdates=' . ($email !== '' ? 'all' : 'none'), $tok, $event);
    $link = (string)($j['hangoutLink'] ?? '');
    if ($code < 200 || $code >= 300 || empty($j['id'])) json_out(502, ['error' => 'Google Calendar did not create the meeting (HTTP ' . $code . '): ' . $raw]);

    // Save the Meet link on the lead's history so it shows on the lead card too.
    $saved = false;
    if ($lead && $link !== '') {
        try {
            db()->prepare('INSERT INTO lead_activity (lead_id, created_at, kind, detail) VALUES (?, ?, ?, ?)')->execute([(int)$lead['id'], gmdate('Y-m-d H:i:s'), 'meet', mb_substr($link, 0, 300)]);
            $saved = true;
        } catch (Throwable $e) {
            error_log('meetings link save failed: ' . $e->getMessage());
        }
    }
    json_out(200, ['ok' => true, 'saved_on_lead' => $saved, 'event' => [
        'id' => (string)$j['id'], 'title' => $title, 'start' => $start->format('c'), 'end' => $end->format('c'), 'all_day' => false,
        'link' => $link, 'url' => (string)($j['htmlLink'] ?? ''), 'desc' => $desc, 'guests' => $email !== '' ? [$email] : [],
        'mine' => true, 'lead_id' => $lead ? (int)$lead['id'] : 0,
    ]]);
}

if ($action === 'cancel') {
    $id = preg_replace('/[^A-Za-z0-9_]/', '', (string)($b['id'] ?? ''));
    if ($id === '') json_out(400, ['error' => 'Invalid input']);
    list($tok, $note) = gcal_token();
    if ($tok === '') json_out(503, ['error' => $note]);
    list($code, $j) = gcal_req('GET', GCAL_URL . '/' . $id, $tok);
    if ($code !== 200) json_out(404, ['error' => 'Meeting not found in Google Calendar']);
    if (($j['extendedProperties']['private']['rg'] ?? '') !== 'admin') json_out(403, ['error' => 'Only meetings created from this page can be cancelled here. Use Google Calendar for the rest.']);
    list($code, , $raw) = gcal_req('DELETE', GCAL_URL . '/' . $id . '?sendUpdates=all', $tok);
    $link = (string)($j['hangoutLink'] ?? '');
    $leadId = (int)($j['extendedProperties']['private']['rg_lead'] ?? 0);
    list($code, , $raw) = gcal_req('DELETE', GCAL_URL . '/' . $id . '?sendUpdates=all', $tok);
    if ($code !== 204 && $code !== 200 && $code !== 410) json_out(502, ['error' => 'Google Calendar did not cancel it (HTTP ' . $code . '): ' . $raw]);
    // If the lead still shows this meeting's link, clear it (a new history line, nothing is deleted).
    if ($leadId > 0 && $link !== '') {
        try {
            $q = db()->prepare("SELECT detail FROM lead_activity WHERE lead_id = ? AND kind = 'meet' ORDER BY id DESC LIMIT 1");
            $q->execute([$leadId]);
            if ((string)$q->fetchColumn() === $link) db()->prepare('INSERT INTO lead_activity (lead_id, created_at, kind, detail) VALUES (?, ?, ?, ?)')->execute([$leadId, gmdate('Y-m-d H:i:s'), 'meet', '']);
        } catch (Throwable $e) {
            error_log('meetings link clear failed: ' . $e->getMessage());
        }
    }
    json_out(200, ['ok' => true]);
}

json_out(400, ['error' => 'Unknown action']);
