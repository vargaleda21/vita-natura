// POST /api/create-order – rendelés mentése és Barion fizetés indítása.
import { send, readBody } from '../lib/http.js';
import { config, PRICING } from '../lib/config.js';
import { sanitizeLetterHtml, cleanState, cleanCert } from '../lib/sanitize.js';
import { lineItems, certCount } from '../lib/pricing.js';
import { newOrderId, signOrder } from '../lib/token.js';
import { saveOrder, mapPayment } from '../lib/store.js';
import { startPayment } from '../lib/barion.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Csak POST' });
  try {
    const b = await readBody(req);
    const letters = Array.isArray(b.letters) ? b.letters.slice(0, PRICING.maxLetters) : [];
    const bill = b.billing || {};
    const errors = [];
    if (!letters.length) errors.push('Nincs levél a rendelésben.');
    if (!EMAIL.test(String(b.email || ''))) errors.push('Adj meg egy érvényes e-mail címet.');
    for (const [k, label] of [['name', 'név'], ['zip', 'irányítószám'], ['city', 'település'], ['address', 'cím']])
      if (!String(bill[k] || '').trim()) errors.push(`Hiányzik a számlázási ${label}.`);
    if (!b.acceptTerms) errors.push('Az ÁSZF és az adatkezelési tájékoztató elfogadása kötelező.');
    if (!b.approvedText) errors.push('A levelek szövegének jóváhagyása kötelező.');
    if (!b.waiveWithdrawal) errors.push('Az azonnali teljesítéshez szükséges nyilatkozat hiányzik.');
    if (errors.length) return send(res, 400, { error: errors.join(' ') });

    const id = newOrderId();
    const token = signOrder(id);
    const order = {
      id, status: 'pending', createdAt: new Date().toISOString(),
      consent: { terms: true, approvedText: true, waiveWithdrawal: true, at: new Date().toISOString() },
      email: String(b.email).trim().slice(0, 120),
      billing: {
        name: String(bill.name).trim().slice(0, 80),
        zip: String(bill.zip).trim().slice(0, 10),
        city: String(bill.city).trim().slice(0, 60),
        address: String(bill.address).trim().slice(0, 120),
      },
      items: letters.map(l => {
        const raw = Array.isArray(l.certs) ? l.certs : (l.cert ? [l.cert] : []);
        const certs = raw.slice(0, PRICING.maxCertsPerLetter).map(cleanCert).filter(Boolean);
        return { state: cleanState(l.state), html: sanitizeLetterHtml(l.html), certs };
      }),
    };

    const items = lineItems(order.items.length, certCount(order)).map(li => ({
      Name: li.kind === 'cert' ? 'Személyre szabott oklevél' : 'Személyre szabott karácsonyi levél',
      Description: `Letölthető PDF – ${li.label}`,
      Quantity: li.qty, Unit: 'db', UnitPrice: li.unit, ItemTotal: li.qty * li.unit, SKU: li.kind === 'cert' ? 'EP-OKLEVEL' : 'EP-LEVEL',
    }));

    const { paymentId, gatewayUrl } = await startPayment({
      order, items,
      redirectUrl: `${config.baseUrl}/koszonjuk.html?order=${id}&t=${token}`,
      callbackUrl: `${config.baseUrl}/api/barion-callback`,
    });
    order.paymentId = paymentId;
    order.total = items.reduce((s, i) => s + i.ItemTotal, 0);
    await saveOrder(order);
    await mapPayment(paymentId, id);
    return send(res, 200, { orderId: id, gatewayUrl });
  } catch (e) {
    console.error('create-order', e);
    return send(res, 500, { error: 'Most nem sikerült elindítani a fizetést. Kérjük, próbáld újra pár perc múlva.' });
  }
}
