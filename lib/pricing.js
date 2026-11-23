import { PRICING } from './config.js';

// 1. levél teljes áron, a 2. levéltől mindegyik 10% kedvezménnyel.
export function priceFor(n) {
  if (!Number.isInteger(n) || n <= 0) return 0;
  return PRICING.base + (n - 1) * PRICING.extra;
}

// Rendelés tételei: levelek + opcionális oklevelek.
export function lineItems(n, certs = 0) {
  const out = [];
  if (n >= 1) out.push({ kind: 'letter', qty: 1, unit: PRICING.base, label: 'első levél' });
  if (n >= 2) out.push({ kind: 'letter', qty: n - 1, unit: PRICING.extra, label: 'további levél (10% kedvezmény)' });
  if (certs > 0) out.push({ kind: 'cert', qty: certs, unit: PRICING.cert, label: 'oklevél' });
  return out;
}

// régi rendeléseknél egy darab „cert” mező, újaknál „certs” tömb
export const certsOfItem = it => Array.isArray(it.certs) ? it.certs : (it.cert ? [it.cert] : []);
export const certCount = order => (order.items || []).reduce((s, it) => s + certsOfItem(it).length, 0);
export const orderTotal = (n, certs = 0) => lineItems(n, certs).reduce((s, l) => s + l.qty * l.unit, 0);
