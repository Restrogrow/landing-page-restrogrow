// Builds /version2: a copy of the site for testing on the live server. Own leads table (v2_leads), no ad tags or
// conversions, not indexed. Re-run after changing the main site:  node tools/build-v2.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(root, 'version2');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const write = (f, s) => { const p = path.join(out, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };


// Version 2 only: Meet link, agent alert, new budget options. The main site does not have these.
function must(s, from, to) { if (!s.includes(from)) throw new Error('patch target missing: ' + from.slice(0, 60)); return s.replace(from, () => to); }
// Migration for the version 2 columns. slot_start is checked on its own because a table made by an earlier build only has the Meet columns.
const MEET_COLS = [
  "    // Google Meet link created for each lead.",
  "    if (!$pdo->query(\"SHOW COLUMNS FROM leads LIKE 'meet_link'\")->fetch()) {",
  "        $pdo->exec(\"ALTER TABLE leads ADD COLUMN meet_link VARCHAR(200) NULL, ADD COLUMN meet_note VARCHAR(300) NULL\");",
  "    }",
  "    // Demo slot the lead picked.",
  "    if (!$pdo->query(\"SHOW COLUMNS FROM leads LIKE 'slot_start'\")->fetch()) {",
  "        $pdo->exec(\"ALTER TABLE leads ADD COLUMN slot_start DATETIME NULL\");",
  "    }",
  "    // Email and type of food business from the version 2 form.",
  "    if (!$pdo->query(\"SHOW COLUMNS FROM leads LIKE 'email'\")->fetch()) {",
  "        $pdo->exec(\"ALTER TABLE leads ADD COLUMN email VARCHAR(200) NULL, ADD COLUMN business_type VARCHAR(50) NULL\");",
  "    }",
  ""].join("\n");
