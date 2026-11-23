// Letöltési e-mail küldése a Resend API-val (https://resend.com/docs/api-reference/emails/send-email).
import { config } from './config.js';
import { signOrder } from './token.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function buildEmail(order) {
  const t = signOrder(order.id);
  const base = config.baseUrl;
  const rows = order.items.map((it, i) => {
    const url = `${base}/api/download?order=${order.id}&t=${t}&i=${i}`;
    const who = it.state.name ? `${esc(it.state.name)} levele` : `${i + 1}. levél`;
    return `<tr><td style="padding:10px 0;font-size:16px;color:#2b2340">${who}</td>
      <td style="padding:10px 0;text-align:right"><a href="${url}" style="background:#8f1d24;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;font-size:14px">Letöltés (PDF)</a></td></tr>`;
  }).join('');
  const page = `${base}/koszonjuk.html?order=${order.id}&t=${t}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f7f1e3;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e3;padding:24px 0"><tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;padding:28px 30px;max-width:94%">
    <tr><td style="font-family:Georgia,serif;font-size:26px;color:#8f1d24;padding-bottom:6px">Égi Posta</td></tr>
    <tr><td style="font-size:16px;color:#2b2340;line-height:1.5;padding-bottom:14px">Köszönjük a rendelést! Elkészültek a levelek, itt töltheted le őket:</td></tr>
    <tr><td><table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;border-bottom:1px solid #eee">${rows}</table></td></tr>
    <tr><td style="font-size:14px;color:#6b6478;line-height:1.6;padding-top:16px">
      <b>Nyomtatási tipp:</b> A4-es lapra, 100%-os méretben nyomtasd. Vastagabb, krémszínű papíron még szebb.<br>
      A második oldalon találod a bélyeges borítékcímkét.<br><br>
      A linkek később is működnek: <a href="${page}" style="color:#8f1d24">rendelésed oldala</a>.<br>
      A számlát a Számlázz.hu külön e-mailben küldi.<br><br>
      Rendelésszám: ${esc(order.id)}${config.mail.support ? `<br>Kérdésed van? Írj nekünk: ${esc(config.mail.support)}` : ''}
    </td></tr>
  </table></td></tr></table></body></html>`;
  return { subject: 'Elkészültek a leveleid – Égi Posta', html };
}

export async function sendDownloadEmail(order) {
  if (!config.mail.resendKey) throw new Error('RESEND_API_KEY nincs beállítva');
  const { subject, html } = buildEmail(order);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.mail.resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: config.mail.from, to: [order.email], subject, html, reply_to: config.mail.support || undefined }),
  });
  if (!r.ok) throw new Error(`E-mail küldés sikertelen – HTTP ${r.status} ${await r.text().catch(() => '')}`);
}

// Rövid értesítés a tulajdonosnak minden fizetett rendelésről – a gyerek adatai és a levél szövege NÉLKÜL.
const huf = n => String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft';
export function buildAdminEmail(order, { letters, certs }) {
  const problems = [];
  if (order.status === 'review') problems.push(`Kézi ellenőrzés kell: ${order.error || 'összegeltérés'}`);
  if (order.invoiceError) problems.push(`Számla nem készült el: ${order.invoiceError}`);
  if (order.emailError) problems.push(`A vevő nem kapta meg a letöltési e-mailt: ${order.emailError}`);
  const what = `${letters} levél${certs ? ` + ${certs} oklevél` : ''}`;
  const subject = `${problems.length ? '⚠️ Ellenőrizd – ' : ''}Új rendelés: ${what}, ${huf(order.total)}`;
  const row = (k, v) => `<tr><td style="padding:4px 14px 4px 0;color:#6b6478">${k}</td><td style="padding:4px 0;color:#2b2340">${v}</td></tr>`;
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f7f1e3;margin:0;padding:20px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:12px;padding:22px 24px">
    <div style="font-family:Georgia,serif;font-size:22px;color:#8f1d24;margin-bottom:8px">Égi Posta – új rendelés 🎄</div>
    <table cellpadding="0" cellspacing="0" style="font-size:14px">
      ${row('Tartalom', esc(what))}${row('Összeg', esc(huf(order.total)))}
      ${row('Rendelésszám', esc(order.id))}${row('Fizetve', esc(order.paidAt ? new Date(order.paidAt).toLocaleString('hu-HU', { timeZone: 'Europe/Budapest' }) : '–'))}
      ${row('Számla', order.invoiceNumber ? esc(order.invoiceNumber) : '<b style="color:#a8323a">nem készült el</b>')}
      ${row('Vevői e-mail', order.emailSentAt ? 'elküldve' : '<b style="color:#a8323a">nem ment ki</b>')}
    </table>
    ${problems.length ? `<div style="margin-top:14px;background:#fdecee;border:1px solid #e3a3aa;border-radius:8px;padding:10px 12px;font-size:13px;color:#6d1219">${problems.map(esc).join('<br>')}</div>` : '<div style="margin-top:14px;font-size:13px;color:#2f6b4f">Minden rendben ment. ✔</div>'}
  </div></body></html>`;
  return { subject, html };
}

export async function sendAdminEmail(order, counts) {
  if (!config.mail.resendKey) throw new Error('RESEND_API_KEY nincs beállítva');
  if (!config.mail.admin) throw new Error('ADMIN_EMAIL / SUPPORT_EMAIL nincs beállítva');
  const { subject, html } = buildAdminEmail(order, counts);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.mail.resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: config.mail.from, to: [config.mail.admin], subject, html }),
  });
  if (!r.ok) throw new Error(`Értesítő e-mail sikertelen – HTTP ${r.status}`);
}
