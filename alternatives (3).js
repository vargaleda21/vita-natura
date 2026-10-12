/* ==========================================================================
   daleday – kézzel kurált alternatíva-katalógus
   Ezt a fájlt szerkeszd, ha új ajánlást veszel fel. Kódot nem kell hozzá írni.

   Mezők:
   - id              egyedi azonosító (kisbetű, kötőjel), a kattintásméréshez is ez kell
   - name            a termék pontos neve
   - brand           márka
   - store           az áruház neve, ahová a link visz (pl. "Notino", "Vilgain")
   - category        "baby-care" | "cosmetics" | "food" (annak a terméknek a kategóriája, amit helyettesít)
   - matchKeywords   (nem kötelező) szavak, amelyek közül legalább az egyiknek szerepelnie kell a
                     helyettesített termék nevében vagy márkájában, kisbetűvel, ékezet nélkül.
                     Ezzel elkerülöd, hogy pl. mogyoróvajat ajánljon instant tésztára.
                     Ha nem töltöd ki, az adott kategória minden termékéhez megjelenhet.
   - excludeKeywords (nem kötelező) ha ezek közül bármelyik szerepel a helyettesített termék nevében
                     vagy márkájában, az ajánlás NEM jelenik meg (pl. arckrémet ne ajánljon popsikrém helyett).
   - free_of         azok az összetevő-azonosítók, amiktől MENTES a termék. Csak olyat írj ide,
                     amit a címkén vagy a gyártó oldalán ellenőriztél. Lehetséges értékek:
                       inci_paraffinum_liquidum    (ásványi olaj)
                       inci_fragrance_parfum       (illatanyag / parfüm)
                       inci_sodium_laureth_sulfate (SLES / SLS)
                       inci_dimethicone            (szilikon)
                       inci_palm_oil               (pálmaolaj)
                       inci_flavor_enhancer        (ízfokozó)
   - reason          egy rövid, semleges indoklás (nem riogató, nem egészségügyi állítás).
                     Írd bele azt is, ha a termék tartalmaz valamit, amit a felhasználó kerülhet
                     (pl. illatanyag), hogy ne legyen félrevezető.
   - url             sima termékoldal-link (amíg nincs partnerprogram)
   - affiliateUrl    a partnerprogramtól kapott jutalékos link. Ha ez ki van töltve, a link
                     automatikusan "Ajánlott link – jutalékot kaphatunk" jelöléssel jelenik meg.
                     Ha null, sima link, jelölés nélkül.
   - checkedAt       mikor ellenőrizted utoljára az összetételt és a linket (ÉÉÉÉ-HH-NN)

   Sablon (másold, töltsd ki, és tedd a listába):
   {
     id: "marka-termek",
     name: "",
     brand: "",
     store: "Notino",
     category: "cosmetics",
     matchKeywords: ["testapolo"],
     excludeKeywords: [],
     free_of: [],
     reason: "",
     url: "",
     affiliateUrl: null,
     checkedAt: "2026-10-12"
   },

   Ellenőrzési forrás minden bejegyzésnél (2026-10-12):
   - Weleda: weleda.hu termékoldalak, "Teljes lista" (INCI)
   - Vilgain: vilgain.hu termékoldalak, "Összetevők" rész. Ahol több íz van, a bejegyzés az
     oldalon látható ízek közül azokra vonatkozik, amelyeknek a listáját ellenőriztem.
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
    reason: "Növényi olaj és méhviasz alapú, ásványi olaj és szilikon nélkül. Illatanyagot (parfümöt) és lanolint tartalmaz.",
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
    id: "weleda-skin-food-light",
    name: "Weleda Skin Food Light bőrápoló krém arcra és testre",
    brand: "Weleda",
    store: "Weleda",
    category: "cosmetics",
    matchKeywords: ["testapolo", "lotion", "body", "kezkrem", "hand cream", "balzsam", "moisturi", "hidrato", "hydrat", "nappali", "arckrem", "face cream", "day cream"],
    excludeKeywords: ["tisztito", "cleanser", "wash", "sampon", "shampoo", "tusfurdo", "gel", "sudocrem", "popsi", "pelenka", "diaper"],
    free_of: ["inci_paraffinum_liquidum", "inci_dimethicone", "inci_sodium_laureth_sulfate"],
    reason: "Napraforgóolaj, méhviasz és shea vaj alapú, ásványi olaj és szilikon nélkül. Illatanyagot (parfümöt), alkoholt és lanolint tartalmaz.",
    url: "https://www.weleda.hu/termekek/skin-food-light-gyorsan-beszivodo-intenziv-hidratalo-borapolo-krem-arcra-es-testre-g007756?variant=g007756_HU1",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "weleda-skin-food",
    name: "Weleda Skin Food intenzíven tápláló bőrápoló krém arcra és testre",
    brand: "Weleda",
    store: "Weleda",
    category: "cosmetics",
    matchKeywords: ["testapolo", "lotion", "body", "kezkrem", "hand cream", "balzsam", "moisturi", "hidrato", "hydrat", "nappali", "arckrem", "face cream", "day cream"],
    excludeKeywords: ["tisztito", "cleanser", "wash", "sampon", "shampoo", "tusfurdo", "gel", "sudocrem", "popsi", "pelenka", "diaper"],
    free_of: ["inci_paraffinum_liquidum", "inci_dimethicone", "inci_sodium_laureth_sulfate"],
    reason: "Napraforgóolaj, mandulaolaj és méhviasz alapú, ásványi olaj és szilikon nélkül. Illatanyagot (parfümöt), alkoholt és lanolint tartalmaz.",
    url: "https://www.weleda.hu/termekek/skin-food-intenziven-taplalo-borapolo-krem-arcra-es-testre-g009398?variant=g009398_HU1",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-bio-foldimogyorovaj",
    name: "Vilgain BIO mogyoróvaj (100% földimogyoró)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "hazelnut", "haselnuss", "erdnuss", "peanut", "nuss"],
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
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "hazelnut", "haselnuss", "nuss"],
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
    matchKeywords: ["spread", "krem", "nutella", "mogyoro", "nougat", "hazelnut", "haselnuss", "nuss"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Növényi alapú, pálmaolaj és ízfokozó nélkül (kókuszolajat és sheavajat tartalmaz). Hozzáadott kókuszcukrot tartalmaz.",
    url: "https://vilgain.hu/vilgain-plant-protein-nut-spread-bio/kesu-es-vanilia-250-g-46598",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-bio-tonkolyes-suti-kakao",
    name: "Vilgain BIO tönkölyes süti, kakaós (135 g)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["keks", "biscuit", "cookie", "suti", "piskot", "wafer"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Tönkölylisztből, kókuszolajból, mézből és kakaóból készül, pálmaolaj és ízfokozó nélkül. Tartalmaz mézet és nádcukrot, gluténos.",
    url: "https://vilgain.hu/vilgain-bio-cookies",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-bio-zabszelet",
    name: "Vilgain BIO zabszelet (több ízben, 50 g)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["szelet", " bar", "riegel", "musli", "muesli", "granola", "flapjack"],
    excludeKeywords: ["csokolad", "chocolate", "schokolade"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Gluténmentes zabpehelyből, magkrémből és kókuszszirupból vagy kókuszvirág-nektárból áll, pálmaolaj és ízfokozó nélkül (shea vajat tartalmaz). Hozzáadott édesítőt tartalmaz.",
    url: "https://vilgain.hu/vilgain-bio-oat-bar",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  },
  {
    id: "vilgain-etcsokolade-mogyoroval",
    name: "Vilgain étcsokoládé mogyoróval (45 g)",
    brand: "Vilgain",
    store: "Vilgain",
    category: "food",
    matchKeywords: ["csokolad", "chocolate", "schokolade", "choco"],
    excludeKeywords: ["spread", "krem", "nutella", "paste", "vaj"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    reason: "Csak kakaómasszából, cukorból és mogyoróból áll (70% étcsokoládé, 30% mogyoró), pálmaolaj és hozzáadott aroma nélkül. Tartalmaz cukrot.",
    url: "https://vilgain.hu/vilgain-csokolade-szelet",
    affiliateUrl: null,
    checkedAt: "2026-10-12"
  }
];
