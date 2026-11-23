import crypto from 'node:crypto';
import { config } from './config.js';

export function newOrderId() {
  const d = new Date();
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, '');
  return `EP${ymd}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

export function signOrder(orderId) {
  if (!config.linkSecret) throw new Error('LINK_SECRET nincs beállítva');
  return crypto.createHmac('sha256', config.linkSecret).update(String(orderId)).digest('hex').slice(0, 32);
}

export function verifyOrder(orderId, token) {
  if (!orderId || !token || typeof token !== 'string') return false;
  const good = signOrder(orderId);
  const a = Buffer.from(good), b = Buffer.from(token);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
