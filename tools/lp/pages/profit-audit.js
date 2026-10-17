// Landing page: FREE PROFIT LEAK AUDIT.  Pitch: "you see the payout, not the leaks. Get every rupee explained, free".
'use strict';
module.exports = function (c) {
  var img = c.img;

  var hero = {
    eyb: 'Free for <b>restaurants, cafes &amp; cloud kitchens</b> selling on Zomato and Swiggy',
    h1: 'Is Zomato Eating Your Profit? <span class="o">Get a Free Profit Leak Audit.</span>',
    sub: 'Share one app payout and in a 30 minute call we show exactly where your money goes and how much a direct ordering system can win back for you.',
    cta2: { text: 'Check My Leak Score', href: '#rg-score' },
    wait: 'Most owners only see the payout, not the leaks behind it. <b>We show you every rupee.</b>',
    visual: `
    <div class="pa-card">
      <div class="pa-h"><div><small>Leak report</small><b>Where your app sales go</b></div><span class="lp-badge">Sample</span></div>
      <div class="seg pa-seg" id="paMode"><button class="on" data-v="0" type="button">Typical month</button><button data-v="1" type="button">Heavy ads &amp; offers</button></div>
      <div class="pa-sl"><div class="lp-lbl"><label for="paS">Monthly sales on the apps</label><output id="paSv">₹3,00,000</output></div><input class="rng lt" type="range" id="paS" min="50000" max="2000000" step="10000" value="300000"></div>
      <ul class="pa-rows" id="paRows"></ul>
      <div class="pa-keep"><div><small>What you actually keep</small><b id="paKeep">₹0</b></div><div class="pa-pct" id="paPct">60%</div></div>
      <p class="pa-fn">Typical figures for delivery apps. Your audit uses your real payout.</p>
    </div>
    <div class="lp-float tr" style="animation-delay:-1s;right:-24px;top:-36px">${img('receipt', '', '')}<span><b>Every rupee</b><small>Explained line by line</small></span></div>`
  };

  var problem = `
<!-- ================= PROBLEM ================= -->
<section class="sec" id="rg-problem"><div class="w">
  <div class="head rv"><span class="kick">Where your profit goes</span><h2 class="h2">You See the Payout. <span class="o">You Don't See the Leaks.</span></h2><p>Five places profit quietly slips away on delivery apps. Tap each one to see how it works.</p></div>
  <div class="pa-acc rv" id="paAcc"></div>
  <p class="verdict rv">You can't fix what you can't see. <span class="o">So we put every leak on one page.</span></p>
</div></section>`;

  var score = `
<!-- ================= SCORE ================= -->
<section class="sec dark" id="rg-score"><div class="w">
  <div class="head rv"><span class="kick">Quick self check</span><h2 class="h2">What's Your <span class="o">Profit Leak Score?</span></h2><p>Tick what applies to your restaurant. It takes 20 seconds and tells you how urgent an audit is.</p></div>
  <div class="lp-two pa-score">
    <div class="lp-dcard rv">
      <div class="pa-checks" id="paChecks"></div>
      <div class="fld" style="margin-top:24px"><div class="t"><label for="paShare">Share of your sales that come from apps</label><output id="paShv">50%</output></div><input class="rng" type="range" id="paShare" min="10" max="100" step="5" value="50"></div>
    </div>
    <div class="lp-card pa-gauge rv" style="--dl:.08s">
      <svg viewBox="0 0 200 118" aria-hidden="true"><path d="M14 104A86 86 0 0 1 186 104" stroke="#EFE8E0" stroke-width="18" stroke-linecap="round" fill="none"/><path id="paArc" d="M14 104A86 86 0 0 1 186 104" stroke="#FC5301" stroke-width="18" stroke-linecap="round" fill="none" stroke-dasharray="270" stroke-dashoffset="270" style="transition:stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1),stroke .4s"/></svg>
      <div class="pa-num"><b id="paScore">0</b><small>out of 100</small></div>
      <h3 id="paLevel">Low leakage</h3>
      <p id="paMsg"></p>
      <a class="btn btn-p btn-full" href="#rg-demo">Get My Free Profit Audit ${c.arrow}</a>
    </div>
  </div>
</div></section>`;

  var sample = `
<!-- ================= SAMPLE AUDIT ================= -->
<section class="sec cream dots" id="rg-sample"><div class="w">
  <div class="head rv"><span class="kick">What you get</span><h2 class="h2">A Sample Audit, <span class="o">Line by Line</span></h2><p>An example of a ₹98,640 month. Tap any line to see what we would tell the owner.</p></div>
  <div class="lp-two pa-sample rv">
    <div class="lp-card" style="padding:0;overflow:hidden">
      <div class="pa-st-h"><b>Sample payout, illustrative</b><span>Sales ₹98,640</span></div>
      <ul class="pa-st" id="paSt"></ul>
      <div class="pa-st-f"><span>You receive</span><b>₹59,176</b></div>
    </div>
    <div class="lp-card pa-find" id="paFind"></div>
  </div>
  <div class="lp-cta-row rv"><a class="btn btn-p" href="#rg-demo">Get My Free Profit Audit ${c.arrow}</a></div>
</div></section>`;

  var how = `
<!-- ================= HOW ================= -->
<section class="sec" id="rg-how"><div class="w">
  <div class="head rv"><span class="kick">How it works</span><h2 class="h2">Your Free Audit <span class="o">in 3 Steps</span></h2><p>No logins. No pressure. No obligation.</p></div>
  <div class="lp-three">
    <div class="lp-card lp-step rv"><span class="n">1</span><div class="lp-ico">${img('receipt', '', '')}</div><h3>Share one payout</h3><p>A screenshot of a recent Zomato or Swiggy payout is enough. You don't need to share any logins.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.08s"><span class="n">2</span><div class="lp-ico">${img('bell', '', '')}</div><h3>We find the leaks</h3><p>On a 30 minute call we break down commission, tax, ads and discounts and show what you actually keep per order.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.16s"><span class="n">3</span><div class="lp-ico">${img('star', '', '')}</div><h3>You get a clear plan</h3><p>We show how much a direct ordering system can win back for you, with the 3X in 90 days guarantee behind it.</p></div>
  </div>
  <p class="stay rv" style="margin-top:34px;text-align:center;font:600 1.1rem var(--fh)">No pressure, no obligation. <span class="o">You leave knowing your real numbers.</span></p>
</div></section>`;

  var css = `
.rg .pa-card{position:relative;z-index:1;width:min(100%,430px);margin:0 auto;background:#fff;color:var(--tx);border-radius:26px;padding:22px;box-shadow:0 44px 90px -34px rgba(0,0,0,.8)}
.rg .pa-h{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:14px}
.rg .pa-h small{display:block;font-size:.74rem;color:var(--mu)}
.rg .pa-h b{font:800 1.2rem var(--fh)}
.rg .pa-seg{display:flex;width:100%;margin-bottom:16px}
.rg .pa-seg button{flex:1;padding:9px 6px;font-size:.78rem}
.rg .pa-sl{margin-bottom:14px}
.rg .pa-sl output{color:var(--o)}
.rg .pa-rows li{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:8px 0}
.rg .pa-rows li span{font-size:.84rem;font-weight:500}
.rg .pa-rows li b{font:700 .9rem var(--fh);color:#C2410C;font-variant-numeric:tabular-nums}
.rg .pa-rows li em{grid-column:1/-1;height:7px;border-radius:7px;background:#F3EDE7;overflow:hidden;font-style:normal}
.rg .pa-rows li em i{display:block;height:100%;border-radius:7px;background:linear-gradient(90deg,#FC5301,#FF8A3D);transition:width .6s var(--ease)}
.rg .pa-keep{display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:14px 16px;border-radius:16px;background:#E6F6EC}
.rg .pa-keep small{display:block;font-size:.74rem;color:#166534}
.rg .pa-keep b{font:800 1.7rem var(--fh);color:#15803D;font-variant-numeric:tabular-nums}
.rg .pa-pct{font:800 1.3rem var(--fh);color:#15803D;padding:8px 12px;border-radius:12px;background:#fff}
.rg .pa-fn{margin-top:10px;font-size:.72rem;color:var(--mu);text-align:center}
.rg .pa-acc{max-width:860px;margin:0 auto;display:grid;gap:12px}
.rg .pa-acc details{border:1px solid var(--ln);border-radius:18px;background:#fff;overflow:hidden;transition:border-color .3s,box-shadow .3s}
.rg .pa-acc details[open]{border-color:#F6C7AE;box-shadow:0 18px 36px -26px rgba(252,83,1,.5)}
.rg .pa-acc summary{display:grid;grid-template-columns:44px 1fr auto auto;gap:14px;align-items:center;padding:18px 22px;cursor:pointer;list-style:none}
.rg .pa-acc summary::-webkit-details-marker{display:none}
.rg .pa-acc summary .ic{width:44px;height:44px;border-radius:12px;background:var(--ot);display:grid;place-items:center;font:800 1.05rem var(--fh);color:var(--o)}
.rg .pa-acc summary h3{font:700 1.05rem/1.3 var(--fh)}
.rg .pa-acc summary .tag{font:700 .78rem var(--fh);color:#C2410C;background:#FDE8E1;padding:5px 11px;border-radius:99px;white-space:nowrap}
.rg .pa-acc summary i{font-style:normal;font-size:1.3rem;color:var(--mu);transition:transform .3s}
.rg .pa-acc details[open] summary i{transform:rotate(45deg)}
.rg .pa-acc details p{padding:0 22px 20px 80px;color:var(--mu);font-size:.96rem}
.rg .pa-checks{display:grid;gap:10px}
.rg .pa-checks button{display:flex;align-items:center;gap:12px;text-align:left;padding:14px 16px;border-radius:14px;border:1.5px solid rgba(255,255,255,.14);background:transparent;color:#E8E8F0;font:500 .95rem var(--fb);cursor:pointer;transition:border-color .2s,background .2s}
.rg .pa-checks button i{width:22px;height:22px;border-radius:7px;border:2px solid rgba(255,255,255,.3);flex:none;display:grid;place-items:center;font-style:normal;font-size:.75rem;color:transparent;transition:background .2s,border-color .2s,color .2s}
.rg .pa-checks button.on{border-color:var(--o);background:rgba(252,83,1,.1)}
.rg .pa-checks button.on i{background:var(--o);border-color:var(--o);color:#fff}
.rg .pa-gauge{text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.rg .pa-gauge svg{width:min(100%,320px)}
.rg .pa-num{margin-top:-74px;display:flex;flex-direction:column;align-items:center;margin-bottom:10px}
.rg .pa-num b{font:800 3.2rem/1 var(--fh);font-variant-numeric:tabular-nums}
.rg .pa-num small{color:var(--mu);font-size:.78rem}
.rg .pa-gauge h3{font:800 1.4rem var(--fh);transition:color .4s}
.rg .pa-gauge p{color:var(--mu);font-size:.95rem;max-width:34ch;margin-bottom:10px;min-height:3.4em}
.rg .pa-st-h{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:#F8F6F3;border-bottom:1px solid var(--ln);font-size:.85rem}
.rg .pa-st-h b{font:700 .95rem var(--fh)}
.rg .pa-st li{display:flex;justify-content:space-between;gap:12px;padding:14px 20px;border-bottom:1px solid var(--ln);font-size:.94rem;cursor:pointer;transition:background .2s}
.rg .pa-st li:hover{background:#FFF8F3}
.rg .pa-st li.on{background:var(--ot);box-shadow:inset 3px 0 0 var(--o)}
.rg .pa-st li b{font:700 .94rem var(--fh);font-variant-numeric:tabular-nums}
.rg .pa-st li.cut b{color:#C2410C}
.rg .pa-st-f{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:#E6F6EC;font-weight:600}
.rg .pa-st-f b{font:800 1.4rem var(--fh);color:#15803D}
.rg .pa-find{display:flex;flex-direction:column;gap:10px;justify-content:center;align-items:flex-start}
.rg .pa-find h3{font:800 1.35rem var(--fh)}
.rg .pa-find p{color:var(--mu)}
.rg .pa-find .big2{font:800 2.2rem var(--fh);color:#C2410C}
.rg .pa-find .tip{padding:12px 14px;border-radius:14px;background:#E6F6EC;color:#166534;font-size:.9rem;font-weight:500}
@media (max-width:760px){.rg .pa-acc summary{grid-template-columns:40px 1fr auto;padding:16px}.rg .pa-acc summary .tag{display:none}.rg .pa-acc details p{padding:0 16px 18px 16px}}`;

  var js = `
  /* ---- hero leak report ---- */
  var L=[['Commission',[25,28]],['GST on commission',[4.5,5]],['Ads and visibility',[4,8]],['Discounts you fund',[5,12]],['Packaging and other fees',[1.5,2]]],mode=0,paS=$('paS');
  var rowsEl=$('paRows');
  rowsEl.innerHTML=L.map(function(l,i){return '<li><span>'+l[0]+'</span><b id="paB'+i+'">₹0</b><em><i id="paI'+i+'" style="width:0"></i></em></li>'}).join('');
  function rep(){
    fill(paS);var s=+paS.value,tot=0;
    $('paSv').textContent=inr(s).replace(/(\\d)(?=(\\d\\d)+\\d$)/g,'$1,');
    L.forEach(function(l,i){var p=l[1][mode];tot+=p;num($('paB'+i),s*p/100,function(v){return '−'+inr(v)},500);$('paI'+i).style.width=p*2+'%'});
    num($('paKeep'),s*(100-tot)/100,inr,500);$('paPct').textContent=Math.round(100-tot)+'%';
  }
  paS.addEventListener('input',rep);pick($('paMode'),function(v){mode=+v;rep()});rep();

  /* ---- accordion ---- */
  var AC=[['%','Commission','25 to 30%','The headline rate is the biggest single cut on every order. It is charged on the full order value, on every order, even from your 20th-time regular.'],
          ['₹','GST on the commission','About 4.5%','18% GST is charged on the commission itself, so the real cost of the platform is higher than the number in your contract.'],
          ['★','Ads and visibility','3 to 10%','Promoted listings and "growth" charges are deducted from the same payout. Many owners never check whether those ads paid for themselves.'],
          ['−','Discounts you fund','5 to 12%','Offers that bring volume can cost more than they earn once everything else is deducted. The app shows the sale, you carry the cost.'],
          ['?','Refunds, cancellations and packaging','1 to 3%','Order issues, cancellations charged to you and packaging costs add up quietly and rarely show as one clear line.']];
  var acc=$('paAcc');
  acc.innerHTML=AC.map(function(a,i){return '<details'+(i?'':' open')+'><summary><span class="ic">'+a[0]+'</span><h3>'+a[1]+'</h3><span class="tag">'+a[2]+'</span><i>+</i></summary><p>'+a[3]+'</p></details>'}).join('');
  acc.addEventListener('toggle',function(e){if(e.target.open)Array.prototype.forEach.call(acc.children,function(d){if(d!==e.target)d.open=false})},true);

  /* ---- leak score ---- */
  var CK=[['I run ads or promoted listings on the apps',15],['I fund discounts and offers on the apps',15],['The apps charge me 25% or more in total',15],['I don\\'t have my customers\\' phone numbers',15],['Cancellations and refunds get deducted from my payout',10],['I never check my payout line by line',10]],on=[];
  var chk=$('paChecks');
  chk.innerHTML=CK.map(function(k){return '<button type="button"><i>✓</i>'+k[0]+'</button>'}).join('');
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

  /* ---- sample audit ---- */
  var ST=[['Total sales','₹98,640',0,'Your sales for the month','This is what customers paid on the apps. It is the number most owners look at, and the one that hides everything below.',''],
          ['Commission','−₹24,660',1,'25% commission','The biggest leak. On this month it cost ₹24,660.','Moving regulars to direct orders removes it on every order they place with you.'],
          ['GST on commission','−₹4,439',1,'18% tax on the commission','Charged on top of the commission, so the platform costs more than the contract rate suggests.','This also disappears on direct orders.'],
          ['Ads and visibility','−₹3,946',1,'Promoted listings','Money spent to appear higher on the app. Worth keeping only if each rupee brings back more than a rupee.','We show which ads paid off and which did not.'],
          ['Discounts you fund','−₹4,932',1,'Offers you paid for','Discounts run on the app come out of your pocket, not theirs.','A loyalty reward on your own site can win the same customers at a lower cost.'],
          ['Packaging and other fees','−₹1,487',1,'Small charges that add up','Refunds, cancellations and packaging charges spread across many lines.','We flag the lines that repeat.']],stEl=$('paSt'),fd=$('paFind');
  stEl.innerHTML=ST.map(function(s,i){return '<li class="'+(s[2]?'cut':'')+(i===1?' on':'')+'" data-i="'+i+'"><span>'+s[0]+'</span><b>'+s[1]+'</b></li>'}).join('');
  function showF(i){var s=ST[i];fd.innerHTML='<span class="lp-badge">'+s[0]+'</span><div class="big2">'+s[1]+'</div><h3>'+s[3]+'</h3><p>'+s[4]+'</p>'+(s[5]?'<div class="tip">'+s[5]+'</div>':'')}
  stEl.addEventListener('click',function(e){var li=e.target.closest('li');if(!li)return;Array.prototype.forEach.call(stEl.children,function(x){x.classList.toggle('on',x===li)});showF(+li.getAttribute('data-i'))});
  showF(1);
  `;

  return {
    slug: 'profit-audit', name: 'Free profit audit',
    title: 'Free Profit Leak Audit for Zomato & Swiggy Restaurants | RestroGrow',
    desc: 'Share one app payout and see exactly where your money goes. A free 30 minute audit for restaurants on Zomato and Swiggy. 3X in 90 days or 100% back.',
    cta: 'Get My Free Profit Audit', stickyTail: 'going to app commission',
    hero: hero, before: [problem, score, sample, how], after: [], css: css, js: js,
    faq: [
      ['Is the audit really free?', 'Yes. The audit call is free and there is no obligation to buy anything.'],
      ['What do I need to share?', 'One recent Zomato or Swiggy payout statement or screenshot. You don\'t have to share any logins.'],
      ['How long does it take?', 'About 30 minutes on a call with our team.'],
      ['What happens after the audit?', 'If a direct ordering system makes sense for you, we show how it would work and what you could save. If it doesn\'t, you still keep the findings.'],
      ['Are the numbers on this page real?', 'The sample figures are illustrative so you can see how an audit looks. Your audit uses your own payout.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  };
};
