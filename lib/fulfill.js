// Fizetés utáni teljesítés: állapot ellenőrzése a Barionnál → számla → e-mail.
// Többször is hívható (visszahívás, köszönőoldal lekérdezése): minden lépést csak egyszer hajt végre.
import { getOrder, saveOrder, orderIdForPayment, acquireLock, releaseLock } from './store.js';
import { getPaymentState, isPaid, isFinalFail } from './barion.js';
import { createInvoice } from './szamlazz.js';
import { sendDownloadEmail, sendAdminEmail } from './email.js';
import { orderTotal, certCount } from './pricing.js';

export async function processPayment(paymentId) {
  const orderId = await orderIdForPayment(paymentId);
  if (!orderId) return { ok: false, reason: 'ismeretlen fizetés' };
  return processOrder(orderId);
}

export async function processOrder(orderId) {
  let order = await getOrder(orderId);
  if (!order) return { ok: false, reason: 'ismeretlen rendelés' };
  if (order.status === 'fulfilled') return { ok: true, order };
  if (!order.paymentId) return { ok: false, order };

  if (!(await acquireLock(orderId, 60))) return { ok: true, order, busy: true };
  try {
    order = await getOrder(orderId);

    if (order.status === 'pending') {
      const st = await getPaymentState(order.paymentId);
      order.barionStatus = st.status;
      if (isPaid(st.status)) {
        if (Math.round(st.total) !== (order.total ?? orderTotal(order.items.length, certCount(order)))) {
          order.status = 'review';               // összegeltérés: kézi ellenőrzés
          order.error = `Összeg eltérés: Barion ${st.total} Ft`;
        } else {
          order.status = 'paid';
          order.paidAt = new Date().toISOString();
        }
      } else if (isFinalFail(st.status)) {
        order.status = 'failed';
      }
      await saveOrder(order);
    }

    if (order.status === 'paid' || order.status === 'invoiced') {
      if (!order.invoiceNumber) {
        try {
          order.invoiceNumber = await createInvoice(order);
          order.status = 'invoiced';
        } catch (e) {
          order.invoiceError = String(e.message || e);   // a letöltés ettől még működik
        }
        await saveOrder(order);
      }
      if (!order.emailSentAt) {
        try {
          await sendDownloadEmail(order);
          order.emailSentAt = new Date().toISOString();
          delete order.emailError;
        } catch (e) {
          order.emailError = String(e.message || e);   // a letöltés a köszönőoldalon ettől még működik
          console.error('email', order.id, order.emailError);
        }
      }
      if (order.invoiceNumber) order.status = 'fulfilled';
      await saveOrder(order);
    }

    // értesítés a tulajdonosnak (egyszer; hibája semmit nem akaszt meg)
    if (['fulfilled', 'invoiced', 'paid', 'review'].includes(order.status) && !order.adminNotifiedAt) {
      try {
        await sendAdminEmail(order, { letters: order.items.length, certs: certCount(order) });
        order.adminNotifiedAt = new Date().toISOString();
      } catch (e) {
        console.error('admin email', order.id, String(e.message || e));
        order.adminNotifiedAt = 'hiba: ' + String(e.message || e).slice(0, 120);
      }
      await saveOrder(order);
    }
    return { ok: true, order };
  } finally {
    await releaseLock(orderId);
  }
}

export const isDownloadable = o => o && ['paid', 'invoiced', 'fulfilled'].includes(o.status);
