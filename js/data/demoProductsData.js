
/**
 * Vita-Natura Alapanyag Adatbázis & Kategóriák
 * Sütési hozzávalók nélküli, főzésre optimalizált lista
 */

const INGREDIENT_DATABASE = [
  // Zöldségek
  { name: "Sárgarépa", concept: "SÁRGARÉPA", category: "zoldsegek", tags: ["rostdús", "gyökérzöldség"] },
  { name: "Petrezselyemgyökér", concept: "PETREZSELYEMGYÖKÉR", category: "zoldsegek", tags: ["gyökérzöldség", "ízesítő"] },
  { name: "Cékla", concept: "CÉKLA", category: "zoldsegek", tags: ["vasban gazdag", "gyökérzöldség"] },
  { name: "Cukkini", concept: "CUKKINI", category: "zoldsegek", tags: ["könnyen emészthető", "alacsony kalória"] },
  { name: "Padlizsán", concept: "PADLIZSÁN", category: "zoldsegek", tags: ["rostdús", "mediterrán"] },
  { name: "Brokkoli", concept: "BROKKOLI", category: "zoldsegek", tags: ["szulforafán", "hormonális egyensúly"] },
  { name: "Karfiol", concept: "KARFIOL", category: "zoldsegek", tags: ["alacsony szénhidrát", "rostdús"] },
  { name: "Spenót", concept: "SPENÓT", category: "zoldsegek", tags: ["vas", "folát", "leveles zöld"] },
  { name: "Kaliforniai paprika", concept: "KALIFORNIAI_PAPRIKA", category: "zoldsegek", tags: ["C-vitamin", "friss"] },
  { name: "Paradicsom", concept: "PARADICSOM", category: "zoldsegek", tags: ["likopin", "alap zöldség"] },
  { name: "Vöröshagyma", concept: "HAGYMA", category: "zoldsegek", tags: ["alapfűszer", "bélflóra-barát"] },
  { name: "Fokhagyma", concept: "FOKHAGYMA", category: "zoldsegek", tags: ["immunerősítő", "alapfűszer"] },
  { name: "Póréhagyma", concept: "PÓRÉHAGYMA", category: "zoldsegek", tags: ["prebiotikus", "lágy íz"] },
  { name: "Krumpli", concept: "BURGONYA", category: "zoldsegek", tags: ["szénhidrát", "alapélelmiszer"] },
  { name: "Édesburgonya", concept: "ÉDESBURGONYA", category: "zoldsegek", tags: ["lassú felszívódású", "béta-karotin"] },
  { name: "Fejes káposzta", concept: "KÁPOSZTA", category: "zoldsegek", tags: ["rostdús", "fermentálható"] },
  { name: "Gomba (csiperke)", concept: "GOMBA", category: "zoldsegek", tags: ["D-vitamin", "gluténmentes"] },

  // Húsok & Halak
  { name: "Csirkemell", concept: "CSIRKEMELL", category: "husok_halak", tags: ["sovány fehérje", "gyorsan kész"] },
  { name: "Pulykamell", concept: "PULYKAMELL", category: "husok_halak", tags: ["sovány fehérje", "jól variálható"] },
  { name: "Darált marhahús", concept: "DARÁLT_HÚS", category: "husok_halak", tags: ["vasban gazdag", "telt íz"] },
  { name: "Sertéskaraj / comb", concept: "SERTÉSHÚS", category: "husok_halak", tags: ["fehérje", "hagyományos"] },
  { name: "Lazacfilé", concept: "LAZAC", category: "husok_halak", tags: ["omega-3", "gyulladáscsökkentő"] },
  { name: "Tonhal (konzerv)", concept: "TONHAL", category: "husok_halak", tags: ["gyors fehérje", "praktikus"] },
  { name: "Tőkehal", concept: "TŐKEHAL", category: "husok_halak", tags: ["alacsony zsírtartalom", "fehérje"] },

  // Hüvelyesek
  { name: "Csicseriborsó (konzerv/száraz)", concept: "CSICSERIBORSÓ", category: "huvelyesek", tags: ["növényi fehérje", "rost"] },
  { name: "Vöröshüvelyű lencse", concept: "VÖRÖSLENCSE", category: "huvelyesek", tags: ["gyorsan fő", "fehérjedús"] },
  { name: "Barna lencse", concept: "LENCSE", category: "huvelyesek", tags: ["hagyományos", "rostdús"] },
  { name: "Fehér bab / Fejedelembab", concept: "BAB", category: "huvelyesek", tags: ["növényi fehérje", "laktató"] },

  // Gabonák & Tészták
  { name: "Rizs (basmati / barna)", concept: "RIZS", category: "gabonak_tesztak", tags: ["komplex szénhidrát", "alapköret"] },
  { name: "Bulgur", concept: "BULGUR", category: "gabonak_tesztak", tags: ["rostdús", "gyors köret"] },
  { name: "Kvinoa", concept: "KVINOA", category: "gabonak_tesztak", tags: ["teljes értékű fehérje", "gluténmentes"] },
  { name: "Gersli (árpagyöngy)", concept: "GERSLI", category: "gabonak_tesztak", tags: ["hagyományos", "lassú felszívódású"] },
  { name: "Durum tészta", concept: "TÉSZTA", category: "gabonak_tesztak", tags: ["szénhidrát", "alapélelmiszer"] },
  { name: "Gluténmentes tészta", concept: "GM_TÉSZTA", category: "gabonak_tesztak", tags: ["kímélő", "opció"] },

  // Tejtermékek & Alternatívák
  { name: "Görög joghurt", concept: "GÖRÖG_JOGHURT", category: "tejtermekek", tags: ["probiotikum", "fehérje"] },
  { name: "Túró / Cottage cheese", concept: "TÚRÓ", category: "tejtermekek", tags: ["lassú felszívódású fehérje"] },
  { name: "Tejföl (vagy növényi alternatíva)", concept: "TEJFÖL", category: "tejtermekek", tags: ["alapvető ízesítő"] },
  { name: "Mozzarella", concept: "MOZZARELLA", category: "tejtermekek", tags: ["lágy sajt", "fehérje"] },
  { name: "Feta sajt", concept: "FETA", category: "tejtermekek", tags: ["sós", "karakteres ízesítő"] },
  { name: "Tojás", concept: "TOJÁS", category: "tejtermekek", tags: ["teljes értékű fehérje", "alapélelmiszer"] },

  // Aszalt gyümölcsök
  { name: "Aszalt szilva", concept: "ASZALT_SZILVA", category: "aszalt_gyumolcsok", tags: ["emésztést segítő", "rost"] },
  { name: "Mazsola", concept: "MAZSOLA", category: "aszalt_gyumolcsok", tags: ["természetes édesítő", "kálium"] },
  { name: "Aszalt áfonya", concept: "ASZALT_ÁFONYA", category: "aszalt_gyumolcsok", tags: ["anti-oxidáns", "fanyar"] },

  // Olajok & Zsírok
  { name: "Olívaolaj (sütéshez/főzéshez)", concept: "OLÍVAOLAJ", category: "olajok_zsirok", tags: ["egészséges zsír", "alapvető"] },
  { name: "Kókuszzsír / Vaj", concept: "VAJ", category: "olajok_zsirok", tags: ["sütéshez-főzéshez alap"] },

  // Fűszerek & Szószok
  { name: "Só, Fekete bors", concept: "SÓ_BORS", category: "fuszerek_szoszok", tags: ["alapfűszer"] },
  { name: "Fűszerpaprika", concept: "FŰSZERPAPRIKA", category: "fuszerek_szoszok", tags: ["hagyományos magyar alap"] },
  { name: "Oregánó / Bazsalikom", concept: "BAZSALIKOM", category: "fuszerek_szoszok", tags: ["mediterrán fűszer"] },
  { name: "Kakukkfű / Rozmaring", concept: "ROZMARING", category: "fuszerek_szoszok", tags: ["húsokhoz", "zöldségekhez"] },
  { name: "Sűrített paradicsom", concept: "PARADICSOMSZÓSZ", category: "fuszerek_szoszok", tags: ["szószok alapja"] },
  { name: "Mustár", concept: "MUSTÁR", category: "fuszerek_szoszok", tags: ["ízesítő", "pácokhoz"] }
];
