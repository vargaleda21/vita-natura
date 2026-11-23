// GET /api/download?order=…&t=…&i=… – A4-es PDF (1. oldal: levél, 2. oldal: borítékcímke).
// A nyomtatási nézetet (index.html?print=…) egy fej nélküli Chrome nyitja meg, és PDF-be menti.
import { query } from '../lib/http.js';
import { config } from '../lib/config.js';
import { verifyOrder } from '../lib/token.js';
import { getOrder } from '../lib/store.js';
import { isDownloadable } from '../lib/fulfill.js';
import { launchBrowser } from '../lib/browser.js';

const fileName = s => (s || 'level').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') || 'level';

export default async function handler(req, res) {
  const { order: id, t, i = '0' } = query(req);
  const fail = (code, msg) => { res.statusCode = code; res.setHeader('Content-Type', 'text/plain; charset=utf-8'); res.end(msg); };
  if (!verifyOrder(id, t)) return fail(403, 'Érvénytelen letöltési link.');
  const order = await getOrder(id);
  if (!isDownloadable(order)) return fail(402, 'A rendelés még nincs kifizetve.');
  const idx = Math.max(0, parseInt(i, 10) || 0);
  const item = order.items[idx];
  if (!item) return fail(404, 'Nincs ilyen levél.');

  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    const url = `${config.baseUrl}/?print=${encodeURIComponent(id)}&t=${encodeURIComponent(t)}&i=${idx}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction('window.__PRINT_READY === true', { timeout: 20000 });
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="egi-posta-${fileName(item.state.name)}.pdf"`);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.end(Buffer.from(pdf));
  } catch (e) {
    console.error('download', e);
    fail(500, 'A PDF elkészítése most nem sikerült. Kérjük, próbáld újra pár perc múlva, vagy írj nekünk.');
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}
