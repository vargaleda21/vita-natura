// GET /api/letter-data?order=…&t=…&i=… – a nyomtatási nézet ebből rajzolja ki a levelet (csak kifizetett rendelésnél).
import { send, query } from '../lib/http.js';
import { verifyOrder } from '../lib/token.js';
import { getOrder } from '../lib/store.js';
import { isDownloadable } from '../lib/fulfill.js';
import { certsOfItem } from '../lib/pricing.js';

export default async function handler(req, res) {
  const { order: id, t, i } = query(req);
  if (!verifyOrder(id, t)) return send(res, 403, { error: 'Érvénytelen link.' });
  const order = await getOrder(id);
  if (!isDownloadable(order)) return send(res, 402, { error: 'A rendelés még nincs kifizetve.' });
  const it = order.items[Number(i) || 0];
  if (!it) return send(res, 404, { error: 'Nincs ilyen levél.' });
  const certs = certsOfItem(it);
  return send(res, 200, { state: it.state, html: it.html, certs, cert: certs[0] || null });
}
