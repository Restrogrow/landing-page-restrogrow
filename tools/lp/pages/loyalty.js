// Landing page: LOYALTY / repeat orders.  Pitch: "your best customers order again and again. Own that relationship."
'use strict';
var I = require('../icons.js').ic;

module.exports = function (S) {
  var B = S.BASE, P = S.DATA.proofs;

  var hero = `
<section class="x-hero" id="rg-hero"><div class="x-w">
  <div>
    <span class="x-eyb rv">${I('repeat')}For restaurants and cafes whose best customers order through Zomato and Swiggy</span>
    <h1 class="rv" style="--dl:.06s">Your Regulars Order Again and Again. <span class="o">You Don't Even Know Their Names.</span></h1>
    <p class="x-sub rv" style="--dl:.12s">RestroGrow turns your app customers into your own loyal members, with points, rewards and WhatsApp. Every repeat order comes straight to you, with zero commission.</p>
    <div class="x-cta rv" style="--dl:.18s"><a class="btn btn-p" href="#rg-demo">Start My Loyalty Program ${I('arrow')}</a><a class="x-btn2" href="#rg-sim">${I('coins')}What do my regulars cost me?</a></div>
    <ul class="x-checks rv" style="--dl:.22s"><li>${I('check')}Points, stamp cards, tiers and referrals on your own ordering website</li><li>${I('check')}WhatsApp reminders that bring regulars back, with no ad spend</li><li>${I('check')}3X in 90 days, or 100% of your fee back</li></ul>
    ${S.trust()}
  </div>
  <div class="x-hv ly-hv rv" style="--dl:.12s">
    <div class="ly-real"><div class="shot-f" data-zoom="${B + P[1].file}"><img src="${B + P[1].file}" alt="Real RestroGrow client dashboard showing a 39.89% repeat ratio"></div></div>
    <div class="ly-front">
      <div class="app"><div class="app-s ly-s">
        <div class="ly-hd"><div class="ly-brand"><span class="ly-logo">${I('utensils')}</span><div><small>Welcome back</small><b>Rohan</b></div></div><span class="pill s" id="lyTier">SILVER</span></div>
        <div class="ly-pts">
          <div class="ly-ringw"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle id="lyArc" cx="60" cy="60" r="52" class="fg"/></svg><div class="ly-n"><b id="lyPts">240</b><small>points</small></div></div>
          <p id="lyNext">60 points to Gold</p>
        </div>
        <div class="app-card ly-card"><div class="ly-ch"><b>Dessert Club</b><span id="lyCount">5 of 8 orders</span></div><div class="ly-st" id="lyStamps"></div><p class="ly-rew" id="lyRew">${I('gift')}<span>Free dessert on your 8th order</span></p></div>
        <button class="app-btn" id="lyOrder" type="button">${I('bag')}<span>Place an order, ₹450</span></button>
        <p class="ly-foot" id="lyFoot">Tap the button. This is how your customers earn.</p>
      </div></div>
    </div>
    <div class="x-note ly-n1"><i class="t-g">${I('repeat')}</i><span><b>39.89% repeat ratio</b><small>Real client dashboard</small></span></div>
    <div class="x-note ly-n2" style="animation-delay:-2s"><i class="t-o">${I('percent')}</i><span><b>0% commission</b><small>On every direct order</small></span></div>
  </div>
</div></section>`;

  var stats = `
<section class="ly-stats"><div class="x-w"><div class="x-four">
  <div class="ly-stat rv"><b data-count="140" data-suffix="+">0</b><span>restaurants on RestroGrow</span></div>
  <div class="ly-stat rv" style="--dl:.06s"><b>37% to 44%</b><span>of orders from returning customers at 5 real clients</span></div>
  <div class="ly-stat rv" style="--dl:.12s"><b data-count="90" data-prefix="₹" data-suffix=" L+">0</b><span>commission saved for clients</span></div>
  <div class="ly-stat rv" style="--dl:.18s"><b>0%</b><span>commission on every direct order</span></div>
</div></div></section>`;

  var gap = `
<section class="x-sec" id="rg-gap"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">The loyalty gap</span><h2 class="x-h2">Same Customer. <span class="o">Two Very Different Relationships.</span></h2><p class="x-lead">Switch between the two to see what you actually know about your best regular, depending on where they order.</p></div>
  <div class="x-card ly-prof rv" id="lyProf" data-m="app">
    <div class="ly-prof-t"><div class="seg" id="lyProfSeg"><button class="on" data-v="app" type="button">${I('mobile')}On a delivery app</button><button data-v="own" type="button">${I('store')}In your own program</button></div></div>
    <div class="ly-prof-b">
      <div class="ly-who"><div class="ly-av" id="lyAv">${I('eyeoff')}</div><b id="lyWho">Customer #48213</b><span id="lyWhoS">Name hidden by the app</span></div>
      <ul class="ly-rows" id="lyRows"></ul>
    </div>
  </div>
</div></section>`;

  var sim = `
<section class="x-sec x-dark x-dots" id="rg-sim"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Calculator 1</span><h2 class="x-h2">What Are Your Regulars <span class="o">Really Costing You?</span></h2><p class="x-lead">Move the sliders to your numbers. See the commission you pay on repeat orders and what a loyalty program can win back.</p></div>
  <div class="x-two">
    <div class="x-dcard rv">
      <div class="x-fld"><div class="x-lbl"><label for="lyR">Regulars who order every month</label><output id="lyRv">300</output></div><input class="rng" type="range" id="lyR" min="20" max="3000" step="10" value="300"></div>
      <div class="x-fld"><div class="x-lbl"><label for="lyO">Orders per regular, per month</label><output id="lyOv">3</output></div><input class="rng" type="range" id="lyO" min="1" max="10" step="1" value="3"></div>
      <div class="x-fld"><div class="x-lbl"><label for="lyA">Average order value</label><output id="lyAv2">₹400</output></div><input class="rng" type="range" id="lyA" min="100" max="1500" step="10" value="400"></div>
      <div class="x-fld"><div class="x-lbl"><label for="lyC">Commission the app takes</label><output id="lyCv">25%</output></div><input class="rng" type="range" id="lyC" min="10" max="40" step="1" value="25"></div>
      <div class="x-fld"><div class="x-lbl"><label for="lyS">Regulars you move to your program</label><output id="lySv">50%</output></div><input class="rng" type="range" id="lyS" min="10" max="100" step="5" value="50"><small>Share of these regulars who join your own ordering and rewards.</small></div>
    </div>
    <div class="x-out rv" style="--dl:.08s" aria-live="polite">
      <div><p class="l">Commission you pay on your regulars every month</p><p class="big" id="lyNow">₹0</p></div>
      <div class="row"><span>Saved by moving them to your program</span><b id="lySave">₹0</b></div>
      <div class="row"><span>Extra orders from rewards (illustrative +10%)</span><b id="lyExtra">₹0</b></div>
      <div class="win"><p>Together, that could be worth</p><strong><span id="lyYear">₹0</span> / year</strong><small>An estimate from your numbers, not a promise. Your results depend on your restaurant.</small></div>
      <a class="btn btn-p btn-full" href="#rg-demo">Build My Loyalty Program ${I('arrow')}</a>
    </div>
  </div>
</div></section>`;

  var budget = `
<section class="x-sec x-cream x-dots" id="rg-budget"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Calculator 2</span><h2 class="x-h2">Do Rewards Pay for <span class="o">Themselves?</span></h2><p class="x-lead">Set how generous your rewards are. We compare the reward cost with the commission you stop paying.</p></div>
  <div class="x-two">
    <div class="x-card rv">
      <div class="x-fld"><div class="x-lbl"><label for="rbO">Orders from loyalty members each month</label><output id="rbOv">600</output></div><input class="rng lt" type="range" id="rbO" min="50" max="4000" step="50" value="600"></div>
      <div class="x-fld"><div class="x-lbl"><label for="rbA">Average order value</label><output id="rbAv">₹400</output></div><input class="rng lt" type="range" id="rbA" min="100" max="1500" step="10" value="400"></div>
      <div class="x-fld"><div class="x-lbl"><label for="rbP">Reward you give back (% of bill)</label><output id="rbPv">5%</output></div><input class="rng lt" type="range" id="rbP" min="1" max="15" step="1" value="5"><small>For example 1 point per ₹10 spent, worth about 5% of the bill.</small></div>
      <div class="x-fld"><div class="x-lbl"><label for="rbC">Commission these orders would pay on an app</label><output id="rbCv">25%</output></div><input class="rng lt" type="range" id="rbC" min="10" max="40" step="1" value="25"></div>
    </div>
    <div class="x-out rv" style="--dl:.08s" aria-live="polite">
      <div class="rb-cmp"><div><small>Commission on an app</small><b id="rbApp">₹0</b><i style="--w:100%"></i></div><div><small>Reward cost with loyalty</small><b id="rbRew">₹0</b><i id="rbBar" style="--w:20%"></i></div></div>
      <div class="win"><p>You keep an extra</p><strong><span id="rbNet">₹0</span> / month</strong><small id="rbMsg"></small></div>
      <a class="btn btn-p btn-full" href="#rg-demo">Set Up My Rewards ${I('arrow')}</a>
    </div>
  </div>
</div></section>`;

  var builder = `
<section class="x-sec" id="rg-style"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">Your program, your rules</span><h2 class="x-h2">Pick a Reward Style. <span class="o">See How It Looks.</span></h2><p class="x-lead">Every restaurant is different. We set up the style that fits your margins and your customers.</p></div>
  <div class="x-two ly-sty">
    <div class="rv">
      <div class="chips" id="lySty"><button class="on" data-v="0" type="button">${I('coins')}Points</button><button data-v="1" type="button">${I('award')}Stamp card</button><button data-v="2" type="button">${I('crown')}Tiers</button><button data-v="3" type="button">${I('users')}Referral</button></div>
      <h3 class="ly-sty-h" id="lyStyH"></h3>
      <p class="x-lead" id="lyStyP" style="margin-top:8px"></p>
      <ul class="x-checks ly-sty-l" id="lyStyL"></ul>
    </div>
    <div class="rv" style="--dl:.08s"><div class="ly-prev" id="lyPrev"></div></div>
  </div>
</div></section>`;

  var journey = `
<section class="x-sec x-dark x-dots" id="rg-journey"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">The member journey</span><h2 class="x-h2">From First Order to <span class="o">Regular Who Refers</span></h2><p class="x-lead">Tap a step to see what your customer gets on WhatsApp at that moment.</p></div>
  <div class="x-two ly-jr">
    <ul class="x-tl rv" id="lyTl"></ul>
    <div class="rv" style="--dl:.08s"><div class="ly-wa"><div class="ly-wa-h"><span class="ly-logo">${I('utensils')}</span><div><b>Spice Route</b><small>Business account</small></div></div><div class="ly-wa-c" id="lyWa"></div></div></div>
  </div>
</div></section>`;

  var vs = `
<section class="x-sec x-cream" id="rg-vs"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Discounts vs loyalty</span><h2 class="x-h2">Stop Buying Customers. <span class="o">Start Keeping Them.</span></h2></div>
  <div class="x-card rv" style="padding:0;overflow:hidden;max-width:920px;margin:0 auto">
    <table class="x-tbl"><thead><tr><th></th><th>Discounts on the app</th><th class="hl">Your loyalty program</th></tr></thead><tbody>
      <tr><td>Who owns the customer</td><td class="no">${I('x')}The app</td><td class="ok hl">${I('check')}You</td></tr>
      <tr><td>Cost of a repeat order</td><td class="no">${I('x')}25 to 30% commission</td><td class="ok hl">${I('check')}0% commission</td></tr>
      <tr><td>Can you message them?</td><td class="no">${I('x')}No</td><td class="ok hl">${I('check')}Anytime, on WhatsApp</td></tr>
      <tr><td>Builds a habit</td><td class="no">${I('x')}Buys one order</td><td class="ok hl">${I('check')}Points bring them back</td></tr>
      <tr><td>Your brand</td><td class="no">${I('x')}Lost inside the app</td><td class="ok hl">${I('check')}Front and center</td></tr>
    </tbody></table>
  </div>
  <div class="x-cta-row rv"><a class="btn btn-p" href="#rg-demo">Start My Loyalty Program ${I('arrow')}</a></div>
</div></section>`;

  var body = [
    S.topbar({ cta: 'Start My Loyalty Program', links: [['Real results', '#clx'], ['Calculators', '#rg-sim'], ['How it looks', '#rg-style'], ['FAQ', '#rg-faq']] }),
    hero, stats, S.logos('Trusted by 140+ restaurants, cafes and cloud kitchens'), gap,
    S.clients({ kick: 'Real numbers', h2: '37% to 44% of Orders Come From <span class="o">Returning Customers</span>', lead: 'These are real dashboards from restaurants on RestroGrow. Tap a client to see how many orders came from people who had ordered before.', focus: 'repeat' }),
    sim, budget, builder, journey,
    S.payouts({ kick: 'What a regular really pays you', h2: 'On an App, Every Repeat Order <span class="o">Pays the Platform Again</span>', lead: 'Two real delivery app payouts. See where each rupee of a regular\'s order goes, then switch to the same sales through your own ordering system.' }),
    vs, S.guarantee('Start My Loyalty Program'),
    S.faq([
      ['How does the loyalty program work?', 'Customers earn points or stamps on every direct order and redeem them for rewards you choose, like a free dessert. It runs on your own ordering website and WhatsApp.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. We move your regulars to your own program so their next orders come without commission.'],
      ['How do app customers find out about it?', 'Inserts in every app parcel, QR codes on tables and bills, and WhatsApp messages to the customers who join.'],
      ['Can I choose the rewards?', 'Yes. You decide the points, tiers and rewards, and we set them up so they fit your margins.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and the revenue from your direct orders. If it is less than 3X our service fee, we refund 100% of what you paid.'],
      ['Do I need any technical knowledge?', 'None. We set up the program, the rewards and the campaigns. You focus on your kitchen.']
    ]),
    S.finalCta({ h2: 'Your Best Customers Should Belong to You.', p: 'See your loyalty program working on your own menu in a 30 minute demo.', checks: ['Points, stamps, tiers or referrals', 'WhatsApp reminders included', '3X in 90 days or 100% back'], cta: 'Start My Loyalty Program' })
  ];

  var css = `
.rg .ly-hv{min-height:640px}
.rg .ly-real{position:absolute;left:-2%;top:46px;width:50%;transform:rotate(-5deg);z-index:1}
.rg .ly-real .shot-f{border-width:6px;border-radius:26px}
.rg .ly-front{position:absolute;right:-2%;top:0;width:58%;z-index:2}
.rg .ly-front .app{width:100%}
.rg .ly-n1{left:-4%;bottom:70px;animation-delay:-1s}
.rg .ly-n2{right:4%;bottom:-30px}
.rg .ly-s{background:#fff}
.rg .ly-hd{display:flex;justify-content:space-between;align-items:center;padding:40px 16px 8px}
.rg .ly-brand{display:flex;align-items:center;gap:9px}
.rg .ly-brand small{display:block;color:var(--mu);font-size:.64rem}
.rg .ly-brand b{font:800 1.05rem var(--fh)}
.rg .ly-logo{width:34px;height:34px;border-radius:11px;background:var(--o);color:#fff;display:grid;place-items:center;flex:none}
.rg .ly-logo .ic{width:18px;height:18px}
.rg .ly-pts{margin:6px 14px 0;padding:12px;border-radius:20px;background:var(--ink);color:#fff;text-align:center}
.rg .ly-pts p{font-size:.7rem;color:var(--dmu);margin-top:4px}
.rg .ly-ringw{position:relative;width:110px;height:110px;margin:0 auto}
.rg .ly-ringw svg{width:100%;height:100%;transform:rotate(-90deg)}
.rg .ly-ringw circle{fill:none;stroke-width:9}
.rg .ly-ringw .bg{stroke:rgba(255,255,255,.12)}
.rg .ly-ringw .fg{stroke:var(--o);stroke-linecap:round;stroke-dasharray:327;stroke-dashoffset:65;transition:stroke-dashoffset .7s var(--ease)}
.rg .ly-n{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.rg .ly-n b{font:800 1.9rem/1 var(--fh);font-variant-numeric:tabular-nums}
.rg .ly-n small{font-size:.62rem;color:var(--dmu)}
.rg .ly-card{margin:12px 14px 0;box-shadow:none;border:1px solid var(--ln)}
.rg .ly-ch{display:flex;justify-content:space-between;align-items:baseline;font-size:.72rem;color:var(--mu)}
.rg .ly-ch b{font:700 .85rem var(--fh);color:var(--tx)}
.rg .ly-st{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0}
.rg .ly-st i{aspect-ratio:1;border-radius:50%;border:2px dashed #E3D9CF;display:grid;place-items:center;color:transparent;transition:background .3s,border-color .3s,color .3s,transform .3s}
.rg .ly-st i .ic{width:46%;height:46%}
.rg .ly-st i.on{border:2px solid var(--o);background:var(--ot);color:var(--o)}
.rg .ly-st i.pop{animation:lyPop .45s var(--ease)}
.rg .ly-st i.last{border-color:#F6C7AE}
@keyframes lyPop{0%{transform:scale(.4)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
.rg .ly-rew{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:11px;background:var(--ot);font-size:.7rem;font-weight:600;color:#9A3412}
.rg .ly-rew .ic{width:18px;height:18px}
.rg .ly-rew.got{background:#DCFCE7;color:#166534}
.rg .ly-s .app-btn{margin:12px 14px 0;width:calc(100% - 28px)}
.rg .ly-foot{padding:8px 14px 14px;text-align:center;font-size:.66rem;color:var(--mu)}
.rg .ly-stats{background:#fff;border-bottom:1px solid var(--ln);padding:34px 0}
.rg .ly-stat b{display:block;font:800 clamp(1.7rem,3vw,2.3rem)/1.1 var(--fh);letter-spacing:-.02em;color:var(--o);font-variant-numeric:tabular-nums}
.rg .ly-stat span{display:block;font-size:.88rem;color:var(--mu);margin-top:4px}
.rg .ly-prof{max-width:940px;margin:0 auto;padding:0;overflow:hidden}
.rg .ly-prof-t{padding:18px 20px;border-bottom:1px solid var(--ln);display:flex;justify-content:center;background:var(--cream)}
.rg .ly-prof-b{display:grid;grid-template-columns:270px 1fr}
.rg .ly-who{padding:30px 20px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;border-right:1px solid var(--ln)}
.rg .ly-av{width:88px;height:88px;border-radius:50%;display:grid;place-items:center;background:#E5E7EB;color:#9CA3AF;transition:background .4s,color .4s}
.rg .ly-av .ic{width:38px;height:38px}
.rg [data-m=own] .ly-av{background:var(--o);color:#fff}
.rg .ly-who b{font:700 1.1rem var(--fh)}
.rg .ly-who span{font-size:.82rem;color:var(--mu)}
.rg .ly-rows{transition:opacity .25s}
.rg .ly-rows.sw{opacity:0}
.rg .ly-rows li{display:flex;align-items:center;gap:14px;padding:14px 22px;border-bottom:1px solid var(--ln);font-size:.94rem}
.rg .ly-rows li:last-child{border-bottom:0}
.rg .ly-rows li .ic{color:var(--mu)}
.rg .ly-rows li span{flex:1;color:var(--mu)}
.rg .ly-rows li b{font-weight:600;text-align:right}
.rg .ly-rows li.bad b,.rg .ly-rows li.bad .ic{color:#C2410C}
.rg .ly-rows li.good b,.rg .ly-rows li.good .ic{color:#15803D}
.rg .rb-cmp{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.rg .rb-cmp div{padding:16px;border-radius:16px;background:#F8F6F3}
.rg .rb-cmp small{display:block;font-size:.76rem;color:var(--mu)}
.rg .rb-cmp b{display:block;font:800 1.5rem var(--fh);margin:4px 0 10px;font-variant-numeric:tabular-nums}
.rg .rb-cmp i{display:block;height:9px;border-radius:9px;background:#E8E1D9;position:relative;overflow:hidden}
.rg .rb-cmp i::after{content:"";position:absolute;inset:0;width:var(--w);background:#C2410C;border-radius:9px;transition:width .6s var(--ease)}
.rg .rb-cmp div:last-child i::after{background:#16A34A}
.rg .ly-sty{align-items:center}
.rg .ly-sty-h{font:800 1.6rem var(--fh);margin-top:24px}
.rg .ly-sty-l{margin-top:18px}
.rg .ly-sty-l li{color:var(--tx)}
.rg .ly-prev{padding:24px;border-radius:26px;background:linear-gradient(160deg,#FFF1E8,#fff);border:1px solid var(--ln);min-height:330px;display:flex;flex-direction:column;justify-content:center;gap:14px}
.rg .pv-h{display:flex;justify-content:space-between;align-items:center}
.rg .pv-h b{font:800 1.1rem var(--fh)}
.rg .pv-big{font:800 2.8rem/1 var(--fh);color:var(--o);font-variant-numeric:tabular-nums}
.rg .pv-row{display:grid;grid-template-columns:36px 1fr auto;gap:12px;align-items:center;padding:12px;border-radius:14px;background:#fff;border:1px solid var(--ln);font-size:.88rem}
.rg .pv-row .i{width:36px;height:36px;border-radius:11px;display:grid;place-items:center}
.rg .pv-row b{display:block;font:700 .9rem var(--fh)}
.rg .pv-row small{color:var(--mu);font-size:.74rem}
.rg .pv-pg{height:7px;border-radius:7px;background:#EFE8E0;overflow:hidden;margin-top:6px}
.rg .pv-pg i{display:block;height:100%;background:var(--o);border-radius:7px}
.rg .pv-stamps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.rg .pv-stamps i{aspect-ratio:1;border-radius:50%;display:grid;place-items:center;border:2px dashed #E3D9CF;color:#fff}
.rg .pv-stamps i.on{background:var(--o);border:2px solid var(--o)}
.rg .pv-stamps i.free{background:#16A34A;border-color:#16A34A}
.rg .pv-stamps .ic{width:50%;height:50%}
.rg .pv-ticket{padding:18px;border-radius:18px;border:2px dashed var(--o);background:#fff;text-align:center}
.rg .pv-ticket b{display:block;font:800 1.5rem var(--fh);color:var(--o)}
.rg .pv-code{display:inline-flex;align-items:center;gap:8px;margin-top:10px;padding:8px 14px;border-radius:10px;background:var(--cream);font:700 .86rem var(--fh);letter-spacing:.06em}
.rg .ly-jr{align-items:center}
.rg .x-dark .x-tl li{color:#fff}
.rg .x-dark .x-tl li span{color:var(--dmu)}
.rg .x-dark .x-tl li .ic-b{background:rgba(255,255,255,.08);color:var(--dmu)}
.rg .x-dark .x-tl li.on{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);box-shadow:none}
.rg .x-dark .x-tl li.on .ic-b{background:var(--o);color:#fff}
.rg .ly-wa{border-radius:24px;overflow:hidden;background:#0B141A;border:1px solid var(--dln)}
.rg .ly-wa-h{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#075E54;color:#fff}
.rg .ly-wa-h b{display:block;font:700 .92rem var(--fh)}
.rg .ly-wa-h small{font-size:.7rem;opacity:.8}
.rg .ly-wa-c{padding:18px 14px;min-height:300px;display:flex;flex-direction:column;gap:9px;justify-content:flex-end;background:#0B141A radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/18px 18px}
.rg .wb{max-width:86%;padding:9px 12px;border-radius:10px;font-size:.88rem;line-height:1.5;color:#E9EDEF;animation:wbIn .45s var(--ease) both}
.rg .wb small{display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:3px;font-size:.64rem;opacity:.7}
.rg .wb small .ic{width:13px;height:13px;color:#53BDEB}
.rg .wb.biz{background:#202C33;border-top-left-radius:2px}
.rg .wb.me{background:#005C4B;align-self:flex-end;border-top-right-radius:2px}
@keyframes wbIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
@media (max-width:980px){
 .rg .ly-hv{min-height:0}.rg .ly-real,.rg .ly-n1,.rg .ly-n2{display:none}
 .rg .ly-front{position:static;width:min(100%,290px);margin:0 auto}
 .rg .ly-prof-b{grid-template-columns:1fr}.rg .ly-who{border-right:0;border-bottom:1px solid var(--ln)}
}
@media (max-width:520px){.rg .rb-cmp{grid-template-columns:1fr}}`;

  var js = `
  /* ---- hero: tap to earn ---- */
  var stamps=5,pts=240,st=$('lyStamps'),ICN='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  function tierOf(p){return p>=600?['PLATINUM','p',null]:p>=300?['GOLD','g',600]:['SILVER','s',300]}
  function draw(pop){
    var h='',i;for(i=0;i<8;i++)h+='<i class="'+(i<stamps?'on':'')+(i===7?' last':'')+(pop&&i===stamps-1?' pop':'')+'">'+ICN+'</i>';
    st.innerHTML=h;$('lyCount').textContent=stamps+' of 8 orders';
    var t=tierOf(pts),el=$('lyTier');el.textContent=t[0];el.className='pill '+t[1];
    var lo=t[2]===300?0:300,hi=t[2]||600,frac=t[2]?(pts-lo)/(hi-lo):1;
    $('lyArc').style.strokeDashoffset=327*(1-frac);
    $('lyNext').textContent=t[2]?(hi-pts)+' points to '+(t[2]===300?'Gold':'Platinum'):'Top tier reached';
    num($('lyPts'),pts,function(v){return Math.round(v)},500);
  }
  draw(false);
  var rew=$('lyRew'),btn=$('lyOrder'),foot=$('lyFoot'),bl=btn.querySelector('span');
  btn.addEventListener('click',function(){
    if(stamps>=8){stamps=0;rew.className='ly-rew';rew.lastChild.textContent='Free dessert on your 8th order';bl.textContent='Place an order, ₹450';foot.textContent='Reward redeemed. A new card starts now.';draw(false);return}
    stamps++;pts+=45;draw(true);
    if(stamps>=8){rew.className='ly-rew got';rew.lastChild.textContent='Reward unlocked: free dessert';bl.textContent='Redeem my free dessert';foot.textContent='That is how regulars are made.';confetti(btn)}
    else foot.textContent=(8-stamps)+' more order'+(8-stamps>1?'s':'')+' to a free dessert. No commission paid.';
  });

  /* ---- the loyalty gap ---- */
  var IC={eyeoff:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 6.2A9.5 9.5 0 0 1 12 6c5 0 8.5 4 9.5 6a12 12 0 0 1-2.6 3.3M6.6 7.6A12 12 0 0 0 2.5 12c1 2 4.5 6 9.5 6a9 9 0 0 0 3.2-.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
    user:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>'};
  var RI={u:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>',
    p:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    r:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
    w:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7a2 2 0 0 1 2-2h12v4"/><path d="M4 7v10a2 2 0 0 0 2 2h14v-4"/><path d="M21 9h-5a2 2 0 0 0 0 4h5z"/></svg>',
    m:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"/></svg>',
    c:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="17" r="2.3"/></svg>'};
  var PA=[['u','Name','Hidden','bad'],['p','Phone number','Hidden','bad'],['r','Orders from you',"You can't see",'bad'],['w','Lifetime spend','Unknown','bad'],['m','Can you send an offer?','No','bad'],['c','Commission on their next order','25 to 30%','bad']];
  var PO=[['u','Name','Rohan Sharma','good'],['p','Phone number','+91 98••• ••521','good'],['r','Orders from you','14 orders','good'],['w','Lifetime spend','₹8,420','good'],['m','Can you send an offer?','Yes, on WhatsApp','good'],['c','Commission on their next order','₹0','good']];
  var rows=$('lyRows'),prof=$('lyProf');
  function drawRows(m){
    var d=m==='own'?PO:PA;rows.className='ly-rows sw';
    setTimeout(function(){
      rows.innerHTML=d.map(function(r){return '<li class="'+r[3]+'">'+RI[r[0]]+'<span>'+r[1]+'</span><b>'+r[2]+'</b></li>'}).join('');
      prof.setAttribute('data-m',m);
      $('lyAv').innerHTML=m==='own'?IC.user:IC.eyeoff;
      $('lyWho').textContent=m==='own'?'Rohan Sharma':'Customer #48213';
      $('lyWhoS').textContent=m==='own'?'Gold member since January':'Name hidden by the app';
      rows.className='ly-rows';
    },RM?0:200);
  }
  drawRows('app');pick($('lyProfSeg'),drawRows);

  /* ---- calculator 1 ---- */
  var ids=['lyR','lyO','lyA','lyC','lyS'];
  function sim(){
    ids.forEach(function(i){fill($(i))});
    var R_=+$('lyR').value,O=+$('lyO').value,A=+$('lyA').value,C=+$('lyC').value/100,S_=+$('lyS').value/100;
    $('lyRv').textContent=R_.toLocaleString('en-IN');$('lyOv').textContent=O;$('lyAv2').textContent=inr(A);$('lyCv').textContent=Math.round(C*100)+'%';$('lySv').textContent=Math.round(S_*100)+'%';
    var rev=R_*O*A,now=rev*C,saved=rev*S_*C,extra=rev*S_*0.10;
    num($('lyNow'),now,inr);num($('lySave'),saved,inr);num($('lyExtra'),extra,inr);num($('lyYear'),(saved+extra)*12,sh);
  }
  ids.forEach(function(i){$(i).addEventListener('input',sim)});sim();

  /* ---- calculator 2 ---- */
  var rb=['rbO','rbA','rbP','rbC'];
  function budget(){
    rb.forEach(function(i){fill($(i))});
    var o=+$('rbO').value,a=+$('rbA').value,p=+$('rbP').value/100,c=+$('rbC').value/100;
    $('rbOv').textContent=o.toLocaleString('en-IN');$('rbAv').textContent=inr(a);$('rbPv').textContent=Math.round(p*100)+'%';$('rbCv').textContent=Math.round(c*100)+'%';
    var app=o*a*c,rew=o*a*p,net=app-rew;
    num($('rbApp'),app,inr);num($('rbRew'),rew,inr);num($('rbNet'),Math.max(0,net),inr);
    $('rbBar').style.setProperty('--w',Math.min(100,rew/app*100)+'%');
    $('rbMsg').textContent=net>0?'Even after paying out '+Math.round(p*100)+'% in rewards, you keep '+Math.round(net/app*100)+'% of the commission you would have paid.':'At this reward level the rewards cost more than the commission. Try a lower reward.';
  }
  rb.forEach(function(i){$(i).addEventListener('input',budget)});budget();

  /* ---- reward styles ---- */
  var STY=[
    {h:'Points on every order',p:'Customers earn points on every direct order and spend them on rewards you pick.',l:['1 point for every ₹10 spent','Rewards from a free drink to a free meal','Points show up in the customer\\'s account and on WhatsApp'],
     v:function(){return '<div class="pv-h"><b>Spice Route Rewards</b><span class="pill s">SILVER</span></div><div class="pv-big">240 pts</div>'+[['cake','Free dessert',200,100],['coffee','Free coffee',300,80],['bowl','Free starter',500,48]].map(function(r){return '<div class="pv-row"><span class="i t-o">'+IK[r[0]]+'</span><div><b>'+r[1]+'</b><small>'+r[2]+' points</small><div class="pv-pg"><i style="width:'+r[3]+'%"></i></div></div></div>'}).join('')}},
    {h:'A stamp card that fills up',p:'Simple and familiar. Every order adds a stamp and the last one is free.',l:['Every 8th order free, or any rule you like','No app download for customers','Stamps added automatically on every direct order'],
     v:function(){var s='';for(var i=0;i<10;i++)s+='<i class="'+(i<6?'on':i===9?'free':'')+'">'+(i===9?IK.gift:i<6?IK.check:'')+'</i>';return '<div class="pv-h"><b>Dessert Club</b><span class="pill ok">6 OF 10</span></div><div class="pv-stamps">'+s+'</div><div class="pv-row"><span class="i t-g">'+IK.gift+'</span><div><b>Your 10th order is free</b><small>4 more orders to go</small></div></div>'}},
    {h:'Tiers that make people climb',p:'Silver, Gold and Platinum give your best customers something to aim for.',l:['Better rewards at every level','Birthday gifts and early access to new dishes','Customers see exactly how close the next tier is'],
     v:function(){return '<div class="pv-h"><b>Your member tiers</b></div>'+[['Silver','From the first order','s','1x points'],['Gold','After 300 points','g','1.5x points and a free starter'],['Platinum','After 600 points','p','2x points and a free main every month']].map(function(t){return '<div class="pv-row"><span class="i t-'+(t[2]==='s'?'o':t[2]==='g'?'y':'p')+'">'+IK.crown+'</span><div><b>'+t[0]+'</b><small>'+t[1]+'. '+t[3]+'</small></div><span class="pill '+t[2]+'">'+t[0].toUpperCase()+'</span></div>'}).join('')}},
    {h:'Regulars who bring friends',p:'Your happiest customers become your best marketing. Reward both sides.',l:['Give a reward, get a reward','Each customer gets a personal code to share','You see every new customer who came through a referral'],
     v:function(){return '<div class="pv-h"><b>Invite a friend</b></div><div class="pv-ticket"><b>Give ₹100. Get ₹100.</b><small>When a friend places their first order</small><br><span class="pv-code">'+IK.link+'ROHAN100</span></div><div class="pv-row"><span class="i t-g">'+IK.users+'</span><div><b>3 friends joined</b><small>You earned ₹300 in rewards</small></div></div>'}}
  ];
  var IK={check:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    gift:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12"/><path d="M12 8c-1.5-3.5-5-4-5-1.5S10 8 12 8zM12 8c1.5-3.5 5-4 5-1.5S14 8 12 8z"/></svg>',
    crown:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l4.5 4 4.5-6 4.5 6L21 8l-2 11H5z"/></svg>',
    users:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.6 0 4.5 1.8 4.5 4.5"/></svg>',
    link:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/></svg>',
    cake:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M12 12V9M12 9c-1-1-1-2.2 0-3.2 1 1 1 2.2 0 3.2z"/><path d="M4 16c2 1.5 3.5 1.5 4 0 .5 1.5 3.5 1.5 4 0 .5 1.5 3.5 1.5 4 0 .5 1.5 2 1.5 4 0"/></svg>',
    coffee:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3v2M12 3v2"/></svg>',
    bowl:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z"/><path d="M8 7c0-1.5 1.5-1.5 1.5-3M12 7c0-1.5 1.5-1.5 1.5-3"/></svg>'};
  function drawSty(k){
    var s=STY[+k],ck='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
    $('lyStyH').textContent=s.h;$('lyStyP').textContent=s.p;
    $('lyStyL').innerHTML=s.l.map(function(x){return '<li>'+ck+x+'</li>'}).join('');
    $('lyPrev').innerHTML=s.v();
  }
  drawSty(0);pick($('lySty'),drawSty);

  /* ---- member journey ---- */
  var JR=[
    {i:'bag',t:'First direct order',d:'Joins in one tap at checkout. No app to download.',c:[['biz','Welcome to Spice Route Rewards, Rohan. You earned 45 points on your first order.','7:42 pm'],['me','Thanks, how do I use them?','7:44 pm'],['biz','Spend 200 points on a free dessert. You are 155 away.','7:44 pm']]},
    {i:'coins',t:'Earns points every time',d:'Each order adds points and a stamp, automatically.',c:[['biz','Order confirmed. 45 points added. You now have 240 points.','8:10 pm'],['me','Nice, ordering again this weekend','8:12 pm']]},
    {i:'bell',t:'Gets a gentle nudge',d:'A reminder before they drift to another restaurant.',c:[['biz','Rohan, your favourite biryani is one tap away. Free delivery today only.','1:10 pm'],['me','Ordering now','1:12 pm']]},
    {i:'crown',t:'Moves up a tier',d:'Gold unlocks better rewards and a reason to stay.',c:[['biz','You are now a Gold member. Enjoy 1.5x points and a free starter on your next order.','6:15 pm'],['me','Great, booking a table for Saturday','6:17 pm']]},
    {i:'users',t:'Brings a friend',d:'Referrals turn regulars into your best marketing.',c:[['biz','Your friend Priya just ordered with your code. ₹100 has been added to your wallet.','9:30 pm'],['me','Love it','9:31 pm']]}
  ];
  var JI={bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',coins:'<ellipse cx="9" cy="8" rx="6" ry="3"/><path d="M3 8v4c0 1.7 2.7 3 6 3s6-1.3 6-3V8"/><path d="M15 11.5c3.3 0 6 1.3 6 3v3c0 1.7-2.7 3-6 3-2.2 0-4-.6-5.1-1.4"/>',bell:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 21a2 2 0 0 0 4 0"/>',crown:'<path d="M3 8l4.5 4 4.5-6 4.5 6L21 8l-2 11H5z"/>',users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.6 0 4.5 1.8 4.5 4.5"/>'};
  var TK='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13l4 4 8-9"/><path d="M10 15l1 1 9-10"/></svg>';
  var tl=$('lyTl'),jcur=0,jt=null;
  tl.innerHTML=JR.map(function(j,i){return '<li data-i="'+i+'"><span class="ic-b"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+JI[j.i]+'</svg></span><div><b>'+j.t+'</b><span>'+j.d+'</span></div></li>'}).join('');
  function showJ(i){
    jcur=i;Array.prototype.forEach.call(tl.children,function(li,k){li.classList.toggle('on',k===i)});
    $('lyWa').innerHTML=JR[i].c.map(function(m,k){return '<div class="wb '+m[0]+'" style="animation-delay:'+(RM?0:k*.4)+'s">'+m[1]+'<small>'+m[2]+(m[0]==='me'?'':'')+' '+(m[0]==='biz'?'':TK)+'</small></div>'}).join('');
  }
  tl.addEventListener('click',function(e){var li=e.target.closest('li');if(li){clearInterval(jt);showJ(+li.getAttribute('data-i'))}});
  showJ(0);
  seen($('lyTl'),function(){if(!RM)jt=setInterval(function(){if(!document.hidden)showJ((jcur+1)%JR.length)},4500)},.4);
  `;

  return {
    slug: 'loyalty', name: 'Loyalty and repeat orders',
    title: 'Turn Zomato and Swiggy Customers Into Your Own Loyal Regulars | RestroGrow',
    desc: 'RestroGrow turns your app customers into your own loyal members with points, rewards and WhatsApp. Zero commission on repeat orders. 3X in 90 days or 100% back.',
    cta: 'Start My Loyalty Program', sticky: ['Free demo', ' Build your loyalty program'],
    body: body, css: css, js: js
  };
};
