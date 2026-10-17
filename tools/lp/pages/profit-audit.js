// Landing page: FREE PROFIT LEAK AUDIT.  Pitch: "you see the payout, not the leaks. Get every rupee explained, free".
'use strict';
var I = require('../icons.js').ic;

module.exports = function (S) {
  var B = S.BASE, PO = S.DATA.payouts;
  var pct = function (p) { return (100 - p.payout / p.A * 100); };

  var hero = `
<section class="x-hero" id="rg-hero"><div class="x-w">
  <div>
    <span class="x-eyb rv">${I('receipt')}Free for restaurants, cafes and cloud kitchens selling on Zomato and Swiggy</span>
    <h1 class="rv" style="--dl:.06s">Is Zomato Eating Your Profit? <span class="o">Get a Free Profit Leak Audit.</span></h1>
    <p class="x-sub rv" style="--dl:.12s">Share one app payout and in a 30 minute call we show exactly where your money goes and how much a direct ordering system can win back for you.</p>
    <div class="x-cta rv" style="--dl:.18s"><a class="btn btn-p" href="#rg-demo">Get My Free Profit Audit ${I('arrow')}</a><a class="x-btn2" href="#rg-score">${I('target')}Check my leak score</a></div>
    <ul class="x-checks rv" style="--dl:.22s"><li>${I('check')}Every line of your payout explained in plain language</li><li>${I('check')}No logins needed, one screenshot is enough</li><li>${I('check')}No pressure, no obligation</li></ul>
    ${S.trust()}
  </div>
  <div class="x-hv pa-hv rv" style="--dl:.12s">
    <div class="pa-top"><div class="seg" id="paPick"><button class="on" data-v="0" type="button">Payout 1</button><button data-v="1" type="button">Payout 2</button></div><button class="pa-full" type="button" id="paFull">${I('search')}Full size</button></div>
    <div class="pa-row">
      <div class="pa-shot"><div class="shot-f wide" style="cursor:default"><img id="paImg" alt="Real delivery app payout statement" src="${B + PO[0].file}"><div id="paPins"></div></div></div>
      <div class="pa-tip" id="paTip"></div>
    </div>
    <p class="pa-fn">Real payout statements. Tap a numbered dot to see what each line means.</p>
  </div>
</div></section>`;

  var stats = `
<section class="pa-stats"><div class="x-w"><div class="x-four">
  <div class="pa-stat rv"><b data-count="${pct(PO[0]).toFixed(1)}" data-dec="1" data-suffix="%">0</b><span>of sales never reached the restaurant in real payout 1</span></div>
  <div class="pa-stat rv" style="--dl:.06s"><b data-count="${pct(PO[1]).toFixed(1)}" data-dec="1" data-suffix="%">0</b><span>never reached it in real payout 2</span></div>
  <div class="pa-stat rv" style="--dl:.12s"><b>5 lines</b><span>where the money goes: fees, tax, ads and more</span></div>
  <div class="pa-stat rv" style="--dl:.18s"><b>0%</b><span>commission on orders from your own ordering system</span></div>
</div></div></section>`;

  var compare = `
<section class="x-sec" id="rg-cmp"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">Two real payouts, side by side</span><h2 class="x-h2">The Same Leaks. <span class="o">Different Restaurants.</span></h2><p class="x-lead">How much of every ₹100 in sales each deduction took. Hover or tap a bar to see the rupee amount.</p></div>
  <div class="x-card pa-cmp rv" id="paCmp">
    <div class="pa-cmp-l"><span><i style="background:#FC5301"></i>Payout 1</span><span><i style="background:#1F2937"></i>Payout 2</span></div>
    <div class="pa-cmp-g" id="paCmpG"></div>
    <div class="pa-cmp-k" id="paCmpK"></div>
  </div>
</div></section>`;

  var calc = `
<section class="x-sec x-dark x-dots" id="rg-calc"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Calculator 1</span><h2 class="x-h2">How Much Of Your Sales <span class="o">Do You Really Keep?</span></h2><p class="x-lead">Enter the net order value and the payout from your last statement. We show what you kept and what moving orders direct could add.</p></div>
  <div class="x-two">
    <div class="x-dcard rv">
      <div class="x-fld"><div class="x-lbl"><label for="pcA">Net order value on the app (month)</label><output id="pcAv">₹1,00,000</output></div><input class="rng" type="range" id="pcA" min="20000" max="2000000" step="5000" value="100000"></div>
      <div class="x-fld"><div class="x-lbl"><label for="pcK">Payout you actually received</label><output id="pcKv">60%</output></div><input class="rng" type="range" id="pcK" min="30" max="90" step="1" value="60"><small>The slider is the payout as a percentage of net order value. Real payouts above kept 60% and 51%.</small></div>
      <div class="x-fld"><div class="x-lbl"><label for="pcM">Share of orders you could move direct</label><output id="pcMv">30%</output></div><input class="rng" type="range" id="pcM" min="5" max="100" step="5" value="30"></div>
    </div>
    <div class="x-out rv" style="--dl:.08s" aria-live="polite">
      <div><p class="l">Gone before it reached you, every month</p><p class="big" id="pcLeak">₹0</p></div>
      <div class="row"><span>You received</span><b id="pcGot">₹0</b></div>
      <div class="row"><span>Leak per year</span><b id="pcYear">₹0</b></div>
      <div class="win"><p>Moving that share direct keeps you an extra</p><strong><span id="pcWin">₹0</span> / year</strong><small>Direct orders assume about 2% payment gateway fee and no commission. An estimate, not a promise.</small></div>
      <a class="btn btn-p btn-full" href="#rg-demo">Get My Free Profit Audit ${I('arrow')}</a>
    </div>
  </div>
</div></section>`;

  var leaks = `
<section class="x-sec x-cream x-dots" id="rg-leaks"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Where your profit goes</span><h2 class="x-h2">You See the Payout. <span class="o">You Don't See the Leaks.</span></h2><p class="x-lead">Five places profit quietly slips away on delivery apps. Tap each one to see how it works.</p></div>
  <div class="pa-acc rv" id="paAcc"></div>
</div></section>`;

  var score = `
<section class="x-sec x-dark x-dots" id="rg-score"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Calculator 2</span><h2 class="x-h2">What's Your <span class="o">Profit Leak Score?</span></h2><p class="x-lead">Tick what applies to your restaurant. It takes 20 seconds and tells you how urgent an audit is.</p></div>
  <div class="x-two pa-score">
    <div class="x-dcard rv">
      <div class="pa-checks" id="paChecks"></div>
      <div class="x-fld" style="margin-top:24px"><div class="x-lbl"><label for="paShare">Share of your sales that come from apps</label><output id="paShv">50%</output></div><input class="rng" type="range" id="paShare" min="10" max="100" step="5" value="50"></div>
    </div>
    <div class="x-card pa-gauge rv" style="--dl:.08s">
      <svg viewBox="0 0 200 118" aria-hidden="true"><path d="M14 104A86 86 0 0 1 186 104" stroke="#EFE8E0" stroke-width="18" stroke-linecap="round" fill="none"/><path id="paArc" d="M14 104A86 86 0 0 1 186 104" stroke="#FC5301" stroke-width="18" stroke-linecap="round" fill="none" stroke-dasharray="270" stroke-dashoffset="270" style="transition:stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1),stroke .4s"/></svg>
      <div class="pa-num"><b id="paScore">0</b><small>out of 100</small></div>
      <h3 id="paLevel">Low leakage</h3>
      <p id="paMsg"></p>
      <a class="btn btn-p btn-full" href="#rg-demo">Get My Free Profit Audit ${I('arrow')}</a>
    </div>
  </div>
</div></section>`;

  var get = `
<section class="x-sec" id="rg-get"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">What you get</span><h2 class="x-h2">A Clear Page of Findings. <span class="o">Not a Sales Pitch.</span></h2><p class="x-lead">Here is the kind of finding the audit gives you, using the numbers from real payout 1.</p></div>
  <div class="x-three pa-find">
    <div class="x-card rv"><div class="x-ico">${I('percent')}</div><h3>Commission is 22.3% of sales</h3><p class="m">₹21,950 of ₹98,640 went to the base service fee alone. Moving regulars to direct orders removes it on every order they place.</p></div>
    <div class="x-card rv" style="--dl:.06s"><div class="x-ico">${I('zap')}</div><h3>Growth charges took 8.4%</h3><p class="m">₹8,244 was charged for investments in growth. We check whether those ads and visibility fees paid for themselves.</p></div>
    <div class="x-card rv" style="--dl:.12s"><div class="x-ico">${I('receipt')}</div><h3>Tax and fees add up to 10%</h3><p class="m">Tax deductions, long distance and payment fees together cost ₹9,751. We show which ones repeat every month.</p></div>
  </div>
  <div class="x-three pa-find" style="margin-top:18px">
    <div class="x-card rv"><div class="x-ico">${I('file')}</div><h3>Line-by-line leak report</h3><p class="m">Every deduction explained, with the rupee amount and the share of sales.</p></div>
    <div class="x-card rv" style="--dl:.06s"><div class="x-ico">${I('store')}</div><h3>Direct vs app comparison</h3><p class="m">The same sales through your own ordering system, side by side.</p></div>
    <div class="x-card rv" style="--dl:.12s"><div class="x-ico">${I('target')}</div><h3>A simple 90 day plan</h3><p class="m">What to move first, how to bring customers over, and the 3X guarantee behind it.</p></div>
  </div>
</div></section>`;

  var how = `
<section class="x-sec x-cream" id="rg-how"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">How it works</span><h2 class="x-h2">Your Free Audit <span class="o">in 3 Steps</span></h2><p class="x-lead">No logins. No pressure. No obligation.</p></div>
  <div class="x-three">
    <div class="x-card x-step rv"><span class="n">1</span><div class="x-ico">${I('upload')}</div><h3>Share one payout</h3><p class="m">A screenshot of a recent Zomato or Swiggy payout is enough. You don't need to share any logins.</p></div>
    <div class="x-card x-step rv" style="--dl:.08s"><span class="n">2</span><div class="x-ico">${I('search')}</div><h3>We find the leaks</h3><p class="m">On a 30 minute call we break down commission, tax, ads and discounts and show what you actually keep per order.</p></div>
    <div class="x-card x-step rv" style="--dl:.16s"><span class="n">3</span><div class="x-ico">${I('award')}</div><h3>You get a clear plan</h3><p class="m">We show how much a direct ordering system can win back for you, with the 3X in 90 days guarantee behind it.</p></div>
  </div>
</div></section>`;

  var body = [
    S.topbar({ cta: 'Get My Free Profit Audit', links: [['Real payouts', '#rg-cmp'], ['Calculators', '#rg-calc'], ['What you get', '#rg-get'], ['FAQ', '#rg-faq']] }),
    hero, stats, S.logos('Trusted by 140+ restaurants, cafes and cloud kitchens'), compare, calc, leaks, score, get,
    S.clients({ kick: 'After the audit', h2: 'What Restaurants Do With <span class="o">the Money They Win Back</span>', lead: 'Real dashboards from restaurants that now take direct orders on their own RestroGrow system. Tap a client to see its sales, orders and what the apps would have charged.', focus: 'sales' }),
    how, S.guarantee('Get My Free Profit Audit'),
    S.faq([
      ['Is the audit really free?', 'Yes. The audit call is free and there is no obligation to buy anything.'],
      ['What do I need to share?', 'One recent Zomato or Swiggy payout statement or screenshot. You don\'t have to share any logins.'],
      ['How long does it take?', 'About 30 minutes on a call with our team.'],
      ['What happens after the audit?', 'If a direct ordering system makes sense for you, we show how it would work and what you could save. If it doesn\'t, you still keep the findings.'],
      ['Are the payouts on this page real?', 'Yes. They are real payout statements from delivery apps, with restaurant details removed. The calculators use illustrative assumptions that you can change.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]),
    S.finalCta({ h2: 'Find Out Where Your Profit Is Going.', p: 'Share one payout and get every rupee explained in a free 30 minute call.', checks: ['Free, no obligation', 'No logins needed', '3X in 90 days or 100% back'], cta: 'Get My Free Profit Audit' })
  ];

  var css = `
.rg .pa-hv{min-height:0}
.rg .pa-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;position:relative;z-index:2}
.rg .pa-top .seg{background:rgba(255,255,255,.08)}
.rg .pa-top .seg button{color:var(--dmu)}.rg .pa-top .seg button.on{background:var(--o);color:#fff;box-shadow:none}
.rg .pa-full{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;padding:8px 14px;border-radius:99px;font:600 .78rem var(--fh);cursor:pointer}
.rg .pa-full:hover{border-color:#fff}
.rg .pa-full .ic{width:14px;height:14px}
.rg .pa-row{display:grid;grid-template-columns:minmax(0,260px) 1fr;gap:16px;align-items:start;position:relative;z-index:2}
.rg .pa-shot .shot-f{position:relative}
.rg .pa-tip{padding:18px;border-radius:20px;background:#fff;color:var(--tx);box-shadow:0 30px 60px -30px rgba(0,0,0,.7);position:sticky;top:90px}
.rg .pa-tip .t{display:flex;align-items:center;gap:10px}
.rg .pa-tip .t i{width:26px;height:26px;border-radius:50%;background:var(--o);color:#fff;display:grid;place-items:center;font:800 .76rem var(--fh);font-style:normal;flex:none}
.rg .pa-tip h4{font:700 1rem/1.25 var(--fh)}
.rg .pa-tip .v{display:block;font:800 1.9rem/1.1 var(--fh);color:#C2410C;margin:12px 0 2px;font-variant-numeric:tabular-nums}
.rg .pa-tip .v.g{color:#15803D}
.rg .pa-tip small{color:var(--mu);font-size:.78rem}
.rg .pa-tip p{margin-top:10px;font-size:.88rem;color:var(--mu)}
.rg .pa-fn{margin-top:14px;font-size:.78rem;color:var(--dmu);position:relative;z-index:2}
.rg .pa-stats{background:#fff;border-bottom:1px solid var(--ln);padding:34px 0}
.rg .pa-stat b{display:block;font:800 clamp(1.7rem,3vw,2.3rem)/1.1 var(--fh);letter-spacing:-.02em;color:var(--o);font-variant-numeric:tabular-nums}
.rg .pa-stat span{display:block;font-size:.88rem;color:var(--mu);margin-top:4px}
.rg .pa-cmp{max-width:980px;margin:0 auto}
.rg .pa-cmp-l{display:flex;gap:22px;margin-bottom:22px;font-size:.88rem;font-weight:600}
.rg .pa-cmp-l i{display:inline-block;width:12px;height:12px;border-radius:4px;margin-right:8px}
.rg .pa-cmp-g{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(8px,2vw,22px);align-items:end;height:260px;border-bottom:1px solid var(--ln)}
.rg .pa-g{display:flex;flex-direction:column;justify-content:flex-end;height:100%;align-items:center}
.rg .pa-g .bs{display:flex;gap:6px;align-items:flex-end;width:100%;flex:1;justify-content:center}
.rg .pa-g .bs i{display:block;width:34%;max-width:46px;border-radius:7px 7px 0 0;position:relative;transition:height .8s var(--ease);cursor:pointer}
.rg .pa-g .bs i.a{background:#FC5301}.rg .pa-g .bs i.b{background:#1F2937}
.rg .pa-g .bs i em{position:absolute;left:50%;top:-22px;transform:translateX(-50%);font:700 .72rem var(--fh);font-style:normal;white-space:nowrap;color:var(--tx)}
.rg .pa-g .bs i.keep{background:#16A34A}
.rg .pa-g .bs i.keep.b{background:#0F5132}
.rg .pa-cmp-k{display:grid;grid-template-columns:repeat(6,1fr);gap:clamp(8px,2vw,22px);margin-top:10px;font-size:.76rem;color:var(--mu);text-align:center}
.rg .pa-cmp-k span{line-height:1.3}
.rg .pa-acc{max-width:860px;margin:0 auto;display:grid;gap:12px}
.rg .pa-acc details{border:1px solid var(--ln);border-radius:18px;background:#fff;overflow:hidden;transition:border-color .3s,box-shadow .3s}
.rg .pa-acc details[open]{border-color:#F6C7AE;box-shadow:0 18px 36px -26px rgba(252,83,1,.5)}
.rg .pa-acc summary{display:grid;grid-template-columns:44px 1fr auto auto;gap:14px;align-items:center;padding:18px 22px;cursor:pointer;list-style:none}
.rg .pa-acc summary::-webkit-details-marker{display:none}
.rg .pa-acc summary .ico{width:44px;height:44px;border-radius:12px;background:var(--ot);display:grid;place-items:center;color:var(--o)}
.rg .pa-acc summary h3{font:700 1.05rem/1.3 var(--fh)}
.rg .pa-acc summary .tag{font:700 .78rem var(--fh);color:#C2410C;background:#FDE8E1;padding:5px 11px;border-radius:99px;white-space:nowrap}
.rg .pa-acc summary .pl{transition:transform .3s;color:var(--mu)}
.rg .pa-acc details[open] summary .pl{transform:rotate(45deg)}
.rg .pa-acc details p{padding:0 22px 20px 80px;color:var(--mu);font-size:.96rem}
.rg .pa-checks{display:grid;gap:10px}
.rg .pa-checks button{display:flex;align-items:center;gap:12px;text-align:left;padding:14px 16px;border-radius:14px;border:1.5px solid rgba(255,255,255,.14);background:transparent;color:#E8E8F0;font:500 .95rem var(--fb);cursor:pointer;transition:border-color .2s,background .2s}
.rg .pa-checks button i{width:22px;height:22px;border-radius:7px;border:2px solid rgba(255,255,255,.3);flex:none;display:grid;place-items:center;color:transparent;transition:background .2s,border-color .2s,color .2s}
.rg .pa-checks button i .ic{width:13px;height:13px}
.rg .pa-checks button.on{border-color:var(--o);background:rgba(252,83,1,.1)}
.rg .pa-checks button.on i{background:var(--o);border-color:var(--o);color:#fff}
.rg .pa-gauge{text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.rg .pa-gauge svg{width:min(100%,320px)}
.rg .pa-num{margin-top:-74px;display:flex;flex-direction:column;align-items:center;margin-bottom:10px}
.rg .pa-num b{font:800 3.2rem/1 var(--fh);font-variant-numeric:tabular-nums}
.rg .pa-num small{color:var(--mu);font-size:.78rem}
.rg .pa-gauge h3{font:800 1.4rem var(--fh);transition:color .4s}
.rg .pa-gauge p{color:var(--mu);font-size:.95rem;max-width:34ch;margin-bottom:10px;min-height:3.4em}
@media (max-width:980px){.rg .pa-row{grid-template-columns:minmax(0,230px) 1fr}}
@media (max-width:640px){.rg .pa-row{grid-template-columns:1fr}.rg .pa-shot{max-width:280px;margin:0 auto}.rg .pa-tip{position:static}
 .rg .pa-acc summary{grid-template-columns:40px 1fr auto;padding:16px}.rg .pa-acc summary .tag{display:none}.rg .pa-acc details p{padding:0 16px 18px 16px}
 .rg .pa-cmp-g{height:200px}.rg .pa-g .bs i em{display:none}}`;

  var js = `
  var P=LP.D.payouts,PB=LP.D.base,cur=0;
  var pc=function(v,a){return (v/a*100).toFixed(1)+'%'},fm=function(n){return '₹'+n.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})};
  /* ---- hero: tap the numbered dots ---- */
  var PINS=[
    {k:'A',y:[4.6,4.2],t:'Net order value',v:function(p){return p.A},tx:function(p){return 'What customers paid for your food. This is the number most owners look at, and it hides everything below.'}},
    {k:'base',y:[29.5,28.7],t:'Base service fee',v:function(p){return -p.base},tx:function(p){return "The platform's commission, "+pc(p.base,p.A)+" of your sales. It is the biggest single cut on every order."}},
    {k:'pay',y:[44.6,44.5],t:'Payment mechanism fee',v:function(p){return -p.pay},tx:function(p){return 'A fee for processing online payments, charged on top of the commission.'}},
    {k:'tax',y:[62.2,62.2],t:'Tax deductions',v:function(p){return -p.tax},tx:function(p){return 'Tax collected on your behalf, including GST on the platform\\'s own fees. It is '+pc(p.tax,p.A)+' of sales.'}},
    {k:'growth',y:[71.3,71.8],t:'Investments in growth',v:function(p){return -p.growth},tx:function(p){return 'Ads and visibility charges taken from the same payout, '+pc(p.growth,p.A)+' of sales. Worth checking whether they paid for themselves.'}},
    {k:'payout',y:[93.3,94],t:'Est. payout',v:function(p){return p.payout},tx:function(p){return 'What actually reaches your bank account: '+pc(p.payout,p.A)+' of your sales. The rest never reached you.'},g:1}
  ];
  var pins=$('paPins'),tip=$('paTip'),sel=0;
  function drawPins(){
    pins.innerHTML=PINS.map(function(p,i){return '<span class="x-pin'+(i===sel?' on':'')+'" data-i="'+i+'" style="left:72%;top:'+p.y[cur]+'%">'+(i+1)+'</span>'}).join('');
    showTip();
  }
  function showTip(){
    var p=PINS[sel],d=P[cur],v=p.v(d);
    tip.innerHTML='<div class="t"><i>'+(sel+1)+'</i><h4>'+p.t+'</h4></div><span class="v'+(p.g?' g':'')+'">'+(v<0?'−':'')+fm(Math.abs(v))+'</span><small>'+(p.k==='A'?'of your sales':pc(Math.abs(v),d.A)+' of sales')+'</small><p>'+p.tx(d)+'</p>';
    Array.prototype.forEach.call(pins.children,function(el,i){el.classList.toggle('on',i===sel)});
  }
  pins.addEventListener('click',function(e){var b=e.target.closest('.x-pin');if(b){sel=+b.getAttribute('data-i');showTip()}});
  pick($('paPick'),function(v){cur=+v;$('paImg').src=PB+P[cur].file;drawPins()});
  $('paFull').addEventListener('click',function(){LP.zoom(PB+P[cur].file)});
  drawPins();

  /* ---- side by side comparison ---- */
  var CAT=[['Base fee','base'],['Long distance','ld'],['Payment fee','pay'],['Tax','tax'],['Growth','growth'],['You kept','payout']],g=$('paCmpG');
  var mxv=Math.max.apply(null,CAT.map(function(c){return Math.max(P[0][c[1]]/P[0].A,P[1][c[1]]/P[1].A)}))*100;
  g.innerHTML=CAT.map(function(c){var a=P[0][c[1]]/P[0].A*100,b=P[1][c[1]]/P[1].A*100,k=c[1]==='payout',sc=k?100:mxv;
    return '<div class="pa-g"><div class="bs"><i class="a'+(k?' keep':'')+'" style="height:'+a/sc*100+'%" title="'+fm(P[0][c[1]])+'"><em>'+a.toFixed(1)+'%</em></i><i class="b'+(k?' keep':'')+'" style="height:'+b/sc*100+'%" title="'+fm(P[1][c[1]])+'"><em>'+b.toFixed(1)+'%</em></i></div></div>'}).join('');
  $('paCmpK').innerHTML=CAT.map(function(c){return '<span>'+c[0]+'</span>'}).join('');

  /* ---- calculator 1 ---- */
  var pcs=['pcA','pcK','pcM'];
  function pcalc(){
    pcs.forEach(function(i){fill($(i))});
    var A=+$('pcA').value,K=+$('pcK').value/100,M=+$('pcM').value/100;
    $('pcAv').textContent=inr(A).replace(/(\\d)(?=(\\d\\d)+\\d$)/g,'$1,');$('pcKv').textContent=Math.round(K*100)+'%';$('pcMv').textContent=Math.round(M*100)+'%';
    var got=A*K,leak=A-got,win=Math.max(0,(0.98-K)*A*M*12);
    num($('pcLeak'),leak,inr);num($('pcGot'),got,inr);num($('pcYear'),leak*12,sh);num($('pcWin'),win,sh);
  }
  pcs.forEach(function(i){$(i).addEventListener('input',pcalc)});pcalc();

  /* ---- accordion ---- */
  var LI={pct:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="17" r="2.3"/>',rup:'<path d="M6 4h12M6 9h12M6 4c5 0 8 2 8 5s-3 5-8 5l8 7"/>',zap:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',tag:'<path d="M3 12l9-9h8v8l-9 9z"/><circle cx="16" cy="8" r="1.4"/>',rcpt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>'};
  var AC=[['pct','Commission','25 to 30%','The headline rate is the biggest single cut on every order. It is charged on the full order value, on every order, even from your 20th-time regular.'],
          ['rup','GST on the commission','About 4.5%','18% GST is charged on the commission itself, so the real cost of the platform is higher than the number in your contract.'],
          ['zap','Ads and visibility','3 to 10%','Promoted listings and "growth" charges are deducted from the same payout. Many owners never check whether those ads paid for themselves.'],
          ['tag','Discounts you fund','5 to 12%','Offers that bring volume can cost more than they earn once everything else is deducted. The app shows the sale, you carry the cost.'],
          ['rcpt','Refunds, cancellations and packaging','1 to 3%','Order issues, cancellations charged to you and packaging costs add up quietly and rarely show as one clear line.']];
  var PL='<svg class="ic pl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';
  var acc=$('paAcc');
  acc.innerHTML=AC.map(function(a,i){return '<details'+(i?'':' open')+'><summary><span class="ico"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+LI[a[0]]+'</svg></span><h3>'+a[1]+'</h3><span class="tag">'+a[2]+'</span>'+PL+'</summary><p>'+a[3]+'</p></details>'}).join('');
  acc.addEventListener('toggle',function(e){if(e.target.open)Array.prototype.forEach.call(acc.children,function(d){if(d!==e.target)d.open=false})},true);

  /* ---- leak score ---- */
  var CK=[['I run ads or promoted listings on the apps',15],['I fund discounts and offers on the apps',15],['The apps charge me 25% or more in total',15],["I don't have my customers' phone numbers",15],['Cancellations and refunds get deducted from my payout',10],['I never check my payout line by line',10]];
  var CKI='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var chk=$('paChecks');
  chk.innerHTML=CK.map(function(k){return '<button type="button"><i>'+CKI+'</i>'+k[0]+'</button>'}).join('');
  var sh_=$('paShare');
  function score(){
    fill(sh_);$('paShv').textContent=sh_.value+'%';
    var sc=+sh_.value/100*20;Array.prototype.forEach.call(chk.children,function(b,i){if(b.classList.contains('on'))sc+=CK[i][1]});
    sc=Math.round(Math.min(100,sc));
    num($('paScore'),sc,function(v){return Math.round(v)},600);
    $('paArc').style.strokeDashoffset=270-270*sc/100;
    var lv=sc<35?['Low leakage','#16A34A','You are in decent shape. An audit can still show quick wins and how to keep more of each order.']:sc<65?['Moderate leakage','#F59E0B','Real money is probably slipping away every month. An audit will show exactly where.']:['High leakage','#DC2626','An audit is worth your time. There is likely a lot of profit to win back.'];
    $('paArc').style.stroke=lv[1];$('paLevel').textContent=lv[0];$('paLevel').style.color=lv[1];$('paMsg').textContent=lv[2];
  }
  chk.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;b.classList.toggle('on');score()});
  sh_.addEventListener('input',score);score();
  `;

  return {
    slug: 'profit-audit', name: 'Free profit audit',
    title: 'Free Profit Leak Audit for Zomato and Swiggy Restaurants | RestroGrow',
    desc: 'Share one app payout and see exactly where your money goes. A free 30 minute audit for restaurants on Zomato and Swiggy. 3X in 90 days or 100% back.',
    cta: 'Get My Free Profit Audit', sticky: ['Free audit', ' See where your profit goes'],
    body: body, css: css, js: js
  };
};
