# Égi Posta – telepítési útmutató

Személyre szabott karácsonyi levelek: űrlap és előnézet → Barion bankkártyás fizetés → azonnali PDF-letöltés → Számlázz.hu e-számla → e-mail a letöltési linkekkel.

## Hogyan működik

```
Vásárló ──► index.html (űrlap, előnézet, több levél, pénztár)
              │  POST /api/create-order   (a szerver számolja az árat, menti a rendelést)
              ▼
           Barion fizetési oldal ──► visszairányít: koszonjuk.html
              │  POST /api/barion-callback (állapotváltozás)
              ▼
           lib/fulfill.js: Barion állapot ellenőrzése → Számlázz.hu számla → Resend e-mail
              ▼
           /api/download  → fej nélküli Chrome megnyitja az index.html?print=… nézetet → A4 PDF
                            (1. oldal: levél, 2. oldal: borítékcímke + viaszpecsét-matricák)
```

| Fájl | Mit csinál |
|---|---|
| `index.html` | A teljes oldal: űrlap, előnézet, mintalevelek, GYIK, pénztár, nyomtatási (PDF) nézet |
| `koszonjuk.html` | Fizetés utáni oldal, letöltési gombokkal |
| `aszf.html`, `adatkezeles.html` | **Sablonok** – ki kell tölteni és jogásszal ellenőriztetni |
| `api/create-order.js` | Rendelés mentése, Barion fizetés indítása |
| `api/barion-callback.js` | Barion értesítés fogadása |
| `api/order-status.js` | A köszönőoldal lekérdezése (és tartalék ellenőrzés, ha a visszahívás késik) |
| `api/letter-data.js` | A PDF-nézet adatai (csak kifizetett rendelésnél) |
| `api/download.js` | PDF-készítés (levél + borítékcímke + opcionális oklevél) |
| `api/template.js`, `sablon.html` | Ingyenes nyomtatható „Levél a Jézuskának” sablonok PDF-ben |
| `lib/` | Barion, Számlázz.hu, e-mail, tárolás, árazás, tisztítás, aláírt linkek |
| `test/flow.test.js` | Teljes folyamat tesztje kamu API-válaszokkal |

**Árak:** `lib/config.js` → `PRICING` (levél 1 990 Ft, a 2. levéltől 1 790 Ft, oklevél 490 Ft). A böngészőben látható árat az `index.html`-ben a `BASE` / `EXTRA` / `CERT_PRICE` állandók adják – ha árat módosítasz, **mindkét helyen** írd át.

---

## 1. Amit előre el kell intézni

