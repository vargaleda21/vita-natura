// Build the web app into dist/ and finish index.html for phones:
// language, description, iOS home-screen tags, the manifest, versioned icons, the social card, noindex.
// node scripts/build-web.mjs [outDir]
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = process.argv[2] ?? 'dist';
execFileSync('npx', ['expo', 'export', '--platform', 'web', '--output-dir', out, '--clear'], { stdio: 'inherit' });

const file = join(out, 'index.html');
let html = readFileSync(file, 'utf8');
const site = 'https://daleday.digital1.one';
const description = 'Szkenneld be egy termék vonalkódját, és a DaleDay megmutatja, illik-e hozzád. Te döntöd el, mit kerülsz. Demó.';
const head = [
  `<meta name="description" content="${description}">`,
  '<meta name="robots" content="noindex, nofollow">',
  '<meta name="color-scheme" content="light dark">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
  '<meta name="apple-mobile-web-app-title" content="DaleDay">',
  '<meta name="format-detection" content="telephone=no">',
  '<link rel="manifest" href="/manifest.webmanifest">',
  existsSync(join(out, 'favicon.svg')) ? '<link rel="icon" type="image/svg+xml" href="/favicon.svg">' : '',
  existsSync(join(out, 'icons/favicon-32.v1.png')) ? '<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.v1.png">' : '',
  existsSync(join(out, 'icons/apple-touch-icon.v1.png')) ? '<link rel="apple-touch-icon" href="/icons/apple-touch-icon.v1.png">' : '',
  '<meta property="og:type" content="website">',
  '<meta property="og:title" content="DaleDay – Tudd, mi van benne.">',
  `<meta property="og:description" content="${description}">`,
  `<meta property="og:url" content="${site}/">`,
  '<meta property="og:site_name" content="DaleDay">',
  '<meta property="og:locale" content="hu_HU">',
  '<meta property="og:locale:alternate" content="en_GB">',
  ...(existsSync(join(out, 'og.v2.png'))
    ? [
        `<meta property="og:image" content="${site}/og.v2.png">`,
        '<meta property="og:image:type" content="image/png">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:alt" content="DaleDay – Tudd, mi van benne. Három termék, három személyre szabott eredmény.">',
        `<meta name="twitter:image" content="${site}/og.v2.png">`,
      ]
    : []),
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="twitter:title" content="DaleDay – Tudd, mi van benne.">',
  `<meta name="twitter:description" content="${description}">`,
]
  .filter(Boolean)
  .join('\n    ');

// A static boot screen: the mark on the brand ink, until the app is ready (src/app/_layout.tsx fades it out).
// On a slow network the first bundle takes seconds, and the page would be blank until then.
const mark = existsSync(join(out, 'favicon.svg'))
  ? readFileSync(join(out, 'favicon.svg'), 'utf8').replace(/<\?xml[^>]*>\s*/, '').trim()
  : '';
const bootCss =
  '#boot{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:#10231C;transition:opacity .35s ease}' +
  '#boot svg{width:96px;height:96px;animation:boot 1.6s ease-in-out infinite}' +
  '#boot.out{opacity:0;pointer-events:none}' +
  '@keyframes boot{50%{transform:scale(.94);opacity:.82}}' +
  '@media (prefers-reduced-motion:reduce){#boot svg{animation:none}}';

html = html
  .replace('<html lang="en">', '<html lang="hu">')
  .replace('<meta httpEquiv="X-UA-Compatible" content="IE=edge" />', '')
  .replace(
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
  )
  .replace('</head>', `    ${head}\n    <style>${bootCss}</style>\n  </head>`)
  .replace('<div id="root"></div>', `<div id="boot" aria-hidden="true">${mark}</div>\n    <div id="root"></div>`)
  .replace('<noscript> You need to enable JavaScript to run this app. </noscript>', '<noscript>A DaleDay használatához kapcsold be a JavaScriptet. / Please turn on JavaScript to use DaleDay.</noscript>');

writeFileSync(file, html);
console.log(`index.html finished in ${out}`);