const PATCH = {
  config: s => must(s, "    // Ad attribution captured with each lead (where it came from).", MEET_COLS + "    // Ad attribution captured with each lead (where it came from)."),
  submit: s => {
    s = must(s, "require_once __DIR__ . '/wa.php';", "require_once __DIR__ . '/wa.php';\nrequire_once __DIR__ . '/meet.php';");
    // email + type of food business
    s = must(s, "$fields = ['name', 'phone', 'brand',", "$fields = ['name', 'phone', 'email', 'business', 'brand',");
    s = must(s, "\n// One id per real submit.", "\nif (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) json_out(400, ['error' => 'Enter a valid email address.']);\n\n// One id per real submit.");
    s = must(s, "INSERT INTO leads (created_at, name, phone, brand,", "INSERT INTO leads (created_at, name, phone, email, business_type, brand,");
    s = must(s, "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    s = must(s, "$lead['name'], $phone, $lead['brand'],", "$lead['name'], $phone, $lead['email'], $lead['business'], $lead['brand'],");
    // duplicates allowed in version 2 (same number can be tested again and again)
    s = must(s, "if ($row = $dup->fetch()) {", "if (false && $row = $dup->fetch()) {");
    // one message only: the confirmation with the slot link. Meet link + agent alert wait for the slot.
    s = must(s, "\ntry { agent_save($eid, agent_new_lead($lead, $phone)); } catch (Throwable $e) { error_log('agent alert error: ' . $e->getMessage()); }", '');   // version 2 alerts the agent when the slot is booked instead
    return must(s, "wa_save($eid, wa_send($lead['name'], $lead['brand'], $phone));", "wa_save($eid, confirm_send($lead['name'], $lead['brand'], $phone, $eid));");
  },
  leads: s => must(s, "        'is_demo' => (int)$r['is_demo'],", "        'is_demo' => (int)$r['is_demo'],\n        'email' => (string)($r['email'] ?? ''), 'business' => (string)($r['business_type'] ?? ''),\n        'meet_link' => (string)($r['meet_link'] ?? ''), 'meet_note' => (string)($r['meet_note'] ?? ''),\n        'slot_start' => !empty($r['slot_start']) ? str_replace(' ', 'T', $r['slot_start']) . 'Z' : '',"),
};
// Version 2 form: email right after the WhatsApp number, type of food business after the brand name.
const BIZ = ['Restaurant', 'Cloud Kitchen', 'Café', 'QSR / Fast Food Outlet', 'Bakery', 'Other'];
const formV2 = h => {
  const ph = '<input id="fP" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="10 digit number" required></div>';
  h = must(h, ph, ph + '\n        <div class="fi"><label for="fE">Email</label><input id="fE" name="email" type="email" autocomplete="email" placeholder="you@example.com" required></div>');
  const br = '<input id="fB" name="brand" type="text" required></div>';
  h = must(h, br, br + '\n        <div class="fi"><label for="fY">What type of food business do you operate?</label><select id="fY" name="business" required><option value="">Select</option>' + BIZ.map(b => '<option>' + b + '</option>').join('') + '</select></div>');
  h = must(h, 'ok=v!=="";if(el.name==="phone"){', 'ok=v!=="";if(el.name==="email")ok=/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v);if(el.name==="phone"){');
  return must(h, 'M.textContent=bad.name==="phone"?"Enter a valid 10 digit mobile number.":', 'M.textContent=bad.name==="phone"?"Enter a valid 10 digit mobile number.":bad.name==="email"?"Enter a valid email address.":');
};
const budget = s => s.split('\u20b930,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('\u20b925,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('Under \u20b925,000').join('\u20b925,000 to \u20b930,000');

fs.rmSync(out, { recursive: true, force: true });

const API = ['config', 'submit', 'wa', 'meet', 'lead_confirm', 'leads', 'lead_update', 'lead_delete', 'lead_resend', 'demo_leads', 'public_config', 'slots', 'book'];
const SQL = [/\b(FROM|INTO|UPDATE|TABLE IF NOT EXISTS|TABLE|COLUMNS FROM) leads\b/g, '$1 v2_leads'];
for (const f of API) {
  let s = ['meet', 'slots', 'book'].includes(f) ? fs.readFileSync(path.join(__dirname, 'v2', f + '.php'), 'utf8') : read('api/' + f + '.php');
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
write('index.html', formV2(budget(page('index.html'))));
write('thank-you.html', read('thank-you.html'));
write('book.html', fs.readFileSync(path.join(__dirname, 'v2', 'book.html'), 'utf8'));

const MEETBOX = `
    var meet_=l.meet_link?'<div class="wst ok"><b>Demo: '+esc(l.slot_start?RG.fmt(l.slot_start):"time not chosen")+'<br>Meet: <a href="'+esc(l.meet_link)+'" target="_blank" rel="noopener">'+esc(l.meet_link.replace("https://",""))+'</a></b></div>':(l.meet_note&&!l.is_demo?'<div class="wst bad"><b>Meet link not made</b><span>'+esc(l.meet_note)+'</span></div>':(l.is_demo?"":'<div class="wst"><b>Demo slot: not chosen yet</b></div>'));`;
const patchLeads = h => { const k = `(waCls==="bad"?'<span>'+esc(l.wa_note)+'</span>':"")+'</div>':"";`; h = must(h, k, k + MEETBOX); h = must(h, '+wa_+all+', '+wa_+meet_+all+');
  h = must(h, `+'<div class="ph">'+esc(l.phone)+'</div>'`, `+'<div class="ph">'+esc(l.phone)+'</div>'+(l.email?'<div class="mt"><a href="mailto:'+esc(l.email)+'">'+esc(l.email)+'</a></div>':"")`);
  h = must(h, `'<div class="tags">'+tag("Outlets",l.outlets)`, `'<div class="tags">'+tag("Business",l.business)+tag("Outlets",l.outlets)`);
  return must(h, `var COLS=["time","name","phone",`, `var COLS=["time","name","phone","email","business",`); };
for (const f of ['index.html', 'leads.html']) write('admin/' + f, (f === 'leads.html' ? patchLeads(read('admin/' + f)) : read('admin/' + f)).replace(/\s*<a class="tab" href="pages.html">Pages<\/a>/, '').replace(/\s*<a class="tab" href="\.\.\/text\/">Notes<\/a>/, '').replace(/<title>([^<]*)<\/title>/, '<title>V2 $1</title>'));
for (const f of ['common.js', 'admin.css', '.htaccess']) write('admin/' + f, read('admin/' + f));
write('.env.example', `# Optional. Version 2 already uses the main site's .env (WhatsApp, Google Meet, agent, admin password).
# Put a line here only to override it, e.g. a separate database:  DB_NAME=...  DB_USER=...  DB_PASS=...
# Ad tags are always off in version 2.
#
# Slot booking (all optional, these are the defaults):
# WACRM_V2_TEMPLATE=      template with {{1}} name, {{2}} restaurant, {{3}} slot link. Empty = normal confirmation, no link.
# SLOT_START_HOUR=11  SLOT_END_HOUR=19  SLOT_STEP_MIN=15  SLOT_MINUTES=30  SLOT_DAYS=3  SLOT_NOTICE_MIN=30
# BOOK_BASE_URL=          full URL of book.html if it is not /version2/book.html on the same host
`);
console.log('version2 built');