1. **Vállalkozás** (egyéni vállalkozás is jó) és **bankszámla**. A Barion és a Számlázz.hu is ezt kéri.
2. **Domain**, pl. `egiposta.hu`.
3. Fiókok (mindegyikben van ingyenes vagy teszt lehetőség):
   - [Barion](https://www.barion.com) – fizetés
   - [Számlázz.hu](https://www.szamlazz.hu) – számlázás
   - [Resend](https://resend.com) – e-mail küldés
   - [Vercel](https://vercel.com) – tárhely
   - [GitHub](https://github.com) – a kód tárolása

## 2. Barion

1. Először a **teszt környezetben** regisztrálj: <https://secure.test.barion.com> – itt létrehozhatsz egy boltot (shop), és kapsz egy **POS kulcsot**.
2. A teszt kártyaszámokat a Barion dokumentációban találod: <https://docs.barion.com/Sandbox>.
3. Élesítéshez az éles rendszerben (<https://secure.barion.com>) is hozz létre egy boltot, és küldd jóváhagyásra. A Barion ellenőrzi az oldalt: legyen kint az ÁSZF, az adatkezelési tájékoztató, a cégadatok és a Barion logó/„Barion fizetés” felirat a pénztárnál.
4. Környezeti változók: `BARION_API`, `BARION_POS_KEY`, `BARION_PAYEE` (a Barion pénztárcád e-mail címe).

> ⚠️ A Barion dokumentációja átmenetben van: a POS kulcsot a régi leírás a kérés törzsében, az új az `x-pos-key` fejlécben várja. A kód **mindkettőt** elküldi. Ha a teszt fizetés `AuthenticationFailed` hibát ad, ezt nézd meg először.

## 3. Számlázz.hu

1. Regisztrálj, és állítsd be a cégadataidat, valamint az **e-számlázást**.
2. Vezérlőpult → lap alja → **Számla Agent kulcsok** → kulcs ikon → új kulcs. Ez a `SZAMLAZZ_AGENT_KEY`.
3. ÁFA: alanyi adómentes vállalkozásnál `SZAMLAZZ_VAT=AAM`, ÁFA-körös vállalkozásnál `27`. **Ezt egyeztesd a könyvelőddel.**
4. A Számlázz.hu a számlát a `vevo/sendEmail` beállítás miatt maga küldi el a vásárlónak.
5. Teszteléshez a Számlázz.hu ad teszt fiókot – az első próbákat azzal végezd.

> ⚠️ A számla „kifizetett” jelölését a kód a megjegyzés mezőben rögzíti. Ha a számlán külön „kiegyenlítve” jelzés is kell, a Számlázz.hu „jóváírás rögzítése” funkcióját utólag hozzá lehet adni – kérdezd meg a könyvelőt, szükséges-e.

## 4. Resend (e-mail)

1. Regisztrálj, és **hitelesítsd a domaint** (a Resend megadja a DNS rekordokat, ezeket a domainszolgáltatódnál kell beállítani).
2. Hozz létre API kulcsot → `RESEND_API_KEY`.
3. `MAIL_FROM` pl. `Égi Posta <level@egiposta.hu>`, `SUPPORT_EMAIL` pl. `info.hopehely@gmail.com`.

## 5. Feltöltés a Vercelre

1. Töltsd fel ezt a mappát egy új GitHub repóba.
2. Vercel → **Add New → Project** → válaszd ki a repót → Framework: **Other** → Deploy.
3. Vercel projekt → **Storage → Marketplace → Upstash (Redis)** → hozd létre és kösd a projekthez. Ez automatikusan beállítja a `KV_REST_API_URL` és `KV_REST_API_TOKEN` változókat.
4. Vercel projekt → **Settings → Environment Variables**: vedd fel a többi változót a `.env.example` alapján. A `LINK_SECRET` legyen hosszú, véletlen szöveg.
5. **Settings → Domains**: add hozzá a domaint, és állítsd be a `BASE_URL`-t erre a címre (pl. `https://egiposta.hu`).
6. Redeploy, hogy a változók érvényesüljenek.

## 6. Próba (teszt módban)

1. `BARION_API=https://api.test.barion.com`, teszt POS kulcs, Számlázz.hu teszt fiók.
2. Készíts egy levelet, menj végig a pénztáron, fizess a teszt kártyával.
3. Ellenőrizd:
   - a köszönőoldalon megjelennek-e a letöltési gombok,
   - a PDF szép-e (betűtípusok, díszítés, 2. oldalon a címke),
   - megjön-e a letöltési e-mail és a Számlázz.hu számlája.
4. Ha minden jó: éles Barion kulcs, `BARION_API=https://api.barion.com`, éles Számlázz.hu kulcs → Redeploy.

## 7. Helyi fejlesztés (nem kötelező)

```bash
npm install
npm test                       # a teljes folyamat tesztje, hálózat nélkül
npx vercel dev                 # helyi szerver; KV nélkül memóriában tárol
# A PDF-hez helyben a saját Chrome-odat használhatod:
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npx vercel dev
```

## Ellenőrző lista élesítés előtt

- [ ] ÁSZF és adatkezelési tájékoztató kitöltve, jogász átnézte
- [ ] Cégadatok a láblécben / ÁSZF-ben, kapcsolati e-mail működik
- [ ] Barion bolt jóváhagyva, éles kulcs beállítva
- [ ] ÁFA-kulcs egyeztetve a könyvelővel
- [ ] Egy valódi, kis összegű próbavásárlás végigment (fizetés → PDF → e-mail → számla)
- [ ] A GYIK válaszai (automatikus számla, azonnali letöltés) igazak az éles beállítás mellett
- [ ] December 6. után a Mikulás/Télapó feladót érdemes elrejteni (index.html)

## Amit érdemes tudni

- **Adatmegőrzés:** a rendelések (a gyerek adataival együtt) 60 nap után automatikusan törlődnek a tárolóból (`lib/store.js` → `TTL`). A számla adatait a Számlázz.hu őrzi a törvényi ideig.
- **Biztonság:** az árat mindig a szerver számolja; a böngészőből érkező levélszöveget a `lib/sanitize.js` megtisztítja (csak bekezdés és kiemelés marad); a letöltési linkek aláírtak (`LINK_SECRET`).
- **Egy rendelésben** legfeljebb 10 levél lehet (`PRICING.maxLetters`).
- A `@sparticuz/chromium` és a `puppeteer-core` verziójának egymáshoz illőnek kell lennie. Ha a PDF-készítés hibát ad a Vercelen, először ezt nézd meg (a `@sparticuz/chromium` leírásában van egy kompatibilitási táblázat).

## Mérés

- **Vercel Web Analytics** (sütimentes látogatottság): Vercel → projekt → *Analytics* → *Enable*. A kód (`/_vercel/insights/script.js`) már benne van az oldalakban.
- **Meta Pixel + sütibanner**: a `js/consent.js` első sorában add meg a `META_PIXEL_ID` értékét. Amíg üres, nincs banner és nincs Facebook-követés.
  Események: `PageView`, `ViewContent` (első kitöltés), `AddToCart` (újabb levél), `InitiateCheckout` (összesítő megnyitása), `Purchase` (köszönőoldal, valódi végösszeggel, rendelésenként egyszer).
