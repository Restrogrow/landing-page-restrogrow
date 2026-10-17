// Shared page assembly for the ad landing pages: takes the sections of the main page (index.html) that stay
// the same (logos, payout proof, client results, guarantee, FAQ shell, footer, demo popup, form + tracking script)
// and puts a page's own hero, interactive sections, CSS and JS around them.
'use strict';
var fs = require('fs'), path = require('path');
var ART = require('./art.js');

var root = path.join(__dirname, '..', '..');
var src = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

function cut(a, b) {
  var i = src.indexOf(a), j = b ? src.indexOf(b, i + a.length) : src.length;
  if (i < 0 || j < 0) throw new Error('Marker not found: ' + a + ' / ' + b);
  return src.slice(i, j);
}

var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var BASE_CSS = (src.match(/<style>\n@property[\s\S]*?<\/style>/) || [''])[0];
var FONTS = cut('<link rel="preconnect" href="https://fonts.googleapis.com">', '<style>\n@property');
var LOGOS = cut('<section class="logos cream"', '<!-- ================= 2. PROBLEM');
var PROOF = cut('<!-- ================= 4. BEFORE / AFTER ================= -->', '<!-- ================= 5. RESULTS');
var RESULTS = cut('<!-- ================= 5. RESULTS ================= -->', '<!-- ================= 6. HOW IT WORKS');
var CALC = cut('<section class="sec dark" id="rg-calc">', '<!-- ================= 4. BEFORE / AFTER');
var GUARANTEE = cut('<!-- ================= 8. GUARANTEE ================= -->', '<!-- ================= 9. WHO');
var FIT = cut('<!-- ================= 9. WHO IT\'S FOR ================= -->', '<!-- ================= 10. FAQ');
var IMPACT = src.slice(src.indexOf('<div class="w wimp">'), src.indexOf('</section>', src.indexOf('<div class="w wimp">')));
var TAIL = src.slice(src.indexOf('<footer class="lf">'));
var KIT_CSS = fs.readFileSync(path.join(__dirname, 'kit.css'), 'utf8');
var KIT_JS = fs.readFileSync(path.join(__dirname, 'kit.js'), 'utf8');

function img(name, alt, cls) {
  return '<img class="' + (cls || '') + '" src="img/' + name + '.svg" alt="' + (alt || '') + '" loading="lazy" decoding="async">';
}

// The original page script expects some elements to exist. Pages that don't show them get hidden stand-ins.
var STUBS = [
  ['rgPs', '<div id="rgPs"><div id="rgPt"></div></div><div id="rgPd"></div>'],
  ['rgPh', '<div id="rgPh"></div>'],
  ['rgO', '<input class="rng" type="range" id="rgO" min="20" max="2000" step="10" value="300"><input class="rng" type="range" id="rgA" min="100" max="1500" step="10" value="400"><input class="rng" type="range" id="rgC" min="10" max="50" step="1" value="25"><output id="rgOv"></output><output id="rgAv"></output><output id="rgCv"></output><span id="rgM"></span><span id="rgY"></span><span id="rgS"></span>'],
  ['rgCart', '<span id="rgCart"></span><button id="rgUp" type="button"></button><span id="rgUt"></span><svg id="rgQr"></svg>']
];

function calcSection(h) {
  var out = CALC;
  out = out.replace('<span class="kick">Find your number</span><h2 class="h2">Loss Calculator</h2><p>See exactly how much Zomato and Swiggy take from you every month. Takes 10 seconds.</p>',
    '<span class="kick">' + h.kick + '</span><h2 class="h2">' + h.h2 + '</h2><p>' + h.p + '</p>');
  if (h.save) out = out.replace('<p>Move just <b>30% of these orders</b> direct with RestroGrow and you keep</p>', h.save);
  return out;
}

