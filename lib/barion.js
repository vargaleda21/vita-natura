// Barion Smart Gateway – fizetés indítása és állapot lekérdezése.
// Dokumentáció: https://docs.barion.com/Payment-Start-v2 és https://docs.barion.com/Payment-Details-v4
import { config } from './config.js';

export async function startPayment({ order, items, redirectUrl, callbackUrl }) {
  const total = items.reduce((s, it) => s + it.ItemTotal, 0);
  const body = {
    POSKey: config.barion.posKey,           // a régi leírás szerint a törzsben,
    PaymentType: 'Immediate',
    GuestCheckOut: true,
    FundingSources: ['All'],
    PaymentRequestId: order.id,
    OrderNumber: order.id,
    PayerHint: order.email,
    Locale: 'hu-HU',
    Currency: 'HUF',
    RedirectUrl: redirectUrl,
    CallbackUrl: callbackUrl,
    Transactions: [{
      POSTransactionId: order.id,
      Payee: config.barion.payee,
      Total: total,
      Items: items,
    }],
  };
  const r = await fetch(`${config.barion.api}/v2/Payment/Start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-pos-key': config.barion.posKey }, // …az újabb szerint fejlécben
    body: JSON.stringify(body),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || (j.Errors && j.Errors.length) || !j.GatewayUrl) {
    const msg = (j.Errors || []).map(e => `${e.ErrorCode}: ${e.Title}`).join('; ') || `HTTP ${r.status}`;
    throw new Error(`Barion fizetés indítása sikertelen – ${msg}`);
  }
  return { paymentId: j.PaymentId, gatewayUrl: j.GatewayUrl };
}

export async function getPaymentState(paymentId) {
  const r = await fetch(`${config.barion.api}/v4/payment/${encodeURIComponent(paymentId)}/paymentstate`, {
    headers: { 'x-pos-key': config.barion.posKey },
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Barion állapotlekérdezés sikertelen – HTTP ${r.status}`);
  return { status: j.Status, total: j.Total, paymentRequestId: j.PaymentRequestId };
}

// Barion státuszok: Prepared, Started, InProgress, Waiting, Reserved, Authorized, Canceled, Succeeded, Failed, PartiallySucceeded, Expired
export const isPaid = s => s === 'Succeeded';
export const isFinalFail = s => ['Canceled', 'Failed', 'Expired'].includes(s);
