/* ==========================================================================
   daleday – kézzel kurált alternatíva-katalógus
   Ezt a fájlt szerkeszd, ha új ajánlást veszel fel. Kódot nem kell hozzá írni.

   Mezők:
   - id            egyedi azonosító (kisbetű, kötőjel), a kattintásméréshez is ez kell
   - name          a termék pontos neve
   - brand         márka
   - store         az áruház neve, ahová a link visz (pl. "Notino", "Vilgain")
   - category      "baby-care" | "cosmetics" | "food" (annak a terméknek a kategóriája, amit helyettesít)
   - matchKeywords (nem kötelező) szavak, amelyek közül legalább az egyiknek szerepelnie kell a
                   helyettesített termék nevében vagy márkájában, kisbetűvel, ékezet nélkül.
                   Ezzel elkerülöd, hogy pl. mogyoróvajat ajánljon instant tésztára.
                   Ha nem töltöd ki, az adott kategória minden termékéhez megjelenhet.
   - free_of       azok az összetevő-azonosítók, amiktől MENTES a termék. Csak olyat írj ide,
                   amit a címkén vagy a gyártó oldalán ellenőriztél. Lehetséges értékek:
                     inci_paraffinum_liquidum    (ásványi olaj)
                     inci_fragrance_parfum       (illatanyag / parfüm)
                     inci_sodium_laureth_sulfate (SLES / SLS)
                     inci_dimethicone            (szilikon)
                     inci_palm_oil               (pálmaolaj)
                     inci_flavor_enhancer        (ízfokozó)
   - reason        egy rövid, semleges indoklás (nem riogató, nem egészségügyi állítás).
                   Írd bele azt is, ha a termék tartalmaz valamit, amit a felhasználó kerülhet
                   (pl. illatanyag), hogy ne legyen félrevezető.
   - url           sima termékoldal-link (amíg nincs partnerprogram)
   - affiliateUrl  a partnerprogramtól kapott jutalékos link. Ha ez ki van töltve, a link
                   automatikusan "Ajánlott link – jutalékot kaphatunk" jelöléssel jelenik meg.
                   Ha null, sima link, jelölés nélkül.
   - checkedAt     mikor ellenőrizted utoljára az összetételt és a linket (ÉÉÉÉ-HH-NN)

   Sablon (másold, töltsd ki, és tedd a listába):
   {
     id: "marka-termek",
     name: "",
     brand: "",
     store: "Notino",
     category: "cosmetics",
     matchKeywords: ["krem"],
     free_of: [],
     reason: "",
     url: "",
     affiliateUrl: null,
     checkedAt: "2026-10-12"
   },

   Ellenőrzési forrás minden bejegyzésnél (2026-10-12):
   - Weleda: weleda.hu termékoldalak, "Teljes lista" (INCI)
   - Vilgain: vilgain.hu termékoldalak, "Összetevők" rész
   Az áruházi oldalak is tévedhetnek: az éles indulás előtt vesd össze a csomagoláson lévő címkével.
   ========================================================================== */
window.DALEDAY_ALTERNATIVES = [
  {
    id: "weleda-baby-popsikrem",
    name: "Weleda természetes popsikrém bio körömvirággal (75 ml)",
    brand: "Weleda",
    store: "Weleda",
    category: "baby-care",
    matchKeywords: ["sudocrem", "popsi", "pelenka", "diaper", "nappy", "vedokrem", "cink", "zinc"],
    free_of: ["inci_paraffinum_liquidum", "inci_dimethicone"],
    reason: "Növényi olaj és méhviasz alapú, ásványi olaj és szilikon nélkül. Illatanyagot (parfümöt) tartalmaz.",
    url: "https://www.weleda.hu/termekek/pelenkakiutes-elleni-natur-popsikrem-bio-koromviraggal-g009831?variant=g009831_HU1",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "weleda-baby-tusfurdo-sampon",
    name: "Weleda természetes baba tusfürdő és sampon bio körömvirággal",
    brand: "Weleda",
    store: "Weleda",
    category: "baby-care",
    matchKeywords: ["sampon", "shampoo", "tusfurdo", "wash", "bath", "furdo", "gel"],
    free_of: ["inci_sodium_laureth_sulfate", "inci_dimethicone", "inci_paraffinum_liquidum"],
    reason: "Szulfátmentes: cukor- és kókuszeredetű tisztítóanyagokat használ. Illatanyagot (parfümöt) és denaturált alkoholt tartalmaz.",
    url: "https://www.weleda.hu/termekek/natur-baba-tusfurdo-es-sampon-bio-koromviraggal-g009651?variant=g009651_HU1",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-bio-foldimogyorovaj",
    name: "Vilgain BIO mogyoróvaj (100% földimogyoró)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "csokolad", "kakao", "choco", "hazelnut", "haselnuss", "erdnuss", "peanut", "nuss", "vaj"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Egyetlen összetevő: bio földimogyoró. Nincs benne hozzáadott cukor, pálmaolaj vagy ízfokozó.",
    url: "https://vilgain.hu/vilgain-bio-foeldimogyorovaj",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-mogyorokrem-kakaos",
    name: "Vilgain mogyorókrém kakaóval (1 kg)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "csokolad", "kakao", "choco", "hazelnut", "haselnuss", "nuss"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Földimogyoróból, bio kókuszcukorból, kakaóból és sóból áll, pálmaolaj és ízfokozó nélkül. Tartalmaz hozzáadott kókuszcukrot.",
    url: "https://vilgain.hu/vilgain-sweet-nuts/foeldimogyoro-kakaoval-1-000-g-33588",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-bio-novenyi-feherjes-magkrem",
    name: "Vilgain BIO növényi fehérjés magkrém, kesu és vanília (250 g)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "csokolad", "kakao", "choco", "hazelnut", "haselnuss", "nuss"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Növényi alapú, pálmaolaj és ízfokozó nélkül (kókuszolajat és sheavajat tartalmaz). Hozzáadott kókuszcukrot tartalmaz.",
    url: "https://vilgain.hu/vilgain-plant-protein-nut-spread-bio/kesu-es-vanilia-250-g-46598",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  }
];