function faqSection(items, h) {
  var d = items.map(function (q) { return '    <details><summary>' + q[0] + '<i>+</i></summary><p>' + q[1] + '</p></details>'; }).join('\n');
  return '<!-- ================= FAQ ================= -->\n<section class="sec" id="rg-faq" style="padding-top:clamp(40px,5vw,60px)"><div class="w">\n' +
    '  <div class="head rv"><span class="kick">FAQs</span><h2 class="h2">' + (h || 'Questions Owners Ask Us First') + '</h2></div>\n  <div class="faq rv">\n' + d + '\n  </div>\n</div></section>\n\n';
}

function assemble(p) {
  var ctx = { img: img, arrow: ARROW, calc: calcSection, faq: faqSection };
  var hero = '<!-- ================= HERO ================= -->\n<section class="hero" id="rg-hero"><div class="w">\n  <div class="copy">\n' +
    '    <p class="eyb rv">' + p.hero.eyb + '</p>\n' +
    '    <h1 class="rv" style="--dl:.06s">' + p.hero.h1 + '</h1>\n' +
    '    <p class="sub rv" style="--dl:.12s">' + p.hero.sub + '</p>\n' +
    '    <div class="cta rv" style="--dl:.18s">\n      <a class="btn btn-p" href="#rg-demo">Book My Demo ' + ARROW + '</a>\n' +
    '      <a class="btn btn-g" href="' + p.hero.cta2.href + '">' + p.hero.cta2.text + '</a>\n    </div>\n' +
    '    <p class="wait rv" style="--dl:.22s">' + p.hero.wait + '</p>\n' +
    '    <div class="proof rv" style="--dl:.26s"><div class="avs" id="rgAvs"></div><p><b>140+ restaurants</b><br>already taking direct orders with us</p></div>\n  </div>\n' +
    '  <div class="lp-hero-v rv" style="--dl:.15s">\n' + p.hero.visual + '\n  </div>\n</div>\n' + IMPACT + '</section>\n\n';

  var body = hero + LOGOS + (p.before || []).join('\n') + '\n' + PROOF + RESULTS + (p.after || []).join('\n') + '\n' + GUARANTEE + FIT + faqSection(p.faq, p.faqTitle);
  var page = body + TAIL;

  // hidden stand-ins for anything the original script looks up but this page doesn't show
  var stubs = STUBS.filter(function (s) { return page.indexOf('id="' + s[0] + '"') < 0; }).map(function (s) { return s[1]; }).join('');
  // (placed inside .rg, just before its closing tag, because the script looks elements up inside .rg)
  if (page.indexOf('</div>\n\n<script>\n(function(){') < 0) throw new Error('script marker not found');
  page = page.replace('</div>\n\n<script>\n(function(){', '<div hidden aria-hidden="true">' + stubs + '</div>\n</div>\n\n<script>\n(function(){');

  var custom = '<style>\n' + KIT_CSS + '\n' + (p.css || '') + '\n</style>';
  var scripts = '<script>\n' + KIT_JS + '\n</script>\n<script>\n(function(){\n  var LP=window.LP; if(!LP) return;\n  var R=LP.R,$=LP.$,inr=LP.inr,sh=LP.sh,num=LP.num,fill=LP.fill,seen=LP.seen,confetti=LP.confetti,pick=LP.pick,RM=LP.RM;\n' + (p.js || '') + '\n})();\n</script>';

  var html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + p.title + '</title>\n<meta name="description" content="' + p.desc + '">\n<meta name="robots" content="noindex, follow">\n<style>html,body{margin:0;padding:0}</style>\n</head>\n<body>\n' +
    FONTS + '\n' + BASE_CSS + '\n' + custom + '\n\n<div class="rg" id="rg-top">\n\n' + page;
  // add the page script after the main script, just before </body>
  html = html.replace(/<\/script>\s*<\/body>/, '</script>\n' + scripts + '\n</body>');
  html = html.split('Book My Demo').join(p.cta);
  html = html.split('going to app commission').join(p.stickyTail || 'going to app commission');
  html = html.replace('var API_BASE = "";', 'var API_BASE = "../";');
  return html;
}

module.exports = { assemble: assemble, ctx: { img: img, arrow: ARROW, calc: calcSection, faq: faqSection }, ART: ART, root: root };
