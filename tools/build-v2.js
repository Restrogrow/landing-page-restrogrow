// Builds /version2: a copy of the site for testing on the live server. Own leads table (v2_leads), no ad tags or
// conversions, not indexed. Re-run after changing the main site:  node tools/build-v2.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'version2');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, s) => { const p = path.join(out, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };


// Version 2 only: Meet link, agent alert, new budget options. The main site does not have these.
function must(s, from, to) { if (!s.includes(from)) throw new Error('patch target missing: ' + from.slice(0, 60)); return s.replace(from, () => to); }
const PATCH = {
  config: s => must(s, "    // Ad attribution captured with each lead (where it came from).",
    "    // Google Meet link created for each lead.\n    if (!$pdo->query(\"SHOW COLUMNS FROM leads LIKE 'meet_link'\")->fetch()) {\n        $pdo->exec(\"ALTER TABLE leads ADD COLUMN meet_link VARCHAR(200) NULL, ADD COLUMN meet_note VARCHAR(300) NULL\");\n    }\n    // Ad attribution captured with each lead (where it came from)."),
  submit: s => {
    s = must(s, "require_once __DIR__ . '/wa.php';", "require_once __DIR__ . '/wa.php';\nrequire_once __DIR__ . '/meet.php';");
    return must(s, "wa_save($eid, wa_send($lead['name'], $lead['brand'], $phone));",
      "wa_save($eid, wa_send($lead['name'], $lead['brand'], $phone));\ntry { $m = meet_create($lead['name'], $lead['brand']); $w = meet_whatsapp($lead['name'], $phone, $m[0]); if ($w !== '') $m[1] .= ' | ' . $w; $m[1] .= ' | ' . agent_notify($lead, $phone, $m[0]); meet_save($eid, $m); } catch (Throwable $e) { error_log('meet error: ' . $e->getMessage()); }");
  },
  leads: s => must(s, "        'is_demo' => (int)$r['is_demo'],", "        'is_demo' => (int)$r['is_demo'],\n        'meet_link' => (string)($r['meet_link'] ?? ''), 'meet_note' => (string)($r['meet_note'] ?? ''),"),
  wa: s => {
    s = must(s, "function wa_once($name, $brand, $phone) {", "function wa_once($name, $brand, $phone, $tpl = null, $params = null) {");
    s = must(s, "'name' => env('WACRM_TEMPLATE', 'restrogrow_demo_confirmation'),", "'name' => $tpl ?: env('WACRM_TEMPLATE', 'restrogrow_demo_confirmation'),");
    return must(s, "'params' => [$name, $brand],   // fills {{1}} and {{2}}", "'params' => $params ?: [$name, $brand],   // fills {{1}} and {{2}}");
  },
};
const budget = s => s.split('\u20b930,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('\u20b925,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('Under \u20b925,000').join('\u20b925,000 to \u20b930,000');

fs.rmSync(out, { recursive: true, force: true });

const API = ['config', 'submit', 'wa', 'meet', 'lead_confirm', 'leads', 'lead_update', 'lead_delete', 'lead_resend', 'demo_leads', 'public_config'];
const SQL = [/\b(FROM|INTO|UPDATE|TABLE IF NOT EXISTS|TABLE|COLUMNS FROM) leads\b/g, '$1 v2_leads'];
for (const f of API) {
  let s = f === 'meet' ? fs.readFileSync(path.join(__dirname, 'v2', 'meet.php'), 'utf8') : read('api/' + f + '.php');
  if (PATCH[f]) s = PATCH[f](s);
  if (f === 'demo_leads') s = budget(s);
  s = s.replace(SQL[0], SQL[1]);
  if (f === 'config') {
    // main site's .env (one folder up) gives the keys; an optional version2/.env overrides it, e.g. a separate database
    s = s.replace("env_load(__DIR__ . '/../.env');", "env_load(__DIR__ . '/../../.env');\nenv_load(__DIR__ . '/../.env');");
    // version 2 never uses ad tags
    s = s.replace(/\$v = env\(\$k\);\s*return \$v !== '' \? \$v : \(\$defaults\[\$k\] \?\? ''\);/, "return '';   // version 2: no ad tags, no conversions");
  }
  write('api/' + f + '.php', s);
}

const page = f => read(f).replace('<meta name="viewport"', '<meta name="robots" content="noindex, nofollow">\n<meta name="viewport"');
write('index.html', budget(page('index.html')));
write('thank-you.html', read('thank-you.html'));

const MEETBOX = `
    var meet_=l.meet_link?'<div class="wst ok"><b>Meet: <a href="'+esc(l.meet_link)+'" target="_blank" rel="noopener">'+esc(l.meet_link.replace("https://",""))+'</a></b></div>':(l.meet_note&&!l.is_demo?'<div class="wst bad"><b>Meet link not made</b><span>'+esc(l.meet_note)+'</span></div>':"");`;
const patchLeads = h => { const k = `(waCls==="bad"?'<span>'+esc(l.wa_note)+'</span>':"")+'</div>':"";`; h = must(h, k, k + MEETBOX); return must(h, '+wa_+all+', '+wa_+meet_+all+'); };
for (const f of ['index.html', 'leads.html']) write('admin/' + f, (f === 'leads.html' ? patchLeads(read('admin/' + f)) : read('admin/' + f)).replace(/\s*<a class="tab" href="pages.html">Pages<\/a>/, '').replace(/\s*<a class="tab" href="\.\.\/text\/">Notes<\/a>/, '').replace(/<title>([^<]*)<\/title>/, '<title>V2 $1</title>'));
for (const f of ['common.js', 'admin.css', '.htaccess']) write('admin/' + f, read('admin/' + f));
write('.env.example', `# Optional. Version 2 already uses the main site's .env (WhatsApp, Google Meet, agent, admin password).
# Put a line here only to override it, e.g. a separate database:  DB_NAME=...  DB_USER=...  DB_PASS=...
# Ad tags are always off in version 2.
`);
console.log('version2 built');
