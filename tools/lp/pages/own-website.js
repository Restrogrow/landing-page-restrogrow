// Landing page: OWN ORDERING WEBSITE.  Pitch: "stop renting a storefront from the apps, own yours".
'use strict';
var I = require('../icons.js').ic;

module.exports = function (S) {
  var B = S.BASE, P = S.DATA.proofs, PO = S.DATA.payouts;

  var hero = `
<section class="x-hero ow-hero" id="rg-hero"><div class="x-w ow-hw">
  <div class="ow-ht">
    <span class="x-eyb rv">${I('store')}For restaurants, cafes and cloud kitchens tired of paying the apps on every order</span>
    <h1 class="rv" style="--dl:.06s">Get Your Own Ordering Website, Like Zomato's. <span class="o">Keep 100% of Every Order.</span></h1>
    <p class="x-sub rv" style="--dl:.12s">A branded ordering website with your menu, your prices and online payments, set up for you by RestroGrow. Customers order in a few taps. Not a rupee goes to commission.</p>
    <div class="x-cta rv" style="--dl:.18s"><a class="btn btn-p" href="#rg-demo">Get My Ordering Website ${I('arrow')}</a><a class="x-btn2" href="#rg-brand">${I('sliders')}Build my storefront</a></div>
    <ul class="ow-chips rv" style="--dl:.22s"><li>${I('check')}Your menu and prices</li><li>${I('check')}Online payments</li><li>${I('check')}QR menu and WhatsApp</li><li>${I('check')}3X in 90 days or 100% back</li></ul>
    <div class="ow-tr rv" style="--dl:.26s">${S.trust()}</div>
  </div>
  <div class="ow-stage rv" style="--dl:.14s">
    <div class="ow-browser">
      <div class="ow-bar"><i></i><i></i><i></i><span>www.spiceroute.com</span></div>
      <div class="ow-site">
        <div class="ow-nav"><b>Spice Route</b><span>Menu</span><span>Offers</span><span>Track order</span><span class="ow-cartb" id="owCartB">${I('bag')}Cart (0)</span></div>
        <div class="ow-main">
          <div>
            <div class="ow-banner"><div><b>0% commission, 100% yours</b><span>Order direct and get 10% off your first order</span></div>${I('percent')}</div>
            <ul class="ow-menu" id="owMenu"></ul>
          </div>
          <aside class="ow-cart">
            <h4>Your order</h4>
            <ul class="ow-lines" id="owLines"><li class="ow-empty">Add something from the menu</li></ul>
            <div class="ow-tot"><span>Total</span><b id="owTot">₹0</b></div>
            <div class="ow-keep"><div><small>You keep on an app</small><b id="owApp">₹0</b></div><div class="g"><small>You keep here</small><b id="owOwn">₹0</b></div></div>
            <p class="ow-fn">App figure uses the 60% a real payout kept. Direct assumes a 2% payment fee.</p>
          </aside>
        </div>
      </div>
    </div>
    <div class="ow-real"><div class="shot-f" data-zoom="${B + P[4].file}"><img src="${B + P[4].file}" alt="Real RestroGrow client dashboard: 914 orders in three months"></div></div>
    <div class="x-note ow-n1"><i class="t-g">${I('up')}</i><span><b>914 orders in 3 months</b><small>Real client dashboard</small></span></div>
  </div>
</div></section>`;

  var stats = `
<section class="ow-stats"><div class="x-w"><div class="x-four">
  <div class="ow-stat rv"><b data-count="914">0</b><span>direct orders in 3 months at one real client</span></div>
  <div class="ow-stat rv" style="--dl:.06s"><b>₹3,48,960</b><span>in sales through the same client's own ordering</span></div>
  <div class="ow-stat rv" style="--dl:.12s"><b>43.65%</b><span>of those orders came from returning customers</span></div>
  <div class="ow-stat rv" style="--dl:.18s"><b>0%</b><span>commission on every direct order</span></div>
</div></div></section>`;

  var receipts = `
<section class="x-sec" id="rg-receipt"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">Rented vs owned</span><h2 class="x-h2">The Same Order. <span class="o">Two Very Different Receipts.</span></h2><p class="x-lead">The delivery app receipt below uses the real percentages from an actual payout statement. Move the sliders to your own order value and volume.</p></div>
  <div class="ow-rc-wrap">
    <div class="ow-rc-ctl x-card rv">
      <div class="x-fld"><div class="x-lbl"><label for="rcV">Order value</label><output id="rcVv">₹500</output></div><input class="rng lt" type="range" id="rcV" min="150" max="2000" step="10" value="500"></div>
      <div class="x-fld"><div class="x-lbl"><label for="rcN">Orders per day</label><output id="rcNv">100</output></div><input class="rng lt" type="range" id="rcN" min="10" max="800" step="10" value="100"></div>
      <div class="x-fld"><div class="x-lbl"><label for="rcS">Share you move to your own website</label><output id="rcSv">30%</output></div><input class="rng lt" type="range" id="rcS" min="10" max="100" step="5" value="30"></div>
      <div class="ow-real2"><div class="shot-f wide" data-zoom="${B + PO[0].file}"><img src="${B + PO[0].file}" alt="Real delivery app payout statement"><span class="shot-zoom">${I('search')}Real payout</span></div></div>
    </div>
    <div class="ow-rc rv" style="--dl:.06s">
      <div class="ow-rc-h">${I('mobile')}<b>Delivery app receipt</b></div>
      <ul id="rcApp"></ul>
      <div class="ow-rc-t"><span>You receive</span><b id="rcAppT">₹0</b></div>
    </div>
    <div class="ow-rc own rv" style="--dl:.12s">
      <div class="ow-rc-h">${I('store')}<b>Your own website</b></div>
      <ul id="rcOwn"></ul>
      <div class="ow-rc-t"><span>You receive</span><b id="rcOwnT">₹0</b></div>
    </div>
  </div>
  <div class="ow-gain rv"><div><small>On this one order you keep</small><b id="rcGain">₹0</b><span>more</span></div><div><small>Every month, moving <i id="rcShare">30%</i> of orders</small><b id="rcMonth">₹0</b><span>more</span></div><a class="btn btn-p" href="#rg-demo">Get My Ordering Website ${I('arrow')}</a></div>
</div></section>`;

  var brand = `
<section class="x-sec x-cream x-dots" id="rg-brand"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">See it with your name</span><h2 class="x-h2">Your Brand. <span class="o">Your Storefront.</span></h2><p class="x-lead">Type your restaurant's name and pick a style. This is the kind of website we build for you.</p></div>
  <div class="x-two ow-brand">
    <div class="x-card rv">
      <div class="ow-f"><label for="owName">Restaurant name</label><input id="owName" type="text" value="Spice Route" maxlength="24" autocomplete="off"></div>
      <div class="ow-f"><label>What do you serve?</label><div class="chips" id="owCui"><button class="on" data-v="biryani" type="button">${I('bowl')}Biryani</button><button data-v="pizza" type="button">${I('pizza')}Pizza and burgers</button><button data-v="cafe" type="button">${I('coffee')}Cafe and bakery</button><button data-v="momos" type="button">${I('utensils')}Momos and Chinese</button></div></div>
      <div class="ow-f"><label>Brand colour</label><div class="ow-sw" id="owCol"></div></div>
      <p class="x-note2">A live preview. We build your real website with your actual menu, photos and prices.</p>
      <a class="btn btn-p" href="#rg-demo" style="margin-top:10px">Get My Ordering Website ${I('arrow')}</a>
    </div>
    <div class="ow-browser ow-b2 rv" style="--dl:.08s" id="owBr">
      <div class="ow-bar"><i></i><i></i><i></i><span id="owUrl">www.spiceroute.com</span></div>
      <div class="ow-site">
        <div class="ow-nav"><b id="owLogo">Spice Route</b><span>Menu</span><span>Offers</span><span class="ow-cartb">${I('bag')}Cart (0)</span></div>
        <div class="ow-hero2"><div><small>Order direct and save</small><h3 id="owH">Hungry? Order from Spice Route</h3><span class="ow-cta2">Order now</span></div><div class="ow-hero-i" id="owHi"></div></div>
        <div class="ow-cards" id="owCards"></div>
      </div>
    </div>
  </div>
</div></section>`;

  var tour = `
<section class="x-sec x-dark x-dots" id="rg-tour"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">What your customers see</span><h2 class="x-h2">An Ordering Experience <span class="o">They Already Know</span></h2><p class="x-lead">Tap through the four screens every customer goes through, from menu to doorstep.</p></div>
  <div class="x-two ow-tour rv">
    <div>
      <div class="seg" id="owTabs"><button class="on" data-v="0" type="button">${I('menu')}Menu</button><button data-v="1" type="button">${I('bag')}Cart</button><button data-v="2" type="button">${I('card')}Payment</button><button data-v="3" type="button">${I('truck')}Tracking</button></div>
      <h3 class="ow-tt" id="owTt"></h3>
      <ul class="x-checks" id="owTl"></ul>
      <a class="btn btn-p" href="#rg-demo" style="margin-top:26px">Get My Ordering Website ${I('arrow')}</a>
    </div>
    <div><div class="app" style="width:min(100%,290px);margin:0 auto"><div class="app-s ow-ts" id="owTs"></div></div></div>
  </div>
</div></section>`;

  var feats = `
<section class="x-sec" id="rg-feat"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">The complete system</span><h2 class="x-h2">More Than a Website. <span class="o">A Full Direct-Order Engine.</span></h2><p class="x-lead">Everything that brings customers to your site and makes every order bigger.</p></div>
  <div class="x-three ow-feat">
    <div class="x-card rv"><div class="x-ico">${I('qr')}</div><h3>QR menu</h3><p class="m">Guests scan, browse and order from the table. Every dine-in guest becomes a customer you can reach again.</p></div>
    <div class="x-card rv" style="--dl:.06s"><div class="x-ico">${I('whatsapp')}</div><h3>WhatsApp CRM</h3><p class="m">Every number saved. Send offers, festive deals and review requests whenever you want.</p></div>
    <div class="x-card rv" style="--dl:.12s"><div class="x-ico">${I('award')}</div><h3>Loyalty program</h3><p class="m">Points and rewards that give regulars a reason to order from you and not the next restaurant.</p></div>
    <div class="x-card rv"><div class="x-ico">${I('tag')}</div><h3>Combos and upsells</h3><p class="m">Smart add-ons at checkout so every customer spends a little more on every order.</p></div>
    <div class="x-card rv" style="--dl:.06s"><div class="x-ico">${I('pin')}</div><h3>Google Business Profile</h3><p class="m">Posts and review replies so nearby customers find you first and order direct.</p></div>
    <div class="x-card rv" style="--dl:.12s"><div class="x-ico">${I('mobile')}</div><h3>Mobile app and POS</h3><p class="m">Track orders, customers and stock from your phone, with billing connected to every order.</p></div>
  </div>
</div></section>`;

  var body = [
    S.topbar({ cta: 'Get My Ordering Website', links: [['The receipts', '#rg-receipt'], ['Brand it', '#rg-brand'], ['Real results', '#clx'], ['FAQ', '#rg-faq']] }),
    hero, stats, S.logos('Trusted by 140+ restaurants, cafes and cloud kitchens'), receipts, brand,
    S.clients({ kick: 'Real numbers', h2: 'Direct Orders at <span class="o">Real Restaurants</span>', lead: 'Real dashboards from restaurants taking orders on their own RestroGrow ordering system. Tap a client to see its orders and what the apps would have charged.', focus: 'orders' }),
    tour, feats, S.guarantee('Get My Ordering Website'),
    S.faq([
      ['Is it like the Zomato or Swiggy ordering experience?', 'Yes. Customers browse your menu, add items and pay online in a few taps, on your own branded website.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers and move your regulars to direct ordering.'],
      ['Does RestroGrow take a commission on my orders?', 'No. There is no per order platform commission to RestroGrow. Every direct order is yours. A small payment gateway fee applies on online payments.'],
      ['How will customers find my website?', 'We put it where they already see you: inserts in app parcels, QR codes on tables, WhatsApp, your Google profile and social media.'],
      ['Who delivers direct orders?', 'We set up delivery to fit your outlet, with your own riders or a delivery partner. We walk you through the options in the demo.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]),
    S.finalCta({ h2: 'Own the Storefront. Keep the Profit.', p: 'See your own ordering website with your menu on it in a 30 minute demo.', checks: ['Your brand, menu and prices', 'Online payments included', '3X in 90 days or 100% back'], cta: 'Get My Ordering Website' })
  ];

  var css = `
.rg .ow-hero .ow-hw{display:block;text-align:center}
.rg .ow-ht{max-width:860px;margin:0 auto}
.rg .ow-ht .x-sub{margin-left:auto;margin-right:auto}
.rg .ow-ht .x-cta{justify-content:center}
.rg .ow-chips{display:flex;flex-wrap:wrap;gap:8px 22px;justify-content:center;margin-top:24px;font-size:.92rem;color:#E4E4EE}
.rg .ow-chips li{display:flex;gap:8px;align-items:center}
.rg .ow-chips .ic{color:var(--o)}
.rg .ow-stage{position:relative;max-width:1040px;margin:clamp(36px,5vw,60px) auto 0;text-align:left;padding:0 0 10px}
.rg .ow-browser{position:relative;z-index:2;border-radius:18px;background:#fff;color:var(--tx);overflow:hidden;box-shadow:0 50px 100px -40px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.08)}
.rg .ow-stage .ow-browser{width:calc(100% - 150px)}
.rg .ow-bar{display:flex;align-items:center;gap:6px;padding:11px 14px;background:#F3EFEA;border-bottom:1px solid var(--ln)}
.rg .ow-bar i{width:10px;height:10px;border-radius:50%;background:#D9D2CA}
.rg .ow-bar span{margin-left:10px;flex:1;padding:5px 12px;border-radius:99px;background:#fff;font-size:.76rem;color:var(--mu);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rg .ow-site{padding:16px 18px 20px}
.rg .ow-nav{display:flex;align-items:center;gap:16px;font-size:.8rem;color:var(--mu)}
.rg .ow-nav b{font:800 1.1rem var(--fh);color:var(--bc,var(--o));margin-right:auto;transition:color .3s}
.rg .ow-cartb{display:inline-flex;align-items:center;gap:6px;padding:7px 13px;border-radius:99px;background:var(--bc,var(--o));color:#fff;font-weight:600;transition:background .3s}
.rg .ow-cartb .ic{width:15px;height:15px}
.rg .ow-main{display:grid;grid-template-columns:1.35fr 1fr;gap:18px;margin-top:16px}
.rg .ow-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-radius:14px;background:linear-gradient(120deg,var(--o),#FF8A3D);color:#fff}
.rg .ow-banner b{display:block;font:800 1rem var(--fh)}
.rg .ow-banner span{font-size:.76rem;opacity:.95}
.rg .ow-banner .ic{width:34px;height:34px;opacity:.9}
.rg .ow-menu{margin-top:10px}
.rg .ow-menu li{display:grid;grid-template-columns:46px 1fr auto;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid #F1ECE6}
.rg .ow-it{width:46px;height:46px;border-radius:13px;display:grid;place-items:center}
.rg .ow-it .ic{width:24px;height:24px}
.rg .ow-menu p{font:600 .88rem/1.25 var(--fh)}
.rg .ow-menu small{display:block;color:var(--mu);font:500 .78rem var(--fb);margin-top:2px}
.rg .ow-add{height:32px;min-width:62px;padding:0 12px;border-radius:10px;border:1.5px solid var(--o);background:#fff;color:var(--o);font:700 .8rem var(--fh);cursor:pointer;transition:background .2s,color .2s}
.rg .ow-add:hover{background:var(--o);color:#fff}
.rg .ow-step{display:inline-flex;align-items:center;height:32px;border-radius:10px;background:var(--o);color:#fff;font:700 .85rem var(--fh);overflow:hidden}
.rg .ow-step button{width:28px;height:32px;border:0;background:transparent;color:#fff;font-size:1rem;cursor:pointer;display:grid;place-items:center}
.rg .ow-step button .ic{width:14px;height:14px}
.rg .ow-step span{min-width:18px;text-align:center}
.rg .ow-cart{padding:16px;border-radius:16px;background:#FBF6F1;display:flex;flex-direction:column}
.rg .ow-cart h4{font:700 .95rem var(--fh);margin-bottom:8px}
.rg .ow-lines{min-height:88px}
.rg .ow-lines li{display:flex;justify-content:space-between;gap:8px;padding:6px 0;font-size:.82rem;border-bottom:1px dashed #E3D9CF}
.rg .ow-lines li b{font:700 .82rem var(--fh);font-variant-numeric:tabular-nums}
.rg .ow-empty{color:var(--mu);border:0!important;padding-top:20px!important}
.rg .ow-tot{display:flex;justify-content:space-between;align-items:baseline;margin-top:8px;font-size:.88rem}
.rg .ow-tot b{font:800 1.4rem var(--fh);font-variant-numeric:tabular-nums}
.rg .ow-keep{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.rg .ow-keep div{padding:10px;border-radius:12px;background:#fff;border:1px solid var(--ln)}
.rg .ow-keep div.g{background:#E6F6EC;border-color:#BBE5C9}
.rg .ow-keep small{display:block;font-size:.66rem;color:var(--mu)}
.rg .ow-keep b{font:800 1.05rem var(--fh);font-variant-numeric:tabular-nums}
.rg .ow-keep .g b{color:#15803D}
.rg .ow-fn{margin-top:8px;font-size:.66rem;color:var(--mu)}
.rg .ow-real{position:absolute;right:-10px;bottom:-24px;width:165px;z-index:3;transform:rotate(4deg)}
.rg .ow-real .shot-f{border-width:5px;border-radius:24px}
.rg .ow-n1{left:-26px;bottom:-26px;z-index:4;animation-delay:-1s}.rg .ow-tr{display:flex;justify-content:center}.rg .ow-tr .x-trust p{text-align:left}
.rg .ow-stats{background:#fff;border-bottom:1px solid var(--ln);padding:34px 0}
.rg .ow-stat b{display:block;font:800 clamp(1.7rem,3vw,2.3rem)/1.1 var(--fh);letter-spacing:-.02em;color:var(--o);font-variant-numeric:tabular-nums}
.rg .ow-stat span{display:block;font-size:.88rem;color:var(--mu);margin-top:4px}
.rg .ow-rc-wrap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;align-items:start}
.rg .ow-rc-ctl .x-fld{margin-bottom:22px}
.rg .ow-real2{margin-top:6px;max-width:210px}
.rg .ow-rc{position:relative;padding:22px 20px 26px;background:#fff;border:1px solid var(--ln);border-radius:6px 6px 0 0;box-shadow:0 24px 50px -34px rgba(0,0,0,.4);font-variant-numeric:tabular-nums}
.rg .ow-rc::after{content:"";position:absolute;left:0;right:0;bottom:-10px;height:10px;background:linear-gradient(135deg,#fff 50%,transparent 50%) 0 0/14px 10px,linear-gradient(225deg,#fff 50%,transparent 50%) 0 0/14px 10px;filter:drop-shadow(0 4px 3px rgba(0,0,0,.08))}
.rg .ow-rc.own{border-color:#BBE5C9;background:#FBFFFC}
.rg .ow-rc.own::after{background:linear-gradient(135deg,#FBFFFC 50%,transparent 50%) 0 0/14px 10px,linear-gradient(225deg,#FBFFFC 50%,transparent 50%) 0 0/14px 10px}
.rg .ow-rc-h{display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:2px dashed var(--ln);margin-bottom:6px}
.rg .ow-rc-h .ic{color:var(--o);width:22px;height:22px}
.rg .ow-rc-h b{font:800 1rem var(--fh)}
.rg .ow-rc li{display:flex;justify-content:space-between;gap:10px;padding:8px 0;font-size:.88rem;border-bottom:1px dashed var(--ln)}
.rg .ow-rc li span{color:var(--mu)}
.rg .ow-rc li b{font-weight:600}
.rg .ow-rc li.neg b{color:#C2410C}.rg .ow-rc li.pos b{color:#15803D}
.rg .ow-rc-t{display:flex;justify-content:space-between;align-items:baseline;margin-top:12px;padding-top:12px;border-top:2px solid var(--tx)}
.rg .ow-rc-t span{font-weight:600}
.rg .ow-rc-t b{font:800 1.7rem var(--fh);color:#C2410C}
.rg .ow-rc.own .ow-rc-t b{color:#15803D}
.rg .ow-gain{display:flex;flex-wrap:wrap;gap:18px 40px;align-items:center;justify-content:center;margin-top:44px;padding:24px 28px;border-radius:22px;background:var(--ink);color:#fff}
.rg .ow-gain small{display:block;font-size:.8rem;color:var(--dmu)}
.rg .ow-gain small i{font-style:normal;color:#fff;font-weight:600}
.rg .ow-gain b{font:800 clamp(1.7rem,3vw,2.3rem) var(--fh);color:#4ADE80;font-variant-numeric:tabular-nums;margin-right:8px}
.rg .ow-gain span{color:var(--dmu);font-size:.9rem}
.rg .ow-f{margin-bottom:20px}
.rg .ow-f label{display:block;font:600 .85rem var(--fh);margin-bottom:8px}
.rg .ow-f input{width:100%;height:50px;padding:0 16px;border-radius:12px;border:1.5px solid #E4E0EA;font:500 1rem var(--fb);outline:none;background:#fff}
.rg .ow-f input:focus{border-color:var(--o)}
.rg .ow-sw{display:flex;gap:10px;flex-wrap:wrap}
.rg .ow-sw button{width:38px;height:38px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1.5px #D9D2CA;cursor:pointer;transition:transform .2s,box-shadow .2s}
.rg .ow-sw button.on{box-shadow:0 0 0 3px var(--ink);transform:scale(1.1)}
.rg .ow-b2{--bc:#FC5301;align-self:start}
.rg .ow-hero2{display:grid;grid-template-columns:1.2fr .8fr;gap:10px;align-items:center;margin-top:16px;padding:18px;border-radius:16px;background:color-mix(in srgb,var(--bc) 12%,#fff);transition:background .3s}
.rg .ow-hero2 small{color:var(--mu);font-size:.74rem}
.rg .ow-hero2 h3{font:800 clamp(1.1rem,2.2vw,1.45rem)/1.2 var(--fh);margin:4px 0 12px}
.rg .ow-cta2{display:inline-block;padding:9px 16px;border-radius:10px;background:var(--bc);color:#fff;font:700 .8rem var(--fh);transition:background .3s}
.rg .ow-hero-i{display:grid;place-items:center}
.rg .ow-hero-i span{width:92px;height:92px;border-radius:26px;display:grid;place-items:center;background:var(--bc);color:#fff;animation:owPop .5s var(--ease)}
.rg .ow-hero-i .ic{width:46px;height:46px}
@keyframes owPop{from{transform:scale(.7) rotate(-8deg);opacity:0}to{transform:none;opacity:1}}
.rg .ow-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.rg .ow-cards div{padding:12px 10px;border:1px solid var(--ln);border-radius:14px;text-align:center}
.rg .ow-cards .ow-it{margin:0 auto 8px}
.rg .ow-cards p{font:600 .78rem/1.25 var(--fh)}
.rg .ow-cards small{display:block;color:var(--bc);font:700 .8rem var(--fh);margin-top:3px}
.rg .ow-tour{align-items:center}
.rg .ow-tt{font:800 1.5rem var(--fh);margin:26px 0 12px}
.rg .ow-ts{background:#fff;min-height:520px}
.rg .ow-ts-h{padding:42px 16px 10px;font:800 1.05rem var(--fh);display:flex;justify-content:space-between;align-items:center}
.rg .ow-ts-h small{font:500 .7rem var(--fb);color:var(--mu)}
.rg .ow-ts-b{padding:0 16px;animation:owPop .45s var(--ease)}
.rg .ow-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F1ECE6;font-size:.82rem}
.rg .ow-row .ow-it{width:40px;height:40px;border-radius:12px}
.rg .ow-row .ow-it .ic{width:20px;height:20px}
.rg .ow-row span{flex:1;font-weight:600}
.rg .ow-row b{font:700 .82rem var(--fh)}
.rg .ow-ttl{display:flex;justify-content:space-between;padding:12px 0;font:800 1rem var(--fh)}
.rg .ow-code{display:flex;justify-content:space-between;padding:10px 12px;border-radius:12px;background:#E6F6EC;color:#15803D;font-size:.78rem;font-weight:600;margin-top:10px}
.rg .ow-pay{display:grid;gap:10px;margin:6px 0 14px}
.rg .ow-pay div{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:14px;border:1.5px solid var(--ln);font-size:.84rem;font-weight:600}
.rg .ow-pay div.on{border-color:var(--o);background:var(--ot)}
.rg .ow-pay i{width:16px;height:16px;border-radius:50%;border:2px solid #D1D5DB;flex:none}
.rg .ow-pay .on i{border:5px solid var(--o)}
.rg .ow-pbtn{display:block;text-align:center;padding:13px;border-radius:14px;background:var(--o);color:#fff;font:700 .92rem var(--fh)}
.rg .ow-track{padding:6px 4px}
.rg .ow-track li{display:flex;gap:12px;align-items:flex-start;padding-bottom:20px;position:relative;font-size:.84rem}
.rg .ow-track li::before{content:"";position:absolute;left:11px;top:24px;bottom:0;width:2px;background:#E5E7EB}
.rg .ow-track li:last-child::before{display:none}
.rg .ow-track i{width:24px;height:24px;border-radius:50%;flex:none;display:grid;place-items:center;background:#E5E7EB;color:#9CA3AF;transition:background .5s,color .5s}
.rg .ow-track i .ic{width:13px;height:13px}
.rg .ow-track li.on i{background:var(--o);color:#fff}
.rg .ow-track li.on::before{background:var(--o)}
.rg .ow-track b{display:block;font:700 .88rem var(--fh)}
.rg .ow-track small{color:var(--mu)}
.rg .ow-eta{margin-top:4px;padding:12px 14px;border-radius:14px;background:var(--ink);color:#fff;font-size:.8rem}
.rg .ow-eta b{font:800 1.2rem var(--fh);color:var(--o)}
@media (max-width:980px){
 .rg .ow-stage .ow-browser{width:100%}.rg .ow-real,.rg .ow-n1{display:none}
 .rg .ow-main{grid-template-columns:1fr}.rg .ow-rc-wrap{grid-template-columns:1fr}
}
@media (max-width:560px){.rg .ow-nav span:not(.ow-cartb){display:none}.rg .ow-hero2{grid-template-columns:1fr}.rg .ow-hero-i{display:none}}`;

  var js = `
  var SV={ic:function(p){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'}};
  var IP={bowl:'<path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9z"/><path d="M8 7c0-1.5 1.5-1.5 1.5-3M12 7c0-1.5 1.5-1.5 1.5-3"/>',
    pizza:'<path d="M12 21L4 6c5-3.5 11-3.5 16 0z"/><circle cx="10" cy="10" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="11.5" cy="15" r="1.1"/>',
    utensils:'<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6"/><path d="M17 3c-2 2-3 4.5-3 7 0 1.5 1 3 3 3v8"/>',
    coffee:'<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M8 3v2M12 3v2"/>',
    cake:'<path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M12 12V9M12 9c-1-1-1-2.2 0-3.2 1 1 1 2.2 0 3.2z"/><path d="M4 16c2 1.5 3.5 1.5 4 0 .5 1.5 3.5 1.5 4 0 .5 1.5 3.5 1.5 4 0 .5 1.5 2 1.5 4 0"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',store:'<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9"/><path d="M5 12v8h14v-8"/><path d="M10 20v-5h4v5"/>',
    bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'};
  var TINT=['t-o','t-y','t-g','t-b','t-p','t-r'];
  /* ---- hero storefront ---- */
  var M=[['bowl','Chicken Biryani',320],['pizza','Paneer Pizza',280],['utensils','Veg Burger',180],['coffee','Filter Coffee',90],['cake','Brownie',120]],q=[0,0,0,0,0],menu=$('owMenu');
  function drawMenu(){
    menu.innerHTML=M.map(function(m,i){return '<li><span class="ow-it '+TINT[i]+'">'+SV.ic(IP[m[0]])+'</span><div><p>'+m[1]+'</p><small>'+inr(m[2])+'</small></div>'+
      (q[i]?'<span class="ow-step"><button type="button" data-i="'+i+'" data-d="-1" aria-label="Less">'+SV.ic(IP.minus)+'</button><span>'+q[i]+'</span><button type="button" data-i="'+i+'" data-d="1" aria-label="More">'+SV.ic(IP.plus)+'</button></span>':'<button class="ow-add" type="button" data-i="'+i+'" data-d="1">Add</button>')+'</li>'}).join('');
    var n=0,t=0,lines='';q.forEach(function(v,i){if(v){n+=v;t+=v*M[i][2];lines+='<li><span>'+M[i][1]+' x'+v+'</span><b>'+inr(v*M[i][2])+'</b></li>'}});
    $('owLines').innerHTML=lines||'<li class="ow-empty">Add something from the menu</li>';
    $('owCartB').innerHTML=SV.ic(IP.bag)+'Cart ('+n+')';
    num($('owTot'),t,inr,400);num($('owApp'),t*0.60,inr,400);num($('owOwn'),t*0.98,inr,400);
  }
  menu.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var i=+b.getAttribute('data-i');q[i]=Math.max(0,q[i]+(+b.getAttribute('data-d')));drawMenu()});
  drawMenu();

  /* ---- receipts (percentages come from a real payout: base 22.25, long distance 1.88, payment 2.01, tax 6.00, growth 8.36, credits +0.49) ---- */
  var RC=[['Platform service fee',22.25],['Long distance fee',1.88],['Payment mechanism fee',2.01],['Tax deductions',6.00],['Investments in growth',8.36],['Credits and additions',-0.49]],rids=['rcV','rcN','rcS'];
  function rc(){
    rids.forEach(function(i){fill($(i))});
    var v=+$('rcV').value,n=+$('rcN').value,s=+$('rcS').value/100;
    $('rcVv').textContent=inr(v);$('rcNv').textContent=n;$('rcSv').textContent=Math.round(s*100)+'%';$('rcShare').textContent=Math.round(s*100)+'%';
    var tot=RC.reduce(function(a,r){return a+r[1]},0),appKeep=v*(1-tot/100);
    $('rcApp').innerHTML='<li><span>Order value</span><b>'+inr(v)+'</b></li>'+RC.map(function(r){var a=v*r[1]/100;return '<li class="'+(a<0?'pos':'neg')+'"><span>'+r[0]+'</span><b>'+(a<0?'+':'−')+'₹'+Math.abs(a).toFixed(2)+'</b></li>'}).join('');
    $('rcOwn').innerHTML='<li><span>Order value</span><b>'+inr(v)+'</b></li><li class="neg"><span>Platform commission</span><b>₹0.00</b></li><li class="neg"><span>Tax on commission</span><b>₹0.00</b></li><li class="neg"><span>Growth and ad charges</span><b>₹0.00</b></li><li class="neg"><span>Payment gateway, about 2%</span><b>−₹'+(v*0.02).toFixed(2)+'</b></li>';
    num($('rcAppT'),appKeep,function(x){return '₹'+x.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',')},500);
    num($('rcOwnT'),v*0.98,function(x){return '₹'+x.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',')},500);
    var gain=v*0.98-appKeep;num($('rcGain'),gain,inr,500);num($('rcMonth'),gain*n*30*s,inr,500);
  }
  rids.forEach(function(i){$(i).addEventListener('input',rc)});rc();

  /* ---- brand it ---- */
  var CU={
    biryani:{h:'Hungry? Order biryani from ',ic:'bowl',items:[['bowl','Chicken Dum Biryani',360],['bowl','Veg Biryani',280],['cake','Brownie Box',120]]},
    pizza:{h:'Fresh pizza and burgers from ',ic:'pizza',items:[['pizza','Margherita Pizza',299],['utensils','Classic Burger',189],['cake','Choco Lava Cake',99]]},
    cafe:{h:'Your daily coffee from ',ic:'coffee',items:[['coffee','Cappuccino',140],['coffee','Cold Coffee',160],['cake','Blueberry Muffin',110]]},
    momos:{h:'Hot momos and noodles from ',ic:'utensils',items:[['utensils','Steamed Momos',120],['utensils','Fried Momos',140],['bowl','Hakka Noodles',180]]}
  };
  var COL=['#FC5301','#DC2626','#16A34A','#2563EB','#7C3AED','#111827'],cu='biryani',nm=$('owName'),br=$('owBr');
  $('owCol').innerHTML=COL.map(function(k,i){return '<button type="button" aria-label="Colour '+(i+1)+'" data-c="'+k+'" style="background:'+k+'"'+(i?'':' class="on"')+'></button>'}).join('');
  function drawBrand(){
    var n=(nm.value.trim()||'Your Restaurant'),slug=n.toLowerCase().replace(/[^a-z0-9]+/g,'');
    $('owLogo').textContent=n;$('owUrl').textContent='www.'+(slug||'yourrestaurant')+'.com';
    $('owH').textContent=CU[cu].h+n;
    $('owHi').innerHTML='<span>'+SV.ic(IP[CU[cu].ic])+'</span>';
    $('owCards').innerHTML=CU[cu].items.map(function(it,i){return '<div><span class="ow-it '+TINT[i]+'">'+SV.ic(IP[it[0]])+'</span><p>'+it[1]+'</p><small>'+inr(it[2])+'</small></div>'}).join('');
  }
  nm.addEventListener('input',drawBrand);
  pick($('owCui'),function(v){cu=v;drawBrand()});
  $('owCol').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    Array.prototype.forEach.call($('owCol').children,function(x){x.classList.toggle('on',x===b)});br.style.setProperty('--bc',b.getAttribute('data-c'))});
  drawBrand();

  /* ---- customer tour ---- */
  var CKI='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  function row(m,qty){return '<div class="ow-row"><span class="ow-it '+TINT[m[3]]+'">'+SV.ic(IP[m[0]])+'</span><span>'+m[1]+(qty?' x'+qty:'')+'</span><b>'+inr(m[2]*(qty||1))+'</b></div>'}
  var TT=[
    {t:'Browse a menu they already know',l:['Photos, prices and categories, just like the apps','Search and filters for fast ordering','Offers shown right on the menu'],
     s:function(){return '<div class="ow-ts-h"><span>Spice Route</span><small>Open now</small></div><div class="ow-ts-b">'+M.slice(0,4).map(function(m,i){return row([m[0],m[1],m[2],i])}).join('')+'</div>'}},
    {t:'A cart that nudges them to add more',l:['Smart add-ons and combos at checkout','Coupons applied in one tap','Clear totals, no surprise charges'],
     s:function(){return '<div class="ow-ts-h"><span>Your cart</span><small>3 items</small></div><div class="ow-ts-b">'+row(['bowl','Chicken Biryani',320,0],1)+row(['utensils','Veg Burger',180,2],2)+'<div class="ow-code"><span>FIRST10 applied</span><span>−₹68</span></div><div class="ow-ttl"><span>Total</span><span>₹612</span></div><span class="ow-pbtn">Proceed to pay</span></div>'}},
    {t:'Pay the way they like',l:['UPI, cards and wallets through a secure gateway','Cash on delivery if you want it','Money settles to your own account'],
     s:function(){return '<div class="ow-ts-h"><span>Payment</span><small>Secure</small></div><div class="ow-ts-b"><div class="ow-pay"><div class="on"><i></i>UPI (GPay, PhonePe, Paytm)</div><div><i></i>Credit or debit card</div><div><i></i>Cash on delivery</div></div><span class="ow-pbtn">Pay ₹612</span></div>'}},
    {t:'Track every order, live',l:['Customers see each step from kitchen to door','You see all orders in one place','Every customer saved to your CRM'],
     s:function(){var st=[['Order accepted','7:41 pm'],['Being prepared','Chef is on it'],['On the way','Rider picked it up'],['Delivered','Enjoy your meal']];return '<div class="ow-ts-h"><span>Order #1042</span><small>Live</small></div><div class="ow-ts-b"><ul class="ow-track">'+st.map(function(x){return '<li><i>'+CKI+'</i><div><b>'+x[0]+'</b><small>'+x[1]+'</small></div></li>'}).join('')+'</ul><div class="ow-eta">Arriving in <b>18 min</b></div></div>'}}
  ];
  var tt=null;
  function drawTour(k){
    var t=TT[+k];clearInterval(tt);
    $('owTt').textContent=t.t;
    $('owTl').innerHTML=t.l.map(function(x){return '<li>'+CKI+x+'</li>'}).join('');
    $('owTs').innerHTML=t.s();
    if(+k===3){var lis=$('owTs').querySelectorAll('.ow-track li'),n=0;(function step(){if(n<lis.length){lis[n].classList.add('on');n++;if(RM)step()}})();
      if(!RM)tt=setInterval(function(){if(n<lis.length){lis[n].classList.add('on');n++}else clearInterval(tt)},900)}
  }
  drawTour(0);pick($('owTabs'),drawTour);
  `;

  return {
    slug: 'own-website', name: 'Own ordering website',
    title: 'Your Own Online Ordering Website. 0% Commission | RestroGrow',
    desc: 'A branded ordering website with your menu, your prices and online payments, set up for you. Zero commission on direct orders. 3X in 90 days or 100% back.',
    cta: 'Get My Ordering Website', sticky: ['Free demo', ' See your own ordering website'],
    body: body, css: css, js: js
  };
};
