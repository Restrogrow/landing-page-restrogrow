// Landing page: WHATSAPP marketing.  Pitch: "fill slow hours with a message you own, not another app discount".
'use strict';
var I = require('../icons.js').ic;

module.exports = function (S) {
  var hero = `
<section class="x-hero" id="rg-hero"><div class="x-w">
  <div>
    <span class="x-eyb rv">${I('whatsapp')}For restaurants, cafes and cloud kitchens with slow days and quiet hours</span>
    <h1 class="rv" style="--dl:.06s">Fill Your Slow Hours With One WhatsApp Message. <span class="o">Not Another Discount on the App.</span></h1>
    <p class="x-sub rv" style="--dl:.12s">RestroGrow saves every direct customer's number in your own CRM and sends offers, festive deals and reminders on WhatsApp. Orders come straight to you with zero commission.</p>
    <div class="x-cta rv" style="--dl:.18s"><a class="btn btn-p" href="#rg-demo">Show Me the WhatsApp Plan ${I('arrow')}</a><a class="x-btn2" href="#rg-camp">${I('megaphone')}Build a campaign now</a></div>
    <ul class="x-checks rv" style="--dl:.22s"><li>${I('check')}Every direct customer saved to your own CRM automatically</li><li>${I('check')}Offers, festive deals, reminders and review requests in minutes</li><li>${I('check')}3X in 90 days, or 100% of your fee back</li></ul>
    ${S.trust()}
  </div>
  <div class="x-hv wa-hv rv" style="--dl:.12s">
    <div class="wa-back">
      <div class="app"><div class="app-s">
        <div class="app-hd"><div class="app-top"><span class="app-id"><i class="app-av"></i><span class="blr">Spice Route</span></span><span class="app-ic">${I('bell')}${I('settings')}</span></div><div class="app-tt"><small>WHATSAPP</small><b>Campaigns</b></div></div>
        <div class="app-bd">
          <div class="app-tiles">
            <div class="app-tile"><span class="i t-b">${I('send')}</span><b>1,150</b><small>Sent</small></div>
            <div class="app-tile"><span class="i t-g">${I('ticks')}</span><b>1,128</b><small>Delivered</small></div>
            <div class="app-tile"><span class="i t-p">${I('search')}</span><b>812</b><small>Read</small></div>
            <div class="app-tile"><span class="i t-o">${I('bag')}</span><b>46</b><small>Orders</small></div>
          </div>
          <div class="app-card"><div class="app-row"><span class="app-av t-o"></span><div><b>Weekend special</b><small>Sent 4:02 pm</small></div><em>46 orders</em></div><div class="app-row"><span class="app-av t-g"></span><div><b>Reorder reminder</b><small>Automatic</small></div><em>21 orders</em></div></div>
        </div>
        <div class="app-nav"><span>${I('home')}Home</span><span>${I('menu')}Menu</span><span>${I('list')}Orders</span><span class="on">${I('megaphone')}Campaigns</span><span>${I('more')}More</span></div>
      </div></div>
    </div>
    <div class="wa-front">
      <div class="app"><div class="app-s wa-s">
        <div class="wa-top"><span class="wa-av">${I('utensils')}</span><div><b>Spice Route</b><small>Business account</small></div></div>
        <div class="wa-chat" id="waChat"></div>
        <div class="wa-foot"><div><small>Orders from this one message</small><b id="waOrd">0</b></div><button class="wa-replay" id="waReplay" type="button">${I('refresh')}Replay</button></div>
      </div></div>
    </div>
    <div class="x-note wa-n1"><i class="t-o">${I('bag')}</i><span><b>New order</b><small>From your WhatsApp offer</small></span></div>
  </div>
</div></section>`;

  var stats = `
<section class="wa-stats"><div class="x-w"><div class="x-four">
  <div class="wa-stat rv"><b>252 to 515</b><span>customers saved in 3 months at 5 real clients</span></div>
  <div class="wa-stat rv" style="--dl:.06s"><b>0%</b><span>commission on orders from your own list</span></div>
  <div class="wa-stat rv" style="--dl:.12s"><b data-count="140" data-suffix="+">0</b><span>restaurants on RestroGrow</span></div>
  <div class="wa-stat rv" style="--dl:.18s"><b>10 sec</b><span>to build and preview a campaign below</span></div>
</div></div></section>`;

  var problem = `
<section class="x-sec" id="rg-problem"><div class="x-w">
  <div class="x-head rv"><span class="x-kick">The slow hour problem</span><h2 class="x-h2">Empty Tables at 4 PM. <span class="o">And No Way to Reach Your Customers.</span></h2><p class="x-lead">A typical day for a restaurant that sells mostly through apps. Tap the button to see what one WhatsApp offer can do.</p></div>
  <div class="x-card wa-day rv">
    <div class="wa-day-h"><div><b>Orders by hour</b><small>An example day, for illustration</small></div><button class="btn btn-p wa-send" id="waSend" type="button">${I('send')}Send a WhatsApp offer at 4 PM</button></div>
    <div class="wa-bars" id="waBars"></div>
    <p class="wa-note" id="waNote">The quiet stretch from 3 to 6 PM is where kitchens lose money on rent and staff.</p>
  </div>
  <div class="x-four wa-pains">
    <div class="x-card rv"><div class="x-ico">${I('eyeoff')}</div><h3>You can't message your own customers</h3><p class="m">The app keeps their numbers. A slow day means waiting, not calling anyone back.</p></div>
    <div class="x-card rv" style="--dl:.06s"><div class="x-ico">${I('percent')}</div><h3>Boosting on the app costs even more</h3><p class="m">Promoted listings and discounts on top of 25 to 30% commission leave almost nothing on the bill.</p></div>
    <div class="x-card rv" style="--dl:.12s"><div class="x-ico">${I('calendar')}</div><h3>Festivals pass without a plan</h3><p class="m">No list means no Diwali offer, no new menu launch and no weekend special you can send yourself.</p></div>
    <div class="x-card rv" style="--dl:.18s"><div class="x-ico">${I('down')}</div><h3>Sales depend on their ranking</h3><p class="m">When the algorithm shifts, orders drop and you have no other lever to pull.</p></div>
  </div>
</div></section>`;

  var camp = `
<section class="x-sec x-dark x-dots" id="rg-camp"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Calculator</span><h2 class="x-h2">Build a WhatsApp Campaign <span class="o">in 10 Seconds</span></h2><p class="x-lead">Pick an occasion, an offer and who gets it. See the message your customers read and what it could be worth.</p></div>
  <div class="x-two wa-camp">
    <div class="x-dcard rv">
      <div class="x-fld"><div class="x-lbl"><b>Occasion</b></div><div class="chips" id="waOcc"><button class="on" data-v="slow" type="button">${I('clock')}Slow weekday</button><button data-v="weekend" type="button">${I('calendar')}Weekend special</button><button data-v="festival" type="button">${I('star')}Festival</button><button data-v="newdish" type="button">${I('utensils')}New dish</button><button data-v="winback" type="button">${I('heart')}Win-back</button></div></div>
      <div class="x-fld"><div class="x-lbl"><b>Offer</b></div><div class="chips" id="waOff"><button class="on" data-v="20% off" type="button">Flat 20% off</button><button data-v="dessert" type="button">Free dessert</button><button data-v="combo" type="button">Family combo</button><button data-v="delivery" type="button">Free delivery</button></div></div>
      <div class="x-fld"><div class="x-lbl"><b>Who gets it</b></div><div class="chips" id="waAud"><button class="on" data-v="1" type="button">Everyone</button><button data-v="0.35" type="button">Regulars</button><button data-v="0.2" type="button">New customers</button><button data-v="0.25" type="button">Not ordered in 30 days</button></div></div>
      <div class="x-fld"><div class="x-lbl"><label for="waN">Customers on your WhatsApp list</label><output id="waNv">1,200</output></div><input class="rng" type="range" id="waN" min="200" max="5000" step="100" value="1200"></div>
      <div class="x-fld"><div class="x-lbl"><label for="waA">Average order value</label><output id="waAv">₹400</output></div><input class="rng" type="range" id="waA" min="150" max="1000" step="10" value="400"></div>
      <div class="x-fld"><div class="x-lbl"><label for="waR">Customers who order (illustrative)</label><output id="waRv">4%</output></div><input class="rng" type="range" id="waR" min="1" max="10" step="1" value="4"><small>We can't promise a response rate. Move it to see how the numbers change.</small></div>
    </div>
    <div class="rv" style="--dl:.08s">
      <div class="wa-prev"><div class="wa-prev-h"><i>${I('utensils')}</i><div><b>Spice Route</b><small>Business account</small></div></div>
        <div class="wb biz" id="waMsg" style="max-width:100%"></div>
        <span class="wa-btn">${I('link')}Order now</span>
      </div>
      <div class="wa-fun" id="waFun"></div>
      <div class="wa-res">
        <div><small>Revenue to you</small><b id="waRev">₹0</b></div>
        <div class="hl"><small>Commission saved vs the apps</small><b id="waSave">₹0</b></div>
      </div>
      <a class="btn btn-p btn-full" style="margin-top:14px" href="#rg-demo">Set Up My WhatsApp Marketing ${I('arrow')}</a>
    </div>
  </div>
</div></section>`;

  var auto = `
<section class="x-sec x-cream x-dots" id="rg-auto"><div class="x-w">
  <div class="x-head c rv"><span class="x-kick">Set it once</span><h2 class="x-h2">Messages That Send <span class="o">Themselves</span></h2><p class="x-lead">Pick an automation to see when it goes out and what your customer reads.</p></div>
  <div class="x-two wa-auto rv">
    <div class="x-card">
      <div class="seg" id="waTabs"><button class="on" data-v="0" type="button">Welcome</button><button data-v="1" type="button">Reorder</button><button data-v="2" type="button">Birthday</button><button data-v="3" type="button">Review</button><button data-v="4" type="button">Win-back</button></div>
      <div class="wa-when"><small>Sends</small><b id="waWhen"></b></div>
      <h3 id="waAt"></h3>
      <p id="waAd"></p>
    </div>
    <div class="ly-wa"><div class="ly-wa-h"><span class="ly-logo">${I('utensils')}</span><div><b>Spice Route</b><small>Business account</small></div></div><div class="ly-wa-c" id="waC2"></div></div>
  </div>
</div></section>`;

  var body = [
    S.topbar({ cta: 'Show Me the WhatsApp Plan', links: [['Slow hours', '#rg-problem'], ['Campaign builder', '#rg-camp'], ['Real results', '#clx'], ['FAQ', '#rg-faq']] }),
    hero, stats, S.logos('Trusted by 140+ restaurants, cafes and cloud kitchens'), problem, camp,
    S.clients({ kick: 'Real numbers', h2: 'Your Customer List <span class="o">Fills Itself</span>', lead: 'Every direct order saves the customer to your own list. These are real dashboards from restaurants on RestroGrow: how many customers each one saved in 3 months.', focus: 'customers' }),
    auto,
    S.payouts({ kick: 'What the same orders cost on an app', h2: 'Every Order From Your List <span class="o">Skips the Platform Fees</span>', lead: 'Two real delivery app payouts. See what each month of sales really paid out, then switch to the same sales through your own WhatsApp-driven orders.' }),
    S.guarantee('Show Me the WhatsApp Plan'),
    S.faq([
      ['Is WhatsApp marketing allowed?', 'Yes, when you message customers who have ordered from you or opted in. We set it up the proper way and help you keep messages relevant.'],
      ['How do I get my customers\' numbers?', 'Every direct order saves the number to your CRM. QR codes, parcel inserts and first order rewards bring app customers into it.'],
      ['Can I send offers for festivals and slow days?', 'Yes. Send festive deals, weekend specials and new menu updates whenever you want, to the whole list or a part of it.'],
      ['Will customers get spammed?', 'No. We keep the schedule sensible, and customers can opt out at any time.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. RestroGrow moves your regulars to direct orders.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]),
    S.finalCta({ h2: 'Stop Waiting for the Dinner Rush.', p: 'See a WhatsApp campaign built on your own menu in a 30 minute demo.', checks: ['Your own customer list', 'Campaigns and automations included', '3X in 90 days or 100% back'], cta: 'Show Me the WhatsApp Plan' })
  ];

  var css = `
.rg .wa-hv{min-height:600px}
.rg .wa-back{position:absolute;left:-4%;top:48px;width:50%;transform:rotate(-4deg);opacity:.96;z-index:1}
.rg .wa-back .app{width:100%}
.rg .wa-front{position:absolute;right:-2%;top:0;width:56%;z-index:2}
.rg .wa-front .app{width:100%}
.rg .wa-n1{left:-6%;bottom:30px;animation-delay:-1.5s}
.rg .wa-s{background:#0B141A;min-height:540px}
.rg .wa-top{display:flex;align-items:center;gap:10px;padding:40px 14px 10px;background:#075E54;color:#fff}
.rg .wa-av{width:34px;height:34px;border-radius:50%;background:#fff;color:var(--o);display:grid;place-items:center;flex:none}
.rg .wa-av .ic{width:18px;height:18px}
.rg .wa-top b{display:block;font:700 .88rem var(--fh)}
.rg .wa-top small{font-size:.66rem;opacity:.8}
.rg .wa-chat{flex:1;padding:14px 10px;display:flex;flex-direction:column;gap:7px;justify-content:flex-end;background:#0B141A radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/18px 18px}
.rg .wa-chat .wb{font-size:.78rem;padding:7px 10px}
.rg .wb .lk{display:flex;align-items:center;gap:6px;margin-top:6px;padding:7px 9px;border-radius:8px;background:rgba(255,255,255,.07);color:#53BDEB;font-size:.72rem}
.rg .wb .lk .ic{width:13px;height:13px}
.rg .wa-foot{display:flex;justify-content:space-between;align-items:center;padding:10px 14px 14px;background:#111B21;color:#fff}
.rg .wa-foot small{display:block;font-size:.62rem;color:#8696A0}
.rg .wa-foot b{font:800 1.5rem var(--fh);color:#25D366;font-variant-numeric:tabular-nums}
.rg .wa-replay{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;padding:7px 12px;border-radius:99px;font:600 .72rem var(--fh);cursor:pointer}
.rg .wa-replay .ic{width:14px;height:14px}
.rg .wa-replay:hover{border-color:#fff}
.rg .wa-stats{background:#fff;border-bottom:1px solid var(--ln);padding:34px 0}
.rg .wa-stat b{display:block;font:800 clamp(1.7rem,3vw,2.3rem)/1.1 var(--fh);letter-spacing:-.02em;color:var(--o);font-variant-numeric:tabular-nums}
.rg .wa-stat span{display:block;font-size:.88rem;color:var(--mu);margin-top:4px}
.rg .wa-day{max-width:1000px;margin:0 auto}
.rg .wa-day-h{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:22px}
.rg .wa-day-h b{display:block;font:700 1.15rem var(--fh)}
.rg .wa-day-h small{color:var(--mu)}
.rg .wa-send{height:48px;padding:0 20px;font-size:.92rem;gap:9px}
.rg .wa-send.done{background:#16A34A}
.rg .wa-bars{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(4px,1.2vw,12px);align-items:end;height:230px}
.rg .wa-col{display:flex;flex-direction:column;justify-content:flex-end;height:100%;text-align:center}
.rg .wa-bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;position:relative}
.rg .wa-bar i{display:block;width:100%;border-radius:6px 6px 0 0;transition:height .9s var(--ease)}
.rg .wa-bar i.base{background:#F1E4DA}
.rg .wa-col.slow .wa-bar i.base{background:#FBD2BC}
.rg .wa-bar i.add{background:var(--o)}
.rg .wa-bar em{position:absolute;left:0;right:0;font:700 .72rem var(--fh);font-style:normal;color:var(--o);text-align:center;opacity:0;transition:opacity .5s .5s}
.rg .wa-bar em.on{opacity:1}
.rg .wa-col small{margin-top:8px;font-size:.7rem;color:var(--mu)}
.rg .wa-note{margin-top:16px;font-size:.92rem;color:var(--mu);text-align:center}
.rg .wa-note b{color:#15803D}
.rg .wa-pains{margin-top:clamp(36px,4vw,56px)}
.rg .wa-camp{align-items:start}
.rg .wa-prev{padding:16px;border-radius:20px;background:#0B141A;border:1px solid var(--dln)}
.rg .wa-prev-h{display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#fff}
.rg .wa-prev-h i{width:36px;height:36px;border-radius:50%;background:#fff;color:var(--o);display:grid;place-items:center}
.rg .wa-prev-h i .ic{width:18px;height:18px}
.rg .wa-prev-h b{display:block;font:700 .9rem var(--fh)}
.rg .wa-prev-h small{font-size:.7rem;color:#8696A0}
.rg .wa-btn{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:6px;padding:10px;border-radius:12px;background:#202C33;color:#53BDEB;font:600 .85rem var(--fb)}
.rg .wa-fun{margin-top:14px;padding:16px;border-radius:18px;background:var(--ink2);border:1px solid var(--dln);display:grid;gap:10px}
.rg .wa-fr{display:grid;grid-template-columns:90px 1fr 70px;gap:10px;align-items:center;font-size:.82rem;color:var(--dmu)}
.rg .wa-fr i{display:block;height:10px;border-radius:10px;background:rgba(255,255,255,.08);position:relative;overflow:hidden}
.rg .wa-fr i::after{content:"";position:absolute;inset:0;width:var(--w,0);background:linear-gradient(90deg,#FC5301,#FF8A3D);border-radius:10px;transition:width .6s var(--ease)}
.rg .wa-fr b{text-align:right;color:#fff;font:700 .84rem var(--fh);font-variant-numeric:tabular-nums}
.rg .wa-res{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.rg .wa-res div{padding:14px 16px;border-radius:16px;background:var(--ink2);border:1px solid var(--dln)}
.rg .wa-res div.hl{background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.35)}
.rg .wa-res small{display:block;font-size:.76rem;color:var(--dmu)}
.rg .wa-res b{display:block;font:800 1.5rem var(--fh);margin-top:4px;font-variant-numeric:tabular-nums}
.rg .wa-res .hl b{color:#4ADE80}
.rg .wa-auto{align-items:center}
.rg .wa-when{margin:24px 0 8px;padding:12px 14px;border-radius:14px;background:var(--ot)}
.rg .wa-when small{display:block;color:var(--mu);font-size:.74rem}
.rg .wa-when b{font:700 1rem var(--fh);color:#9A3412}
.rg .wa-auto h3{font:800 1.35rem var(--fh);margin:18px 0 8px}
.rg .wa-auto p{color:var(--mu)}
.rg .ly-wa{border-radius:24px;overflow:hidden;background:#0B141A;border:1px solid var(--dln)}
.rg .ly-wa-h{display:flex;align-items:center;gap:10px;padding:12px 16px;background:#075E54;color:#fff}
.rg .ly-wa-h b{display:block;font:700 .92rem var(--fh)}
.rg .ly-wa-h small{font-size:.7rem;opacity:.8}
.rg .ly-logo{width:34px;height:34px;border-radius:11px;background:var(--o);color:#fff;display:grid;place-items:center;flex:none}
.rg .ly-logo .ic{width:18px;height:18px}
.rg .ly-wa-c{padding:18px 14px;min-height:280px;display:flex;flex-direction:column;gap:9px;justify-content:flex-end;background:#0B141A radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/18px 18px}
.rg .wb{max-width:86%;padding:9px 12px;border-radius:10px;font-size:.88rem;line-height:1.5;color:#E9EDEF;animation:wbIn .45s var(--ease) both}
.rg .wb small{display:flex;align-items:center;justify-content:flex-end;gap:4px;margin-top:3px;font-size:.64rem;opacity:.7}
.rg .wb small .ic{width:13px;height:13px;color:#53BDEB}
.rg .wb.biz{background:#202C33;border-top-left-radius:2px}
.rg .wb.me{background:#005C4B;align-self:flex-end;border-top-right-radius:2px}
@keyframes wbIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
@media (max-width:980px){
 .rg .wa-hv{min-height:0}.rg .wa-back,.rg .wa-n1{display:none}
 .rg .wa-front{position:static;width:min(100%,290px);margin:0 auto}
}
@media (max-width:760px){.rg .wa-bars{height:190px}.rg .wa-col small{font-size:.58rem}}`;

  var js = `
  var TK='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13l4 4 8-9"/><path d="M10 15l1 1 9-10"/></svg>';
  var LKI='<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/></svg>';
  /* ---- hero: animated chat ---- */
  var SC=[['biz','Weekend special! Flat 20% off on family combos, today only. Order here.','4:02 pm',1],['me','Ordering tonight!','4:03 pm'],['me','Can you send the menu?','4:03 pm'],['biz','Sure. Tap below and your first reorder gets free delivery.','4:04 pm',1],['me','Done, thank you!','4:06 pm']];
  var chat=$('waChat'),ord=$('waOrd'),timers=[];
  function play(){
    timers.forEach(clearTimeout);timers=[];chat.innerHTML='';ord.setAttribute('data-v',0);ord.textContent='0';
    SC.forEach(function(m,i){
      timers.push(setTimeout(function(){
        var d=document.createElement('div');d.className='wb '+m[0];d.innerHTML=m[1]+(m[3]?'<span class="lk">'+LKI+'order.spiceroute.com</span>':'')+'<small>'+m[2]+(m[0]==='me'?'':'')+' '+(m[0]==='biz'?TK:'')+'</small>';chat.appendChild(d);
        num(ord,[8,19,27,34,37][i],function(v){return Math.round(v)},900);
      },RM?0:600+i*1500));
    });
  }
  seen($('waReplay'),play,.2);
  $('waReplay').addEventListener('click',play);

  /* ---- quiet hours chart ---- */
  var H=['11a','12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p'],B=[18,30,38,24,9,7,10,28,44,52,40,20],AD=[0,0,0,0,8,22,16,0,0,0,0,0],bars=$('waBars'),sent=false,MX=60;
  bars.innerHTML=H.map(function(h,i){return '<div class="wa-col'+(i>=4&&i<=6?' slow':'')+'"><div class="wa-bar"><em id="waE'+i+'"></em><i class="add" style="height:0"></i><i class="base" style="height:'+B[i]/MX*100+'%"></i></div><small>'+h+'</small></div>'}).join('');
  var adds=bars.querySelectorAll('.add');
  $('waSend').addEventListener('click',function(){
    sent=!sent;
    adds.forEach(function(a,i){a.style.height=sent&&AD[i]?AD[i]/MX*100+'%':'0'});
    [4,5,6].forEach(function(i){var e=$('waE'+i);e.textContent=sent?'+'+AD[i]:'';e.className=sent?'on':'';e.style.bottom=(B[i]+(sent?AD[i]:0))/MX*100+'%'});
    this.lastChild.textContent=sent?'Undo the offer':'Send a WhatsApp offer at 4 PM';this.classList.toggle('done',sent);
    $('waNote').innerHTML=sent?'One message at 4 PM could bring about <b>46 extra orders</b> in the quiet stretch. Illustrative example.':'The quiet stretch from 3 to 6 PM is where kitchens lose money on rent and staff.';
  });

  /* ---- campaign builder ---- */
  var OC={slow:"Hi Rohan, it's a quiet Tuesday at Spice Route, so here is a treat just for you: {o}. Valid till 6 PM today. Order here.",
          weekend:'Weekend plans sorted. Enjoy {o} on all orders this Saturday and Sunday. Order here.',
          festival:'Happy Diwali from Spice Route. Celebrate with {o} on our festive menu. Order here.',
          newdish:'Something new just landed on our menu: the Hyderabadi Dum Biryani. Get {o} for the first 50 orders. Order here.',
          winback:'We miss you, Rohan. It has been a while. Come back to Spice Route and enjoy {o}. Order here.'};
  var OF={'20% off':'flat 20% off',dessert:'a free dessert with every main',combo:'our ₹499 family combo',delivery:'free delivery'};
  var oc='slow',of='20% off',aud=1,ids=['waN','waA','waR'];
  function camp(){
    ids.forEach(function(i){fill($(i))});
    var n=+$('waN').value,a=+$('waA').value,r=+$('waR').value/100,sent_=Math.round(n*aud),del=Math.round(sent_*.98),rd=Math.round(sent_*.7),o=Math.round(sent_*r),rev=o*a;
    $('waNv').textContent=n.toLocaleString('en-IN');$('waAv').textContent=inr(a);$('waRv').textContent=Math.round(r*100)+'%';
    $('waMsg').textContent=OC[oc].replace('{o}',OF[of]);
    var rows=[['Sent',sent_,100],['Delivered',del,98],['Read',rd,70],['Ordered',o,r*100]];
    $('waFun').innerHTML=rows.map(function(x){return '<div class="wa-fr"><span>'+x[0]+'</span><i style="--w:'+Math.max(2,x[2])+'%"></i><b>'+x[1].toLocaleString('en-IN')+'</b></div>'}).join('');
    num($('waRev'),rev,inr,500);num($('waSave'),rev*0.25,inr,500);
  }
  pick($('waOcc'),function(v){oc=v;camp()});pick($('waOff'),function(v){of=v;camp()});pick($('waAud'),function(v){aud=+v;camp()});
  ids.forEach(function(i){$(i).addEventListener('input',camp)});camp();

  /* ---- automations ---- */
  var AU=[
    {w:"Right after a customer's first order",t:'Welcome and thank you',d:'Greets every new direct customer, saves them to your CRM and gives them a reason to order again.',c:[['biz','Hi Rohan, welcome to Spice Route. Thanks for your first order. Here is 10% off your next one: WELCOME10','7:42 pm'],['me','Thank you!','7:44 pm']]},
    {w:'About 2 weeks after their last order',t:'Reorder reminder',d:'Brings regulars back before they drift to another restaurant.',c:[['biz','Hey Rohan, missing our biryani? Your favourite is one tap away, and delivery is free today.','1:10 pm'],['me','Ordering now','1:12 pm']]},
    {w:"On the customer's birthday",t:'Birthday gift',d:'A personal touch that turns a birthday into a table of guests.',c:[['biz','Happy Birthday, Rohan. Enjoy a free dessert on us. Show this message at the restaurant or use it on your next order.','9:00 am'],['me','Wow, thanks. Booking a table','9:20 am']]},
    {w:'A few hours after delivery',t:'Review request',d:'Asks happy customers for a Google review while the meal is fresh, so more people find you.',c:[['biz','Hope you loved your meal, Rohan. Would you rate us on Google? It takes 10 seconds and means a lot.','9:15 pm'],['me','Done, 5 stars','9:30 pm']]},
    {w:'When a customer has been away for 30 days',t:'Win-back offer',d:'Wakes up customers who stopped ordering, with an offer that is yours to control.',c:[['biz','We miss you, Rohan. Here is 20% off your next order, valid for 3 days.','6:00 pm'],['me','Thanks for the nudge, ordering tonight','6:30 pm']]}
  ];
  function drawAuto(k){
    var a=AU[+k];
    $('waWhen').textContent=a.w;$('waAt').textContent=a.t;$('waAd').textContent=a.d;
    $('waC2').innerHTML=a.c.map(function(m,i){return '<div class="wb '+m[0]+'" style="animation-delay:'+(RM?0:i*.5)+'s">'+m[1]+'<small>'+m[2]+' '+(m[0]==='biz'?TK:'')+'</small></div>'}).join('');
  }
  drawAuto(0);pick($('waTabs'),drawAuto);
  `;

  return {
    slug: 'whatsapp', name: 'WhatsApp marketing',
    title: 'Fill Slow Hours With WhatsApp Orders, Not App Discounts | RestroGrow',
    desc: 'Save every customer\'s number and bring them back with WhatsApp offers. Zero commission orders straight to your restaurant. 3X in 90 days or 100% back.',
    cta: 'Show Me the WhatsApp Plan', sticky: ['Free demo', ' See your WhatsApp plan'],
    body: body, css: css, js: js
  };
};
