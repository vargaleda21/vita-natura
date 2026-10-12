/* ==========================================================================
   daleday – beállítások (ezt a fájlt szerkesztheted kódolás nélkül)

   analytics: névtelen, sütit nem használó látogatottság-mérés (Plausible-kompatibilis).
     - Alapból KI van kapcsolva, ilyenkor semmilyen mérés nem fut, és az Adatkezelési
       tájékoztató is ezt írja.
     - Bekapcsolás: enabled: true, src és domain kitöltése (a Plausible fiókodban látod).
       A tájékoztató szövege automatikusan átáll a bekapcsolt állapotra.

   submitEmail: ide érkeznek a beküldött hiányzó termékek.
   ========================================================================== */
window.DALEDAY_CONFIG = {
  analytics: {
    enabled: false,
    src: "https://plausible.io/js/script.js",
    domain: ""
  },
  submitEmail: "vargaleda21@gmail.com"
};
