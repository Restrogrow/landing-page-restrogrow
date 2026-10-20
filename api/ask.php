<?php
require __DIR__ . '/config.php';
require __DIR__ . '/calls_lib.php';

// Admin -> Analyse -> Ask: answers questions about the business with Google Gemini.
// Each question is sent with the live leads (straight from the database, so always current), their call/status history,
// the call transcripts and the written analysis. Only reads; nothing is changed.
// POST {password, question, history: [{role: user|model, text}]}  ->  {answer}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(405, ['error' => 'Method not allowed']);
$pass = env('ADMIN_PASSWORD');
if ($pass === '') json_out(500, ['error' => 'ADMIN_PASSWORD is not set']);
$b = body();
if (!hash_equals($pass, (string)($b['password'] ?? ''))) json_out(401, ['error' => 'Wrong password']);

$key = env('GEMINI_KEY');
if ($key === '') json_out(503, ['error' => 'The AI is not set up yet: add GEMINI_KEY=... to the .env file on the server.']);
$model = preg_replace('/[^a-z0-9.\-]/', '', env('GEMINI_MODEL', 'gemini-3.8-flash'));
$question = trim(mb_substr((string)($b['question'] ?? ''), 0, 2000));
if ($question === '') json_out(400, ['error' => 'Ask something first']);

/* ---------- live data ---------- */
$ist = new DateTimeZone('Asia/Kolkata');
$t = function ($utc) use ($ist) {
    if (!$utc) return '';
    $d = new DateTime(str_replace('T', ' ', rtrim($utc, 'Z')), new DateTimeZone('UTC'));
    return $d->setTimezone($ist)->format('d M Y H:i');
};
try {
    $rows = db()->query('SELECT * FROM leads WHERE is_demo = 0 ORDER BY id DESC LIMIT 3000')->fetchAll();
    $acts = [];
    try {
        foreach (db()->query('SELECT lead_id, created_at, kind, detail FROM lead_activity ORDER BY id')->fetchAll() as $a) $acts[(int)$a['lead_id']][] = $a;
    } catch (Throwable $e) { error_log('ask: history not read: ' . $e->getMessage()); }
} catch (Throwable $e) {
    error_log('ask: leads not read: ' . $e->getMessage());
    json_out(500, ['error' => 'Could not read the leads']);
}

$cnt = function ($k) use ($rows) { $c = []; foreach ($rows as $r) { $v = trim((string)$r[$k]) ?: '(blank)'; $c[$v] = ($c[$v] ?? 0) + 1; } arsort($c); return $c; };
$lines = [];
foreach ($rows as $r) {
    $p = json_decode((string)$r['ad_params'], true) ?: [];
    $h = $acts[(int)$r['id']] ?? [];
    $calls = array_filter($h, function ($a) { return $a['kind'] === 'call'; });
    $last = end($calls);
    $fu = ''; $meet = '';
    foreach ($h as $a) { if ($a['kind'] === 'followup') $fu = $a['detail']; if ($a['kind'] === 'meet') $meet = $a['detail']; }
    $steps = array_map(function ($a) use ($t) { return $t($a['created_at']) . ' ' . $a['kind'] . ($a['kind'] === 'status' ? ' ' . $a['detail'] : ''); },
        array_filter($h, function ($a) { return in_array($a['kind'], ['call', 'status'], true); }));
    $lines[] = implode(' | ', [
        '#' . $r['id'], $t($r['created_at']), $r['name'], $r['phone'], $r['brand'], $r['location'], (string)$r['business_type'],
        'outlets ' . $r['outlets'], $r['orders_day'] . '/day', 'turnover ' . $r['turnover'], 'budget ' . $r['budget'],
        'STATUS ' . $r['status'], 'notes: ' . str_replace(["\r", "\n"], ' ', (string)$r['notes']),
        'ad: ' . ($p['ad_name'] ?? '') . ' / ' . ($p['adset_name'] ?? '') . ' / ' . ($p['utm_campaign'] ?? '') . ' / ' . ($p['placement'] ?? ''),
        'calls ' . count($calls) . ($last ? ' last ' . $t($last['created_at']) : ''), $fu ? 'follow-up ' . $t($fu) : '', $meet ? 'meeting link set' : '',
        $steps ? 'history: ' . implode('; ', $steps) : '',
    ]);
}
$counts = '';
foreach (['status' => 'Status', 'budget' => 'Budget', 'orders_day' => 'Orders per day', 'turnover' => 'Turnover', 'business_type' => 'Business type', 'outlets' => 'Outlets'] as $k => $label) {
    $counts .= $label . ': ' . implode(', ', array_map(function ($v, $n) { return "$v = $n"; }, array_keys($cnt($k)), $cnt($k))) . "\n";
}

