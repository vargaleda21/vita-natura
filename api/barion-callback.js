// POST /api/barion-callback – a Barion értesít, ha változik egy fizetés állapota.
// A törzsben csak a paymentId érkezik; az állapotot mindig visszakérdezzük a Bariontól.
import { readBody, query } from '../lib/http.js';
import { processPayment } from '../lib/fulfill.js';

export default async function handler(req, res) {
  const b = await readBody(req).catch(() => ({}));
  const q = query(req);
  const paymentId = b.paymentId || b.PaymentId || q.paymentId || q.PaymentId;
  if (paymentId) {
    try { await processPayment(String(paymentId)); }
    catch (e) { console.error('barion-callback', e); }
  }
  res.statusCode = 200;           // a Barion 200-at vár, különben később újrapróbálja
  res.end('OK');
}
