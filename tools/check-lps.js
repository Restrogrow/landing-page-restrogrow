// Quick sanity check for the generated landing pages: scripts parse, key elements exist, no leftover copy.
'use strict';
var fs = require('fs'), path = require('path');
var dir = path.join(__dirname, '..', 'lp');
var ids = ['rgPh', 'rgO', 'rgA', 'rgC', 'rgF', 'rgMd', 'rgQr', 'rgGal', 'rgShT', 'rgSt', 'rg-hero', 'rgYr'];
var bad = 0;
fs.readdirSync(dir).filter(function (f) { return f.slice(-5) === '.html' && f !== 'index.html'; }).forEach(function (f) {
  var s = fs.readFileSync(path.join(dir, f), 'utf8');
  var errs = [];
  var re = /<script>([\s\S]*?)<\/script>/g, m;
  while ((m = re.exec(s))) { try { new Function(m[1]); } catch (e) { errs.push('script: ' + e.message); } }
  ids.forEach(function (i) { if (s.indexOf('id="' + i + '"') < 0) errs.push('missing id ' + i); });
  if (s.indexOf('var API_BASE = "../";') < 0) errs.push('API_BASE not set');
  if (s.indexOf('Book My Demo') >= 0) errs.push('old CTA text left');
  if (s.indexOf('Calculate My Loss') >= 0) errs.push('old hero button left');
  var h1 = (s.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  console.log((errs.length ? 'FAIL ' : 'ok   ') + f + '  | ' + h1.replace(/<[^>]+>/g, '').slice(0, 70) + (errs.length ? '\n     ' + errs.join('\n     ') : ''));
  if (errs.length) bad++;
});
process.exit(bad ? 1 : 0);
