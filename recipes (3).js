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
  },
  {
    id: "hazi-ketchup",
    title: "Házi ketchup",
    time: "kb. 30 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["ketchup"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "paradicsompassata (sűrített paradicsomlé)", amount: "400 ml" },
      { name: "almaecet", amount: "2 evőkanál" },
      { name: "méz vagy juharszirup", amount: "1–2 evőkanál" },
      { name: "hagymapor", amount: "1 teáskanál" },
      { name: "só", amount: "fél teáskanál" },
      { name: "fahéj vagy őrölt szegfűszeg", amount: "csipet" }
    ],
    steps: [
      "Tedd az összes hozzávalót egy kis lábasba, és keverd el.",
      "Forrald fel, majd kis lángon főzd 20–25 percig, időnként megkeverve, amíg a szósz besűrűsödik.",
      "Ízlés szerint igazíts a són, a savasságon és az édességen.",
      "Hagyd kihűlni, majd tárold kimosott, száraz üvegben a hűtőben."
    ],
    note: "Hűtőben kb. 1 hétig eláll. Mézet 1 év alatti gyereknek ne adj. Az íze és az állaga eltér a bolti ketchupétól, a színe is kevésbé élénk."
  },
  {
    id: "hazi-pesto",
    title: "Házi bazsalikomos pesto",
    time: "kb. 10 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["pesto"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "friss bazsalikom levelek", amount: "50 g (2 nagy marék)" },
      { name: "olívaolaj", amount: "80 ml" },
      { name: "pirított napraforgómag vagy fenyőmag", amount: "30 g" },
      { name: "reszelt parmezán", amount: "30 g" },
      { name: "fokhagyma", amount: "1 gerezd" },
      { name: "só", amount: "csipet" }
    ],
    steps: [
      "Pirítsd meg a magokat száraz serpenyőben 2–3 percig, majd hagyd hűlni.",
      "Add a bazsalikomot, a magokat, a fokhagymát és a sajtot egy aprítóba, majd darálj durvára.",
      "Folyamatosan adagold hozzá az olajat, amíg a pesto krémes lesz.",
      "Sózd ízlés szerint, és töltsd üvegbe."
    ],
    note: "Tejterméket és magot tartalmaz (allergének). Hűtőben, olajréteggel lefedve 4–5 napig eláll. Fagyasztható kis adagokban."
  },
  {
    id: "hazi-bbq-szosz",
    title: "Házi barbecue-szósz",
    time: "kb. 15 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["bbq szosz", "barbecue", "bbq sauce", "grillszosz", "grill szosz"],
    excludeKeywords: ["fuszer"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "sűrített paradicsom (paradicsompüré)", amount: "3 evőkanál" },
      { name: "almaecet", amount: "2 evőkanál" },
      { name: "méz vagy juharszirup", amount: "2 evőkanál" },
      { name: "füstölt fűszerpaprika", amount: "1 teáskanál" },
      { name: "fokhagymapor", amount: "1 teáskanál" },
      { name: "víz", amount: "50 ml" }
    ],
    steps: [
      "Keverj össze minden hozzávalót egy kis lábasban.",
      "Forrald fel, majd kis lángon főzd 8–10 percig, amíg sűrű, fényes szósz lesz.",
      "Ízlés szerint sózd, és ha szeretnéd, ízesítsd kevés csípős paprikával.",
      "Hagyd kihűlni, majd tedd üvegbe, és tárold hűtőben."
    ],
    note: "Hűtőben kb. 1 hétig eláll. Mézet 1 év alatti gyereknek ne adj. Az íze eltérhet a bolti szósztól."
  },
  {
    id: "hazi-zoldsegpure",
    title: "Házi zöldségpüré",
    time: "kb. 20 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["zoldsegpure", "vegetable puree", "gemusepure", "puree", "babaetel"],
    excludeKeywords: ["gyumolcs", "apple", "alma", "fruit", "obst", "korte", "banan", "mango", "burgonyapure", "kartoffel"],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "sárgarépa", amount: "2 db" },
      { name: "burgonya", amount: "1 közepes" },
      { name: "cukkini vagy brokkoli", amount: "1 marék" },
      { name: "olívaolaj vagy vaj", amount: "1 teáskanál" },
      { name: "víz (a főzéshez, kevés)", amount: "kb. 100 ml" }
    ],
    steps: [
      "Hámozd meg és kockázd fel a zöldségeket.",
      "Főzd vagy pároljd őket puhára, kb. 12–15 perc alatt.",
      "Turmixold vagy botmixerrel pürésítsd a főzővíz egy részével, amíg egyenletes lesz.",
      "Keverd hozzá az olajat vagy vajat, és ízlés szerint sózd."
    ],
    note: "Hűtőben 2 napig, fagyasztva akár 1–2 hónapig eláll (adagolva). Kisgyermek vagy csecsemő számára az étrend összeállításáról kérdezd a védőnőt vagy a gyermekorvost, és ne sózd. A bolti termék íze és állaga eltérhet."
  },
  {
    id: "hazi-gyumolcspure",
    title: "Házi almapüré",
    time: "kb. 20 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["gyumolcspure", "almapure", "applesauce", "apple sauce", "fruit puree", "obstpure", "fruchtmus", "apfelmus"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "alma", amount: "4 db" },
      { name: "víz", amount: "50 ml" },
      { name: "citromlé", amount: "1 teáskanál" },
      { name: "fahéj", amount: "csipet" }
    ],
    steps: [
      "Hámozd meg és kockázd fel az almákat.",
      "Tedd lábasba a vízzel és a citromlével, fedd le, és főzd kis lángon 12–15 percig, amíg teljesen puha.",
      "Botmixerrel vagy villával pürésítsd a kívánt állagúra.",
      "Fahéjjal ízesítheted. Hagyd kihűlni, majd tedd üvegbe."
    ],
    note: "Hűtőben kb. 4–5 napig eláll, fagyasztható. Az alma természetes cukrot tartalmaz, ezért nem kell édesíteni. Más gyümölccsel (körte, szilva) is működik."
  },
  {
    id: "hazi-burgonyapure",
    title: "Házi burgonyapüré",
    time: "kb. 25 perc",
    category: "food",
    priority: 3,
    matchKeywords: ["burgonyapure", "krumplipure", "mashed potato", "kartoffelpure", "kartoffelpuree"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "burgonya (lisztes fajta)", amount: "500 g" },
      { name: "tej", amount: "100 ml" },
      { name: "vaj", amount: "1 evőkanál" },
      { name: "só", amount: "fél teáskanál" },
      { name: "szerecsendió", amount: "csipet" }
    ],
    steps: [
      "Hámozd meg a burgonyát, vágd egyenlő darabokra, és főzd sós vízben puhára, kb. 15–20 perc alatt.",
      "Szűrd le, és hagyd 1–2 percig gőzölögni a szűrőben.",
      "Add hozzá a vajat, majd krumplinyomóval nyomd át. Fokozatosan keverd hozzá a meleg tejet.",
      "Ízesítsd sóval és szerecsendióval."
    ],
    note: "Tejet tartalmaz (allergén). Hűtőben 2 napig eláll, újramelegítéskor kevés tejjel lazítsd fel. Turmixgéppel ne dolgozd, mert ragacsos lesz."
  },
  {
    id: "hazi-energiagolyo",
    title: "Házi energiagolyó",
    time: "kb. 15 perc",
    category: "food",
    priority: 2,
    matchKeywords: ["energy ball", "energiagolyo", "protein ball", "bliss ball", "protein bar", "energy bar", "proteinszelet", "energiaszelet", "fehérjeszelet", "fehérje szelet", "fehérjeszelet"].map(k => k.normalize("NFD").replace(/[̀-ͯ]/g, "")),
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "zabpehely", amount: "60 g" },
      { name: "100%-os mogyoróvaj", amount: "3 evőkanál" },
      { name: "magozott datolya", amount: "6 db" },
      { name: "méz vagy juharszirup", amount: "1 evőkanál" },
      { name: "kókuszreszelék", amount: "2 evőkanál" },
      { name: "só", amount: "csipet" }
    ],
    steps: [
      "Ha a datolya kemény, áztasd 10 percig forró vízben, majd csöpögtesd le.",
      "Turmixold a datolyát a mogyoróvajjal, a zabpehellyel, a mézzel és a sóval ragacsos masszává.",
      "Nedves kézzel formálj dió nagyságú golyókat.",
      "Forgasd meg kókuszreszelékben, és hűtsd legalább 30 percig."
    ],
    note: "Mogyorót tartalmaz (allergén), a zab pedig glutént tartalmazhat nyomokban. Hűtőben kb. 1 hétig eláll. Mézet 1 év alatti gyereknek ne adj. Tápanyag-összetételük eltér a bolti termékekétől."
  },
  {
    id: "gyumolcsos-zeles-falat",
    title: "Házi gyümölcsös zselés falat",
    time: "10 perc + 2 óra hűtés",
    category: "food",
    priority: 2,
    matchKeywords: ["gumicukor", "gumi cukor", "gummy", "gummies", "haribo", "fruchtgummi", "gumimaci", "zselecukor"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "100%-os gyümölcslé (pl. alma, meggy)", amount: "200 ml" },
      { name: "zselatinpor", amount: "10 g" },
      { name: "méz vagy juharszirup", amount: "1 evőkanál" },
      { name: "citromlé", amount: "1 teáskanál" }
    ],
    steps: [
      "Szórd a zselatint 50 ml hideg gyümölcslére, és hagyd 5 percig duzzadni.",
      "Melegítsd a maradék levet a mézzel és a citromlével, de ne forrald fel.",
      "Keverd bele a megduzzadt zselatint, amíg teljesen feloldódik.",
      "Öntsd szilikon formába vagy kis tálcába, és hűtsd legalább 2 órát, majd szeleteld vagy nyomd ki."
    ],
    note: "A zselatin állati eredetű, így nem vegetáriánus. Hűtőben kb. 5 napig eláll. A levek természetes cukrot tartalmaznak. Az állaga puhább, mint a bolti gumicukoré. Mézet 1 év alatti gyereknek ne adj."
  },
  {
    id: "bananos-fagyi",
    title: "Banános házi fagyi",
    time: "5 perc + előre fagyasztás",
    category: "food",
    priority: 2,
    matchKeywords: ["fagylalt", "jegkrem", "ice cream", "eiscreme", "gelato", "fagyi"],
    excludeKeywords: [],
    free_of: ["inci_palm_oil", "inci_flavor_enhancer"],
    ingredients: [
      { name: "érett banán, szeletelve és lefagyasztva", amount: "2 db" },
      { name: "joghurt vagy tej", amount: "2–3 evőkanál" },
      { name: "cukrozatlan kakaópor vagy mogyoróvaj", amount: "1 evőkanál" },
      { name: "vanília", amount: "csipet" }
    ],
    steps: [
      "Szeleteld fel az érett banánt, és fagyaszd le legalább 3 órára.",
      "Turmixold a fagyasztott banánt a joghurttal vagy tejjel, amíg krémes lesz.",
      "Keverd hozzá a kakaót vagy a mogyoróvajat és a vaníliát.",
      "Azonnal fogyaszthatod, vagy 30–60 percre tedd vissza a fagyasztóba."
    ],
    note: "Tejterméket tartalmaz (allergén), mogyoróvajjal pedig mogyorót. Frissen a legjobb, mert fagyasztóban megkeményedik. Állaga lágyabb, mint a bolti fagylalté."
  }
];
