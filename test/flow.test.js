// Végponttól végpontig teszt kamu Barion / Számlázz.hu / Resend válaszokkal (hálózat nélkül).
import { test } from 'node:test';
import assert from 'node:assert/strict';

process.env.LINK_SECRET = 'teszt-titok';
process.env.BASE_URL = 'https://egiposta.test';
process.env.BARION_POS_KEY = 'pos'; process.env.BARION_PAYEE = 'p@x.hu';
process.env.SZAMLAZZ_AGENT_KEY = 'agent'; process.env.SZAMLAZZ_VAT = 'AAM';
process.env.RESEND_API_KEY = 're_test'; process.env.SUPPORT_EMAIL = 'hello@x.hu';

const calls = [];
let barionStatus = 'Succeeded', barionTotal = null;
globalThis.fetch = async (url, opts = {}) => {
  calls.push({ url: String(url), opts });
  const u = String(url);
  const json = (o, status = 200, headers = {}) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', ...headers } });
  if (u.endsWith('/v2/Payment/Start')) {
    const b = JSON.parse(opts.body);
    barionTotal ??= b.Transactions[0].Total;
    return json({ PaymentId: 'PAY123', GatewayUrl: 'https://secure.test.barion.com/Pay?id=PAY123', Errors: [] });
  }
  if (u.includes('/v4/payment/PAY123/paymentstate')) return json({ PaymentId: 'PAY123', Status: barionStatus, Total: barionTotal });
  if (u === 'https://www.szamlazz.hu/szamla/') return new Response('xmlagentresponse=DONE;EP-2026-1', { status: 200, headers: { szlahu_szamlaszam: 'EP-2026-1' } });
  if (u === 'https://api.resend.com/emails') return json({ id: 'mail1' });
  throw new Error('váratlan fetch: ' + u);
};

const mockRes = () => { const r = { statusCode: 200, headers: {}, body: '', setHeader(k, v) { this.headers[k.toLowerCase()] = v; }, end(b) { this.body = b ?? ''; } }; return r; };

const { default: createOrder } = await import('../api/create-order.js');
const { default: callback } = await import('../api/barion-callback.js');
const { default: status } = await import('../api/order-status.js');
const { default: letterData } = await import('../api/letter-data.js');
const { getOrder } = await import('../lib/store.js');
const { sanitizeLetterHtml } = await import('../lib/sanitize.js');
const { priceFor } = await import('../lib/pricing.js');
const { buildInvoiceXml } = await import('../lib/szamlazz.js');

test('árazás: 2. levéltől 10%', () => {
  assert.equal(priceFor(1), 1990);
  assert.equal(priceFor(2), 3780);
  assert.equal(priceFor(3), 5570);
});

test('tisztítás: szkript és attribútumok eltűnnek', () => {
  const out = sanitizeLetterHtml('<p class="greet" onclick="x()">Szia</p><script>alert(1)</script><p style="x">a <b>b</b> <img src=x onerror=1></p><div>c</div>');
  assert.equal(out, '<p class="greet">Szia</p>alert(1)<p>a <b>b</b> </p>c');
  assert.ok(!/script|onerror|onclick|style/.test(out));
});

let orderId, token;
test('rendelés létrehozása és fizetés indítása', async () => {
  const req = { method: 'POST', body: {
    email: 'anya@pelda.hu', acceptTerms: true, waiveWithdrawal: true, approvedText: true,
    billing: { name: 'Kiss Anna', zip: '1111', city: 'Budapest', address: 'Fő utca 1.' },
    letters: [
      { state: { cat: 'kicsi', name: 'Bence', age: 6, sender: 'jezuska' }, html: '<p class="greet">Kedves Bence!</p><p>Szia</p>' },
      { state: { cat: 'nagy', name: 'Réka', age: 10, tone: 'vallasos', price: 1 }, html: '<p>Titok</p>', cert: { style: 'kek', reason: 'Szuper testvér', custom: '', price: 0 } },
    ] } };
  const res = mockRes();
  await createOrder(req, res);
  const j = JSON.parse(res.body);
  assert.equal(res.statusCode, 200, res.body);
  assert.match(j.gatewayUrl, /barion/);
  orderId = j.orderId;
  const start = calls.find(c => c.url.endsWith('/v2/Payment/Start'));
  const body = JSON.parse(start.opts.body);
  assert.equal(body.Transactions[0].Total, 3780 + 490, 'a szerver számolja az árat (2 levél + 1 oklevél)');
  assert.equal(body.Transactions[0].Items.find(i => i.SKU === 'EP-OKLEVEL').Quantity, 1);
  assert.equal(start.opts.headers['x-pos-key'], 'pos');
  const o = await getOrder(orderId);
  assert.equal(o.status, 'pending');
  token = new URL(body.RedirectUrl).searchParams.get('t');
});

test('hiányzó nyilatkozat esetén hiba', async () => {
  const res = mockRes();
  await createOrder({ method: 'POST', body: { email: 'a@b.hu', billing: {}, letters: [] } }, res);
  assert.equal(res.statusCode, 400);
});

test('letöltés fizetés előtt tiltott', async () => {
  const res = mockRes();
  await letterData({ query: { order: orderId, t: token, i: '0' } }, res);
  assert.equal(res.statusCode, 402);
});

