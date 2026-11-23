// Központi beállítások környezeti változókból.
const env = (k, d = '') => (process.env[k] ?? d).trim();

export const config = {
  baseUrl: env('BASE_URL', 'http://localhost:3000').replace(/\/+$/, ''),
  linkSecret: env('LINK_SECRET'),
  barion: {
    api: env('BARION_API', 'https://api.test.barion.com').replace(/\/+$/, ''),
    posKey: env('BARION_POS_KEY'),
    payee: env('BARION_PAYEE'),
  },
  szamlazz: {
    agentKey: env('SZAMLAZZ_AGENT_KEY'),
    vat: env('SZAMLAZZ_VAT', 'AAM'),
    itemName: env('SZAMLAZZ_ITEM_NAME', 'Személyre szabott karácsonyi levél (letölthető PDF)'),
  },
  mail: {
    resendKey: env('RESEND_API_KEY'),
    from: env('MAIL_FROM', 'Égi Posta <level@example.com>'),
    support: env('SUPPORT_EMAIL'),
  },
  kv: {
    url: env('KV_REST_API_URL') || env('UPSTASH_REDIS_REST_URL'),
    token: env('KV_REST_API_TOKEN') || env('UPSTASH_REDIS_REST_TOKEN'),
  },
};

// Az árak itt vannak, a szerver ebből számol – a böngészőtől kapott árat soha nem fogadjuk el.
export const PRICING = { base: 1990, extra: 1790, cert: 490, maxLetters: 10, maxCertsPerLetter: 5 };
