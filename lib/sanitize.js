// A böngészőből érkező levélszöveg szigorú tisztítása.
// Csak bekezdés, sortörés és egyszerű kiemelés marad; minden más szövegként, escape-elve kerül tárolásra.
const ALLOWED = new Set(['p', 'br', 'b', 'i', 'em', 'strong']);
const esc = s => s.replace(/&(?!(amp|lt|gt|quot|#39|nbsp);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function sanitizeLetterHtml(html, maxLen = 20000) {
  if (typeof html !== 'string') return '';
  html = html.slice(0, maxLen).replace(/<!--[\s\S]*?-->/g, '');
  let out = '';
  const re = /<\/?([a-zA-Z0-9]+)([^>]*)>/g;
  let last = 0, m;
  const stack = [];
  while ((m = re.exec(html))) {
    out += esc(html.slice(last, m.index));
    last = re.lastIndex;
    const tag = m[1].toLowerCase();
    const closing = m[0].startsWith('</');
    if (!ALLOWED.has(tag)) continue;              // ismeretlen tag: eldobjuk (a tartalma szövegként marad)
    if (tag === 'br') { out += '<br>'; continue; }
    if (closing) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) continue;
      while (stack.length > idx) out += `</${stack.pop()}>`;
    } else {
      const greet = tag === 'p' && /class\s*=\s*["']?[^"'>]*\bgreet\b/.test(m[2]);
      out += greet ? '<p class="greet">' : `<${tag}>`;
      stack.push(tag);
    }
  }
  out += esc(html.slice(last));
  while (stack.length) out += `</${stack.pop()}>`;
  // a contenteditable-ből érkező <div> sorok helyett nincs semmi; üres bekezdések kiszűrése
  return out.replace(/<p>\s*<\/p>/g, '');
}

const STR = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');
const ONE = (v, list, d) => (list.includes(v) ? v : d);

// Az űrlap állapotának ellenőrzése (csak ismert mezők, hosszkorláttal).
export function cleanState(s = {}) {
  return {
    cat: ONE(s.cat, ['kicsi', 'nagy'], 'kicsi'),
    mode: s.cat === 'nagy' ? 'beavato' : 'kicsi',
    sender: ONE(s.sender, ['jezuska', 'angyalka', 'mikulas', 'telapo'], 'jezuska'),
    theme: ONE(s.theme, ['ornate', 'classic', 'airmail'], 'ornate'),
    font: ONE(s.font, ['hand', 'serif'], 'hand'),
    kid: ONE(s.kid, ['fiú', 'lány', 'gyerek'], 'gyerek'),
    tone: ONE(s.tone, ['vallasos', 'semleges'], 'vallasos'),
    name: STR(s.name, 24),
    age: Number.isFinite(+s.age) ? Math.max(0, Math.min(18, Math.round(+s.age))) : null,
    proud: Array.isArray(s.proud) ? s.proud.filter(x => typeof x === 'string').slice(0, 12).map(x => x.slice(0, 20)) : [],
    proudCustom: STR(s.proudCustom, 90),
    sibling: STR(s.sibling, 24),
    fav: STR(s.fav, 40),
    town: STR(s.town, 30),
    improve: STR(s.improve, 20),
    wish: STR(s.wish, 50),
    noWish: Boolean(s.noWish),
    signer: STR(s.signer, 30),
  };
}

const CERT_STYLES = ['arany', 'kek', 'mikulas'];
const CERT_LEGACY = { csillag: 'mikulas', fenyo: 'mikulas' };
// Oklevél választás ellenőrzése (vagy null, ha nem kért).
export function cleanCert(c) {
  if (!c || typeof c !== 'object') return null;
  const reason = typeof c.reason === 'string' ? c.reason.slice(0, 60) : '';
  const custom = typeof c.custom === 'string' ? c.custom.slice(0, 60) : '';
  if (!reason && !custom) return null;
  const style = CERT_LEGACY[c.style] || c.style;
  const signer = c.signer === 'mikulas' ? 'mikulas' : 'jezuska';
  return { style: CERT_STYLES.includes(style) ? style : 'arany', reason, custom, signer };
}
