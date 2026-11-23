// GET /api/order-status?order=…&t=… – a köszönőoldal ezzel kérdezi le a rendelést.
import { send, query } from '../lib/http.js';
import { verifyOrder } from '../lib/token.js';
import { getOrder } from '../lib/store.js';
import { processOrder, isDownloadable } from '../lib/fulfill.js';

export default async function handler(req, res) {
  const { order: id, t } = query(req);
  if (!verifyOrder(id, t)) return send(res, 403, { error: 'Érvénytelen link.' });
  let order = await getOrder(id);
  if (!order) return send(res, 404, { error: 'Nincs ilyen rendelés.' });
  if (order.status === 'pending' || order.status === 'paid' || order.status === 'invoiced') {
    try { order = (await processOrder(id)).order || order; } catch (e) { console.error('order-status', e); }
  }
  const ok = isDownloadable(order);
  return send(res, 200, {
    status: order.status,
    email: order.email,
    emailSent: Boolean(order.emailSentAt),
    total: ok ? (order.total || 0) : 0,
    letters: ok ? order.items.map((it, i) => ({
      name: it.state.name || `${i + 1}. levél`,
      url: `/api/download?order=${id}&t=${t}&i=${i}`,
    })) : [],
  });
}
