/*
  daleday – otthoni alternatívák (rövid receptek, csak élelmiszerhez)

  Ez a fájl kézzel szerkeszthető. Minden bejegyzés egy recept.
  A recept csak akkor jelenik meg, ha:
    - a beolvasott termék élelmiszer,
    - tartalmaz a profilban kerülendőként megjelölt összetevőt,
    - és a recept `free_of` listája minden ilyen összetevőt lefed,
    - és a termék neve/márkája tartalmazza valamelyik `matchKeywords` szót
      (kisbetűs, ékezet nélkül), de nem tartalmaz `excludeKeywords` szót.

  Mezők:
    id, title, time (pl. "10 perc"), category ("food"),
    matchKeywords, excludeKeywords, free_of,
    ingredients: [{ name, amount, shop }]  (shop = keresőszó a Kifli.hu-hoz, elhagyható)
    steps: [ "..." ]
    note: rövid megjegyzés (allergén, tárolás). Egészségügyi állítás NEM szerepelhet.

  Szabály: legfeljebb 6 hozzávaló, rövid elkészítés, nincs egészségügyi ígéret.
  A Kifli-linkek sima keresőlinkek, nem partnerlinkek.
*/
window.DALEDAY_RECIPES = [
  {
    id: "hazi-mogyorokrem",
    title: "Házi mogyorós-kakaós krém",
    time: "kb. 20 perc",
    category: "food",
    matchKeywords: ["krem", "nutella", "mogyoro", "nougat", "hazelnut", "haselnuss", "spread", "nuss"],
    excludeKeywords: ["szelet", "keks", "tabla", "leves"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "pörkölt mogyoró", amount: "200 g", shop: "pörkölt mogyoró" },
      { name: "cukrozatlan kakaópor", amount: "2–3 evőkanál", shop: "kakaópor" },
      { name: "juharszirup vagy méz", amount: "3–4 evőkanál", shop: "juharszirup" },
      { name: "só", amount: "egy csipet" }
    ],
    steps: [
      "Ha nyers a mogyoró, 180 °C-on 8–10 percig pirítsd, majd hagyd kicsit hűlni.",
      "Turmixold vagy robotgépben dolgozd simára 8–12 percig, közben néha kapard le az oldalát. Előbb por, majd krém lesz belőle.",
      "Add hozzá a kakaót, a szirupot és a sót, és turmixold tovább, amíg egyenletes nem lesz.",
      "Üvegbe töltve hűtőben tárold."
    ],
    note: "Mogyorót tartalmaz (allergén). Hűtőben kb. 2 hétig tartsd el. Mézet 1 év alatti gyereknek ne adj. A textúra nem lesz pontosan olyan, mint a boltié."
  },
  {
    id: "zoldsegfuszer-keverek",
    title: "Házi zöldségfűszer-keverék",
    time: "kb. 10 perc",
    category: "food",
    matchKeywords: ["leves", "bouillon", "vegeta", "kocka", "bruhe", "fuszerkeveres", "alaplé", "alaple"],
    excludeKeywords: ["tej", "joghurt"],
    free_of: ["inci_flavor_enhancer"],
    ingredients: [
      { name: "szárított zöldségek (sárgarépa, zeller, petrezselyemgyökér)", amount: "4 evőkanál", shop: "szárított zöldség" },
      { name: "szárított petrezselyemzöld", amount: "2 evőkanál", shop: "szárított petrezselyem" },
      { name: "hagymapor", amount: "1 evőkanál", shop: "hagymapor" },
      { name: "kurkuma", amount: "1 teáskanál", shop: "kurkuma" },
      { name: "só", amount: "2–3 evőkanál" }
    ],
    steps: [
      "Add az összes hozzávalót egy fűszerdarálóba vagy aprítóba.",
      "Őrölj finom, egyenletes porrá.",
      "Száraz, jól záródó üvegben tárold.",
      "Használd ízlés szerint, kb. 1 teáskanál / 1 liter levesnél kiindulásnak."
    ],
    note: "Száraz, zárt üvegben hónapokig eláll. Sótartalma magas, ezért óvatosan adagold. Nem pótolja pontosan a bolti ízt."
  },
  {
    id: "hazi-zabszelet",
    title: "Házi zabszelet",
    time: "10 perc + 1 óra hűtés",
    category: "food",
    matchKeywords: ["szelet", " bar", "riegel", "musli", "muesli", "granola", "flapjack", "zab"],
    excludeKeywords: ["csokolad", "chocolate", "schokolade", "keks", "leves"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "zabpehely", amount: "150 g", shop: "zabpehely" },
      { name: "100%-os mogyoróvaj", amount: "100 g", shop: "mogyoróvaj" },
      { name: "méz vagy juharszirup", amount: "80 g", shop: "juharszirup" },
      { name: "aszalt gyümölcs (pl. datolya, mazsola)", amount: "40 g", shop: "aszalt gyümölcs" },
      { name: "só", amount: "egy csipet" }
    ],
    steps: [
      "Melegítsd a mogyoróvajat és a mézet vagy szirupot, amíg folyékony lesz.",
      "Keverd hozzá a zabpehelyet, az apróra vágott aszalt gyümölcsöt és a sót.",
      "Nyomkodd szorosan egy sütőpapírral bélelt formába.",
      "Hűtsd legalább 1 órát, majd szeleteld fel."
    ],
    note: "Mogyorót tartalmaz (allergén), a zab pedig glutént tartalmazhat nyomokban. Hűtőben kb. 1 hétig tartsd el. Mézet 1 év alatti gyereknek ne adj."
  },
  {
    id: "vajas-keksz",
    title: "Egyszerű vajas keksz",
    time: "20 perc + 30 perc pihentetés",
    category: "food",
    matchKeywords: ["keks", "biscuit", "cookie", "piskot", "wafer", "suti"],
    excludeKeywords: ["csokolad", "chocolate", "schokolade", "krem "],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "finomliszt", amount: "250 g", shop: "finomliszt" },
      { name: "hideg vaj", amount: "125 g", shop: "vaj" },
      { name: "porcukor", amount: "70 g", shop: "porcukor" },
      { name: "tojássárgája", amount: "1 db" },
      { name: "vanília és só", amount: "egy csipet" }
    ],
    steps: [
      "Morzsold össze a hideg vajat a liszttel, majd add hozzá a porcukrot, a sárgáját és a vaníliát.",
      "Gyúrd össze tésztává, tedd hűtőbe 30 percre.",
      "Nyújtsd ki kb. fél centi vastagra, szaggass ki formákat.",
      "Süsd 170 °C-on 12–15 percig, amíg a széle enyhén megaranyosodik."
    ],
    note: "Glutént, tojást és tejterméket tartalmaz (allergének). Zárt dobozban 4–5 napig eláll."
  }
];
