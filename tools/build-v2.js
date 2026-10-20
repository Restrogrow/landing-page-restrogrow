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
  ""].join("\n");
const PATCH = {
  config: s => must(s, "    // Ad attribution captured with each lead (where it came from).", MEET_COLS + "    // Ad attribution captured with each lead (where it came from)."),
  submit: s => {
    s = must(s, "require_once __DIR__ . '/wa.php';", "require_once __DIR__ . '/wa.php';\nrequire_once __DIR__ . '/meet.php';");
    // duplicates allowed in version 2 (same number can be tested again and again)
    s = must(s, "if ($row = $dup->fetch()) {", "if (false && $row = $dup->fetch()) {");
    // Meet link + agent alert only once there is a slot
    s = must(s, "\ntry { agent_save($eid, agent_new_lead($lead, $phone)); } catch (Throwable $e) { error_log('agent alert error: ' . $e->getMessage()); }", '');   // version 2 alerts the agent when the slot is booked instead
    // the demo slot is picked in the form: checked before saving (a taken slot just asks for another), booked before answering
    s = must(s, "// A number is accepted once, ever.", [
      "// Version 2: demo slot picked in the form (unix seconds). Checked before saving so a taken slot just asks for another one.",
      "require_once __DIR__ . '/meet.php';",
      "$slotTs = (int)($b['slot'] ?? 0);",
      "list($gTok, $gNote) = $slotTs > 0 ? google_token() : ['', ''];",
      "if ($slotTs > 0 && !slot_is_free($gTok, $slotTs)) json_out(409, ['error' => 'Sorry, that time was just taken. Please pick another one.']);",
      "",
      "// A number is accepted once, ever."].join("\n"));
    s = must(s, "$out = json_encode(['ok' => true, 'event_id' => $eid]);", [
      "$booked = ['', ''];",
      "if ($slotTs > 0) {",
      "    try { $booked = slot_book($eid, $lead['name'], $lead['brand'], $slotTs, $gTok, $gNote); } catch (Throwable $e) { error_log('form booking failed: ' . $e->getMessage()); }",
      "}",
      "$out = json_encode(['ok' => true, 'event_id' => $eid] + ($booked[0] !== '' ? ['label' => $booked[0], 'link' => $booked[1]] : []), JSON_UNESCAPED_UNICODE);"].join("\n"));
    // booked: normal confirmation + Meet link + agent alert. Not booked: the confirmation with the "choose your slot" link.
    return must(s, "wa_save($eid, wa_send($lead['name'], $lead['brand'], $phone));", [
      "if ($booked[0] !== '') {",
      "    wa_save($eid, wa_send($lead['name'], $lead['brand'], $phone));",
      "    try { slot_booked_messages($eid, $lead, $phone, $booked[1], $booked[0]); } catch (Throwable $e) { error_log('booked messages failed: ' . $e->getMessage()); }",
      "} else {",
      "    wa_save($eid, confirm_send($lead['name'], $lead['brand'], $phone, $eid));",
      "}"].join("\n"));
  },
  leads: s => must(s, "        'is_demo' => (int)$r['is_demo'],", "        'is_demo' => (int)$r['is_demo'],\n        'meet_link' => (string)($r['meet_link'] ?? ''), 'meet_note' => (string)($r['meet_note'] ?? ''),\n        'slot_start' => !empty($r['slot_start']) ? str_replace(' ', 'T', $r['slot_start']) . 'Z' : '',"),
};
const budget = s => s.split('\u20b930,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('\u20b925,000 to \u20b950,000').join('\u20b930,000 to \u20b950,000').split('Under \u20b925,000').join('\u20b925,000 to \u20b930,000');
// Version 2 form: the demo day and time are picked in the form itself, and the Meet link shows straight after submit.
// Picker styles and script: tools/v2/form-slots.css|js.
function slotForm(s) {
  const v2 = f => fs.readFileSync(path.join(__dirname, 'v2', f), 'utf8').trim();
  s = must(s, '.rg .form.ok .fb{display:none}', v2('form-slots.css') + '\n.rg .form.ok .fb{display:none}');
  s = must(s, '<p>Our team will call you to fix a time that suits you.</p>', '<p>Fill your details and pick a demo time. You get the Google Meet link straight away.</p>');
  s = must(s, '      <button class="btn btn-p btn-full" type="submit">Book My Demo', [
    '      <div class="slt" id="rgSl" aria-live="polite"><input type="hidden" name="slot" value="">',
    '        <div class="slt-h">Pick your demo time <span>(IST, on Google Meet)</span></div>',
    '        <div class="slt-t"><div class="slt-sk"></div><div class="slt-sk"></div><div class="slt-sk"></div><div class="slt-sk"></div></div>',
    '      </div>',
    '      <button class="btn btn-p btn-full" type="submit">Book My Demo'].join('\n'));
  // the slot is required only when times loaded
  s = must(s, 'if(el.name==="hp")return;', 'if(el.name==="hp")return;if(el.name==="slot"&&!F._needSlot)return;');
  s = must(s, 'if(bad){M.textContent=bad.name==="phone"', 'if(bad){if(bad.name==="slot"){$("rgSl").classList.add("bad");$("rgSl").scrollIntoView({block:"center",behavior:"smooth"})}M.textContent=bad.name==="slot"?"Please pick a demo time.":bad.name==="phone"');
  s = must(s, 'M.textContent="Sending...";', 'M.textContent=D.slot?"Booking your demo...":"Sending...";');
  // booked: time and Meet link in the form. Not booked: thank-you page as before.
  s = must(s, 'F.classList.add("ok");location.href=', 'if(j.label){window.rgBooked(j);F.classList.add("ok");return}F.classList.add("ok");location.href=');
  s = must(s, '.catch(function(x){M.textContent=x.message||"Network error. Please try again."})',
    '.catch(function(x){M.textContent=x.message||"Network error. Please try again.";if(/taken/i.test(x.message||""))window.rgSlotsReload()})');
  return must(s, '</body>', '<script>\n' + v2('form-slots.js') + '\n</script>\n</body>');
}

fs.rmSync(out, { recursive: true, force: true });

const API = ['config', 'submit', 'wa', 'meet', 'lead_confirm', 'leads', 'lead_update', 'lead_log', 'lead_delete', 'lead_resend', 'demo_leads', 'public_config', 'slots', 'book'];
const SQL = [/\b(FROM|INTO|UPDATE|TABLE IF NOT EXISTS|TABLE|COLUMNS FROM) leads\b/g, '$1 v2_leads'];
for (const f of API) {
  let s = ['meet', 'slots', 'book'].includes(f) ? fs.readFileSync(path.join(__dirname, 'v2', f + '.php'), 'utf8') : read('api/' + f + '.php');
  if (PATCH[f]) s = PATCH[f](s);
  if (f === 'demo_leads') s = budget(s);
  s = s.replace(SQL[0], SQL[1]);
  s = s.replace(/\blead_activity\b/g, 'v2_lead_activity');   // own history table, like v2_leads
  if (f === 'config') {
    // main site's .env (one folder up) gives the keys; an optional version2/.env overrides it, e.g. a separate database
    s = s.replace("env_load(__DIR__ . '/../.env');", "env_load(__DIR__ . '/../../.env');\nenv_load(__DIR__ . '/../.env');");
    // version 2 never uses ad tags
    s = s.replace(/\$v = env\(\$k\);\s*return \$v !== '' \? \$v : \(\$defaults\[\$k\] \?\? ''\);/, "return '';   // version 2: no ad tags, no conversions");
  }
  write('api/' + f + '.php', s);
}

const page = f => read(f).replace('<meta name="viewport"', '<meta name="robots" content="noindex, nofollow">\n<meta name="viewport"');
write('index.html', slotForm(budget(page('index.html'))));
write('thank-you.html', read('thank-you.html'));
write('book.html', fs.readFileSync(path.join(__dirname, 'v2', 'book.html'), 'utf8'));

// leads page: version 2 has its own (demo slot first, fewer filters on show)
write('admin/leads.html', fs.readFileSync(path.join(__dirname, 'v2', 'leads.html'), 'utf8'));
for (const f of ['index.html']) write('admin/' + f, read('admin/' + f).replace(/\s*<a class="tab" href="pages.html">Pages<\/a>/, '').replace(/\s*<a class="tab" href="\.\.\/text\/">Notes<\/a>/, '').replace(/<title>([^<]*)<\/title>/, '<title>V2 $1</title>'));
for (const f of ['common.js', 'lead-panel.js', 'admin.css', '.htaccess']) write('admin/' + f, read('admin/' + f));
write('.env.example', `# Optional. Version 2 already uses the main site's .env (WhatsApp, Google Meet, agent, admin password).
# Put a line here only to override it, e.g. a separate database:  DB_NAME=...  DB_USER=...  DB_PASS=...
# Ad tags are always off in version 2.
#
# Slot booking (all optional, these are the defaults):
# WACRM_V2_TEMPLATE=      template with {{1}} name, {{2}} restaurant, {{3}} slot link; sent only when no time was picked in the form. Empty = normal confirmation, no link.
# SLOT_START_HOUR=11  SLOT_END_HOUR=19  SLOT_STEP_MIN=15  SLOT_MINUTES=30  SLOT_DAYS=8  SLOT_NOTICE_MIN=30
# BOOK_BASE_URL=          full URL of book.html if it is not /version2/book.html on the same host
`);
console.log('version2 built');
