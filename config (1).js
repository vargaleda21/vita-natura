/* ==========================================================================
   daleday – beállítások (ezt a fájlt szerkesztheted kódolás nélkül)

   analytics: névtelen, sütit nem használó látogatottság-mérés (Plausible-kompatibilis).
     - Alapból KI van kapcsolva, ilyenkor semmilyen mérés nem fut, és az Adatkezelési
       tájékoztató is ezt írja.
     - Bekapcsolás: enabled: true, src és domain kitöltése (a Plausible fiókodban látod).
       A tájékoztató szövege automatikusan átáll a bekapcsolt állapotra.

   submitEmail: ide érkeznek a beküldött hiányzó termékek.

   aboutText: pár mondat rólad és arról, miért csinálod (a "Mi a daleday?" ablakban jelenik meg).
     Üresen hagyva nem látszik semmi. Új bekezdéshez használj üres sort.
   ========================================================================== */
window.DALEDAY_CONFIG = {
  analytics: {
    enabled: false,
    src: "https://plausible.io/js/script.js",
    domain: ""
  },
  submitEmail: "vargaleda21@gmail.com",
  aboutText: "Ebben az évben leszek 30 éves, és egy ideje tudatosabban figyelek arra, mit eszem: több zöldség és gyümölcs kerül az asztalra, és amit lehet, magam készítek el. Nálam ez sokat hozott: jobban érzem magam a bőrömben, és a hétköznapokban is több energiám van.\nAzt látom, hogy sokakat szorongással tölt el a termékek hátoldala, mert nem feltétlenül nézik meg, vagy nem értik, mit jelentenek az összetevők.\nA daleday ezért készült: hogy egyszerűen, ítélkezés és ijesztgetés nélkül megértsd, mi van abban, amit a polcról leemelsz. A partnerlinkek jelölve vannak, és nem befolyásolják a sorrendet: az alternatívákat a te szempontjaid alapján rendezzük, nem aszerint, hogy ki fizet jutalékot."
};
