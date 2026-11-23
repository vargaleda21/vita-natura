// Fej nélküli Chrome indítása PDF-készítéshez (Vercelen @sparticuz/chromium, helyben CHROME_PATH).
export async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default;
  if (process.env.CHROME_PATH) {
    return puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  }
  // A Vercel nem AWS Lambdaként jelzi magát, ezért a @sparticuz/chromium nem csomagolná ki
  // az Amazon Linux 2023-hoz szükséges könyvtárakat (pl. libnss3.so). Ezzel a jelzéssel megteszi.
  if (!process.env.AWS_LAMBDA_JS_RUNTIME) process.env.AWS_LAMBDA_JS_RUNTIME = 'nodejs22.x';
  const chromium = (await import('@sparticuz/chromium')).default;
  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
}
