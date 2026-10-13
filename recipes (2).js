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
    id, title, time (pl. "10 perc"), category ("food"), priority (elhagyható, nagyobb = előbb),
    matchKeywords, excludeKeywords, free_of,
    ingredients: [{ name, amount }]
    steps: [ "..." ]
    note: rövid megjegyzés (allergén, tárolás). Egészségügyi állítás NEM szerepelhet.

  Szabály: legfeljebb 6 hozzávaló, rövid elkészítés, nincs egészségügyi ígéret.
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
      { name: "pörkölt mogyoró", amount: "200 g" },
      { name: "cukrozatlan kakaópor", amount: "2–3 evőkanál" },
      { name: "juharszirup vagy méz", amount: "3–4 evőkanál" },
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
    excludeKeywords: ["tej", "joghurt", "smack", "tesztaleves", "noodle", "ramen", "instant leves", "zacskos leves", "cup soup"],
    free_of: ["inci_flavor_enhancer"],
    ingredients: [
      { name: "szárított zöldségek (sárgarépa, zeller, petrezselyemgyökér)", amount: "4 evőkanál" },
      { name: "szárított petrezselyemzöld", amount: "2 evőkanál" },
      { name: "hagymapor", amount: "1 evőkanál" },
      { name: "kurkuma", amount: "1 teáskanál" },
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
    matchKeywords: ["musli", "muzli", "muesli", "granola", "flapjack", "zabszelet", "zabpehely", "cereal bar", "mueslirieg"],
    excludeKeywords: ["csokolad", "chocolate", "schokolade", "keks", "leves"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "zabpehely", amount: "150 g" },
      { name: "100%-os mogyoróvaj", amount: "100 g" },
      { name: "méz vagy juharszirup", amount: "80 g" },
      { name: "aszalt gyümölcs (pl. datolya, mazsola)", amount: "40 g" },
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
      { name: "finomliszt", amount: "250 g" },
      { name: "hideg vaj", amount: "125 g" },
      { name: "porcukor", amount: "70 g" },
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
  },
  {
    id: "hazi-popcorn",
    title: "Házi pattogatott kukorica",
    time: "kb. 5 perc",
    category: "food",
    matchKeywords: ["popcorn", "pop corn", "pattogatott"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "pattogatni való kukorica", amount: "3 evőkanál" },
      { name: "napraforgó- vagy repceolaj", amount: "1 evőkanál" },
      { name: "só", amount: "egy csipet" }
    ],
    steps: [
      "Melegítsd fel az olajat egy fedős lábasban, tegyél bele 3–4 szem kukoricát.",
      "Amikor ezek kipattognak, add hozzá a többi kukoricát, és tedd rá a fedőt.",
      "Közepes lángon időnként rázogasd a lábast, amíg a pattogás lelassul.",
      "Vedd le a tűzről, és sózd meg ízlés szerint."
    ],
    note: "Vigyázz a forró olajjal. A pattogatott kukorica kisgyerekeknek (kb. 4 éves kor alatt) fulladásveszélyes lehet. Ízesítheted fahéjjal vagy fűszerekkel is."
  },
  {
    id: "sutoben-sult-chips",
    title: "Sütőben sült burgonyachips",
    time: "10 perc + kb. 20 perc sütés",
    category: "food",
    matchKeywords: ["chips", "crisps", "burgonyachips"],
    excludeKeywords: ["popcorn", "tortilla", "kukorica", "nacho"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "közepes burgonya", amount: "2 db" },
      { name: "olívaolaj vagy napraforgóolaj", amount: "1–2 evőkanál" },
      { name: "só", amount: "egy csipet" }
    ],
    steps: [
      "Szeleteld a burgonyát nagyon vékonyra (1–2 mm), lehetőleg zöldséghámozóval vagy szeletelővel.",
      "Itasd fel a felesleges nedvességet konyhai papírral, majd forgasd meg olajjal és sóval.",
      "Terítsd el egy rétegben sütőpapíros tepsin, ne fedjék egymást.",
      "Süsd 180 °C-on 15–20 percig, a végén figyeld, nehogy megégjen."
    ],
    note: "Nem lesz olyan ropogós, mint a bolti chips. Más zöldségekkel is kipróbálhatod, például sárgarépával vagy céklával. Frissen a legjobb, zárt dobozban 1–2 napig eláll."
  },
  {
    id: "hazi-salataontet",
    title: "Házi salátaöntet",
    time: "5 perc",
    category: "food",
    matchKeywords: ["dressing", "ontet", "vinaigrette"],
    excludeKeywords: ["majonez", "mayonnaise", "tartar"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "olívaolaj", amount: "3 evőkanál" },
      { name: "citromlé vagy almaecet", amount: "1 evőkanál" },
      { name: "mustár", amount: "1 teáskanál" },
      { name: "méz", amount: "1 teáskanál" },
      { name: "só és bors", amount: "ízlés szerint" }
    ],
    steps: [
      "Tedd az összes hozzávalót egy kis csavaros üvegbe.",
      "Rázd össze, amíg krémes, egyenletes nem lesz.",
      "Ízlés szerint igazítsd a sót és a savasságot.",
      "Használat előtt rázd fel, mert az olaj és a sav szétválik."
    ],
    note: "A mustár szezámot, mustárt vagy szulfitot tartalmazhat (allergének, nézd meg a csomagolást). Mézet 1 év alatti gyereknek ne adj. Hűtőben kb. 1 hétig eláll."
  },
  {
    id: "datolyas-kakaos-falat",
    title: "Házi kakaós-datolyás falat",
    time: "kb. 15 perc",
    category: "food",
    matchKeywords: ["csokolad", "chocolate", "schokolade", "pralin", "bonbon"],
    excludeKeywords: ["krem", "spread", "nutella", "paste", "vaj", "keks", "leves", "ital", "drink", "zab"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "magozott datolya", amount: "150 g" },
      { name: "mogyoró vagy mandula", amount: "60 g" },
      { name: "cukrozatlan kakaópor", amount: "2 evőkanál" },
      { name: "só", amount: "egy csipet" },
      { name: "kókuszreszelék a forgatáshoz", amount: "2 evőkanál" }
    ],
    steps: [
      "Ha a datolya kemény, áztasd 10 percig forró vízben, majd csöpögtesd le.",
      "Turmixold a datolyát a dióféle, a kakaó és a só társaságában ragacsos masszává.",
      "Formálj belőle kis golyókat.",
      "Forgasd meg kókuszreszelékben, és tedd hűtőbe."
    ],
    note: "Dióféléket tartalmaz (allergén). A datolya természetes cukrot tartalmaz. Hűtőben kb. 1 hétig eláll. Az íze és az állaga eltér a csokoládétól."
  },
  {
    id: "gyors-tesztaleves",
    title: "Gyors házi tésztaleves",
    time: "kb. 15 perc",
    category: "food",
    priority: 3,
    matchKeywords: ["smack", "tesztaleves", "noodle", "ramen", "instant leves", "cup noodle"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "cérnametélt vagy vékony tészta", amount: "40 g" },
      { name: "sárgarépa", amount: "1 db" },
      { name: "csirkemell", amount: "100 g" },
      { name: "házi zöldségfűszer-keverék (lásd a zöldségfűszer receptet)", amount: "1 teáskanál" },
      { name: "friss petrezselyem", amount: "1 maréknyi" },
      { name: "só", amount: "csipet" }
    ],
    steps: [
      "Forralj fel 500 ml vizet a zöldségfűszer-keverékkel és a vékony karikára vágott sárgarépával, főzd 5 percig.",
      "Add hozzá a vékony csíkokra vágott csirkemellet, és főzd 3–4 percig.",
      "Tedd bele a tésztát, és főzd a csomagoláson megadott ideig (általában 2–4 perc).",
      "Sózd ízlés szerint, és szórd meg apróra vágott petrezselyemmel."
    ],
    note: "A csirkehúsnak teljesen át kell főnie. A tészta glutént és tojást tartalmazhat (allergének, nézd meg a csomagoláson). Maradék főtt csirkével még gyorsabb. A leves íze eltér a bolti instant levesétől."
  },
  {
    id: "gyors-zoldsegleves",
    title: "Gyors házi zöldségleves",
    time: "kb. 15 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["zacskos leves", "cup soup", "soup", "kremleves", "zoldsegleves"],
    excludeKeywords: ["smack", "tesztaleves", "noodle", "ramen"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "sárgarépa", amount: "1 db" },
      { name: "burgonya", amount: "1 kisebb" },
      { name: "fagyasztott zöldborsó", amount: "3 evőkanál" },
      { name: "házi zöldségfűszer-keverék (lásd a zöldségfűszer receptet)", amount: "1 teáskanál" },
      { name: "olaj", amount: "1 teáskanál" },
      { name: "friss petrezselyem", amount: "1 maréknyi" }
    ],
    steps: [
      "Kockázd apróra a sárgarépát és a burgonyát.",
      "Forralj fel 500 ml vizet a zöldségfűszerrel, tedd bele a zöldségeket, és főzd 10–12 percig, amíg megpuhulnak.",
      "Add hozzá a borsót az utolsó 3 percben, és csorgass bele egy kevés olajat.",
      "Szórd meg petrezselyemmel. Ha krémlevest szeretnél, botmixerrel pürésítsd."
    ],
    note: "Kb. 1 adag. Hűtőben 2 napig eláll. Az íze eltér a bolti instant levesétől."
  },
  {
    id: "hazi-husfuszer",
    title: "Házi húsfűszer-keverék",
    time: "kb. 5 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["gyros", "husfuszer", "grillfuszer", "bbq fuszer", "grill fuszer"],
    excludeKeywords: [],
    free_of: ["inci_flavor_enhancer"],
    ingredients: [
      { name: "édes fűszerpaprika", amount: "2 evőkanál" },
      { name: "fokhagymapor", amount: "1 evőkanál" },
      { name: "hagymapor", amount: "1 evőkanál" },
      { name: "szárított oregánó", amount: "1 teáskanál" },
      { name: "őrölt kömény", amount: "1 teáskanál" },
      { name: "só", amount: "1 teáskanál" }
    ],
    steps: [
      "Keverd össze az összes fűszert egy tálban.",
      "Töltsd száraz, jól záródó üvegbe.",
      "Használd 500 g húshoz kb. 1–2 evőkanálnyit, kevés olajjal összekeverve, sütés előtt."
    ],
    note: "Száraz, zárt üvegben hónapokig eláll. Egy kevés csípős paprikával ízesítheted. A bolti kevertől eltérhet az íze."
  },
  {
    id: "gyors-zabkasa",
    title: "Gyors házi zabkása",
    time: "kb. 10 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["zabkasa", "porridge", "oatmeal", "instant zab", "quaker"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "zabpehely", amount: "40 g" },
      { name: "tej vagy víz", amount: "250 ml" },
      { name: "méz vagy juharszirup", amount: "1 teáskanál" },
      { name: "alma, banán vagy bogyós gyümölcs", amount: "néhány darab" },
      { name: "fahéj", amount: "csipet" }
    ],
    steps: [
      "Tedd a zabpelyhet és a tejet (vagy vizet) egy kis lábasba, és forrald fel.",
      "Főzd közepes lángon 5–6 percig, közben időnként keverd meg.",
      "Édesítsd mézzel vagy sziruppal, szórd meg fahéjjal.",
      "Add hozzá a felvágott gyümölcsöt."
    ],
    note: "A zab glutént tartalmazhat nyomokban, a tej allergén. Mézet 1 év alatti gyereknek ne adj."
  }
];