$cd = calls_data();
// per lead: the analysis (verdict, reasons, next step), then each call's transcript
$callText = '';
$byPhone = [];
foreach ($cd['calls'] as $c) $byPhone[$c['phone'] ?? $c['file']][] = $c;
foreach ($byPhone as $ph => $cs) {
    $an = $cd['leads'][$ph] ?? [];
    $callText .= "\n### " . ($cs[0]['name'] ?? '?') . " ($ph)\n"
        . 'Verdict: ' . ($an['verdict'] ?? '') . ' | ' . ($an['summary'] ?? '') . "\n"
        . (!empty($an['signals']) ? 'Buying signals: ' . implode('; ', $an['signals']) . "\n" : '')
        . (!empty($an['objections']) ? 'Objections: ' . implode('; ', $an['objections']) . "\n" : '')
        . (!empty($an['next']) ? 'Next step: ' . $an['next'] . "\n" : '');
    foreach ($cs as $c) {
        $callText .= '- Call ' . ($c['when'] ?? '') . ', ' . round(($c['dur'] ?? 0) / 60, 1) . ' min. Transcript: '
            . implode(' ', array_map(function ($s) { return $s['t']; }, $c['segs'] ?? [])) . "\n";
    }
}

$now = (new DateTime('now', $ist))->format('l d M Y, H:i');
$system = <<<TXT
You are the sales analyst inside the RestroGrow admin panel. The owner asks you about leads, calls, conversions, ads and what to fix.
Today is $now (IST).

How to answer:
- Reply in the language the owner writes in. If they write Hinglish (Hindi in English letters), reply in simple Hinglish.
- Use only the data below. Give real numbers, names and dates from it. If the data cannot answer something, say so plainly.
- Be honest and specific, like a good sales coach: say what is going wrong, why, and exactly what to do next. Short paragraphs and bullet points.
- When you mention a lead, give the name and phone so the owner can find it.
- Note: before 21 Oct 2026 there was no "Interested" status, so the team often marked interested leads or booked meetings as "Converted". Read the notes and history before calling a lead a real sale.

## Business context
{$cd['context']}

## Written analysis of the calls (made from the recordings)
{$cd['report']}

## Live lead counts (real leads only, demo leads excluded). Total: %TOTAL%
$counts
## Every lead, newest first (id | came in (IST) | name | phone | brand | city | business | size | status | notes | ad | calls | follow-up | history)
%LINES%

## Call recordings with transcripts (machine transcribed; names and numbers may be misheard)
$callText
TXT;
$system = str_replace(['%TOTAL%', '%LINES%'], [count($rows), implode("\n", $lines)], $system);

$contents = [];
foreach (array_slice(is_array($b['history'] ?? null) ? $b['history'] : [], -12) as $m) {
    $text = mb_substr(trim((string)($m['text'] ?? '')), 0, 6000);
    if ($text === '') continue;
    $contents[] = ['role' => ($m['role'] ?? '') === 'model' ? 'model' : 'user', 'parts' => [['text' => $text]]];
}
$contents[] = ['role' => 'user', 'parts' => [['text' => $question]]];

@set_time_limit(150);
$ch = curl_init('https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent');
curl_setopt_array($ch, [
    CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 120, CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'x-goog-api-key: ' . $key],
    CURLOPT_POSTFIELDS => json_encode([
        'systemInstruction' => ['parts' => [['text' => $system]]],
        'contents' => $contents,
        'generationConfig' => ['temperature' => 0.4],
    ], JSON_UNESCAPED_UNICODE),
]);
$res = curl_exec($ch);
$code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);
$j = json_decode((string)$res, true);
if ($code !== 200) {
    $msg = $j['error']['message'] ?? ($err ?: 'HTTP ' . $code);
    error_log('ask: gemini failed: ' . $msg);
    json_out(502, ['error' => 'The AI did not answer: ' . mb_substr($msg, 0, 300)]);
}
$answer = '';
foreach ($j['candidates'][0]['content']['parts'] ?? [] as $p) if (empty($p['thought'])) $answer .= $p['text'] ?? '';
if (trim($answer) === '') json_out(502, ['error' => 'The AI gave an empty answer. Try asking again.']);
json_out(200, ['answer' => $answer]);
