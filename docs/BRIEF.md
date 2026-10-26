# DaleDay — the build brief (read this first)

## What we are building

A **demo** of a phone app for Léda, the owner's friend, who had the idea. It must make her say "wow". It also
shows what our team can build in React Native. No backend, no login. The demo data is mock data in `src/data/`.
(Since the first build, real barcodes are also looked up in open databases: see `HANDOFF.md`. The file-ownership
rules below were for that first, parallel build and no longer apply.)
It ships as a web app (Expo web, `output: single`) at `https://daleday.digital1.one`, opened mostly on an
**iPhone in Safari**. The same code must still compile for iOS and Android.

**The idea (Léda's):** scan a product's barcode in the shop. The app reads the ingredients and says whether the
product suits what *you* chose to avoid (palm oil, added sugar, sweeteners, allergens …). If not, it suggests a
better alternative. Some alternatives are sold in a partner shop that pays a commission.

**Our additions (they make it new and useful, and they are the pitch):**
1. **Personal, not one-size.** No global "bad product" score like Yuka. The verdict is "fits YOUR settings: 3/4".
   Wording: "you asked to avoid this", never "this is bad / dangerous".
2. **Better AND cheaper, in the same shop.** Prices per shop (mocking the GVH Árfigyelő daily price feed).
3. **Dual quality check.** The same brand in Austria/Germany has a different recipe? Show it.
4. **Recipe history.** "Got smaller, same price" (shrinkflation), "palm oil replaced sunflower oil" (skimpflation).
5. **Family profiles.** One scan checks for everyone: the child's milk allergy, grandma's sugar.
6. **Monthly story.** A Spotify-Wrapped style story of your basket: sugar skipped, money saved, swaps.
7. **AI label reading.** An unknown barcode → photograph the label → AI reads the ingredients (mocked).
8. **Honest money.** The commission NEVER changes the ranking, and the app says so on the screen.

All brands, shops and prices are **fictional**. Never use a real brand or chain name (no Nutella, Lidl, Tesco …).

## Brand and design language

- **Name:** `DaleDay` (the owner's choice, 2026-10-24; it replaced the first name, `tuda`). Exactly this spelling, two capital D's, in every language. Hungarian: avoid suffixing it; if needed, hyphenate (DaleDay-t, DaleDay-ben). The repo, the storage key `tuda.v1` and the tools keep the old name internally.
- **Tagline:** HU "Tudd, mi van benne." · EN "Know what's inside."
- **Mood:** "fresh market at golden hour". Oat cream background, deep forest ink, a lime sprout for the brand,
  warm fruit accents (tangerine, sun, lilac, sky). Playful and premium at once (think Duolingo × Aesop × Arc).
- **Tokens:** `src/theme/tokens.ts`: palette, light/dark colours, gradients, spacing, radii, type scale, shadows,
  springs. Use them; do not invent new hex values unless they are part of an illustration.
- **Fonts:** Bricolage Grotesque (display: `type.hero/h1/h2/h3/number`) and Inter (body). Use `<Txt variant>`.
- **Verdict colours:** `verdictColor.great/okay/avoid`. Red means only "against what YOU chose to avoid".
- **International trends to use:** bento grids; big bold display numbers; Wrapped-style stories; soft "clay" 3D
  pack illustrations; springy micro-interactions; confetti/burst on a good result; streaks; parallax headers;
  glassy highlights made with gradients and 1 px light borders.
- **Motion:** Reanimated 4 (works on the web). Animate only `transform` and `opacity`. Springs from
  `springs`. Parallax with `useAnimatedScrollHandler` + `interpolate`. Respect `useReducedMotion()`.
  **Never** use `filter: blur`, big `backdrop-filter`, or `BlurView` on scrolling or animated layers: a phone pays
  per frame. Big soft glows = radial gradients (react-native-svg `RadialGradient`) or layered `LinearGradient`.
- **Dark mode:** every screen works in light and dark (`useTheme()` → `c.*`, `isDark`).
- **Layout:** design for 390×844 (iPhone). Content must not hide under the floating tab bar (≈110 px at the
  bottom on tab screens) or under the notch (`useSafeAreaInsets`). On a wide desktop window, centre the app in
  a max-width ~480 px column, so it still looks like a phone app.
- **Touch targets** ≥ 44 px. `accessibilityRole`/`accessibilityLabel` on buttons.

## Language

Hungarian is the default, English is a toggle (`settings.lang`). **Every visible string exists in both.**
- Each feature keeps its strings in `src/features/<feature>/strings.ts`: `export const strings = { hu: {...}, en: {...} }`,
  used with `const t = useT(strings)`. Data values are `L10n` (`{hu, en}`), shown with `useTr()`.
- Hungarian: natural, warm, informal ("te"), short sentences, correct accents (ő, ű), Hungarian quotation marks
  „…”, thousands with a space ("1 890 Ft"). Say "AI", never "MI". No anglicisms where a Hungarian word is
  natural. English: natural UK/US-neutral English.

## Architecture and ownership

- Expo SDK 58, React Native 0.88, React 19.3, expo-router (`src/app`), Reanimated 4, react-native-svg,
  expo-linear-gradient, expo-camera, expo-haptics, AsyncStorage, lucide-react-native, @zxing/library.
- **No new dependencies.** If you truly need one, stop and say why in your final report.
- `src/app/**` route files are thin wrappers owned by the lead. You may ADD a new route file for your own
  feature (e.g. `src/app/member/[id].tsx` → re-export a screen from your feature folder). Do not edit
  `src/app/_layout.tsx`; if you need a screen option, say so in your report.
- Shared and read-only for you (lead-owned): `src/theme/**`, `src/i18n/**`, `src/state/**`, `src/ui/**`
  (except `PackArt.tsx`, owned by the product agent), `src/data/types.ts` (add optional fields only if the
  data agent agrees … in practice: do not change it; tell the lead).
- Import from `@/data/api` (functions) and `@/data/types` (types) only. Never import another feature's folder.
- Each agent owns only the files named in its own task. Do not edit files you do not own, even to fix a
  type error: report it instead.

## Commands and checks (run them before you report)

- Typecheck: `npx tsc --noEmit` (other agents work at the same time: errors in files you do not own are theirs;
  wait a minute and re-run).
- Web build: `npx expo export --platform web --output-dir /tmp/tuda-<you>` (use YOUR own output dir).
- Serve it: `node tools/serve.mjs /tmp/tuda-<you> <your-port> &` (your own port).
- Phone screenshot: `node tools/shot.mjs <path> <out.png> --base http://127.0.0.1:<port> [--dark] [--wait ms]
  [--scroll px] [--click "text"] [--full] [--seed '<json of tuda.v1>']`. It prints console and page errors.
  Look at every screenshot you take (Read the png). Check light AND dark. Fix what looks off.
  Seed example (onboarded, Hungarian): `--seed '{"settings":{"lang":"hu","theme":"system","avoid":["palm_oil","added_sugar"],"members":[],"onboarded":true},"history":[]}'`
- No console errors, no page errors, no layout overflow at 390 px wide.

## Quality bar

This is a showcase. Every screen should look like a top-10 App Store design: generous spacing, a clear
hierarchy, one strong idea per card, delightful motion, nothing generic. Be creative. But first make it work,
then make it beautiful, then make it delightful.
