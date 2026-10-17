// Builds the extra ad landing pages (lp/*.html) from the main page (index.html).
// Same design, scripts, proof images, calculator and demo popup; only the pitch changes per page.
// Run:  node tools/build-lps.js      (re-run after editing index.html or the copy below)
'use strict';
var fs = require('fs'), path = require('path');
var root = path.join(__dirname, '..');
var src = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/\r\n/g, '\n');

var ICON = {
  percent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  phoneoff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M4 4l16 16"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7l6 6 4-4 8 8M21 11v6h-6"/></svg>'
};

var V = [
  {
    slug: 'loyalty', name: 'Loyalty & repeat orders',
    title: 'Turn Zomato & Swiggy Customers Into Your Own Loyal Regulars | RestroGrow',
    cta: 'Start My Loyalty Program', calcBtn: 'See What My Regulars Cost Me', stickyTail: 'paid on your repeat orders',
    eyb: 'For <b>restaurants &amp; cafes</b> whose best customers order through Zomato and Swiggy',
    h1: 'Your Regulars Order Again and Again. <span class="o">You Don\'t Even Know Their Names.</span>',
    sub: 'RestroGrow turns your app customers into your own loyal customers with points, rewards and WhatsApp. Every repeat order comes straight to you, with zero commission.',
    wait: 'Every regular who orders through an app is a regular you pay to keep. <b>Make them yours.</b>',
    prob: { kick: 'The loyalty gap', h2: 'The Apps Own Your Customers. <span class="o">You Just Cook for Them.</span>', p: 'Here is what that quietly costs you:',
      pains: [
        ['percent', 'You pay commission on the same customer, every time.', 'The 20th order from your best regular costs you exactly what the 1st one did. Loyalty should lower your cost, not keep it fixed.'],
        ['phoneoff', 'No number. No relationship.', 'The app keeps the customer\'s details. You can\'t thank them, reward them or tell them about a new dish.'],
        ['loop', 'Your rival is one tap away.', 'Without a reason to return to you directly, a regular can switch to the restaurant next door in seconds.'],
        ['down', 'Nothing rewards your best customers.', 'The apps run their own offers. You get no points, no tiers and no gifts that carry your brand.']
      ],
      verdict: 'Loyalty is the cheapest growth there is. <span class="o">You just need a channel you own.</span>' },
    calc: { kick: 'Find your number', h2: 'What Are Your Regulars Costing You?', p: 'Every repeat order from a regular still pays full commission. See the monthly total in 10 seconds.' },
    how: { h2: 'From Anonymous App Orders to a Loyalty Program You Own, in 3 Steps',
      steps: [
        ['We build your rewards program', 'Your brand, your points, your tiers and rewards, wrapped into your own ordering website. We set up everything. You don\'t touch any tech.'],
        ['We move your regulars into it', 'Packaging inserts, table QR codes and a first order reward move your app customers onto your own program.'],
        ['They earn, they return, you keep the profit', 'Points pull them back, WhatsApp reminds them, and every repeat order pays you in full.']
      ],
      stay: 'You don\'t leave Zomato or Swiggy. <b>You make your best customers yours.</b>' },
    feat: { kick: 'The loyalty system', h2: 'Everything to Make Customers Come Back', p: 'Points, offers and reminders that turn a one time order into a habit.' },
    faq: [
      ['How does the loyalty program work?', 'Customers earn points on every direct order and redeem them for rewards you choose, like a free dessert. It runs on your own ordering website and WhatsApp.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. We move your regulars to your own program so their next orders come without commission.'],
      ['How do app customers find out about it?', 'Inserts in every app parcel, QR codes on tables and bills, and WhatsApp messages to the customers who join.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and the revenue from your direct orders. If it is less than 3X our service fee, we refund 100% of what you paid.'],
      ['Do I need any technical knowledge?', 'None. We set up the program, the rewards and the campaigns. You focus on your kitchen.']
    ]
  },
  {
    slug: 'own-website', name: 'Own ordering website',
    title: 'Your Own Online Ordering Website. 0% Commission | RestroGrow',
    cta: 'Get My Ordering Website', calcBtn: 'Calculate My Commission', stickyTail: 'going to app commission',
    eyb: 'For <b>restaurants, cafes &amp; cloud kitchens</b> tired of paying the apps on every order',
    h1: 'Get Your Own Ordering Website Like Zomato\'s. <span class="o">Keep 100% of Every Order.</span>',
    sub: 'A branded ordering website with your menu, your prices and online payments, set up for you by RestroGrow. Customers order in a few taps and not a rupee goes to commission.',
    wait: 'An outlet doing 300 orders a day loses <b>₹30,000 every single day</b> it sells only through the apps.',
    prob: { kick: 'Rented customers', h2: 'You Built the Menu. <span class="o">The Apps Own the Storefront.</span>', p: 'Selling only on delivery apps means renting your own business:',
      pains: [
        ['percent', 'A quarter of every bill disappears.', '25 to 30% commission plus GST on it, before food cost, rent or staff. That is your margin.'],
        ['phoneoff', 'Your customers aren\'t really yours.', 'No phone numbers, no data, no way to reach the people who love your food.'],
        ['down', 'Your sales depend on their ranking.', 'One algorithm change or a bad rating week and orders drop. You can\'t control it.'],
        ['loop', 'Their rules, their prices, their offers.', 'Discounts, visibility and menu layout follow the platform\'s terms, not your brand.']
      ],
      verdict: 'You don\'t need more orders. <span class="o">You need a storefront you own.</span>' },
    calc: { kick: 'Find your number', h2: 'How Much Do the Apps Take?', p: 'See exactly what Zomato and Swiggy keep from you every month. Takes 10 seconds.' },
    how: { h2: 'From Renting a Storefront to Owning One, in 3 Steps',
      steps: [
        ['We build your ordering website', 'Your brand, your menu, your real prices and online payments, live and ready to take orders. You don\'t touch any tech.'],
        ['We send your customers to it', 'Parcel inserts, table QR codes, WhatsApp offers and your Google profile point your existing customers to your own website.'],
        ['You get paid in full', 'Every direct order pays you the whole bill, and the customer\'s number lands in your own CRM.']
      ],
      stay: 'You don\'t leave Zomato or Swiggy. <b>You stop depending on them.</b>' },
    feat: { kick: 'The complete system', h2: 'More Than a Website. A Full Ordering System.', p: 'Ordering, payments, QR menu and the tools to make every order bigger.' },
    faq: [
      ['Is it like the Zomato or Swiggy ordering experience?', 'Yes. Customers browse your menu, add items and pay online in a few taps, on your own branded website.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers and move your regulars to direct ordering.'],
      ['Does RestroGrow take a commission on my orders?', 'No. There is no per order platform commission to RestroGrow. Every direct order is yours.'],
      ['How will customers find my website?', 'We put it where they already see you: inserts in app parcels, QR codes on tables, WhatsApp, your Google profile and social media.'],
      ['Who delivers direct orders?', 'We set up delivery to fit your outlet, with your own riders or a delivery partner. We walk you through the options in the demo.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  },
  {
    slug: 'whatsapp', name: 'WhatsApp marketing',
    title: 'Fill Slow Hours With WhatsApp Orders, Not App Discounts | RestroGrow',
    cta: 'Show Me the WhatsApp Plan', calcBtn: 'See What I\'m Losing', stickyTail: 'going to app commission',
    eyb: 'For <b>restaurants, cafes &amp; cloud kitchens</b> with slow days and quiet hours',
    h1: 'Fill Your Slow Hours With One WhatsApp Message. <span class="o">Not Another Discount on the App.</span>',
    sub: 'RestroGrow saves every direct customer\'s number in your own CRM and sends offers, festive deals and reminders on WhatsApp. Orders come straight to you with zero commission.',
    wait: 'A single WhatsApp offer reaches every past customer in minutes. <b>No ad spend. No commission.</b>',
    prob: { kick: 'The slow hour problem', h2: 'Empty Tables at 4 PM. <span class="o">And No Way to Reach Your Customers.</span>', p: 'This is what depending on the apps looks like on a quiet day:',
      pains: [
        ['phoneoff', 'You can\'t message the people who ordered from you.', 'The app keeps their numbers. A slow day means waiting, not calling anyone back.'],
        ['percent', 'Boosting orders on the app costs even more.', 'Promoted listings and discounts on top of 25 to 30% commission leave almost nothing on the bill.'],
        ['loop', 'Festivals and weekends pass without a plan.', 'No list means no Diwali offer, no new menu launch and no weekend special that you can send yourself.'],
        ['down', 'You depend on their ranking for every order.', 'When the algorithm shifts, your sales drop and you have no other lever to pull.']
      ],
      verdict: 'The fix isn\'t more discounts. <span class="o">It\'s a list you own and a message you can send.</span>' },
    calc: { kick: 'Find your number', h2: 'How Much Are the Apps Taking?', p: 'See what Zomato and Swiggy keep every month, money your own WhatsApp list can win back.' },
    how: { h2: 'From Silent Slow Days to a Full Kitchen, in 3 Steps',
      steps: [
        ['We set up your CRM and ordering page', 'Your own ordering website plus a CRM that saves every direct customer\'s number automatically.'],
        ['We grow your WhatsApp list', 'Parcel inserts, table QR codes and first order rewards turn your app customers into WhatsApp contacts you own.'],
        ['You send, they order, you keep it all', 'Offers, new menus and festive deals go out in minutes. Orders land on your website with zero commission.']
      ],
      stay: 'No new ad spend. <b>Just the customers you already have.</b>' },
    feat: { kick: 'WhatsApp growth system', h2: 'Everything to Bring Customers Back by WhatsApp', p: 'Offers, reminders, reviews and the ordering page they land on.' },
    faq: [
      ['Is WhatsApp marketing allowed?', 'Yes, when you message customers who have ordered from you or opted in. We set it up the proper way and help you keep messages relevant.'],
      ['How do I get my customers\' numbers?', 'Every direct order saves the number to your CRM. QR codes, parcel inserts and first order rewards bring app customers into it.'],
      ['Can I send offers for festivals and slow days?', 'Yes. Send festive deals, weekend specials and new menu updates whenever you want, to the whole list or a part of it.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. RestroGrow moves your regulars to direct orders.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  },
  {
    slug: 'profit-audit', name: 'Free profit audit',
    title: 'Free Profit Leak Audit for Zomato & Swiggy Restaurants | RestroGrow',
    cta: 'Get My Free Profit Audit', calcBtn: 'Check My Loss First', stickyTail: 'going to app commission',
    eyb: 'Free for <b>restaurants, cafes &amp; cloud kitchens</b> selling on Zomato and Swiggy',
    h1: 'Is Zomato Eating Your Profit? <span class="o">Get a Free Profit Leak Audit.</span>',
    sub: 'Share your last app payout and in a 30 minute call we show exactly where your money goes and how much you can win back with your own ordering system.',
    wait: 'Most owners only see the payout, not the leaks behind it. <b>We show you every rupee.</b>',
    prob: { kick: 'Where your profit goes', h2: 'You See the Payout. <span class="o">You Don\'t See the Leaks.</span>', p: 'The usual places profit slips away on delivery apps:',
      pains: [
        ['percent', 'Commission plus GST on the commission.', 'The headline rate is only the start. Tax on the commission pushes the real cost higher.'],
        ['down', 'Ads and "growth" charges.', 'Promoted listings and visibility fees quietly come out of the same payout.'],
        ['loop', 'Discounts you fund yourself.', 'Offers that bring volume can cost more than they earn once everything is deducted.'],
        ['phoneoff', 'Repeat customers you never keep.', 'Regulars cost commission every time, and you hold no way to bring them back directly.']
      ],
      verdict: 'You can\'t fix what you can\'t see. <span class="o">So we put every leak on one page.</span>' },
    calc: { kick: 'Start here', h2: 'Quick Profit Leak Check', p: 'Move the sliders to your numbers and see what the apps take each month. The audit makes it exact.' },
    how: { h2: 'Your Free Audit in 3 Steps',
      steps: [
        ['Share your last payout', 'A screenshot of one Zomato or Swiggy payout is enough. No access to your accounts is needed.'],
        ['We find the leaks', 'On a 30 minute call we break down commission, tax, ads and discounts and show what you actually keep from each order.'],
        ['You get a clear plan', 'We show how much a direct ordering system can win back for you, with the 3X in 90 days guarantee behind it.']
      ],
      stay: 'No pressure, no obligation. <b>You leave knowing your real numbers.</b>' },
    feat: { kick: 'What you can do about it', h2: 'The System That Plugs the Leaks', p: 'Your own ordering, customers and campaigns, so more of every rupee stays with you.' },
    faq: [
      ['Is the audit really free?', 'Yes. The audit call is free and there is no obligation to buy anything.'],
      ['What do I need to share?', 'One recent Zomato or Swiggy payout statement or screenshot. You don\'t have to share logins.'],
      ['How long does it take?', 'About 30 minutes on a call with our team.'],
      ['What happens after the audit?', 'If a direct ordering system makes sense for you, we show how it would work and what you could save. If it doesn\'t, you still keep the findings.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  }
];

function rep(html, find, to) {
  if (typeof find === 'string') { if (html.indexOf(find) < 0) throw new Error('Not found: ' + find.slice(0, 70)); return html.split(find).join(to); }
  if (!find.test(html)) throw new Error('Not found: ' + find);
  return html.replace(find, function () { return to; });
}
function between(html, a, b, to) {
  var i = html.indexOf(a), j = html.indexOf(b);
  if (i < 0 || j < 0 || j < i) throw new Error('Markers not found: ' + a.slice(0, 40));
  return html.slice(0, i) + to + html.slice(j);
}
function delay(i) { return i % 2 ? ' style="--dl:.06s"' : ''; }

function build(v) {
  var h = src;
  h = rep(h, '<title>RestroGrow Landing Page</title>', '<title>' + v.title + '</title>\n<meta name="robots" content="noindex, follow">');
  // hero
  h = rep(h, /<p class="eyb rv">[\s\S]*?<\/p>/, '<p class="eyb rv">' + v.eyb + '</p>');
  h = rep(h, /<h1 class="rv" style="--dl:\.06s">[\s\S]*?<\/h1>/, '<h1 class="rv" style="--dl:.06s">' + v.h1 + '</h1>');
  h = rep(h, /<p class="sub rv" style="--dl:\.12s">[\s\S]*?<\/p>/, '<p class="sub rv" style="--dl:.12s">' + v.sub + '</p>');
  h = rep(h, /<p class="wait rv" style="--dl:\.22s">[\s\S]*?<\/p>/, '<p class="wait rv" style="--dl:.22s">' + v.wait + '</p>');
  h = rep(h, 'Calculate My Loss</a>', v.calcBtn + '</a>');
  // problem
  var pains = v.prob.pains.map(function (p, i) {
    return '    <div class="pain rv"' + delay(i) + '><span>' + ICON[p[0]] + '</span><div><h3>' + p[1] + '</h3><p>' + p[2] + '</p></div></div>';
  }).join('\n');
  h = between(h, '<!-- ================= 2. PROBLEM ================= -->', '<!-- ================= 3. LOSS CALCULATOR',
    '<!-- ================= 2. PROBLEM ================= -->\n<section class="sec" id="rg-problem"><div class="w">\n' +
    '  <div class="head rv"><span class="kick">' + v.prob.kick + '</span><h2 class="h2">' + v.prob.h2 + '</h2><p>' + v.prob.p + '</p></div>\n' +
    '  <div class="phases" id="rgPh" style="display:none"></div>\n  <div class="pains">\n' + pains + '\n  </div>\n' +
    '  <p class="verdict rv">' + v.prob.verdict + '</p>\n</div></section>\n\n');
  // calculator heading
  h = rep(h, '<span class="kick">Find your number</span><h2 class="h2">Loss Calculator</h2><p>See exactly how much Zomato and Swiggy take from you every month. Takes 10 seconds.</p>',
    '<span class="kick">' + v.calc.kick + '</span><h2 class="h2">' + v.calc.h2 + '</h2><p>' + v.calc.p + '</p>');
  // how it works
  var steps = v.how.steps.map(function (s, i) {
    return '    <div class="step rv"' + (i ? ' style="--dl:.' + (i * 8 < 10 ? '0' : '') + (i * 8) + 's"' : '') + '><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>';
  }).join('\n');
  h = between(h, '<!-- ================= 6. HOW IT WORKS ================= -->', '<!-- ================= 7. FEATURES',
    '<!-- ================= 6. HOW IT WORKS ================= -->\n<section class="sec cream" id="rg-how"><div class="w">\n' +
    '  <div class="head rv"><span class="kick">How it works</span><h2 class="h2">' + v.how.h2 + '</h2></div>\n  <div class="steps">\n' + steps + '\n  </div>\n' +
    '  <p class="stay rv">' + v.how.stay + '</p>\n</div></section>\n\n');
  // features heading
  h = rep(h, '<span class="kick">The complete system</span><h2 class="h2">Everything You Need to Grow Direct Orders</h2><p>Not just an ordering page. A full system to bring customers back and make every order bigger.</p>',
    '<span class="kick">' + v.feat.kick + '</span><h2 class="h2">' + v.feat.h2 + '</h2><p>' + v.feat.p + '</p>');
  // faq
  var faq = v.faq.map(function (q) { return '    <details><summary>' + q[0] + '<i>+</i></summary><p>' + q[1] + '</p></details>'; }).join('\n');
  h = rep(h, /<div class="faq rv">[\s\S]*?\n  <\/div>\n<\/div><\/section>/, '<div class="faq rv">\n' + faq + '\n  </div>\n</div></section>');
  // call to action wording, sticky bar, API path (pages live in /lp)
  h = rep(h, 'Book My Demo', v.cta);
  h = rep(h, 'going to app commission', v.stickyTail);
  h = rep(h, 'var API_BASE = "";', 'var API_BASE = "../";');
  return h;
}

var outDir = path.join(root, 'lp');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
V.forEach(function (v) {
  fs.writeFileSync(path.join(outDir, v.slug + '.html'), build(v));
  console.log('wrote lp/' + v.slug + '.html');
});

// Simple index of all test pages (not indexed by search engines)
var rows = [['../', 'Commission savings (main ad page)', 'index.html']].concat(V.map(function (v) { return [v.slug + '.html', v.name, 'lp/' + v.slug + '.html']; }));
fs.writeFileSync(path.join(outDir, 'index.html'),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Landing pages</title>' +
  '<style>body{margin:0;font:16px/1.6 system-ui,sans-serif;background:#FBF6F1;color:#1A1A26;padding:24px}main{max-width:640px;margin:0 auto}h1{margin:0 0 4px}' +
  'a{display:flex;justify-content:space-between;gap:12px;padding:14px 16px;margin:10px 0;background:#fff;border:1px solid #ECE6DF;border-radius:12px;color:inherit;text-decoration:none}a:hover{border-color:#FC5301}small{color:#5E5E70}b{color:#FC5301}</style></head><body><main>' +
  '<h1>RestroGrow ad landing pages</h1><p><small>Use one link per ad set. Leads show the page they came from in Admin.</small></p>' +
  rows.map(function (r) { return '<a href="' + r[0] + '"><span><b>' + r[1] + '</b><br><small>' + r[2] + '</small></span><span>Open &rarr;</span></a>'; }).join('') +
  '</main></body></html>');
console.log('wrote lp/index.html');
