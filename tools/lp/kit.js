/* ===== shared helpers for the ad landing pages (runs after the main page script) ===== */
(function () {
  var R = document.querySelector(".rg"); if (!R) return;
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (i) { return R.querySelector("#" + i); };
  var inr = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };
  var sh = function (n) { return n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr" : n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + " L" : inr(n); };
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
  /* paint the filled part of a range slider */
  function fill(r) { r.style.setProperty("--p", (r.value - r.min) / (r.max - r.min) * 100 + "%"); }
  /* run fn when el scrolls into view (or at once if motion is reduced) */
  function seen(el, fn, th) {
    if (!el) return;
    if (RM || !("IntersectionObserver" in window)) { fn(); return; }
    var o = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { fn(); o.disconnect(); } }, { threshold: th || .35 });
    o.observe(el);
  }
  /* little confetti burst from an element */
  function confetti(from) {
    if (RM) return;
    var b = from.getBoundingClientRect(), cols = ["#FC5301", "#FACC15", "#22C55E", "#3B82F6", "#EC4899"], i;
    for (i = 0; i < 26; i++) {
      var d = document.createElement("i"); d.className = "lp-confetti"; d.style.background = cols[i % cols.length];
      d.style.left = (b.left + b.width / 2) + "px"; d.style.top = (b.top + b.height / 2) + "px";
      R.appendChild(d);
      var ang = Math.random() * Math.PI * 2, v = 90 + Math.random() * 150;
      var a = d.animate([{ opacity: 1, transform: "translate(0,0) rotate(0)" }, { opacity: 0, transform: "translate(" + Math.cos(ang) * v + "px," + (Math.sin(ang) * v + 120) + "px) rotate(" + (Math.random() * 540) + "deg)" }], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" });
      a.onfinish = (function (n) { return function () { n.remove(); }; })(d);
    }
  }
  /* segmented / chip groups: one active button, callback with its data-v */
  function pick(box, cb) {
    if (!box) return;
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || !box.contains(b)) return;
      Array.prototype.forEach.call(box.querySelectorAll("button"), function (x) { x.classList.toggle("on", x === b); });
      cb(b.getAttribute("data-v"), b);
    });
  }
  /* tag the scripted "?shot" mode used for screenshots: show every reveal block at once */
  if (/[?&]shot\b/.test(location.search)) {
    R.querySelectorAll(".rv").forEach(function (e) { e.classList.add("show"); });
    Array.prototype.forEach.call(document.images, function (i) { i.loading = "eager"; });
  }
  window.LP = { R: R, $: $, inr: inr, sh: sh, num: num, fill: fill, seen: seen, confetti: confetti, pick: pick, RM: RM };
})();
