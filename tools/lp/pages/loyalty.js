// Landing page: LOYALTY / repeat orders.  Pitch: "make your app customers your own regulars".
'use strict';
module.exports = function (c) {
  var img = c.img;

  var hero = {
    eyb: 'For <b>restaurants &amp; cafes</b> whose best customers order through Zomato and Swiggy',
    h1: 'Your Regulars Order Again and Again. <span class="o">You Don\'t Even Know Their Names.</span>',
    sub: 'RestroGrow turns your app customers into your own loyal regulars, with points, rewards and WhatsApp. Every repeat order comes straight to you, with zero commission.',
    cta2: { text: 'See What My Regulars Cost Me', href: '#rg-sim' },
    wait: 'Every regular who orders through an app is a regular you pay to keep. <b>Make them yours.</b>',
    visual: `
    <div class="lp-phone"><div class="lp-screen ly-screen">
      <div class="lp-sb"></div>
      <div class="ly-top"><div><small>Welcome back</small><b>Rohan</b></div><span class="ly-tier" id="lyTier">Silver member</span></div>
      <div class="ly-pts"><small>Your points</small><b id="lyPts">240</b>
        <div class="ly-bar"><i id="lyBar"></i></div><small id="lyNext">60 points to Gold</small></div>
      <div class="ly-card">
        <div class="ly-card-h"><b>Dessert Club</b><span id="lyCount">5 of 8 stamps</span></div>
        <div class="ly-stamps" id="lyStamps"></div>
        <p class="ly-rew" id="lyRew">${img('gift', '', '')}<span>Free dessert on your 8th order</span></p>
      </div>
      <button class="btn btn-p btn-full ly-btn" id="lyOrder" type="button">Place an order · ₹450</button>
      <p class="ly-foot" id="lyFoot">Tap the button. This is how your customers earn.</p>
    </div>
    <div class="lp-float tr" id="lyFloat1">${img('star', '', '')}<span><b id="lyF1b">+45 points</b><small>On every direct order</small></span></div>
    <div class="lp-float bl" style="animation-delay:-2s">${img('heart', '', '')}<span><b>0% commission</b><small>On this order</small></span></div></div>`
  };

  var problem = `
<!-- ================= PROBLEM ================= -->
<section class="sec" id="rg-problem"><div class="w">
  <div class="head rv"><span class="kick">The loyalty gap</span><h2 class="h2">Same Customer. <span class="o">Two Very Different Relationships.</span></h2><p>Tap to see what you know about your best regular, depending on where they order.</p></div>
  <div class="lp-card ly-prof rv" id="lyProf" data-m="app">
    <div class="ly-prof-t"><div class="seg" id="lyProfSeg"><button class="on" data-v="app" type="button">On a delivery app</button><button data-v="own" type="button">In your own program</button></div></div>
    <div class="ly-prof-b">
      <div class="ly-who"><div class="ly-av" id="lyAv">?</div><b id="lyWho">Customer #48213</b><span id="lyWhoS">Name hidden by the app</span></div>
      <ul class="ly-rows" id="lyRows"></ul>
    </div>
  </div>
  <div class="pains" style="margin-top:clamp(40px,5vw,60px)">
    <div class="pain rv"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></span><div><h3>You pay full commission on every repeat.</h3><p>The 20th order from your best regular costs exactly what the 1st one did.</p></div></div>
    <div class="pain rv" style="--dl:.06s"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M4 4l16 16"/></svg></span><div><h3>No number, no thank you, no offer.</h3><p>The app keeps their details. You can't message the people who love your food.</p></div></div>
    <div class="pain rv"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span><div><h3>Your rival is one tap away.</h3><p>With nothing that ties them to you, a regular can switch restaurants in seconds.</p></div></div>
    <div class="pain rv" style="--dl:.06s"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7l6 6 4-4 8 8M21 11v6h-6"/></svg></span><div><h3>Nothing rewards your best customers.</h3><p>No points, no tiers, no gifts that carry your brand. Just another order number.</p></div></div>
  </div>
  <p class="verdict rv">Loyalty is the cheapest growth there is. <span class="o">You just need a channel you own.</span></p>
</div></section>`;

  var sim = `
<!-- ================= SIMULATOR ================= -->
<section class="sec dark" id="rg-sim"><div class="w">
  <div class="head rv"><span class="kick">Regular customer calculator</span><h2 class="h2">What Are Your Regulars <span class="o">Really Costing You?</span></h2><p>Move the sliders to your numbers. See the commission you pay on repeat orders and what a loyalty program can win back.</p></div>
  <div class="calc">
    <div class="cin rv">
      <div class="fld"><div class="t"><label for="lyR">Regulars who order every month</label><output id="lyRv">300</output></div><input class="rng" type="range" id="lyR" min="20" max="3000" step="10" value="300"></div>
      <div class="fld"><div class="t"><label for="lyO">Orders per regular, per month</label><output id="lyOv">3</output></div><input class="rng" type="range" id="lyO" min="1" max="10" step="1" value="3"></div>
      <div class="fld"><div class="t"><label for="lyA">Average order value</label><output id="lyAv2">₹400</output></div><input class="rng" type="range" id="lyA" min="100" max="1500" step="10" value="400"></div>
      <div class="fld"><div class="t"><label for="lyC">Commission the app takes</label><output id="lyCv">25%</output></div><input class="rng" type="range" id="lyC" min="10" max="40" step="1" value="25"></div>
      <div class="fld"><div class="t"><label for="lyS">Regulars you move to your program</label><output id="lySv">50%</output></div><input class="rng" type="range" id="lyS" min="10" max="100" step="5" value="50"><small>Share of these regulars who join your own ordering and rewards.</small></div>
    </div>
    <div class="cout rv" style="--dl:.08s" aria-live="polite">
      <div><p class="l">Commission you pay on your regulars every month</p><p class="big" id="lyNow">₹0</p></div>
      <div class="yr"><span>Saved by moving them to your program</span><b id="lySave">₹0</b></div>
      <div class="yr"><span>Extra orders from rewards (illustrative +10%)</span><b id="lyExtra">₹0</b></div>
      <div class="save"><p>Together, that could be worth</p><strong><span id="lyYear">₹0</span> / year</strong><small>An estimate from your numbers, not a promise. Your results depend on your restaurant.</small></div>
      <a class="btn btn-p btn-full" href="#rg-demo">Build My Loyalty Program ${c.arrow}</a>
    </div>
  </div>
</div></section>`;

  var how = `
<!-- ================= HOW ================= -->
<section class="sec cream" id="rg-how"><div class="w">
  <div class="head rv"><span class="kick">How it works</span><h2 class="h2">Your Own Loyalty Program <span class="o">in 3 Steps</span></h2><p>We build and run it. You keep serving great food.</p></div>
  <div class="lp-three">
    <div class="lp-card lp-step rv"><span class="n">1</span><div class="lp-ico">${img('gift', '', '')}</div><h3>We build your rewards program</h3><p>Your brand, your points, your tiers and your rewards, live on your own ordering website. We handle every bit of the setup.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.08s"><span class="n">2</span><div class="lp-ico">${img('qr', '', '')}</div><h3>We move your regulars into it</h3><p>Parcel inserts, table QR codes and a first order reward bring your app customers onto the program you own.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.16s"><span class="n">3</span><div class="lp-ico">${img('bell', '', '')}</div><h3>They earn, return and you keep it all</h3><p>Points and WhatsApp reminders pull them back, and every repeat order pays you in full.</p></div>
  </div>
  <p class="stay rv" style="margin-top:34px;text-align:center;font:600 1.1rem var(--fh)">You don't leave Zomato or Swiggy. <span class="o">You make your best customers yours.</span></p>
</div></section>`;

  var tiers = `
<!-- ================= TIERS ================= -->
<section class="sec dark dots-d" id="rg-tiers"><div class="w">
  <div class="head rv"><span class="kick">Rewards that feel good</span><h2 class="h2">Give Every Regular <span class="o">a Reason to Come Back</span></h2><p>Pick a tier to see what your customers get and the WhatsApp message that goes with it.</p></div>
  <div class="lp-two ly-tiers rv">
    <div class="lp-dcard">
      <div class="seg" id="lyTierSeg"><button class="on" data-v="0" type="button">Silver</button><button data-v="1" type="button">Gold</button><button data-v="2" type="button">Platinum</button></div>
      <div class="ly-tier-h"><div class="ly-tier-i" id="lyTi"></div><div><b id="lyTn">Silver</b><small id="lyTr">Starts from the first order</small></div></div>
      <ul class="ly-perks" id="lyPerks"></ul>
    </div>
    <div class="ly-chatbox">
      <div class="ly-chat" id="lyChat"></div>
      <p class="lp-cap">Sent automatically on <b>WhatsApp</b>. No ad spend, no commission.</p>
    </div>
  </div>
</div></section>`;

  var vs = `
<!-- ================= VS ================= -->
<section class="sec cream" id="rg-vs"><div class="w">
  <div class="head rv"><span class="kick">Discounts vs loyalty</span><h2 class="h2">Stop Buying Customers. <span class="o">Start Keeping Them.</span></h2></div>
  <div class="lp-card rv" style="padding:0;overflow:hidden;max-width:900px;margin:0 auto">
    <table class="lp-table ly-vs">
      <thead><tr><th></th><th>Discounts on the app</th><th class="hl">Your loyalty program</th></tr></thead>
      <tbody>
        <tr><td>Who owns the customer</td><td class="no">✕ The app</td><td class="ok">✓ You</td></tr>
        <tr><td>Cost of a repeat order</td><td class="no">✕ 25 to 30% commission</td><td class="ok">✓ 0% commission</td></tr>
        <tr><td>Can you message them?</td><td class="no">✕ No</td><td class="ok">✓ Anytime, on WhatsApp</td></tr>
        <tr><td>Builds a habit</td><td class="no">✕ Buys one order</td><td class="ok">✓ Points bring them back</td></tr>
        <tr><td>Your brand</td><td class="no">✕ Lost in the app</td><td class="ok">✓ Front and center</td></tr>
      </tbody>
    </table>
  </div>
  <div class="lp-cta-row rv"><a class="btn btn-p" href="#rg-demo">Book My Demo ${c.arrow}</a></div>
</div></section>`;

  var css = `
.rg .ly-screen{background:linear-gradient(180deg,#FFF1E8 0,#fff 38%)}
.rg .ly-top{display:flex;justify-content:space-between;align-items:center;padding:6px 20px 0}
.rg .ly-top small{display:block;color:var(--mu);font-size:.74rem}
.rg .ly-top b{font:800 1.25rem var(--fh)}
.rg .ly-tier{font:700 .72rem var(--fh);padding:6px 11px;border-radius:99px;background:#E5E7EB;color:#374151;transition:background .4s,color .4s}
.rg .ly-tier.gold{background:#FEF3C7;color:#92400E}
.rg .ly-tier.plat{background:#EDE9FE;color:#5B21B6}
.rg .ly-pts{margin:14px 20px 0;padding:16px;border-radius:18px;background:var(--ink);color:#fff}
.rg .ly-pts small{display:block;color:var(--dmu);font-size:.74rem}
.rg .ly-pts b{display:block;font:800 2.3rem/1.1 var(--fh);color:#fff}
.rg .ly-bar{height:7px;border-radius:7px;background:rgba(255,255,255,.14);margin:10px 0 8px;overflow:hidden}
.rg .ly-bar i{display:block;height:100%;width:40%;border-radius:7px;background:var(--o);transition:width .6s var(--ease)}
.rg .ly-card{margin:14px 20px 0;padding:14px;border-radius:18px;border:1px solid var(--ln);background:#fff}
.rg .ly-card-h{display:flex;justify-content:space-between;align-items:baseline;font-size:.82rem}
.rg .ly-card-h b{font:700 .95rem var(--fh)}.rg .ly-card-h span{color:var(--mu)}
.rg .ly-stamps{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:12px 0}
.rg .ly-stamps i{aspect-ratio:1;border-radius:50%;border:2px dashed #E3D9CF;display:grid;place-items:center;transition:transform .3s var(--ease),background .3s,border-color .3s}
.rg .ly-stamps i.on{border:2px solid #FACC15;background:#FFFBEB}
.rg .ly-stamps i.on img{width:62%;height:62%;animation:lyPop .45s var(--ease)}
.rg .ly-stamps i img{width:0;height:0}
.rg .ly-stamps i.last{border-color:var(--o);background:var(--ot)}
@keyframes lyPop{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
.rg .ly-rew{display:flex;align-items:center;gap:10px;padding:9px 11px;border-radius:12px;background:var(--ot);font-size:.8rem;font-weight:600;color:#9A3412}
.rg .ly-rew img{width:26px;height:26px}
.rg .ly-rew.got{background:#DCFCE7;color:#166534}
.rg .ly-btn{margin:14px 20px 0;width:calc(100% - 40px);height:50px}
.rg .ly-foot{padding:10px 20px 18px;text-align:center;font-size:.76rem;color:var(--mu)}
.rg .ly-prof{max-width:900px;margin:0 auto;padding:0;overflow:hidden}
.rg .ly-prof-t{padding:18px 20px;border-bottom:1px solid var(--ln);display:flex;justify-content:center;background:#FBF6F1}
.rg .ly-prof-b{display:grid;grid-template-columns:260px 1fr}
.rg .ly-who{padding:28px 20px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;border-right:1px solid var(--ln)}
.rg .ly-av{width:84px;height:84px;border-radius:50%;display:grid;place-items:center;font:800 2rem var(--fh);background:#E5E7EB;color:#9CA3AF;transition:background .4s,color .4s}
.rg [data-m=own] .ly-av{background:var(--o);color:#fff}
.rg .ly-who b{font:700 1.1rem var(--fh)}
.rg .ly-who span{font-size:.82rem;color:var(--mu)}
.rg .ly-rows li{display:flex;justify-content:space-between;gap:12px;padding:14px 22px;border-bottom:1px solid var(--ln);font-size:.94rem}
.rg .ly-rows li:last-child{border-bottom:0}
.rg .ly-rows li span{color:var(--mu)}
.rg .ly-rows li b{font-weight:600;text-align:right}
.rg .ly-rows li.bad b{color:#C2410C}
.rg .ly-rows li.good b{color:#15803D}
.rg .ly-rows{transition:opacity .25s}
.rg .ly-rows.sw{opacity:0}
.rg .ly-tiers{align-items:center}
.rg .ly-tier-h{display:flex;align-items:center;gap:14px;margin:22px 0 14px}
.rg .ly-tier-i{width:54px;height:54px;border-radius:16px;display:grid;place-items:center}
.rg .ly-tier-i img{width:34px;height:34px}
.rg .ly-tier-h b{display:block;font:800 1.4rem var(--fh)}
.rg .ly-tier-h small{color:var(--dmu)}
.rg .ly-perks li{display:flex;gap:12px;padding:11px 0;border-bottom:1px dashed var(--dln);font-size:.97rem}
.rg .ly-perks li:last-child{border-bottom:0}
.rg .ly-perks i{width:22px;height:22px;flex:none;border-radius:50%;background:var(--o);display:grid;place-items:center;font-style:normal;font-size:.7rem;font-weight:700;margin-top:2px}
.rg .ly-chatbox{padding:22px 18px;border-radius:22px;background:#0B141A;border:1px solid var(--dln)}
.rg .ly-chat{display:flex;flex-direction:column;gap:10px;min-height:230px;justify-content:flex-end}
.rg .ly-b{max-width:88%;padding:10px 13px;border-radius:12px;font-size:.9rem;line-height:1.5;animation:lyIn .5s var(--ease) both}
.rg .ly-b small{display:block;margin-top:4px;font-size:.68rem;opacity:.7;text-align:right}
.rg .ly-b.biz{background:#202C33;color:#E9EDEF;border-top-left-radius:2px}
.rg .ly-b.me{background:#005C4B;color:#E9EDEF;align-self:flex-end;border-top-right-radius:2px}
@keyframes lyIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
.rg .dots-d{background-image:radial-gradient(rgba(255,255,255,.06) 1px,transparent 1px);background-size:22px 22px}
.rg .ly-vs th.hl,.rg .ly-vs td.ok{background:#FFF7F1}
.rg .ly-vs td.ok{color:#15803D;font-weight:600}
.rg .ly-vs td.no{color:#C2410C}
.rg .ly-vs td:first-child{font-weight:600}
@media (max-width:760px){
 .rg .ly-prof-b{grid-template-columns:1fr}
 .rg .ly-who{border-right:0;border-bottom:1px solid var(--ln)}
 .rg .lp-table{font-size:.84rem}.rg .lp-table th,.rg .lp-table td{padding:11px 9px}
}`;

  var js = `
  /* ---- hero: loyalty card you can play with ---- */
  var stamps=5,pts=240,st=$('lyStamps');
  function tierOf(p){return p>=600?['Platinum member','plat',null]:p>=300?['Gold member','gold',600]:['Silver member','',300]}
  function drawStamps(){
    var h='',i;for(i=0;i<8;i++)h+='<i class="'+(i<stamps?'on':'')+(i===7?' last':'')+'">'+(i<stamps?'<img src="img/star.svg" alt="">':'')+'</i>';
    st.innerHTML=h;
    $('lyCount').textContent=stamps+' of 8 stamps';
    var t=tierOf(pts),el=$('lyTier');el.textContent=t[0];el.className='ly-tier '+t[1];
    var to=t[2];$('lyBar').style.width=(to?Math.min(100,(pts-(to===300?0:300))/(to===300?300:300)*100):100)+'%';
    $('lyNext').textContent=to?(to-pts)+' points to '+(to===300?'Gold':'Platinum'):'You reached the top tier';
    num($('lyPts'),pts,function(v){return Math.round(v)},500);
  }
  drawStamps();
  var rew=$('lyRew'),btn=$('lyOrder'),foot=$('lyFoot'),f1=$('lyF1b');
  btn.addEventListener('click',function(){
    if(stamps>=8){stamps=0;rew.className='ly-rew';rew.lastChild.textContent='Free dessert on your 8th order';btn.textContent='Place an order · ₹450';foot.textContent='Reward redeemed. A new card starts now.';drawStamps();return}
    stamps++;pts+=45;drawStamps();f1.textContent='+45 points';
    if(stamps>=8){rew.className='ly-rew got';rew.lastChild.textContent='Reward unlocked! Free dessert is yours';btn.textContent='Redeem my free dessert';foot.textContent='That is how regulars are made.';confetti(btn)}
    else foot.textContent=(8-stamps)+' more order'+(8-stamps>1?'s':'')+' to a free dessert. No commission paid.';
  });

  /* ---- problem: app customer vs your customer ---- */
  var PA=[['Name','Hidden','bad'],['Phone number','Hidden','bad'],['Orders from you','You can\\'t see','bad'],['Lifetime spend','Unknown','bad'],['Can you send an offer?','No','bad'],['Commission on their next order','25 to 30%','bad']];
  var PO=[['Name','Rohan Sharma','good'],['Phone number','+91 98••• ••521','good'],['Orders from you','14 orders','good'],['Lifetime spend','₹8,420','good'],['Can you send an offer?','Yes, on WhatsApp','good'],['Commission on their next order','₹0','good']];
  var rows=$('lyRows'),prof=$('lyProf');
  function drawRows(m){
    var d=m==='own'?PO:PA;
    rows.className='ly-rows sw';
    setTimeout(function(){
      rows.innerHTML=d.map(function(r){return '<li class="'+r[2]+'"><span>'+r[0]+'</span><b>'+r[1]+'</b></li>'}).join('');
      prof.setAttribute('data-m',m);
      $('lyAv').textContent=m==='own'?'R':'?';
      $('lyWho').textContent=m==='own'?'Rohan Sharma':'Customer #48213';
      $('lyWhoS').textContent=m==='own'?'Gold member, since Jan':'Name hidden by the app';
      rows.className='ly-rows';
    },RM?0:200);
  }
  drawRows('app');
  pick($('lyProfSeg'),drawRows);

  /* ---- simulator ---- */
  var ids=['lyR','lyO','lyA','lyC','lyS'];
  function sim(){
    ids.forEach(function(i){fill($(i))});
    var R_=+$('lyR').value,O=+$('lyO').value,A=+$('lyA').value,C=+$('lyC').value/100,S=+$('lyS').value/100;
    $('lyRv').textContent=R_.toLocaleString('en-IN');$('lyOv').textContent=O;$('lyAv2').textContent=inr(A);$('lyCv').textContent=Math.round(C*100)+'%';$('lySv').textContent=Math.round(S*100)+'%';
    var rev=R_*O*A,now=rev*C,saved=rev*S*C,extra=rev*S*0.10;
    num($('lyNow'),now,inr);num($('lySave'),saved,inr);num($('lyExtra'),extra,inr);num($('lyYear'),(saved+extra)*12,sh);
    var stl=$('rgStL');if(stl)stl.textContent=sh(now)+' / month';
  }
  ids.forEach(function(i){$(i).addEventListener('input',sim)});sim();

  /* ---- tiers ---- */
  var TI=[
    {n:'Silver',r:'Starts from the first order',img:'star',bg:'#E5E7EB',perks:['1 point for every ₹10 spent','Free dessert after 8 orders','Birthday wish on WhatsApp'],chat:[['biz','Hi Rohan! You earned 45 points on your order. 60 more and you are Gold. 🌟','7:42 pm'],['me','Ordering again this weekend!','7:44 pm']]},
    {n:'Gold',r:'After 300 points',img:'star',bg:'#FEF3C7',perks:['1.5x points on every order','Free starter every 5th order','Early access to new dishes','Birthday gift on your table'],chat:[['biz','Welcome to Gold, Rohan! 🎉 Enjoy 1.5x points and a free starter on your next order.','6:15 pm'],['me','Nice! Booking a table for Saturday','6:17 pm']]},
    {n:'Platinum',r:'After 600 points',img:'gift',bg:'#EDE9FE',perks:['2x points on every order','Free main course every month','Priority table and delivery','Invites to chef tasting nights'],chat:[['biz','Rohan, you are Platinum! 💎 Your free main course this month is waiting. Reply YES to claim.','1:05 pm'],['me','YES! 😍','1:06 pm']]}
  ];
  function drawTier(k){
    var t=TI[+k];
    $('lyTn').textContent=t.n;$('lyTr').textContent=t.r;
    $('lyTi').style.background=t.bg;$('lyTi').innerHTML='<img src="img/'+t.img+'.svg" alt="">';
    $('lyPerks').innerHTML=t.perks.map(function(p){return '<li><i>✓</i>'+p+'</li>'}).join('');
    $('lyChat').innerHTML=t.chat.map(function(m,i){return '<div class="ly-b '+m[0]+'" style="animation-delay:'+(RM?0:i*.45)+'s">'+m[1]+'<small>'+m[2]+'</small></div>'}).join('');
  }
  drawTier(0);pick($('lyTierSeg'),drawTier);
  `;

  return {
    slug: 'loyalty', name: 'Loyalty & repeat orders',
    title: 'Turn Zomato & Swiggy Customers Into Your Own Loyal Regulars | RestroGrow',
    desc: 'RestroGrow turns your app customers into your own loyal regulars with points, rewards and WhatsApp. Zero commission on repeat orders. 3X in 90 days or 100% back.',
    cta: 'Start My Loyalty Program', stickyTail: 'paid on your repeat orders',
    hero: hero, before: [problem, sim, how], after: [tiers, vs], css: css, js: js,
    faq: [
      ['How does the loyalty program work?', 'Customers earn points on every direct order and redeem them for rewards you choose, like a free dessert. It runs on your own ordering website and WhatsApp.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. We move your regulars to your own program so their next orders come without commission.'],
      ['How do app customers find out about it?', 'Inserts in every app parcel, QR codes on tables and bills, and WhatsApp messages to the customers who join.'],
      ['Can I choose the rewards?', 'Yes. You decide the points, tiers and rewards, and we set them up so they fit your margins.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and the revenue from your direct orders. If it is less than 3X our service fee, we refund 100% of what you paid.'],
      ['Do I need any technical knowledge?', 'None. We set up the program, the rewards and the campaigns. You focus on your kitchen.']
    ]
  };
};
