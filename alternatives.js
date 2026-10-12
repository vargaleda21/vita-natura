/* ==========================================================================
   daleday – kézzel kurált alternatíva-katalógus
   Ezt a fájlt szerkeszd, ha új ajánlást veszel fel. Kódot nem kell hozzá írni.

   Mezők:
   - id          egyedi azonosító (kisbetű, kötőjel), a kattintásméréshez is ez kell
   - name        a termék pontos neve
   - brand       márka
   - store       az áruház neve, ahová a link visz (pl. "Notino", "Vilgain")
   - category    "baby-care" | "cosmetics" | "food" (annak a terméknek a kategóriája, amit helyettesít)
   - free_of     azok az összetevő-azonosítók, amiktől MENTES a termék. Csak olyat írj ide,
                 amit a címkén ellenőriztél. Lehetséges értékek:
                   inci_paraffinum_liquidum  (ásványi olaj)
                   inci_fragrance_parfum     (illatanyag / parfüm)
                   inci_sodium_laureth_sulfate (SLES / SLS)
                   inci_dimethicone          (szilikon)
                   inci_palm_oil             (pálmaolaj)
                   inci_flavor_enhancer      (ízfokozó)
   - reason      egy rövid, semleges indoklás (nem riogató, nem egészségügyi állítás)
   - url         sima termékoldal-link (amíg nincs partnerprogram)
   - affiliateUrl a partnerprogramtól kapott jutalékos link. Ha ez ki van töltve, a link
                 automatikusan "Ajánlott link – jutalékot kaphatunk" jelöléssel jelenik meg.
                 Ha null, sima link, jelölés nélkül.
   - checkedAt   mikor ellenőrizted utoljára az összetételt és a linket (ÉÉÉÉ-HH-NN)

   Sablon (másold, töltsd ki, és tedd a listába):
   {
     id: "marka-termek",
     name: "",
     brand: "",
     store: "Notino",
     category: "cosmetics",
     free_of: [],
     reason: "",
     url: "",
     affiliateUrl: null,
     checkedAt: "2026-10-12"
   },
   ========================================================================== */
window.DALEDAY_ALTERNATIVES = [
  {
    id: "weleda-baby-popsikrem",
    name: "Weleda bio körömvirágos baby popsikrém",
    brand: "Weleda",
    store: "Notino",
    category: "baby-care",
    free_of: ["inci_paraffinum_liquidum"],
    reason: "Növényi olaj alapú összetétel, ásványi olaj nélkül.",
    url: "https://www.notino.hu/weleda/baby-and-child-koromviragos-popsikrem/",
    affiliateUrl: null,
    checkedAt: "2026-10-07"
  }
];
