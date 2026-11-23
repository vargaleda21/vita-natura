import { send } from '../lib/http.js';
export default function handler(req, res) { send(res, 200, { ok: true, service: 'egi-posta' }); }
