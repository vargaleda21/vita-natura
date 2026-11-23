// GET /api/template?v=jezuska|iros|mikulas – ingyenes, nyomtatható levélsablon PDF-ben.
// A PDF-et a Vercel CDN gyorsítótárazza, így a böngésző-indítás csak ritkán fut le.
import { query } from '../lib/http.js';
import { config } from '../lib/config.js';
import { launchBrowser } from '../lib/browser.js';

const NAMES = { jezuska: 'level-a-jezuskanak', iros: 'level-a-jezuskanak-nagyoknak', mikulas: 'level-a-mikulasnak' };

export default async function handler(req, res) {
  const v = Object.hasOwn(NAMES, query(req).v) ? query(req).v : 'jezuska';
  let browser;
  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.goto(`${config.baseUrl}/sablon.html?v=${v}&pdf=1`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction('window.__READY === true', { timeout: 15000 });
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="egi-posta-${NAMES[v]}.pdf"`);
    res.setHeader('Cache-Control', 'public, s-maxage=2592000, stale-while-revalidate=86400');
    res.end(Buffer.from(pdf));
  } catch (e) {
    console.error('template', e);
    res.statusCode = 302;
    res.setHeader('Location', `/sablon.html?v=${v}`);   // tartalék: a nyomtatható oldal
    res.end();
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}
