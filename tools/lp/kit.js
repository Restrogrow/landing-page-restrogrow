/* ===== shared helpers for the ad landing pages (runs after the main page script) ===== */
(function () {
  var R = document.querySelector(".rg"); if (!R) return;
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var IO = "IntersectionObserver" in window;
  var $ = function (i) { return R.querySelector("#" + i); };
  var inr = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var sh = function (n) { return n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr" : n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + " L" : inr(n); };
  var D = window.LPD || { proofs: [], payouts: [], base: "" };
  var tw = {};

  /* animate a number inside an element */
  function num(el, to, fmt, dur) {
    if (!el) return;
    fmt = fmt || inr;
    var from = +el.getAttribute("data-v") || 0; el.setAttribute("data-v", to);
    if (RM) { el.textContent = fmt(to); return; }
    var id = el.id || (el.id = "n" + Math.random().toString(36).slice(2, 8)), s = performance.now();
    cancelAnimationFrame(tw[id]);
    (function step() {
      var p = Math.min((performance.now() - s) / (dur || 600), 1);
      el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) tw[id] = requestAnimationFrame(step);
    })();
  }
  function fill(r) { r.style.setProperty("--p", (r.value - r.min) / (r.max - r.min) * 100 + "%"); }
  function seen(el, fn, th) {
    if (!el) return;
    if (RM || !IO) { fn(); return; }
    var o = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { fn(); o.disconnect(); } }, { threshold: th || .35 });
    o.observe(el);
  }
  function confetti(from) {
    if (RM) return;
    var b = from.getBoundingClientRect(), cols = ["#FC5301", "#FACC15", "#22C55E", "#3B82F6", "#EC4899"], i;
    for (i = 0; i < 26; i++) {
      var d = document.createElement("i"); d.style.cssText = "position:fixed;pointer-events:none;z-index:10050;width:9px;height:14px;border-radius:2px;background:" + cols[i % cols.length] + ";left:" + (b.left + b.width / 2) + "px;top:" + (b.top + b.height / 2) + "px";
      document.body.appendChild(d);
      var ang = Math.random() * Math.PI * 2, v = 90 + Math.random() * 150;
      var a = d.animate([{ opacity: 1, transform: "translate(0,0) rotate(0)" }, { opacity: 0, transform: "translate(" + Math.cos(ang) * v + "px," + (Math.sin(ang) * v + 120) + "px) rotate(" + (Math.random() * 540) + "deg)" }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" });
      a.onfinish = (function (n) { return function () { n.remove(); }; })(d);
    }
  }
  function pick(box, cb) {
    if (!box) return;
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || !box.contains(b)) return;
      Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.classList.toggle("on", x === b); });
      cb(b.getAttribute("data-v"), b);
    });
  }

  /* full-size view of a real screenshot (uses the page's existing lightbox) */
  var lb = $("rgLb");
  function zoom(src) {
    if (!lb) return;
    lb.querySelector("img").src = src; lb.classList.add("on");
    var esc = function (e) { if (e.key === "Escape") { lb.classList.remove("on"); document.removeEventListener("keydown", esc); } };
    document.addEventListener("keydown", esc);
  }
  if (lb) lb.addEventListener("click", function () { lb.classList.remove("on"); });
  R.addEventListener("click", function (e) { var z = e.target.closest("[data-zoom]"); if (z) zoom(z.getAttribute("data-zoom")); });

  /* scroll reveal (.rv) */
  var rv = R.querySelectorAll(".rv");
  if (IO && !RM) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }); }, { threshold: .1, rootMargin: "0px 0px -30px 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("show"); });

  /* real client logos: strip + avatars */
  var U = "https://chocolate-porcupine-790252.hostingersite.com/wp-content/uploads/2026/10/";
  var L = ["01-Kohuke", "02-Food-Station", "03-Tastea-Food-and-Beverages", "04-Naso-Restaurants-and-Bar", "05-Ganesh-Restaurant", "06-Delhi-Darbar-Restaurant-Copy", "07-Atea-Spot", "08-Desert-Delight-Copy-1", "09-Pin-Point-Family-Restaurant", "10-Chaska-Cafe", "11-Chinees-Corner", "12-House-of-Dossapamm", "13-RJ-Food-Cafe", "14-Arya-Cafe", "15-Sadhiska-Bakery-and-Cafe"];
  var nm = function (f) { return f.replace(/^\d+-/, "").replace(/-Copy(-\d)?$/, "").replace(/-/g, " "); };
  var mq = $("rgMq");
  if (mq) { var h = L.map(function (f) { return '<img loading="lazy" decoding="async" src="' + U + f + '.png" alt="' + nm(f) + '">'; }).join(""); mq.innerHTML = h + h.replace(/alt="[^"]*"/g, 'alt=""'); }
  var av = $("rgAvs"); if (av) av.innerHTML = [6, 4, 9, 0, 13].map(function (i) { return '<img src="' + U + L[i] + '.png" alt="" width="38" height="38">'; }).join("");

  /* count-up numbers: <b data-count="140" data-suffix="+"> */
  R.querySelectorAll("[data-count]").forEach(function (el) {
    var to = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "", pre = el.getAttribute("data-prefix") || "", dec = +(el.getAttribute("data-dec") || 0);
    seen(el, function () { num(el, to, function (v) { return pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN")) + suf; }, 1600); }, .5);
  });

  /* ===== real client explorer (#clx) ===== */
  var clx = $("clx");
  if (clx && D.proofs.length) {
    var focus = clx.getAttribute("data-focus") || "repeat", cur = 0;
    var tabs = $("clxTabs"), img = $("clxImg"), say = $("clxSay"), bars = $("clxBars");
    tabs.innerHTML = D.proofs.map(function (p, i) { return '<button type="button" data-i="' + i + '"' + (i ? "" : ' class="on"') + '>Client ' + (i + 1) + "</button>"; }).join("");
    var M = { repeat: ["Repeat ratio", function (p) { return p.ratio; }, function (v) { return v.toFixed(2) + "%"; }, 100],
              customers: ["Customers saved", function (p) { return p.customers; }, function (v) { return Math.round(v).toLocaleString("en-IN"); }, 0],
              orders: ["Orders", function (p) { return p.orders; }, function (v) { return Math.round(v).toLocaleString("en-IN"); }, 0],
              sales: ["Total sales", function (p) { return p.sales; }, function (v) { return sh(v); }, 0] };
    var mm = M[focus], mx = Math.max.apply(null, D.proofs.map(mm[1])) * 1.08;
    bars.innerHTML = D.proofs.map(function (p, i) { return '<div class="cl-bar" data-i="' + i + '"><span>Client ' + (i + 1) + '</span><i style="--w:' + (mm[1](p) / mx * 100) + '%"></i><b>' + mm[2](mm[1](p)) + "</b></div>"; }).join("");
    function show(i) {
      cur = i; var p = D.proofs[i];
      Array.prototype.forEach.call(tabs.children, function (b, k) { b.classList.toggle("on", k === i); });
      Array.prototype.forEach.call(bars.children, function (b, k) { b.classList.toggle("on", k === i); });
      img.src = D.base + p.file; img.parentNode.setAttribute("data-zoom", D.base + p.file);
      var s = { sales: [$("clS"), p.sales, inr], orders: [$("clO"), p.orders, function (v) { return Math.round(v).toLocaleString("en-IN"); }], customers: [$("clC"), p.customers, function (v) { return Math.round(v).toLocaleString("en-IN"); }], repeat: [$("clR"), p.repeat, function (v) { return Math.round(v).toLocaleString("en-IN"); }], ratio: [$("clP"), p.ratio, function (v) { return v.toFixed(2) + "%"; }] };
      Object.keys(s).forEach(function (k) { num(s[k][0], s[k][1], s[k][2], 500); });
      var aov = p.sales / p.orders, rc = p.repeat * aov * 0.25, ac = p.sales * 0.25;
      say.innerHTML = focus === "repeat" ? "<b>" + p.repeat + " of " + p.orders + " orders</b> came from returning customers. At a typical 25% app commission, those repeat orders alone would have cost about <b>" + inr(rc) + "</b>."
        : focus === "customers" ? "<b>" + p.customers + " customers</b> saved to this restaurant's own list in 3 months. Every one is a number the owner can message, with no app in between."
        : "<b>" + p.orders + " direct orders</b> in 3 months, about " + (p.orders / 90).toFixed(1) + " a day. At a typical 25% app commission, <b>" + inr(ac) + "</b> of this would have gone to the apps.";
    }
    tabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) show(+b.getAttribute("data-i")); });
    bars.addEventListener("click", function (e) { var b = e.target.closest(".cl-bar"); if (b) show(+b.getAttribute("data-i")); });
    seen(clx, function () { show(0); }, .15);
    show(0);
  }

  /* ===== real payout decoder (#pod) ===== */
  var pod = $("pod");
  if (pod && D.payouts.length) {
    var pi = 0, mode = "app";
    var SEG = [["base", "Base service fee", "#FC5301"], ["ld", "Long distance fee", "#FF8A3D"], ["pay", "Payment mechanism fee", "#F5B66B"], ["tax", "Tax deductions", "#9A3412"], ["growth", "Investments in growth", "#B45309"]];
    function pdraw() {
      var p = D.payouts[pi], A = p.A;
      $("podImg").src = D.base + p.file; $("podImg").parentNode.setAttribute("data-zoom", D.base + p.file);
      var items, keep;
      if (mode === "app") {
        items = SEG.map(function (s) { return [s[1], p[s[0]], s[2]]; }); keep = p.payout;
        var credits = p.B + p.disc; items.push(["Credits and additions", -credits, "#94A3B8"]);
      } else {
        items = [["Payment gateway, about 2%", A * 0.02, "#FC5301"]]; keep = A * 0.98;
      }
      var tot = items.reduce(function (a, it) { return a + Math.max(0, it[1]); }, 0) + keep;
      $("podBar").innerHTML = items.filter(function (it) { return it[1] > 0; }).map(function (it) { return '<i style="width:' + it[1] / tot * 100 + '%;background:' + it[2] + '" title="' + it[0] + '"></i>'; }).join("") + '<i style="width:' + keep / tot * 100 + '%;background:#16A34A" title="You keep"></i>';
      $("podLeg").innerHTML = items.map(function (it) { return '<li><i style="background:' + it[2] + '"></i><span>' + it[0] + "</span><em>" + (it[1] / A * 100).toFixed(1) + "%</em><b>" + (it[1] < 0 ? "+" : "−") + inr(Math.abs(it[1])) + "</b></li>"; }).join("");
      num($("podKeep"), keep, inr, 600); $("podKeepP").textContent = (keep / A * 100).toFixed(1) + "% of " + inr(A) + " in sales";
      $("podMore").innerHTML = mode === "app" ? "Of every ₹100 customers paid, this restaurant kept <b>₹" + (keep / A * 100).toFixed(0) + "</b>. The rest went to fees, tax and growth charges."
        : "Same sales through your own ordering system: you keep <b>" + inr(A * 0.98 - p.payout) + " more</b> in this month alone.";
    }
    pick($("podTabs"), function (v) { pi = +v; pdraw(); });
    pick($("podMode"), function (v) { mode = v; pdraw(); });
    pdraw();
  }

  /* "?shot" mode used for screenshots: show every reveal block and load every image at once */
  if (/[?&]shot\b/.test(location.search)) {
    R.querySelectorAll(".rv").forEach(function (e) { e.classList.add("show"); });
    Array.prototype.forEach.call(document.images, function (i) { i.loading = "eager"; });
  }
  window.LP = { R: R, $: $, inr: inr, sh: sh, num: num, fill: fill, seen: seen, confetti: confetti, pick: pick, RM: RM, zoom: zoom, D: D };
})();