test('Barion visszahívás → számla + e-mail, egyszer', async () => {
  const res = mockRes();
  await callback({ method: 'POST', body: { paymentId: 'PAY123' }, query: {} }, res);
  assert.equal(res.statusCode, 200);
  const o = await getOrder(orderId);
  assert.equal(o.status, 'fulfilled');
  assert.equal(o.invoiceNumber, 'EP-2026-1');
  assert.ok(o.emailSentAt);
  // második visszahívás nem állít ki újabb számlát
  const before = calls.filter(c => c.url.includes('szamlazz')).length;
  await callback({ method: 'POST', body: { paymentId: 'PAY123' }, query: {} }, mockRes());
  assert.equal(calls.filter(c => c.url.includes('szamlazz')).length, before);
});

test('e-mail hiba nem akasztja meg a rendelést', async () => {
  const { processOrder } = await import('../lib/fulfill.js');
  const { saveOrder } = await import('../lib/store.js');
  const o = await getOrder(orderId);
  const copy = { ...o, id: 'EPTEST-MAIL', status: 'paid', emailSentAt: undefined, invoiceNumber: 'X-1' };
  await saveOrder(copy);
  const saved = process.env.RESEND_API_KEY; delete process.env.RESEND_API_KEY;
  const { config } = await import('../lib/config.js'); const k = config.mail.resendKey; config.mail.resendKey = '';
  const r = await processOrder('EPTEST-MAIL');
  config.mail.resendKey = k; process.env.RESEND_API_KEY = saved;
  assert.equal(r.ok, true);
  assert.equal(r.order.status, 'fulfilled');
  assert.match(r.order.emailError, /RESEND_API_KEY/);
});

test('köszönőoldal: letöltési linkek, rossz token tiltva', async () => {
  const res = mockRes();
  await status({ query: { order: orderId, t: token } }, res);
  const j = JSON.parse(res.body);
  assert.equal(j.letters.length, 2);
  assert.match(j.letters[0].url, /\/api\/download\?order=/);
  const bad = mockRes();
  await status({ query: { order: orderId, t: 'rossz' } }, bad);
  assert.equal(bad.statusCode, 403);
});

test('levél adatai fizetés után elérhetők', async () => {
  const res = mockRes();
  await letterData({ query: { order: orderId, t: token, i: '1' } }, res);
  const j = JSON.parse(res.body);
  assert.equal(res.statusCode, 200);
  assert.equal(j.state.name, 'Réka');
  assert.equal(j.state.price, undefined, 'ismeretlen mező nem kerül tárolásra');
  assert.deepEqual(j.cert, { style: 'kek', reason: 'Szuper testvér', custom: '', signer: 'jezuska' });
  assert.equal(j.certs.length, 1);
});

test('számla XML: AAM tételek és összeg', async () => {
  const xml = buildInvoiceXml(await getOrder(orderId));
  assert.match(xml, /<afakulcs>AAM<\/afakulcs>/);
  assert.match(xml, /<bruttoErtek>1990<\/bruttoErtek>/);
  assert.match(xml, /<bruttoErtek>1790<\/bruttoErtek>/);
  assert.match(xml, /<sendEmail>true<\/sendEmail>/);
  assert.match(xml, /Személyre szabott oklevél/);
  assert.match(xml, /<bruttoErtek>490<\/bruttoErtek>/);
});

test('több oklevél egy levélhez: mindegyik külön tétel', async () => {
  const before = calls.length;
  const req = { method: 'POST', body: {
    email: 'apa@pelda.hu', acceptTerms: true, waiveWithdrawal: true, approvedText: true,
    billing: { name: 'Nagy Péter', zip: '2038', city: 'Sóskút', address: 'Fő utca 2.' },
    letters: [
      { state: { cat: 'kicsi', name: 'Panni', age: 5, sender: 'mikulas' }, html: '<p>Szia</p>', certs: [
        { style: 'mikulas', reason: 'Csupaszív testvér', custom: '', signer: 'mikulas' },
        { style: 'arany', reason: '__custom', custom: 'Ügyes kis rajzoló', signer: 'jezuska' },
        { style: 'nincs-ilyen', reason: 'x' },
      ] },
    ] } };
  const res = mockRes();
  await createOrder(req, res);
  assert.equal(res.statusCode, 200, res.body);
  const start = calls.slice(before).find(c => c.url.endsWith('/v2/Payment/Start'));
  const body = JSON.parse(start.opts.body);
  assert.equal(body.Transactions[0].Total, 1990 + 3 * 490);
  const o = await getOrder(JSON.parse(res.body).orderId);
  assert.equal(o.items[0].certs.length, 3);
  assert.equal(o.items[0].certs[2].style, 'arany', 'ismeretlen stílus → arany');
  assert.equal(o.items[0].certs[0].signer, 'mikulas');
});

test('tulajdonosi értesítő: összeg és tartalom, gyerekadatok nélkül', async () => {
  const mails = calls.filter(c => c.url === 'https://api.resend.com/emails').map(c => JSON.parse(c.opts.body));
  const admin = mails.find(m => /Új rendelés/.test(m.subject));
  assert.ok(admin, 'ment értesítő');
  assert.equal(admin.subject, 'Új rendelés: 2 levél + 1 oklevél, 4 270 Ft');
  assert.deepEqual(admin.to, ['hello@x.hu']);
  assert.ok(!/Bence|Réka|Titok/.test(admin.html), 'nincs benne a gyerek neve vagy a szöveg');
  const o = await getOrder(orderId);
  assert.ok(o.adminNotifiedAt);
});
