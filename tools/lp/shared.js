// Real data and shared sections for the ad landing pages.
// The numbers below are copied from the real RestroGrow client dashboards and real delivery-app payout
// screenshots that already sit on the main page (names are blurred in the images).
'use strict';
var I = require('./icons.js').ic;

var BASE = 'https://chocolate-porcupine-790252.hostingersite.com/wp-content/uploads/2026/10/';

// 5 real client dashboards, last three months
var PROOFS = [
  { file: 'restaurent-proof-1.png', sales: 151238, orders: 398, items: 935, customers: 252, repeat: 146, ratio: 36.68 },
  { file: 'restaurent-proof-2.png', sales: 203475, orders: 529, items: 1271, customers: 318, repeat: 211, ratio: 39.89 },
  { file: 'restaurent-proof-3.png', sales: 224836, orders: 592, items: 1449, customers: 342, repeat: 250, ratio: 42.23 },
  { file: 'restaurent-proof-4.png', sales: 302280, orders: 782, items: 1922, customers: 488, repeat: 294, ratio: 37.60 },
  { file: 'restaurent-proof-5.png', sales: 348960, orders: 914, items: 2255, customers: 515, repeat: 399, ratio: 43.65 }
];

// 2 real delivery-app payout statements (A = net order value, C = order level deductions split into 3 fees and a discount credit)
var PAYOUTS = [
  { file: 'Minimalist-Payout-Breakdown-Summary1.png', A: 98640, B: 120, base: 21950, ld: 1850, pay: 1980, disc: 361.20, tax: 5921.40, growth: 8244.10, payout: 59175.70 },
  { file: 'Dark-Earnings-Breakdown-UI.png', A: 124980.50, B: 84.30, base: 27544.47, ld: 2800, pay: 2415.28, disc: 724.63, tax: 11248.25, growth: 18497.40, payout: 63284.03 }
];

var DATA = { base: BASE, proofs: PROOFS, payouts: PAYOUTS };

function topbar(o) {
  return '<header class="x-top"><div class="x-w"><a class="x-logo" href="#rg-hero">Restro<b>Grow</b></a>' +
    '<nav>' + (o.links || []).map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</nav>' +
    '<a class="btn btn-p" href="#rg-demo">' + o.cta + '</a></div></header>';
}

function logos(text) {
  return '<section class="x-logos"><p>' + (text || 'Trusted by 140+ restaurants, cafes and cloud kitchens') + '</p><div class="mq"><div class="mq-t" id="rgMq"></div></div></section>';
}

function trust() {
  return '<div class="x-trust"><div class="avs" id="rgAvs"></div><p><b>140+ restaurants</b><br>already taking direct orders with us</p></div>';
}

// o: {kick,h2,lead,focus: repeat|customers|orders|sales}
function clients(o) {
  return '<section class="x-sec x-cream x-dots" id="clx" data-focus="' + (o.focus || 'repeat') + '"><div class="x-w">' +
    '<div class="x-head rv"><span class="x-kick">' + o.kick + '</span><h2 class="x-h2">' + o.h2 + '</h2><p class="x-lead">' + o.lead + '</p></div>' +
    '<div class="cl-wrap">' +
    '<div class="rv"><div class="shot-f" data-zoom=""><img id="clxImg" alt="Real RestroGrow client dashboard, names blurred" src="' + BASE + PROOFS[1].file + '"><span class="shot-zoom">' + I('search') + 'View full size</span></div></div>' +
    '<div class="rv" style="--dl:.08s"><div class="cl-tabs" id="clxTabs"></div>' +
    '<div class="cl-stats">' +
    '<div class="cl-st"><small>Total sales</small><b id="clS">0</b></div><div class="cl-st"><small>Orders</small><b id="clO">0</b></div>' +
    '<div class="cl-st"><small>Customers saved</small><b id="clC">0</b></div><div class="cl-st"><small>Repeat orders</small><b id="clR">0</b></div>' +
    '<div class="cl-st hl" style="grid-column:1/-1"><small>Repeat ratio</small><b id="clP">0</b></div></div>' +
    '<div class="cl-say" id="clxSay"></div>' +
    '<div class="cl-bars" id="clxBars"></div></div></div>' +
    '<p class="x-note2" style="text-align:center;margin-top:28px">Real dashboards from restaurants running on RestroGrow, last three months, names blurred. The 25% app commission is a typical rate used for comparison.</p>' +
    '</div></section>';
}

