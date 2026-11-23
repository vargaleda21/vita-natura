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
