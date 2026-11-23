export function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

// Vercel a JSON és az urlencoded törzset általában feldolgozza; ez a tartalék, ha mégsem.
export async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return parse(req.body, req.headers['content-type']);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return parse(Buffer.concat(chunks).toString('utf8'), req.headers['content-type']);
}
function parse(text, ct = '') {
  if (!text) return {};
  if (ct.includes('application/json')) { try { return JSON.parse(text); } catch { return {}; } }
  return Object.fromEntries(new URLSearchParams(text));
}

export function query(req) {
  if (req.query) return req.query;
  return Object.fromEntries(new URL(req.url, 'http://x').searchParams);
}
