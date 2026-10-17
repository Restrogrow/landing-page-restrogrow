// Landing page: WHATSAPP marketing.  Pitch: "fill slow hours with a message you own, not another app discount".
'use strict';
module.exports = function (c) {
  var img = c.img;

  var hero = {
    eyb: 'For <b>restaurants, cafes &amp; cloud kitchens</b> with slow days and quiet hours',
    h1: 'Fill Your Slow Hours With One WhatsApp Message. <span class="o">Not Another Discount on the App.</span>',
    sub: 'RestroGrow saves every direct customer\'s number in your own CRM and sends offers, festive deals and reminders on WhatsApp. Orders come straight to you with zero commission.',
    cta2: { text: 'Build a Campaign Now', href: '#rg-camp' },
    wait: 'One WhatsApp offer reaches every past customer in minutes. <b>No ad spend. No commission.</b>',
    visual: `
    <div class="lp-phone"><div class="lp-screen wa-screen">
      <div class="lp-sb" style="background:#075E54"></div>
      <div class="wa-top"><div class="wa-av">${img('biryani', '', '')}</div><div><b>Spice Route <i>✓</i></b><small>Business account</small></div></div>
      <div class="wa-chat" id="waChat"></div>
      <div class="wa-foot"><div><small>Orders from this one message</small><b id="waOrd">0</b></div><button class="wa-replay" id="waReplay" type="button">Replay</button></div>
    </div>
    <div class="lp-float tr">${img('bell', '', '')}<span><b>New order!</b><small>From your WhatsApp offer</small></span></div>
    <div class="lp-float bl" style="animation-delay:-2s">${img('heart', '', '')}<span><b>0% commission</b><small>Direct to your kitchen</small></span></div></div>`
  };

  var problem = `
<!-- ================= PROBLEM ================= -->
<section class="sec" id="rg-problem"><div class="w">
  <div class="head rv"><span class="kick">The slow hour problem</span><h2 class="h2">Empty Tables at 4 PM. <span class="o">And No Way to Reach Your Customers.</span></h2><p>A typical day for a restaurant that sells mostly through apps. Tap the button to see what one WhatsApp offer can do.</p></div>
  <div class="lp-card wa-day rv">
    <div class="wa-day-h"><div><b>Orders by hour</b><small>An example day, for illustration</small></div><button class="btn btn-p wa-send" id="waSend" type="button">Send a WhatsApp offer at 4 PM</button></div>
    <div class="wa-bars" id="waBars"></div>
    <p class="wa-note" id="waNote">The quiet stretch from 3 to 6 PM is where kitchens lose money on rent and staff.</p>
  </div>
  <div class="pains" style="margin-top:clamp(40px,5vw,60px)">
    <div class="pain rv"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M4 4l16 16"/></svg></span><div><h3>You can't message your own customers.</h3><p>The app keeps their numbers. A slow day means waiting, not calling anyone back.</p></div></div>
    <div class="pain rv" style="--dl:.06s"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></span><div><h3>Boosting orders on the app costs even more.</h3><p>Promoted listings and discounts on top of 25 to 30% commission leave almost nothing on the bill.</p></div></div>
    <div class="pain rv"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg></span><div><h3>Festivals and weekends pass without a plan.</h3><p>No list means no Diwali offer, no new menu launch and no weekend special you can send yourself.</p></div></div>
    <div class="pain rv" style="--dl:.06s"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7l6 6 4-4 8 8M21 11v6h-6"/></svg></span><div><h3>Your sales depend on their ranking.</h3><p>When the algorithm shifts, orders drop and you have no other lever to pull.</p></div></div>
  </div>
  <p class="verdict rv">The fix isn't more discounts. <span class="o">It's a list you own and a message you can send.</span></p>
</div></section>`;

  var camp = `
<!-- ================= CAMPAIGN BUILDER ================= -->
<section class="sec dark" id="rg-camp"><div class="w">
  <div class="head rv"><span class="kick">Try it yourself</span><h2 class="h2">Build a WhatsApp Campaign <span class="o">in 10 Seconds</span></h2><p>Pick an occasion and an offer. See the message your customers get and what it could be worth.</p></div>
  <div class="lp-two wa-camp">
    <div class="lp-dcard rv">
      <div class="wa-f"><label>Occasion</label><div class="chips" id="waOcc"><button class="on" data-v="slow" type="button">Slow weekday</button><button data-v="weekend" type="button">Weekend special</button><button data-v="festival" type="button">Festival</button><button data-v="newdish" type="button">New dish</button><button data-v="winback" type="button">Win-back</button></div></div>
      <div class="wa-f"><label>Offer</label><div class="chips" id="waOff"><button class="on" data-v="20% off" type="button">Flat 20% off</button><button data-v="dessert" type="button">Free dessert</button><button data-v="combo" type="button">Family combo</button><button data-v="delivery" type="button">Free delivery</button></div></div>
      <div class="fld wa-fld"><div class="t"><label for="waN">Customers on your WhatsApp list</label><output id="waNv">1,200</output></div><input class="rng" type="range" id="waN" min="200" max="5000" step="100" value="1200"></div>
      <div class="fld wa-fld"><div class="t"><label for="waA">Average order value</label><output id="waAv">₹400</output></div><input class="rng" type="range" id="waA" min="150" max="1000" step="10" value="400"></div>
      <div class="fld wa-fld"><div class="t"><label for="waR">Customers who order (illustrative)</label><output id="waRv">4%</output></div><input class="rng" type="range" id="waR" min="1" max="10" step="1" value="4"><small>We can't promise a response rate. Move it to see how the numbers change.</small></div>
    </div>
    <div class="rv" style="--dl:.08s">
      <div class="wa-prev"><div class="wa-prev-h"><i>${img('biryani', '', '')}</i><div><b>Spice Route</b><small>Business account</small></div></div>
        <div class="wa-b" id="waMsg"></div>
        <span class="wa-btn">Order now</span>
      </div>
      <div class="wa-res">
        <div><small>Messages sent</small><b id="waS">0</b></div>
        <div><small>Orders</small><b id="waO">0</b></div>
        <div><small>Revenue to you</small><b id="waRev">₹0</b></div>
        <div class="hl"><small>Commission saved vs the apps</small><b id="waSave">₹0</b></div>
      </div>
      <a class="btn btn-p btn-full" style="margin-top:14px" href="#rg-demo">Set Up My WhatsApp Marketing ${c.arrow}</a>
    </div>
  </div>
</div></section>`;

  var auto = `
<!-- ================= AUTOMATIONS ================= -->
<section class="sec cream dots" id="rg-auto"><div class="w">
  <div class="head rv"><span class="kick">Set it once</span><h2 class="h2">Messages That Send <span class="o">Themselves</span></h2><p>Pick an automation to see when it goes out and what your customer reads.</p></div>
  <div class="lp-two wa-auto rv">
    <div class="lp-card">
      <div class="seg" id="waTabs"><button class="on" data-v="0" type="button">Welcome</button><button data-v="1" type="button">Reorder</button><button data-v="2" type="button">Birthday</button><button data-v="3" type="button">Review</button><button data-v="4" type="button">Win-back</button></div>
      <div class="wa-when"><small>Sends</small><b id="waWhen"></b></div>
      <h3 id="waAt"></h3>
      <p id="waAd"></p>
    </div>
    <div class="wa-chatbox"><div class="wa-chat2" id="waC2"></div><p class="lp-cap">Sent automatically on <b>WhatsApp</b>. You do nothing.</p></div>
  </div>
</div></section>`;

  var how = `
<!-- ================= HOW ================= -->
<section class="sec" id="rg-how"><div class="w">
  <div class="head rv"><span class="kick">How it works</span><h2 class="h2">From Silent Slow Days <span class="o">to a Full Kitchen</span></h2></div>
  <div class="lp-three">
    <div class="lp-card lp-step rv"><span class="n">1</span><div class="lp-ico">${img('qr', '', '')}</div><h3>We set up your CRM and ordering page</h3><p>Your own ordering website plus a CRM that saves every direct customer's number automatically.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.08s"><span class="n">2</span><div class="lp-ico">${img('gift', '', '')}</div><h3>We grow your WhatsApp list</h3><p>Parcel inserts, table QR codes and first order rewards turn app customers into contacts you own.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.16s"><span class="n">3</span><div class="lp-ico">${img('bell', '', '')}</div><h3>You send, they order, you keep it all</h3><p>Offers, new menus and festive deals go out in minutes. Orders land on your website with zero commission.</p></div>
  </div>
  <p class="stay rv" style="margin-top:34px;text-align:center;font:600 1.1rem var(--fh)">No new ad spend. <span class="o">Just the customers you already have.</span></p>
</div></section>`;

  var css = `
.rg .wa-screen{background:#0B141A}
.rg .wa-top{display:flex;align-items:center;gap:10px;padding:10px 14px;background:#075E54;color:#fff}
.rg .wa-av{width:38px;height:38px;border-radius:50%;background:#fff;display:grid;place-items:center}
.rg .wa-av img{width:26px;height:26px}
.rg .wa-top b{display:block;font:700 .92rem var(--fh)}
.rg .wa-top b i{font-style:normal;color:#25D366;font-size:.8rem;margin-left:2px}
.rg .wa-top small{font-size:.7rem;opacity:.8}
.rg .wa-chat{flex:1;min-height:380px;padding:14px 12px;display:flex;flex-direction:column;gap:8px;justify-content:flex-end;background:#0B141A radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px) 0 0/18px 18px}
.rg .wa-m{max-width:84%;padding:8px 11px;border-radius:10px;font-size:.82rem;line-height:1.45;color:#E9EDEF;animation:waIn .45s var(--ease) both}
.rg .wa-m small{display:block;margin-top:3px;font-size:.62rem;opacity:.65;text-align:right}
.rg .wa-m.biz{background:#202C33;border-top-left-radius:2px}
.rg .wa-m.me{background:#005C4B;align-self:flex-end;border-top-right-radius:2px}
.rg .wa-m .lk{display:block;margin-top:6px;padding:7px 9px;border-radius:8px;background:rgba(255,255,255,.07);color:#53BDEB;font-size:.76rem}
@keyframes waIn{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
.rg .wa-foot{display:flex;justify-content:space-between;align-items:center;padding:10px 14px 14px;background:#111B21;color:#fff}
.rg .wa-foot small{display:block;font-size:.66rem;color:#8696A0}
.rg .wa-foot b{font:800 1.5rem var(--fh);color:#25D366}
.rg .wa-replay{border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;padding:8px 14px;border-radius:99px;font:600 .78rem var(--fh);cursor:pointer}
.rg .wa-replay:hover{border-color:#fff}
.rg .wa-day{max-width:980px;margin:0 auto}
.rg .wa-day-h{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:18px}
.rg .wa-day-h b{display:block;font:700 1.1rem var(--fh)}
.rg .wa-day-h small{color:var(--mu)}
.rg .wa-send{height:48px;padding:0 20px;font-size:.92rem}
.rg .wa-send.done{background:#16A34A}
.rg .wa-bars{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(4px,1.2vw,12px);align-items:end;height:230px}
.rg .wa-col{display:flex;flex-direction:column;justify-content:flex-end;height:100%;text-align:center}
.rg .wa-bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;position:relative}
.rg .wa-bar i{display:block;width:100%;border-radius:6px 6px 0 0;transition:height .9s var(--ease)}
.rg .wa-bar i.base{background:#F1E4DA}
.rg .wa-col.slow .wa-bar i.base{background:#FBD2BC}
.rg .wa-bar i.add{background:var(--o);border-radius:6px 6px 0 0}
.rg .wa-bar em{position:absolute;left:0;right:0;font:700 .72rem var(--fh);font-style:normal;color:var(--o);text-align:center;opacity:0;transition:opacity .5s .5s}
.rg .wa-bar em.on{opacity:1}
.rg .wa-col small{margin-top:8px;font-size:.7rem;color:var(--mu)}
.rg .wa-note{margin-top:16px;font-size:.9rem;color:var(--mu);text-align:center}
.rg .wa-note b{color:#15803D}
.rg .wa-camp{align-items:start}
.rg .wa-f{margin-bottom:22px}
.rg .wa-f label{display:block;font:600 .85rem var(--fh);margin-bottom:10px;color:#E8E8F0}
.rg .wa-fld{margin-bottom:22px}
.rg .wa-prev{padding:16px;border-radius:20px;background:#0B141A;border:1px solid var(--dln)}
.rg .wa-prev-h{display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#fff}
.rg .wa-prev-h i{width:36px;height:36px;border-radius:50%;background:#fff;display:grid;place-items:center}
.rg .wa-prev-h i img{width:24px;height:24px}
.rg .wa-prev-h b{display:block;font:700 .9rem var(--fh)}
.rg .wa-prev-h small{font-size:.7rem;color:#8696A0}
.rg .wa-b{padding:11px 13px;border-radius:12px;border-top-left-radius:2px;background:#202C33;color:#E9EDEF;font-size:.9rem;line-height:1.55;min-height:96px;transition:opacity .2s}
.rg .wa-btn{display:block;margin-top:6px;padding:10px;border-radius:12px;background:#202C33;color:#53BDEB;font:600 .85rem var(--fb);text-align:center}
.rg .wa-res{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
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
.rg .wa-chatbox{padding:22px 18px;border-radius:22px;background:#0B141A}
.rg .wa-chat2{display:flex;flex-direction:column;gap:9px;min-height:240px;justify-content:flex-end}
@media (max-width:760px){.rg .wa-bars{height:190px}.rg .wa-col small{font-size:.58rem}.rg .wa-res b{font-size:1.2rem}}`;

  var js = `
  /* ---- hero: animated chat ---- */
  var SC=[['biz','🎉 Weekend special! Flat 20% off on family combos, today only. Order here 👇','4:02 pm',1],['me','Ordering tonight! 😍','4:03 pm'],['me','Can you send the menu?','4:03 pm'],['biz','Sure! Tap below and your first reorder gets free delivery ✅','4:04 pm',1],['me','👍 Done, thank you!','4:06 pm']];
  var chat=$('waChat'),ord=$('waOrd'),timers=[];
  function play(){
    timers.forEach(clearTimeout);timers=[];chat.innerHTML='';ord.setAttribute('data-v',0);ord.textContent='0';
    SC.forEach(function(m,i){
      timers.push(setTimeout(function(){
        var d=document.createElement('div');d.className='wa-m '+m[0];d.innerHTML=m[1]+(m[3]?'<span class="lk">order.spiceroute.com</span>':'')+'<small>'+m[2]+'</small>';chat.appendChild(d);
        num(ord,[8,19,27,34,37][i],function(v){return Math.round(v)},900);
      },RM?0:600+i*1500));
    });
  }
  seen($('waReplay'),play,.2);
  $('waReplay').addEventListener('click',play);

  /* ---- problem: quiet hours chart ---- */
  var H=['11a','12p','1p','2p','3p','4p','5p','6p','7p','8p','9p','10p'],B=[18,30,38,24,9,7,10,28,44,52,40,20],AD=[0,0,0,0,8,22,16,0,0,0,0,0],bars=$('waBars'),sent=false,MX=60;
  bars.innerHTML=H.map(function(h,i){return '<div class="wa-col'+(i>=4&&i<=6?' slow':'')+'"><div class="wa-bar"><em id="waE'+i+'"></em><i class="add" style="height:0"></i><i class="base" style="height:'+B[i]/MX*100+'%"></i></div><small>'+h+'</small></div>'}).join('');
  var adds=bars.querySelectorAll('.add');
  $('waSend').addEventListener('click',function(){
    sent=!sent;
    adds.forEach(function(a,i){a.style.height=sent&&AD[i]?AD[i]/MX*100+'%':'0'});
    [4,5,6].forEach(function(i){var e=$('waE'+i);e.textContent=sent?'+'+AD[i]:'';e.className=sent?'on':'';e.style.bottom=(B[i]+(sent?AD[i]:0))/MX*100+'%'});
    this.textContent=sent?'Undo the offer':'Send a WhatsApp offer at 4 PM';this.classList.toggle('done',sent);
    $('waNote').innerHTML=sent?'One message at 4 PM could bring about <b>46 extra orders</b> in the quiet stretch. Illustrative example.':'The quiet stretch from 3 to 6 PM is where kitchens lose money on rent and staff.';
  });

  /* ---- campaign builder ---- */
  var OC={slow:'Hi Rohan! 😋 It\\'s a quiet Tuesday at Spice Route, so here is a treat just for you: {o}. Valid till 6 PM today. Order here 👇',
          weekend:'Weekend plans sorted! 🎉 Enjoy {o} on all orders this Saturday and Sunday. Order here 👇',
          festival:'Happy Diwali from Spice Route! 🪔 Celebrate with {o} on our festive menu. Order here 👇',
          newdish:'Something new just landed on our menu! 🍽️ Try the Hyderabadi Dum Biryani, and get {o} for the first 50 orders. Order here 👇',
          winback:'We miss you, Rohan! 💛 It has been a while. Come back to Spice Route and enjoy {o}. Order here 👇'};
  var OF={'20% off':'flat 20% off','dessert':'a free dessert with every main','combo':'our ₹499 family combo','delivery':'free delivery'};
  var oc='slow',of='20% off',ids=['waN','waA','waR'];
  function camp(){
    ids.forEach(function(i){fill($(i))});
    var n=+$('waN').value,a=+$('waA').value,r=+$('waR').value/100;
    $('waNv').textContent=n.toLocaleString('en-IN');$('waAv').textContent=inr(a);$('waRv').textContent=Math.round(r*100)+'%';
    $('waMsg').textContent=OC[oc].replace('{o}',OF[of]);
    var o=Math.round(n*r),rev=o*a;
    num($('waS'),n,function(v){return Math.round(v).toLocaleString('en-IN')},500);num($('waO'),o,function(v){return Math.round(v)},500);num($('waRev'),rev,inr,500);num($('waSave'),rev*0.25,inr,500);
  }
  pick($('waOcc'),function(v){oc=v;camp()});pick($('waOff'),function(v){of=v;camp()});
  ids.forEach(function(i){$(i).addEventListener('input',camp)});camp();

  /* ---- automations ---- */
  var AU=[
    {w:'Right after a customer\\'s first order',t:'Welcome and thank you',d:'Greets every new direct customer, saves them to your CRM and gives them a reason to order again.',c:[['biz','Hi Rohan, welcome to Spice Route! 🎉 Thanks for your first order. Here is 10% off your next one: WELCOME10','7:42 pm'],['me','Thank you! 😊','7:44 pm']]},
    {w:'About 2 weeks after their last order',t:'Reorder reminder',d:'Brings regulars back before they drift to another restaurant.',c:[['biz','Hey Rohan! Missing our biryani? 😋 Your favourite is one tap away, and delivery is free today.','1:10 pm'],['me','Ordering now!','1:12 pm']]},
    {w:'On the customer\\'s birthday',t:'Birthday gift',d:'A personal touch that turns a birthday into a table of guests.',c:[['biz','Happy Birthday, Rohan! 🎂 Enjoy a free dessert on us. Show this message at the restaurant or use it on your next order.','9:00 am'],['me','Wow, thanks! Booking a table 🥳','9:20 am']]},
    {w:'A few hours after delivery',t:'Review request',d:'Asks happy customers for a Google review while the meal is fresh, so more people find you.',c:[['biz','Hope you loved your meal, Rohan! 🍽️ Would you rate us on Google? It takes 10 seconds and means a lot.','9:15 pm'],['me','Done, 5 stars ⭐','9:30 pm']]},
    {w:'When a customer has been away for 30 days',t:'Win-back offer',d:'Wakes up customers who stopped ordering, with an offer that is yours to control.',c:[['biz','We miss you, Rohan! 💛 Here is 20% off your next order, valid for 3 days.','6:00 pm'],['me','Thanks for the nudge, ordering tonight!','6:30 pm']]}
  ];
  function drawAuto(k){
    var a=AU[+k];
    $('waWhen').textContent=a.w;$('waAt').textContent=a.t;$('waAd').textContent=a.d;
    $('waC2').innerHTML=a.c.map(function(m,i){return '<div class="wa-m '+m[0]+'" style="animation-delay:'+(RM?0:i*.5)+'s">'+m[1]+'<small>'+m[2]+'</small></div>'}).join('');
  }
  drawAuto(0);pick($('waTabs'),drawAuto);
  `;

  return {
    slug: 'whatsapp', name: 'WhatsApp marketing',
    title: 'Fill Slow Hours With WhatsApp Orders, Not App Discounts | RestroGrow',
    desc: 'Save every customer\'s number and bring them back with WhatsApp offers. Zero commission orders straight to your restaurant. 3X in 90 days or 100% back.',
    cta: 'Show Me the WhatsApp Plan', stickyTail: 'going to app commission',
    hero: hero, before: [problem, camp, auto, how], after: [], css: css, js: js,
    faq: [
      ['Is WhatsApp marketing allowed?', 'Yes, when you message customers who have ordered from you or opted in. We set it up the proper way and help you keep messages relevant.'],
      ['How do I get my customers\' numbers?', 'Every direct order saves the number to your CRM. QR codes, parcel inserts and first order rewards bring app customers into it.'],
      ['Can I send offers for festivals and slow days?', 'Yes. Send festive deals, weekend specials and new menu updates whenever you want, to the whole list or a part of it.'],
      ['Will customers get spammed?', 'No. We keep the schedule sensible, and customers can opt out at any time.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers. RestroGrow moves your regulars to direct orders.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  };
};
