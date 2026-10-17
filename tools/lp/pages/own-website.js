// Landing page: OWN ORDERING WEBSITE.  Pitch: "stop renting a storefront from the apps, own yours".
'use strict';
module.exports = function (c) {
  var img = c.img;

  var hero = {
    eyb: 'For <b>restaurants, cafes &amp; cloud kitchens</b> tired of paying the apps on every order',
    h1: 'Get Your Own Ordering Website, Like Zomato\'s. <span class="o">Keep 100% of Every Order.</span>',
    sub: 'A branded ordering website with your menu, your prices and online payments, set up for you by RestroGrow. Customers order in a few taps. Not a rupee goes to commission.',
    cta2: { text: 'Try It: Build My Storefront', href: '#rg-brand' },
    wait: 'An outlet doing 300 orders a day loses <b>₹30,000 every single day</b> it sells only through the apps.',
    visual: `
    <div class="lp-phone"><div class="lp-screen ow-screen">
      <div class="lp-sb"></div>
      <div class="ow-head"><div><small>Order online</small><b>Spice Route</b></div><span class="lp-badge g">Open now</span></div>
      <div class="ow-banner"><div><b>0% commission</b><span>10% off your first direct order</span></div>${img('biryani', '', '')}</div>
      <ul class="ow-menu" id="owMenu"></ul>
      <div class="ow-cart">
        <div class="ow-cart-t"><span id="owCnt">Add items to try it</span><b id="owTot">₹0</b></div>
        <div class="ow-split">
          <div><small>You keep on an app</small><b id="owApp">₹0</b></div>
          <div class="g"><small>You keep here</small><b id="owOwn">₹0</b></div>
        </div>
      </div>
    </div>
    <div class="lp-float tr">${img('heart', '', '')}<span><b>No commission</b><small>On direct orders</small></span></div>
    <div class="lp-float bl" style="animation-delay:-2.2s">${img('rider', '', '')}<span><b>Your delivery</b><small>Your riders or a partner</small></span></div></div>`
  };

  var problem = `
<!-- ================= PROBLEM ================= -->
<section class="sec" id="rg-problem"><div class="w">
  <div class="head rv"><span class="kick">Rented vs owned</span><h2 class="h2">You Built the Menu. <span class="o">The Apps Own the Storefront.</span></h2><p>Selling only on delivery apps means renting your own business.</p></div>
  <div class="lp-two ow-vs">
    <div class="lp-card rv">
      <div class="ow-vs-h"><div class="lp-ico">${img('receipt', '', '')}</div><div><b>Selling only on the apps</b><small>Renting a storefront</small></div></div>
      <ul class="ow-list bad">
        <li><i>✕</i>25 to 30% commission, plus GST on it, on every order</li>
        <li><i>✕</i>Customer numbers and data stay with the app</li>
        <li><i>✕</i>Your sales depend on their ranking and rules</li>
        <li><i>✕</i>Discounts and visibility follow their terms</li>
      </ul>
    </div>
    <div class="lp-card ow-own rv" style="--dl:.08s">
      <div class="ow-vs-h"><div class="lp-ico">${img('qr', '', '')}</div><div><b>Your own ordering website</b><small>Owning the storefront</small></div></div>
      <ul class="ow-list good">
        <li><i>✓</i>0% commission. Only a small payment gateway fee</li>
        <li><i>✓</i>Every customer's number saved in your own CRM</li>
        <li><i>✓</i>Your brand, your menu, your prices</li>
        <li><i>✓</i>Found through QR codes, WhatsApp and Google</li>
      </ul>
    </div>
  </div>
  <p class="verdict rv">You don't need more orders. <span class="o">You need a storefront you own.</span></p>
</div></section>`;

  var calc = c.calc({ kick: 'Find your number', h2: 'How Much Do the Apps Take From You?', p: 'See what Zomato and Swiggy keep every month, money your own ordering website lets you keep. Takes 10 seconds.' });

  var brand = `
<!-- ================= BRAND IT ================= -->
<section class="sec cream dots" id="rg-brand"><div class="w">
  <div class="head rv"><span class="kick">See it with your name</span><h2 class="h2">Your Brand. <span class="o">Your Storefront.</span></h2><p>Type your restaurant's name and pick a style. This is the kind of website we build for you.</p></div>
  <div class="lp-two ow-brand">
    <div class="lp-card rv">
      <div class="ow-f"><label for="owName">Restaurant name</label><input id="owName" type="text" value="Spice Route" maxlength="24" autocomplete="off"></div>
      <div class="ow-f"><label>What do you serve?</label><div class="chips" id="owCui"><button class="on" data-v="biryani" type="button">Biryani</button><button data-v="pizza" type="button">Pizza &amp; Burgers</button><button data-v="cafe" type="button">Cafe &amp; Bakery</button><button data-v="momos" type="button">Momos &amp; Chinese</button></div></div>
      <div class="ow-f"><label>Brand colour</label><div class="ow-sw" id="owCol"></div></div>
      <p class="lp-note">A live preview. We build your real website with your actual menu, photos and prices.</p>
      <a class="btn btn-p" href="#rg-demo" style="margin-top:8px">Get My Ordering Website ${c.arrow}</a>
    </div>
    <div class="ow-browser rv" style="--dl:.08s" id="owBr">
      <div class="ow-bar"><i></i><i></i><i></i><span id="owUrl">www.spiceroute.com</span></div>
      <div class="ow-site">
        <div class="ow-nav"><b id="owLogo">Spice Route</b><span>Menu</span><span>Offers</span><span class="ow-cartb">Cart (0)</span></div>
        <div class="ow-hero"><div><small>Order direct and save</small><h3 id="owH">Hungry? Order from Spice Route</h3><span class="ow-cta">Order now</span></div><div class="ow-hero-i" id="owHi"></div></div>
        <div class="ow-cards" id="owCards"></div>
      </div>
    </div>
  </div>
</div></section>`;

  var how = `
<!-- ================= HOW ================= -->
<section class="sec" id="rg-how"><div class="w">
  <div class="head rv"><span class="kick">How it works</span><h2 class="h2">From Renting a Storefront <span class="o">to Owning One</span></h2></div>
  <div class="lp-three">
    <div class="lp-card lp-step rv"><span class="n">1</span><div class="lp-ico">${img('burger', '', '')}</div><h3>We build your ordering website</h3><p>Your brand, your menu, your real prices and online payments, live and ready for orders. You don't touch any tech.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.08s"><span class="n">2</span><div class="lp-ico">${img('qr', '', '')}</div><h3>We send your customers to it</h3><p>Parcel inserts, table QR codes, WhatsApp offers and your Google profile point your existing customers to your site.</p></div>
    <div class="lp-card lp-step rv" style="--dl:.16s"><span class="n">3</span><div class="lp-ico">${img('gift', '', '')}</div><h3>You get paid in full</h3><p>Every direct order pays you the whole bill, and each customer's number lands in your own CRM.</p></div>
  </div>
  <p class="stay rv" style="margin-top:34px;text-align:center;font:600 1.1rem var(--fh)">You don't leave Zomato or Swiggy. <span class="o">You stop depending on them.</span></p>
</div></section>`;

  var tour = `
<!-- ================= TOUR ================= -->
<section class="sec dark dots-d" id="rg-tour"><div class="w">
  <div class="head rv"><span class="kick">What your customers see</span><h2 class="h2">An Ordering Experience <span class="o">They Already Know</span></h2><p>Tap through the four screens every customer goes through, from menu to doorstep.</p></div>
  <div class="lp-two ow-tour rv">
    <div class="ow-tour-l">
      <div class="seg" id="owTabs"><button class="on" data-v="0" type="button">Menu</button><button data-v="1" type="button">Cart</button><button data-v="2" type="button">Payment</button><button data-v="3" type="button">Tracking</button></div>
      <h3 id="owTt"></h3>
      <ul class="ow-list good dk" id="owTl"></ul>
    </div>
    <div><div class="lp-phone" style="width:min(100%,300px)"><div class="lp-screen ow-tscreen" id="owTs"></div></div></div>
  </div>
  <div class="lp-cta-row"><a class="btn btn-p" href="#rg-demo">Get My Ordering Website ${c.arrow}</a></div>
</div></section>`;

  var css = `
.rg .ow-screen{background:#fff}
.rg .ow-head{display:flex;justify-content:space-between;align-items:center;padding:6px 18px 0}
.rg .ow-head small{display:block;color:var(--mu);font-size:.72rem}
.rg .ow-head b{font:800 1.2rem var(--fh)}
.rg .ow-banner{margin:12px 18px 0;padding:12px 14px;border-radius:16px;background:linear-gradient(120deg,var(--o),#FF8A3D);color:#fff;display:flex;align-items:center;justify-content:space-between;gap:8px}
.rg .ow-banner b{display:block;font:800 1.05rem var(--fh)}
.rg .ow-banner span{font-size:.74rem;opacity:.95}
.rg .ow-banner img{width:54px;height:54px;flex:none}
.rg .ow-menu{padding:8px 18px 0}
.rg .ow-menu li{display:grid;grid-template-columns:50px 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid #F1ECE6}
.rg .ow-menu img{width:50px;height:50px;border-radius:14px;background:#FFF1E8;padding:5px}
.rg .ow-menu p{font:600 .88rem/1.25 var(--fh)}
.rg .ow-menu small{display:block;color:var(--mu);font:500 .8rem var(--fb);margin-top:2px}
.rg .ow-add{height:32px;min-width:64px;padding:0 12px;border-radius:10px;border:1.5px solid var(--o);background:#fff;color:var(--o);font:700 .8rem var(--fh);cursor:pointer;transition:background .2s,color .2s}
.rg .ow-add:hover{background:var(--o);color:#fff}
.rg .ow-step{display:inline-flex;align-items:center;height:32px;border-radius:10px;background:var(--o);color:#fff;font:700 .85rem var(--fh);overflow:hidden}
.rg .ow-step button{width:28px;height:32px;border:0;background:transparent;color:#fff;font-size:1rem;cursor:pointer}
.rg .ow-step span{min-width:18px;text-align:center}
.rg .ow-cart{margin:auto 14px 14px;padding:12px 14px;border-radius:18px;background:var(--ink);color:#fff}
.rg .ow-cart-t{display:flex;justify-content:space-between;align-items:baseline;font-size:.82rem;color:var(--dmu)}
.rg .ow-cart-t b{font:800 1.25rem var(--fh);color:#fff}
.rg .ow-split{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.rg .ow-split div{padding:9px 10px;border-radius:12px;background:rgba(255,255,255,.07)}
.rg .ow-split div.g{background:rgba(34,197,94,.16)}
.rg .ow-split small{display:block;font-size:.66rem;color:var(--dmu)}
.rg .ow-split b{font:800 1.02rem var(--fh);font-variant-numeric:tabular-nums}
.rg .ow-split .g b{color:#4ADE80}
.rg .ow-vs-h{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.rg .ow-vs-h .lp-ico{margin:0}
.rg .ow-vs-h b{display:block;font:700 1.15rem var(--fh)}
.rg .ow-vs-h small{color:var(--mu)}
.rg .ow-own{border:2px solid var(--o);box-shadow:0 30px 60px -36px rgba(252,83,1,.55)}
.rg .ow-list li{display:flex;gap:12px;padding:10px 0;border-bottom:1px dashed var(--ln);font-size:.95rem}
.rg .ow-list li:last-child{border-bottom:0}
.rg .ow-list i{width:22px;height:22px;border-radius:50%;flex:none;display:grid;place-items:center;font-style:normal;font-size:.7rem;font-weight:700;margin-top:2px}
.rg .ow-list.bad i{background:#FDE8E1;color:#C2410C}
.rg .ow-list.good i{background:var(--o);color:#fff}
.rg .ow-list.dk li{border-color:var(--dln)}
.rg .ow-f{margin-bottom:20px}
.rg .ow-f label{display:block;font:600 .85rem var(--fh);margin-bottom:8px}
.rg .ow-f input{width:100%;height:50px;padding:0 16px;border-radius:12px;border:1.5px solid #E4E0EA;font:500 1rem var(--fb);outline:none;background:#fff}
.rg .ow-f input:focus{border-color:var(--o)}
.rg .ow-sw{display:flex;gap:10px;flex-wrap:wrap}
.rg .ow-sw button{width:38px;height:38px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1.5px #D9D2CA;cursor:pointer;transition:transform .2s,box-shadow .2s}
.rg .ow-sw button.on{box-shadow:0 0 0 3px var(--ink);transform:scale(1.1)}
.rg .ow-browser{--bc:#FC5301;border-radius:18px;background:#fff;border:1px solid var(--ln);overflow:hidden;box-shadow:0 36px 70px -36px rgba(0,0,0,.35);align-self:start}
.rg .ow-bar{display:flex;align-items:center;gap:6px;padding:11px 14px;background:#F3EFEA;border-bottom:1px solid var(--ln)}
.rg .ow-bar i{width:10px;height:10px;border-radius:50%;background:#D9D2CA}
.rg .ow-bar span{margin-left:10px;flex:1;padding:5px 12px;border-radius:99px;background:#fff;font-size:.76rem;color:var(--mu);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rg .ow-site{padding:16px 18px 20px}
.rg .ow-nav{display:flex;align-items:center;gap:16px;font-size:.8rem;color:var(--mu)}
.rg .ow-nav b{font:800 1.05rem var(--fh);color:var(--bc);margin-right:auto;transition:color .3s}
.rg .ow-cartb{padding:6px 12px;border-radius:99px;background:var(--bc);color:#fff;font-weight:600;transition:background .3s}
.rg .ow-hero{display:grid;grid-template-columns:1.2fr .8fr;gap:10px;align-items:center;margin-top:16px;padding:18px;border-radius:16px;background:color-mix(in srgb,var(--bc) 12%,#fff);transition:background .3s}
.rg .ow-hero small{color:var(--mu);font-size:.74rem}
.rg .ow-hero h3{font:800 clamp(1.1rem,2.2vw,1.45rem)/1.2 var(--fh);margin:4px 0 12px}
.rg .ow-cta{display:inline-block;padding:9px 16px;border-radius:10px;background:var(--bc);color:#fff;font:700 .8rem var(--fh);transition:background .3s}
.rg .ow-hero-i img{width:100%;max-width:130px;margin-left:auto;animation:owPop .5s var(--ease)}
@keyframes owPop{from{transform:scale(.7) rotate(-8deg);opacity:0}to{transform:none;opacity:1}}
.rg .ow-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.rg .ow-cards div{padding:12px 10px;border:1px solid var(--ln);border-radius:14px;text-align:center}
.rg .ow-cards img{width:56px;height:56px;margin:0 auto 6px}
.rg .ow-cards p{font:600 .78rem/1.25 var(--fh)}
.rg .ow-cards small{display:block;color:var(--bc);font:700 .8rem var(--fh);margin-top:3px}
.rg .ow-tour{align-items:center}
.rg .ow-tour-l h3{font:800 1.5rem var(--fh);margin:24px 0 10px}
.rg .ow-tscreen{min-height:520px;padding:0 0 18px}
.rg .ow-ts-h{padding:6px 18px 10px;font:800 1.1rem var(--fh);display:flex;justify-content:space-between;align-items:center}
.rg .ow-ts-h small{font:500 .74rem var(--fb);color:var(--mu)}
.rg .ow-ts-b{padding:0 16px;animation:owPop .45s var(--ease)}
.rg .ow-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #F1ECE6;font-size:.84rem}
.rg .ow-row img{width:42px;height:42px;border-radius:12px;background:#FFF1E8;padding:4px}
.rg .ow-row span{flex:1;font-weight:600}
.rg .ow-row b{font:700 .84rem var(--fh)}
.rg .ow-tot{display:flex;justify-content:space-between;padding:12px 0;font:800 1.05rem var(--fh)}
.rg .ow-code{display:flex;justify-content:space-between;padding:10px 12px;border-radius:12px;background:#E6F6EC;color:#15803D;font-size:.8rem;font-weight:600;margin-top:10px}
.rg .ow-pay{display:grid;gap:10px;margin:6px 0 14px}
.rg .ow-pay div{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:14px;border:1.5px solid var(--ln);font-size:.86rem;font-weight:600}
.rg .ow-pay div.on{border-color:var(--o);background:var(--ot)}
.rg .ow-pay i{width:16px;height:16px;border-radius:50%;border:2px solid #D1D5DB}
.rg .ow-pay .on i{border:5px solid var(--o)}
.rg .ow-pbtn{display:block;text-align:center;padding:14px;border-radius:14px;background:var(--o);color:#fff;font:700 .95rem var(--fh)}
.rg .ow-track{padding:6px 4px}
.rg .ow-track li{display:flex;gap:12px;align-items:flex-start;padding-bottom:20px;position:relative;font-size:.86rem}
.rg .ow-track li::before{content:"";position:absolute;left:11px;top:24px;bottom:0;width:2px;background:#E5E7EB}
.rg .ow-track li:last-child::before{display:none}
.rg .ow-track i{width:24px;height:24px;border-radius:50%;flex:none;display:grid;place-items:center;font-style:normal;font-size:.7rem;background:#E5E7EB;color:#9CA3AF;transition:background .5s,color .5s}
.rg .ow-track li.on i{background:var(--o);color:#fff}
.rg .ow-track li.on::before{background:var(--o)}
.rg .ow-track b{display:block;font:700 .9rem var(--fh)}
.rg .ow-track small{color:var(--mu)}
.rg .ow-eta{margin-top:6px;padding:12px 14px;border-radius:14px;background:var(--ink);color:#fff;font-size:.82rem}
.rg .ow-eta b{font:800 1.2rem var(--fh);color:var(--o)}
@media (max-width:760px){.rg .ow-hero{grid-template-columns:1fr}.rg .ow-hero-i img{margin:0 auto}.rg .ow-cards{grid-template-columns:repeat(3,1fr)}}`;

  var js = `
  /* ---- hero storefront ---- */
  var M=[['biryani','Chicken Biryani',320],['pizza','Paneer Pizza',280],['burger','Classic Burger',180],['coffee','Filter Coffee',90]],q=[0,0,0,0];
  var menu=$('owMenu');
  function drawMenu(){
    menu.innerHTML=M.map(function(m,i){return '<li><img src="img/'+m[0]+'.svg" alt=""><div><p>'+m[1]+'</p><small>'+inr(m[2])+'</small></div>'+
      (q[i]?'<span class="ow-step"><button type="button" data-i="'+i+'" data-d="-1" aria-label="Less">−</button><span>'+q[i]+'</span><button type="button" data-i="'+i+'" data-d="1" aria-label="More">+</button></span>':'<button class="ow-add" type="button" data-i="'+i+'" data-d="1">Add</button>')+'</li>'}).join('');
    var n=0,t=0;q.forEach(function(v,i){n+=v;t+=v*M[i][2]});
    $('owCnt').textContent=n?n+' item'+(n>1?'s':'')+' in your cart':'Add items to try it';
    num($('owTot'),t,inr,400);num($('owApp'),t*0.705,inr,400);num($('owOwn'),t*0.98,inr,400);
  }
  menu.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;var i=+b.getAttribute('data-i');q[i]=Math.max(0,q[i]+(+b.getAttribute('data-d')));drawMenu()});
  drawMenu();

  /* ---- brand it ---- */
  var CU={
    biryani:{h:'Hungry? Order biryani from ',items:[['biryani','Chicken Dum Biryani',360],['biryani','Veg Biryani',280],['cupcake','Brownie Box',120]]},
    pizza:{h:'Fresh pizza and burgers from ',items:[['pizza','Margherita Pizza',299],['burger','Classic Burger',189],['cupcake','Choco Lava Cake',99]]},
    cafe:{h:'Your daily coffee from ',items:[['coffee','Cappuccino',140],['coffee','Cold Coffee',160],['cupcake','Blueberry Muffin',110]]},
    momos:{h:'Hot momos and noodles from ',items:[['momos','Steamed Momos',120],['momos','Fried Momos',140],['biryani','Hakka Noodles',180]]}
  };
  var COL=['#FC5301','#DC2626','#16A34A','#2563EB','#7C3AED','#111827'],cu='biryani',nm=$('owName'),br=$('owBr');
  $('owCol').innerHTML=COL.map(function(k,i){return '<button type="button" aria-label="Colour '+(i+1)+'" data-c="'+k+'" style="background:'+k+'"'+(i?'':' class="on"')+'></button>'}).join('');
  function drawBrand(){
    var n=(nm.value.trim()||'Your Restaurant'),slug=n.toLowerCase().replace(/[^a-z0-9]+/g,'');
    $('owLogo').textContent=n;$('owUrl').textContent='www.'+(slug||'yourrestaurant')+'.com';
    $('owH').textContent=CU[cu].h+n;
    $('owHi').innerHTML='<img src="img/'+CU[cu].items[0][0]+'.svg" alt="">';
    $('owCards').innerHTML=CU[cu].items.map(function(it){return '<div><img src="img/'+it[0]+'.svg" alt=""><p>'+it[1]+'</p><small>'+inr(it[2])+'</small></div>'}).join('');
  }
  nm.addEventListener('input',drawBrand);
  pick($('owCui'),function(v){cu=v;drawBrand()});
  $('owCol').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
    Array.prototype.forEach.call($('owCol').children,function(x){x.classList.toggle('on',x===b)});br.style.setProperty('--bc',b.getAttribute('data-c'))});
  drawBrand();

  /* ---- customer tour ---- */
  var TT=[
    {t:'Browse a menu they already know',l:['Photos, prices and categories, just like the apps','Search and filters for fast ordering','Offers shown right on the menu'],
     s:function(){return '<div class="ow-ts-h"><span>Spice Route</span><small>Open now</small></div><div class="ow-ts-b">'+[['biryani','Chicken Biryani',320],['pizza','Paneer Pizza',280],['burger','Classic Burger',180],['coffee','Filter Coffee',90]].map(function(m){return '<div class="ow-row"><img src="img/'+m[0]+'.svg" alt=""><span>'+m[1]+'</span><b>'+inr(m[2])+'</b></div>'}).join('')+'</div>'}},
    {t:'A cart that nudges them to add more',l:['Smart add-ons and combos at checkout','Coupons applied in one tap','Clear totals, no surprise charges'],
     s:function(){return '<div class="ow-ts-h"><span>Your cart</span><small>2 items</small></div><div class="ow-ts-b"><div class="ow-row"><img src="img/biryani.svg" alt=""><span>Chicken Biryani x1</span><b>₹320</b></div><div class="ow-row"><img src="img/burger.svg" alt=""><span>Classic Burger x2</span><b>₹360</b></div><div class="ow-code"><span>FIRST10 applied</span><span>−₹68</span></div><div class="ow-tot"><span>Total</span><span>₹612</span></div><span class="ow-pbtn">Proceed to pay</span></div>'}},
    {t:'Pay the way they like',l:['UPI, cards and wallets through a secure gateway','Cash on delivery if you want it','Money settles to your own account'],
     s:function(){return '<div class="ow-ts-h"><span>Payment</span><small>Secure</small></div><div class="ow-ts-b"><div class="ow-pay"><div class="on"><i></i>UPI (GPay, PhonePe, Paytm)</div><div><i></i>Credit or debit card</div><div><i></i>Cash on delivery</div></div><span class="ow-pbtn">Pay ₹612</span></div>'}},
    {t:'Track every order, live',l:['Customers see each step from kitchen to door','You see all orders in one place','Every customer saved to your CRM'],
     s:function(){return '<div class="ow-ts-h"><span>Order #1042</span><small>Live</small></div><div class="ow-ts-b"><ul class="ow-track"><li data-k="0"><i>✓</i><div><b>Order accepted</b><small>7:41 pm</small></div></li><li data-k="1"><i>✓</i><div><b>Being prepared</b><small>Chef is on it</small></div></li><li data-k="2"><i>3</i><div><b>On the way</b><small>Rider picked it up</small></div></li><li data-k="3"><i>4</i><div><b>Delivered</b><small>Enjoy your meal</small></div></li></ul><div class="ow-eta">Arriving in <b>18 min</b></div></div>'}}
  ];
  var tt=null;
  function drawTour(k){
    var t=TT[+k];clearInterval(tt);
    $('owTt').textContent=t.t;
    $('owTl').innerHTML=t.l.map(function(x){return '<li><i>✓</i>'+x+'</li>'}).join('');
    $('owTs').innerHTML='<div class="lp-sb"></div>'+t.s();
    if(+k===3){var lis=$('owTs').querySelectorAll('.ow-track li'),n=0;(function step(){if(n<lis.length){lis[n].classList.add('on');n++;if(RM)step()}})();
      if(!RM)tt=setInterval(function(){if(n<lis.length){lis[n].classList.add('on');n++}else clearInterval(tt)},900)}
  }
  drawTour(0);pick($('owTabs'),drawTour);
  `;

  return {
    slug: 'own-website', name: 'Own ordering website',
    title: 'Your Own Online Ordering Website. 0% Commission | RestroGrow',
    desc: 'A branded ordering website with your menu, your prices and online payments, set up for you. Zero commission on direct orders. 3X in 90 days or 100% back.',
    cta: 'Get My Ordering Website', stickyTail: 'going to app commission',
    hero: hero, before: [problem, calc, brand, how], after: [tour], css: css, js: js,
    faq: [
      ['Is it like the Zomato or Swiggy ordering experience?', 'Yes. Customers browse your menu, add items and pay online in a few taps, on your own branded website.'],
      ['Do I have to stop selling on Zomato and Swiggy?', 'No. Keep them for new customers and move your regulars to direct ordering.'],
      ['Does RestroGrow take a commission on my orders?', 'No. There is no per order platform commission to RestroGrow. Every direct order is yours. A small payment gateway fee applies on online payments.'],
      ['How will customers find my website?', 'We put it where they already see you: inserts in app parcels, QR codes on tables, WhatsApp, your Google profile and social media.'],
      ['Who delivers direct orders?', 'We set up delivery to fit your outlet, with your own riders or a delivery partner. We walk you through the options in the demo.'],
      ['How does the 3X guarantee work?', 'Over 90 days we add up the commission you saved and your direct order revenue. If it is less than 3X our service fee, we refund 100% of what you paid.']
    ]
  };
};
