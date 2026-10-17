// Page assembly for the ad landing pages. Reuses from index.html only what is shared plumbing:
// fonts, base CSS (variables, buttons, form, popup, footer, lightbox), the footer / sticky bar / demo popup / lightbox markup
// and the form + tracking part of the page script. Every visible section comes from the page's own module.
'use strict';
var fs = require('fs'), path = require('path');
var shared = require('./shared.js');

var root = path.join(__dirname, '..', '..');
var src = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

function mid(a, b) {
  var i = src.indexOf(a), j = src.indexOf(b, i + a.length);
  if (i < 0 || j < 0) throw new Error('Marker not found: ' + a.slice(0, 50) + ' ... ' + b.slice(0, 50));
  return src.slice(i, j);
}

var FONTS = mid('<link rel="preconnect" href="https://fonts.googleapis.com">', '<style>\n@property');
var BASE_CSS = (src.match(/<style>\n@property[\s\S]*?<\/style>/) || [''])[0];
var TAIL = mid('<footer class="lf">', '<script>\n(function(){');           // footer, sticky bar, lightbox, demo popup + form, closing </div> of .rg
var SCRIPT = mid('<script>\n(function(){', '</script>\n</body>');
// header = API_BASE, helpers; tracking = form submit, popup, ad events, sticky bar (everything between is the main page's own sections)
var S_HEAD = SCRIPT.slice(0, SCRIPT.indexOf('var U='));
var S_TAIL = SCRIPT.slice(SCRIPT.indexOf('/* ad tracking'));
if (S_HEAD.length < 100 || S_TAIL.length < 500) throw new Error('Could not split the main page script');
// The main page tracks its three calculator sliders by id. These pages have their own calculators, so track any range slider instead.
var CALC_OLD = '["rgO","rgA","rgC"].forEach(function(id){$(id).addEventListener("input",function(){ev("CalculatorUsed","calculator_used")})});';
if (S_TAIL.indexOf(CALC_OLD) < 0) throw new Error('Calculator tracking line not found in index.html');
S_TAIL = S_TAIL.replace(CALC_OLD, 'R.querySelectorAll(\'input[type="range"]\').forEach(function(r){r.addEventListener("input",function(){ev("CalculatorUsed","calculator_used")})});');
var KIT_CSS = fs.readFileSync(path.join(__dirname, 'kit.css'), 'utf8');
var KIT_JS = fs.readFileSync(path.join(__dirname, 'kit.js'), 'utf8');

function assemble(p) {
  var tail = TAIL.replace(/<div class="sticky" id="rgSt">[\s\S]*?<\/div>\n/, '<div class="sticky" id="rgSt"><p><b>' + p.sticky[0] + '</b>' + p.sticky[1] + '</p><a class="btn btn-p" href="#rg-demo">' + p.cta + '</a></div>\n');
  tail = tail.split('Book My Demo').join(p.cta);
  var mainScript = S_HEAD.replace('var API_BASE = "";', 'var API_BASE = "../";') + S_TAIL + '</script>';
  var data = '<script>window.LPD=' + JSON.stringify(shared.DATA) + ';</script>';
  var custom = '<script>\n' + KIT_JS + '\n</script>\n<script>\n(function(){\n  var LP=window.LP; if(!LP) return;\n  var R=LP.R,$=LP.$,inr=LP.inr,sh=LP.sh,num=LP.num,fill=LP.fill,seen=LP.seen,confetti=LP.confetti,pick=LP.pick,RM=LP.RM;\n' + (p.js || '') + '\n})();\n</script>';
  var html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + p.title + '</title>\n<meta name="description" content="' + p.desc + '">\n<meta name="robots" content="noindex, follow">\n<style>html,body{margin:0;padding:0}</style>\n</head>\n<body>\n' +
    FONTS + '\n' + BASE_CSS + '\n<style>\n' + KIT_CSS + '\n' + (p.css || '') + '\n</style>\n\n<div class="rg" id="rg-top">\n\n' +
    p.body.join('\n\n') + '\n\n' + tail + mainScript + '\n' + data + '\n' + custom + '\n</body>\n</html>\n';
  return html;
}

module.exports = { assemble: assemble, shared: shared, root: root };