// o: {kick,h2,lead}
function payouts(o) {
  return '<section class="x-sec" id="pod"><div class="x-w">' +
    '<div class="x-head rv"><span class="x-kick">' + o.kick + '</span><h2 class="x-h2">' + o.h2 + '</h2><p class="x-lead">' + o.lead + '</p></div>' +
    '<div class="po-wrap"><div class="po-img rv"><div class="shot-f" data-zoom=""><img id="podImg" alt="Real delivery app payout statement" src="' + BASE + PAYOUTS[0].file + '"><span class="shot-zoom">' + I('search') + 'View full size</span></div></div>' +
    '<div class="rv" style="--dl:.08s"><div style="display:flex;gap:10px;flex-wrap:wrap">' +
    '<div class="seg po-tabs" id="podTabs"><button class="on" data-v="0" type="button">Payout 1</button><button data-v="1" type="button">Payout 2</button></div>' +
    '<div class="seg po-tabs" id="podMode"><button class="on" data-v="app" type="button">Delivery app</button><button data-v="direct" type="button">Same sales, direct</button></div></div>' +
    '<div class="po-bar" id="podBar"></div><ul class="po-leg" id="podLeg"></ul>' +
    '<div class="po-keep"><div><small>What you keep</small><b id="podKeep">0</b></div><span id="podKeepP"></span></div>' +
    '<p class="po-more" id="podMore"></p></div></div>' +
    '<p class="x-note2" style="text-align:center;margin-top:26px">Real payout statements from delivery apps. "Direct" assumes about 2% payment gateway fee and no commission.</p>' +
    '</div></section>';
}

function guarantee(cta) {
  return '<section class="x-sec x-cream"><div class="x-w"><div class="gx rv">' +
    '<div class="gx-seal"><svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="92" stroke="#FC5301" stroke-width="3" stroke-dasharray="3 7"/><circle cx="100" cy="100" r="78" fill="#FFF1E8" stroke="#FC5301" stroke-width="2"/></svg><b><span>3X<small>in 90 days</small></span></b></div>' +
    '<div><span class="x-kick">Our guarantee</span><h2>Recover 3X What You Pay Us in 90 Days. Or Get Every Rupee Back.</h2>' +
    '<p>Within 90 days, the commission you save plus your direct order revenue will add up to at least 3X our service fee. If it does not, we refund 100% of what you paid.</p>' +
    '<ul class="gx-pts"><li>' + I('shield') + 'Written into your agreement</li><li>' + I('wallet') + '100% of your fee back</li><li>' + I('clock') + 'Measured over 90 days</li></ul>' +
    '<a class="btn btn-p" href="#rg-demo">' + cta + ' ' + I('arrow') + '</a></div></div></div></section>';
}

function faq(items, title) {
  return '<section class="x-sec" id="rg-faq"><div class="x-w"><div class="x-head c rv"><span class="x-kick">FAQs</span><h2 class="x-h2">' + (title || 'Questions Owners Ask Us First') + '</h2></div>' +
    '<div class="x-faq rv">' + items.map(function (q) { return '<details><summary>' + q[0] + I('plus') + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div></div></section>';
}

// o: {h2,p,checks[],cta}
function finalCta(o) {
  return '<section class="fin"><div class="x-w"><h2>' + o.h2 + '</h2><p>' + o.p + '</p>' +
    '<ul class="x-checks">' + o.checks.map(function (c) { return '<li>' + I('check') + c + '</li>'; }).join('') + '</ul>' +
    '<a class="btn btn-p" href="#rg-demo">' + o.cta + ' ' + I('arrow') + '</a><small>Our team will call you to fix a time that suits you.</small></div></section>';
}

module.exports = { DATA: DATA, topbar: topbar, logos: logos, trust: trust, clients: clients, payouts: payouts, guarantee: guarantee, faq: faq, finalCta: finalCta, BASE: BASE };
