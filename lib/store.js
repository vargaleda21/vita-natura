// Egyszerű kulcs–érték tár: Upstash Redis / Vercel KV REST API, vagy memória helyi fejlesztéshez.
import { config } from './config.js';

const mem = globalThis.__EP_MEM__ || (globalThis.__EP_MEM__ = new Map());
const TTL = 60 * 60 * 24 * 60; // 60 nap – utána a rendelés (és a gyerek adatai) automatikusan törlődnek

async function redis(cmd) {
  const r = await fetch(config.kv.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.kv.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error(`KV hiba: ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(`KV hiba: ${j.error}`);
  return j.result;
}
const useRedis = () => Boolean(config.kv.url && config.kv.token);

export async function getOrder(id) {
  if (!useRedis()) return mem.has(`order:${id}`) ? JSON.parse(mem.get(`order:${id}`)) : null;
  const v = await redis(['GET', `order:${id}`]);
  return v ? JSON.parse(v) : null;
}

export async function saveOrder(order) {
  order.updatedAt = new Date().toISOString();
  const v = JSON.stringify(order);
  if (!useRedis()) { mem.set(`order:${order.id}`, v); return; }
  await redis(['SET', `order:${order.id}`, v, 'EX', TTL]);
}

export async function mapPayment(paymentId, orderId) {
  if (!useRedis()) { mem.set(`pay:${paymentId}`, orderId); return; }
  await redis(['SET', `pay:${paymentId}`, orderId, 'EX', TTL]);
}

export async function orderIdForPayment(paymentId) {
  if (!useRedis()) return mem.get(`pay:${paymentId}`) || null;
  return await redis(['GET', `pay:${paymentId}`]);
}

// Rövid zár, hogy a teljesítés (számla + e-mail) ne fusson kétszer párhuzamosan.
export async function acquireLock(key, seconds = 60) {
  if (!useRedis()) { if (mem.has(`lock:${key}`)) return false; mem.set(`lock:${key}`, '1'); setTimeout(() => mem.delete(`lock:${key}`), seconds * 1000).unref?.(); return true; }
  const r = await redis(['SET', `lock:${key}`, '1', 'NX', 'EX', seconds]);
  return r === 'OK';
}
export async function releaseLock(key) {
  if (!useRedis()) { mem.delete(`lock:${key}`); return; }
  await redis(['DEL', `lock:${key}`]);
}
