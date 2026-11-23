/* Égi Posta – sütihozzájárulás + Meta (Facebook) Pixel.
 *
 * BEÁLLÍTÁS: írd be a Meta Pixel azonosítót (csak számok) az alábbi sorba.
 * Amíg üres, nincs sütibanner és nincs Facebook-követés.
 */
var META_PIXEL_ID = '';

(function () {
  'use strict';
  var KEY = 'ep_consent_v1';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 180; // 180 nap után újra megkérdezzük
  var queue = [];
  var loaded = false;

  // Bármely oldal hívhatja: window.epTrack('Purchase', {value: 1990, currency: 'HUF'})
  window.epTrack = function (event, params) {
    if (!META_PIXEL_ID) return;
    if (loaded && window.fbq) window.fbq('track', event, params || {});
    else queue.push([event, params || {}]);
  };

  if (!META_PIXEL_ID) return;
  if (/[?&](print|pdf)=/.test(location.search)) return;

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (c && Date.now() - c.ts < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function save(ads) {
    try { localStorage.setItem(KEY, JSON.stringify({ ads: !!ads, ts: Date.now() })); } catch (e) {}
  }

  function loadPixel() {
    if (loaded) return;
    loaded = true;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
    queue.forEach(function (q) { window.fbq('track', q[0], q[1]); });
    queue = [];
  }

  var css = '' +
    '.ep-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
    'background:#fff;color:#2b2340;border-radius:16px;box-shadow:0 12px 40px rgba(20,35,59,.28);' +
    'padding:18px 20px;font:14px/1.5 Inter,system-ui,sans-serif}' +
    '.ep-cc b{display:block;font-size:15px;margin-bottom:4px}' +
    '.ep-cc p{margin:0 0 12px;color:#4a4560}' +
    '.ep-cc a{color:#8f1d24}' +
    '.ep-cc .row{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}' +
    '.ep-cc button{font:600 14px Inter,system-ui,sans-serif;border-radius:10px;padding:10px 16px;cursor:pointer;border:1px solid #d9d2c3;background:#fff;color:#2b2340}' +
    '.ep-cc button.yes{background:#8f1d24;border-color:#8f1d24;color:#fff}' +
    '@media(max-width:480px){.ep-cc .row button{flex:1}}';

  function showBanner() {
    if (document.getElementById('epCookie')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div');
    d.className = 'ep-cc'; d.id = 'epCookie';
    d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Süti-beállítások');
    d.innerHTML = '<b>Sütik 🍪</b><p>Az oldal működéséhez szükséges sütiken túl – a hozzájárulásoddal – ' +
      'a Meta (Facebook) Pixelt használjuk, hogy mérjük a hirdetéseink eredményét. ' +
      'Részletek az <a href="/adatkezeles.html">adatkezelési tájékoztatóban</a>.</p>' +
      '<div class="row"><button type="button" class="no">Csak a szükségesek</button>' +
      '<button type="button" class="yes">Elfogadom</button></div>';
    document.body.appendChild(d);
    d.querySelector('.yes').onclick = function () { save(true); d.remove(); loadPixel(); };
    d.querySelector('.no').onclick = function () { save(false); d.remove(); };
  }

  function init() {
    // „Süti-beállítások” link a láblécben (bármely elem data-cookie-settings attribútummal)
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.hidden = false;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var had = read();
        try { localStorage.removeItem(KEY); } catch (_) {}
        if (had && had.ads) { location.reload(); return; } // visszavonás: újratöltés, a Pixel nem indul el
        showBanner();
      });
    });
    var c = read();
    if (c && c.ads) loadPixel();
    else if (!c) showBanner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
