<?php
// Google Calendar for Admin -> Meetings. Same Google account as version 2's demo booking:
// GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env (scope: calendar events).

const GCAL_TZ = 'Asia/Kolkata';
const GCAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

// Returns [HTTP code, decoded JSON (array), raw body / curl error].
function gcal_req($method, $url, $tok, $data = null, $form = false) {
    $ch = curl_init($url);
    $h = $tok !== '' ? ['Authorization: Bearer ' . $tok] : [];
    $opt = [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 12, CURLOPT_CUSTOMREQUEST => $method];
    if ($data !== null) {
        $h[] = 'Content-Type: ' . ($form ? 'application/x-www-form-urlencoded' : 'application/json');
        $opt[CURLOPT_POSTFIELDS] = $form ? http_build_query($data) : json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    $opt[CURLOPT_HTTPHEADER] = $h;
    curl_setopt_array($ch, $opt);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    $j = json_decode((string)$res, true);
    return [$code, is_array($j) ? $j : [], $err !== '' ? $err : mb_substr((string)$res, 0, 200)];
}

// Returns [access token, note]. Token is '' when Google is not set up or refuses.
function gcal_token() {
    if (env('GOOGLE_CLIENT_ID') === '' || env('GOOGLE_CLIENT_SECRET') === '' || env('GOOGLE_REFRESH_TOKEN') === '') return ['', 'Google is not set up (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN in .env)'];
    list($code, $j, $raw) = gcal_req('POST', 'https://oauth2.googleapis.com/token', '', [
        'client_id' => env('GOOGLE_CLIENT_ID'), 'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'refresh_token' => env('GOOGLE_REFRESH_TOKEN'), 'grant_type' => 'refresh_token',
    ], true);
    $tok = $j['access_token'] ?? '';
    if ($code !== 200 || $tok === '') return ['', 'Google sign-in failed (HTTP ' . $code . '): ' . $raw];
    return [$tok, 'ok'];
}
