// Small flat illustrations used on the landing pages. build-lps.js writes them to lp/img/*.svg
// and also inlines them where handy. Palette follows the brand (orange #FC5301, ink #00000C, cream #FBF6F1).
'use strict';

function svg(body, vb) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (vb || '0 0 96 96') + '" fill="none">' + body + '</svg>'; }

var ART = {
  burger: svg(
    '<ellipse cx="48" cy="84" rx="34" ry="5" fill="#000" opacity=".08"/>' +
    '<path d="M16 44c0-17 14-28 32-28s32 11 32 28z" fill="#F59E0B"/>' +
    '<circle cx="34" cy="30" r="2" fill="#FDE68A"/><circle cx="48" cy="25" r="2" fill="#FDE68A"/><circle cx="62" cy="31" r="2" fill="#FDE68A"/><circle cx="42" cy="37" r="2" fill="#FDE68A"/><circle cx="56" cy="39" r="2" fill="#FDE68A"/>' +
    '<path d="M12 46c6 6 10-4 16 2s10-4 16 2 10-4 16 2 10-4 16 2 6-6 8-4v6H12z" fill="#22C55E"/>' +
    '<path d="M14 54h68l-8 10H22z" fill="#FACC15"/>' +
    '<rect x="14" y="60" width="68" height="11" rx="5.5" fill="#7C2D12"/>' +
    '<path d="M16 73h64c0 7-5 11-12 11H28c-7 0-12-4-12-11z" fill="#F59E0B"/>'),
  pizza: svg(
    '<ellipse cx="48" cy="86" rx="30" ry="4.5" fill="#000" opacity=".08"/>' +
    '<path d="M48 84L14 24c10-8 24-12 34-12s24 4 34 12z" fill="#FDE68A" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M14 24c10-8 24-12 34-12s24 4 34 12" stroke="#D97706" stroke-width="7" stroke-linecap="round"/>' +
    '<circle cx="40" cy="36" r="6" fill="#DC2626"/><circle cx="58" cy="38" r="5.5" fill="#DC2626"/><circle cx="48" cy="55" r="5" fill="#DC2626"/>' +
    '<circle cx="38" cy="35" r="1.4" fill="#FCA5A5"/><circle cx="56" cy="37" r="1.4" fill="#FCA5A5"/><circle cx="46" cy="54" r="1.3" fill="#FCA5A5"/>' +
    '<path d="M44 68l2 6M52 64l-1 6" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round"/>'),
  biryani: svg(
    '<ellipse cx="48" cy="86" rx="34" ry="5" fill="#000" opacity=".08"/>' +
    '<path d="M18 46c0-14 13-24 30-24s30 10 30 24z" fill="#FDE68A"/>' +
    '<circle cx="34" cy="38" r="2" fill="#F59E0B"/><circle cx="48" cy="32" r="2" fill="#F59E0B"/><circle cx="60" cy="40" r="2" fill="#F59E0B"/><circle cx="42" cy="44" r="2" fill="#16A34A"/><circle cx="54" cy="29" r="2" fill="#DC2626"/>' +
    '<path d="M44 24c2-8 8-10 12-8-1 6-6 9-12 8z" fill="#16A34A"/>' +
    '<path d="M12 46h72c0 22-14 36-36 36S12 68 12 46z" fill="#FC5301"/>' +
    '<path d="M24 56c6 12 18 18 24 18" stroke="#fff" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>'),
  coffee: svg(
    '<ellipse cx="46" cy="86" rx="30" ry="4.5" fill="#000" opacity=".08"/>' +
    '<path d="M32 18c-4 6 4 8 0 14M46 14c-4 6 4 8 0 14M60 18c-4 6 4 8 0 14" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M18 40h56v18c0 14-10 24-28 24S18 72 18 58z" fill="#fff" stroke="#E5E7EB" stroke-width="3"/>' +
    '<path d="M18 40h56v8H18z" fill="#92400E"/>' +
    '<path d="M74 46h6c6 0 9 4 9 9s-3 9-9 9h-8" stroke="#E5E7EB" stroke-width="5" stroke-linecap="round"/>'),
  cupcake: svg(
    '<ellipse cx="48" cy="87" rx="28" ry="4" fill="#000" opacity=".08"/>' +
    '<path d="M24 54h48l-6 30H30z" fill="#FC5301"/><path d="M34 54l3 30M48 54v30M62 54l-3 30" stroke="#fff" stroke-opacity=".4" stroke-width="2"/>' +
    '<path d="M20 54c-4-8 2-14 8-14 0-8 8-14 20-14s20 6 20 14c6 0 12 6 8 14z" fill="#FBCFE8"/>' +
    '<path d="M30 46c4 4 8 4 12 0M52 46c4 4 8 4 12 0" stroke="#F9A8D4" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="48" cy="22" r="6" fill="#DC2626"/><path d="M48 16c0-4 3-7 7-7" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round"/>'),
  momos: svg(
    '<ellipse cx="48" cy="86" rx="34" ry="5" fill="#000" opacity=".08"/>' +
    '<path d="M10 70c0-18 12-30 22-30s22 12 22 30z" fill="#FFF7ED" stroke="#FDBA74" stroke-width="2.5"/>' +
    '<path d="M22 46c2 6 4 10 10 10s8-4 10-10" stroke="#FDBA74" stroke-width="2.5" stroke-linecap="round"/>' +
    '<path d="M44 74c0-14 10-24 18-24s18 10 18 24z" fill="#FFF7ED" stroke="#FDBA74" stroke-width="2.5"/>' +
    '<path d="M54 56c2 5 3 8 8 8s6-3 8-8" stroke="#FDBA74" stroke-width="2.5" stroke-linecap="round"/>' +
    '<rect x="8" y="72" width="80" height="9" rx="4.5" fill="#FC5301"/>'),
  gift: svg(
    '<ellipse cx="48" cy="86" rx="28" ry="4" fill="#000" opacity=".08"/>' +
    '<rect x="14" y="38" width="68" height="46" rx="6" fill="#FC5301"/><rect x="10" y="28" width="76" height="16" rx="5" fill="#FF7A3D"/>' +
    '<rect x="42" y="28" width="12" height="56" fill="#FDE68A"/>' +
    '<path d="M48 28c-8-14-24-14-24-6s14 8 24 6zM48 28c8-14 24-14 24-6s-14 8-24 6z" stroke="#FDE68A" stroke-width="4" stroke-linejoin="round"/>'),
  star: svg(
    '<path d="M48 10l11.5 24 26.5 3.5-19.5 18.5 5 26L48 69l-23.5 13 5-26L10 37.5 36.5 34z" fill="#FACC15" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round"/>'),
  heart: svg(
    '<path d="M48 82S12 60 12 34c0-12 9-20 19-20 7 0 13 4 17 11 4-7 10-11 17-11 10 0 19 8 19 20 0 26-36 48-36 48z" fill="#FC5301"/><path d="M26 30c0-5 4-9 9-9" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>'),
  bell: svg(
    '<path d="M48 12c-14 0-24 10-24 24v14c0 6-4 10-8 14h64c-4-4-8-8-8-14V36c0-14-10-24-24-24z" fill="#FACC15" stroke="#F59E0B" stroke-width="3"/>' +
    '<path d="M40 72a8 8 0 0 0 16 0" fill="#F59E0B"/><circle cx="70" cy="22" r="9" fill="#FC5301"/>'),
  rider: svg(
    '<ellipse cx="48" cy="86" rx="36" ry="4.5" fill="#000" opacity=".08"/>' +
    '<circle cx="24" cy="70" r="12" stroke="#1A1A26" stroke-width="5"/><circle cx="74" cy="70" r="12" stroke="#1A1A26" stroke-width="5"/>' +
    '<path d="M24 70l16-26h22l12 26M40 44l-4-10h-8" stroke="#FC5301" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect x="44" y="20" width="26" height="22" rx="4" fill="#FC5301"/><path d="M50 26h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'),
  receipt: svg(
    '<path d="M22 10h52v72l-8.7-6-8.6 6-8.7-6-8.7 6-8.6-6L22 82z" fill="#fff" stroke="#E5E7EB" stroke-width="3" stroke-linejoin="round"/>' +
    '<path d="M32 26h32M32 38h32M32 50h20" stroke="#D1D5DB" stroke-width="4" stroke-linecap="round"/><path d="M32 62h32" stroke="#FC5301" stroke-width="5" stroke-linecap="round"/>'),
  qr: svg(
    '<rect x="14" y="14" width="68" height="68" rx="8" fill="#fff" stroke="#E5E7EB" stroke-width="3"/>' +
    '<rect x="24" y="24" width="18" height="18" rx="3" fill="#00000C"/><rect x="54" y="24" width="18" height="18" rx="3" fill="#00000C"/><rect x="24" y="54" width="18" height="18" rx="3" fill="#00000C"/>' +
    '<rect x="29" y="29" width="8" height="8" fill="#fff"/><rect x="59" y="29" width="8" height="8" fill="#fff"/><rect x="29" y="59" width="8" height="8" fill="#fff"/>' +
    '<rect x="54" y="54" width="7" height="7" fill="#FC5301"/><rect x="65" y="54" width="7" height="7" fill="#00000C"/><rect x="54" y="65" width="7" height="7" fill="#00000C"/><rect x="65" y="65" width="7" height="7" fill="#00000C"/>')
};

module.exports = ART;
