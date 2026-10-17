// Builds the ad landing pages in lp/ from index.html (shared proof, form, tracking) plus each page's own
// hero, interactive sections, CSS and JS in tools/lp/pages/*.js.
// Run:  node tools/build-lps.js      then      node tools/check-lps.js
'use strict';
var fs = require('fs'), path = require('path');
var base = require('./lp/base.js');

var outDir = path.join(base.root, 'lp');
var imgDir = path.join(outDir, 'img');
[outDir, imgDir].forEach(function (d) { if (!fs.existsSync(d)) fs.mkdirSync(d); });

Object.keys(base.ART).forEach(function (k) { fs.writeFileSync(path.join(imgDir, k + '.svg'), base.ART[k]); });
console.log('wrote ' + Object.keys(base.ART).length + ' images to lp/img/');

var SLUGS = ['loyalty', 'own-website', 'whatsapp', 'profit-audit'];
var built = [];
SLUGS.forEach(function (s) {
  var file = path.join(__dirname, 'lp', 'pages', s + '.js');
  if (!fs.existsSync(file)) return;
  var page = require(file)(base.ctx);
  fs.writeFileSync(path.join(outDir, s + '.html'), base.assemble(page));
  built.push([s + '.html', page.name, 'lp/' + s + '.html']);
  console.log('wrote lp/' + s + '.html');
});

// Simple index of all test pages (not indexed by search engines)
var rows = [['../', 'Commission savings (main ad page)', 'index.html']].concat(built);
fs.writeFileSync(path.join(outDir, 'index.html'),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Landing pages</title>' +
  '<style>body{margin:0;font:16px/1.6 system-ui,sans-serif;background:#FBF6F1;color:#1A1A26;padding:24px}main{max-width:640px;margin:0 auto}h1{margin:0 0 4px}' +
  'a{display:flex;justify-content:space-between;gap:12px;padding:14px 16px;margin:10px 0;background:#fff;border:1px solid #ECE6DF;border-radius:12px;color:inherit;text-decoration:none}a:hover{border-color:#FC5301}small{color:#5E5E70}b{color:#FC5301}</style></head><body><main>' +
  '<h1>RestroGrow ad landing pages</h1><p><small>Use one link per ad set. Leads show the page they came from in Admin.</small></p>' +
  rows.map(function (r) { return '<a href="' + r[0] + '"><span><b>' + r[1] + '</b><br><small>' + r[2] + '</small></span><span>Open &rarr;</span></a>'; }).join('') +
  '</main></body></html>');
console.log('wrote lp/index.html');
