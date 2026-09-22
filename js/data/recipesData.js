
{
    id: "rec-025",
    title: "Tonhalas rizssaláta sárgarépával",
    description: "Hideg, könnyű rizssaláta lecsöpögtetett tonhalkonzervvel és reszelt sárgarépával.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TONHAL", acceptedForms: ["canned_tuna"] },
      { concept: "RIZS", acceptedForms: ["white_rice", "basmati_rice"] }
    ],
    mainIngredients: [
      { concept: "RÉPA", acceptedForms: ["carrot"] }
    ],
    optionalIngredients: [
      { concept: "CITROM", acceptedForms: ["fresh_lemon", "lemon_juice"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {},
    quantities: ["160g tonhalkonzerv", "150g rizs", "1 db sárgarépa", "1 evőkanál citromlé"],
    instructions: [
      "Főzd meg a rizst kétszeres sós vízben 15 perc alatt, szűrd le, és hagyd langyosra hűlni.",
      "Reszeld le a sárgarépát finomra, és csepegtesd le alaposan a tonhalkonzervet.",
      "Keverd össze egy tálban a hűlt rizst, a reszelt sárgarépát és a lecsöpögtetett tonhalat.",
      "Locsold meg olívaolajjal és ízlés szerint friss citromlével, majd sózd, borsozd.",
      "Hidegen vagy langyosan tálald."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TONHAL", "RIZS", "RÉPA"],
    priority: "P2"
  },
  {
    id: "rec-026",
    title: "Lazacfilé párolt brokkolival és rizzsel",
    description: "Serpenyőben sült bőrös vagy bőr nélküli lazacfilé roppanós brokkolival és főtt rizzsel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "LAZAC", acceptedForms: ["salmon_fillet"] },
      { concept: "RIZS", acceptedForms: ["white_rice", "basmati_rice"] }
    ],
    mainIngredients: [
      { concept: "BROKKOLI", acceptedForms: ["fresh_broccoli"] }
    ],
    optionalIngredients: [
      { concept: "CITROM", acceptedForms: ["fresh_lemon", "lemon_juice"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "BROKKOLI": {
        context: "vegetable_side",
        substituteWithConcept: "KARFIOL",
        type: "Direct",
        note: "Brokkoli helyett karfiollal is 1:1 párolható (a karfiol főzési ideje 1-2 perccel hosszabb lehet)."
      }
    },
    quantities: ["250g lazacfilé", "150g rizs", "200g brokkoli", "1/2 db citrom"],
    instructions: [
      "Főzd meg a rizst kétszeres sós vízben 15 perc alatt, majd tartsd melegen.",
      "Szedd apró rózsákra a brokkolit, és párold kevés sós forró vízben 4-5 percig, amíg roppanós marad.",
      "Itasd szárazra a lazacfiléket papírtörlővel, sózd, borsozd.",
      "Süsd a lazacot közepes-magas hőfokon 3-4 percig (bőrös filé esetén a bőrén indítva), majd fordítsd át és süsd további 2-3 percig, amíg a hús átsül, de szaftos marad.",
      "Tálald a lazacfilét a párolt brokkolival és a rizzsel, tálaláskor facsarj rá citromlevet."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["LAZAC", "RIZS", "BROKKOLI"],
    priority: "P2"
  },
  {
    id: "rec-027",
    title: "Lazacos-spenótos durum tészta",
    description: "Serpenyőben pirított lazackockák fokhagymás spenóttal és durum tésztával összeforgatva.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "LAZAC", acceptedForms: ["salmon_fillet"] },
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "SPENÓT", acceptedForms: ["fresh_spinach"] }
    ],
    optionalIngredients: [
      { concept: "TEJFÖL", acceptedForms: ["sour_cream"] }
    ],
    pantryStaples: ["só", "fokhagyma", "olívaolaj"],
    substitutions: {
      "TEJFÖL": {
        context: "sauce_creamer",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Alternative",
        note: "Tejföl helyett görög joghurttal is krémesítheted (a joghurtot kizárólag a tűzről lehúzva keverd hozzá, hogy ne csapódjon ki)."
      }
    },
    quantities: ["250g lazacfilé", "160g durum tészta", "150g friss spenót", "2 evőkanál tejföl", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd ki a durum tésztát sós vízben al dente állagúra (kb. 8-9 perc).",
      "Kockázd fel a lazacfilét 2x2 cm-es darabokra. Süsd át olívaolajon forró serpenyőben 3-4 perc alatt, majd óvatosan vedd ki egy tányérra.",
      "Ugyanebben a serpenyőben futtasd meg a zúzott fokhagymát, dobd rá a friss spenótot és párold 2 percig, amíg összeesik.",
      "Húzd le a serpenyőt a tűzről, fűszerezd sóval, keverd hozzá a tejfölt, majd forgasd össze a kifőtt tésztával és a sült lazackockákkal.",
      "Forrón tálald."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["LAZAC", "TÉSZTA", "SPENÓT"],
    priority: "P3"
  },
  {
    id: "rec-028",
    title: "Sült édesburgonya tál csirkemellel",
    description: "Sütőben karamellizálódott édesburgonya kockák szaftos csirkemellcsíkokkal és friss salátával.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 35,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "ÉDESBURGONYA", acceptedForms: ["sweet_potato"] }
    ],
    mainIngredients: [
      { concept: "SALÁTA", acceptedForms: ["fresh_lettuce"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "CSIRKEMELL": {
        context: "protein_base",
        substituteWithConcept: "PULYKAMELL",
        type: "Direct",
        note: "Csirkemell helyett pulykamellel is 1:1 arányban elkészíthető."
      }
    },
    quantities: ["300g csirkemell", "350g édesburgonya", "4 levél friss saláta"],
    instructions: [
      "Melegítsd elő a sütőt 200°C-ra. Hámozd meg és kockázd fel az édesburgonyát 2 cm-es darabokra.",
      "Forgasd össze olívaolajjal, sóval, borssal, és süsd tepsiben 20-22 percig, amíg megpuhul és szélei pirulnak.",
      "Közben vágd csíkokra a csirkemellet, fűszerezd, és pirítsd meg serpenyőben olívaolajon 6-8 perc alatt.",
      "Tálaláskor rendezd a tépett friss salátát a tányérra, szedd rá a meleg sült édesburgonyát és a pirított csirkemellcsíkokat."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["CSIRKEMELL", "ÉDESBURGONYA"],
    priority: "P2"
  },
  {
    id: "rec-029",
    title: "Fokhagymás-cukkinis durum tészta",
    description: "Gyors serpenyős tészta fokhagymán pirított cukkinikarika alappal.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] },
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] }
    ],
    mainIngredients: [],
    optionalIngredients: [
      { concept: "FETA", acceptedForms: ["feta_cheese"] }
    ],
    pantryStaples: ["fokhagyma", "olívaolaj", "só", "bors"],
    substitutions: {
      "FETA": {
        context: "topping",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Enhancement",
        note: "Feta hiányzik, de tálaláskor 1-1 kanál görög joghurttal is megkoronázhatod a tésztát."
      }
    },
    quantities: ["160g durum tészta", "1 db cukkini", "2 gerezd fokhagyma", "40g feta sajt"],
    instructions: [
      "Főzd ki a tésztát bő sós vízben al dente állagúra (kb. 8-9 perc).",
      "Vágd vékony félkarikákra a cukkinit.",
      "Futtasd meg a zúzott fokhagymát olívaolajon közepes lángon, dobd rá a cukkinit és pirítsd 5-6 percig sóval, borssal, amíg megpirul.",
      "Forgasd össze a kifőtt tésztát a fokhagymás cukkinivel.",
      "Tálaláskor morzsolj rá fetát (vagy kanalazz rá görög joghurtot)."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["TÉSZTA", "CUKKINI"],
    priority: "P1"
  },
  {
    id: "rec-030",
    title: "Paradicsomos-mozzarellás tészta",
    description: "Forró paradicsomszószos durum tészta ráolvadt, nyúlós mozzarellával.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["passata", "fresh_tomato"] },
      { concept: "MOZZARELLA", acceptedForms: ["mozzarella_cheese"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "fokhagyma", "olívaolaj"],
    substitutions: {
      "MOZZARELLA": {
        context: "melting_cheese",
        substituteWithConcept: "TRAPPISTA",
        type: "Direct",
        note: "Mozzarella helyett trappista sajttal is krémesen ráolvasztható (a trappista kevésbé nyúlós, de ízben kiválóan illik a paradicsomhoz)."
      }
    },
    quantities: ["160g durum tészta", "200g passata / 2 db paradicsom", "100g mozzarella", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd ki a tésztát sós vízben al dente állagúra.",
      "Futtasd meg a zúzott fokhagymát olívaolajon, öntsd rá a passatát (vagy felkockázott friss paradicsomot), sózd, és főzd 6-8 percig sűrűre.",
      "Keverd a forró paradicsomszószhoz a leszűrt tésztát és a felkockázott mozzarellát.",
      "Lassú tűzön keverd 1-2 percig, amíg a mozzarella nyúlóssá olvad a tésztán, majd forrón tálald."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["TÉSZTA", "PARADICSOM", "MOZZARELLA"],
    priority: "P1"
  },
  {
    id: "rec-031",
    title: "Sült cukkinis fetatál",
    description: "Sütőben pirított fokhagymás cukkiniszeletek rápirult sós fetasajttal.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] },
      { concept: "FETA", acceptedForms: ["feta_cheese"] }
    ],
    mainIngredients: [],
    optionalIngredients: [],
    pantryStaples: ["olívaolaj", "só", "fokhagyma"],
    substitutions: {
      "FETA": {
        context: "baked_cheese_topping",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Alternative",
        note: "Sült feta helyett a kész sült cukkinire tálaláskor kanalazz hideg fokhagymás görög joghurtot (a joghurt sütőben kicsapódna, ezért utólagos friss feltétként használandó)."
      }
    },
    quantities: ["2 db cukkini", "100g feta sajt", "2 gerezd fokhagyma"],
    instructions: [
      "Melegítsd elő a sütőt 200°C-ra.",
      "Vágd félkarikákra a cukkinit, keverd össze olívaolajjal, zúzott fokhagymával és csipet sóval, majd terítsd tepsire.",
      "Morzsold a fetasajtot a cukkini tetejére.",
      "Süsd 12-15 percig, amíg a cukkini megpuhul és a feta szélei aranybarnára pirulnak.",
      "Melegen tálald."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["CUKKINI", "FETA"],
    priority: "P1"
  },
  {
    id: "rec-032",
    title: "Tükörtojás sült édesburgonyával",
    description: "Sütőben pirult édesburgonya kockák lágy sárgájú tükörtojással és paprikával.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] },
      { concept: "ÉDESBURGONYA", acceptedForms: ["sweet_potato"] }
    ],
    mainIngredients: [],
    optionalIngredients: [
      { concept: "PAPRIKA", acceptedForms: ["bell_pepper"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "ÉDESBURGONYA": {
        context: "carbohydrate_base",
        substituteWithConcept: "BURGONYA",
        type: "Alternative",
        note: "Édesburgonya helyett normál burgonyával is elkészíthető (a burgonyát 3-5 perccel tovább kell sütni)."
      }
    },
    quantities: ["2 db tojás", "350g édesburgonya", "1/2 db paprika"],
    instructions: [
      "Melegítsd elő a sütőt 200°C-ra. Vágd fel az édesburgonyát kb. 1.5-2 cm-es egyenletes kockákra, a paprikát vékony csíkokra.",
      "Forgasd össze olívaolajjal, sóval, borssal, és süsd tepsiben 18-20 percig, amíg ropogósra pirul.",
      "Serpenyőben kevés olívaolajon készíts 2 lágy tükörtojást.",
      "Tálald a forró sült édesburgonyát a tetejére helyezett tükörtojásokkal."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "ÉDESBURGONYA"],
    priority: "P2"
  },
  {
    id: "rec-033",
    title: "Tükörtojás pirított burgonyával",
    description: "Hagymás, pirított serpenyős burgonya klasszikus lágy tükörtojással.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] },
      { concept: "BURGONYA", acceptedForms: ["potato"] }
    ],
    mainIngredients: [
      { concept: "HAGYMA", acceptedForms: ["onion"] }
    ],
    optionalIngredients: [
      { concept: "PAPRIKA", acceptedForms: ["bell_pepper"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {},
    quantities: ["2 db tojás", "400g burgonya", "1/2 fej hagyma", "1/2 db paprika"],
    instructions: [
      "Hámozd meg a burgonyát, kockázd fel apróra, és előfőzd sós vízben 6-8 percig, majd szűrd le.",
      "Pirítsd meg az aprított hagymát olívaolajon serpenyőben, add hozzá az előfőzött burgonyakockákat (és paprikát), majd pirítsd rázogatva 8-10 percig, amíg piros-ropogós lesz.",
      "Süss külön vagy a serpenyő szélén 2 tükörtojást.",
      "Tálald a ropogós hagymás burgonyát a tükörtojásokkal."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "BURGONYA"],
    priority: "P1"
  },
  {
    id: "rec-034",
    title: "Krémes spenótos tészta fokhagymával",
    description: "Tejfölös, fokhagymás spenótmártással összeforgatott durum tészta.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "SPENÓT", acceptedForms: ["fresh_spinach"] },
      { concept: "TEJFÖL", acceptedForms: ["sour_cream"] }
    ],
    optionalIngredients: [
      { concept: "TRAPPISTA", acceptedForms: ["trappista_cheese"] }
    ],
    pantryStaples: ["fokhagyma", "só", "olívaolaj"],
    substitutions: {
      "TEJFÖL": {
        context: "cream_sauce_base",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Alternative",
        note: "Tejföl helyett görög joghurttal is elkészíthető (lehúzva a tűzről keverd hozzá, hogy ne csapódjon ki)."
      }
    },
    quantities: ["160g durum tészta", "150g friss spenót", "3 evőkanál tejföl", "40g trappista sajt", "2 gerezd fokhagyma"],
    instructions: [
      "Főzd ki a tésztát al dente állagúra sós vízben.",
      "Futtasd meg a zúzott fokhagymát olívaolajon serpenyőben, dobd rá a spenótot és párold 2 percig.",
      "Húzd le a serpenyőt a tűzről, keverd hozzá a tejfölt és a sót, hogy krémes mártást kapj.",
      "Forgasd össze a forró kifőtt tésztával.",
      "Tálaláskor szórd meg reszelt trappista sajttal."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["TÉSZTA", "SPENÓT", "TEJFÖL"],
    priority: "P2"
  },
  {
    id: "rec-035",
    title: "Brokkolikrémleves pirított kenyérkockával",
    description: "Selymes brokkolikrémleves ropogós fokhagymás kenyérkockákkal és tejfölös betéttel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "BROKKOLI", acceptedForms: ["fresh_broccoli"] }
    ],
    mainIngredients: [
      { concept: "KENYÉR", acceptedForms: ["bread_slice", "whole_wheat_bread"] }
    ],
    optionalIngredients: [
      { concept: "TEJFÖL", acceptedForms: ["sour_cream"] }
    ],
    pantryStaples: ["fokhagyma", "só", "bors"],
    substitutions: {
      "KENYÉR": {
        context: "crouton_base",
        substituteWithConcept: "PITA",
        type: "Alternative",
        note: "Kenyér helyett felkockázott pirított pitakockákkal is tálalható."
      }
    },
    quantities: ["350g brokkoli", "2 szelet kenyér", "2 evőkanál tejföl", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd a brokkolirózsákat és a zúzott fokhagymát annyi sós forró vízben, ami épp ellepi, kb. 10-12 percig, amíg teljesen megpuhul.",
      "Kockázd fel a kenyeret kis kockákra és száraz serpenyőben pirítsd ropogósra 3-4 perc alatt.",
      "Turmixold össze a főtt brokkolit a főzővízzel selymes krémlevessé, fűszerezd sóval, borssal.",
      "Merőkanállal tálald tányérokba, tegyél a közepére egy kanál tejfölt, és szórd meg a pirított kenyérkockákkal."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["BROKKOLI", "KENYÉR"],
    priority: "P1"
  },
  {
    id: "rec-036",
    title: "Brokkolis-rizses zöldségtál",
    description: "Párolt sárgarépával és brokkolival kevert fűszeres párolt rizs tál.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "RIZS", acceptedForms: ["white_rice", "brown_rice"] }
    ],
    mainIngredients: [
      { concept: "BROKKOLI", acceptedForms: ["fresh_broccoli"] },
      { concept: "RÉPA", acceptedForms: ["carrot"] }
    ],
    optionalIngredients: [
      { concept: "GÖRÖG_JOGHURT", acceptedForms: ["greek_yogurt"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {},
    quantities: ["150g rizs", "200g brokkoli", "1 db sárgarépa", "2 evőkanál görög joghurt"],
    instructions: [
      "Főzd meg a rizst kétszeres sós vízben 15 perc alatt.",
      "Karikázd fel vékonyra a sárgarépát, vágd kis rózsákra a brokkolit, és gőzöld vagy párold sós vízben 5-6 percig, amíg roppanósak lesznek.",
      "Keverd össze a meleg párolt rizst és a párolt zöldségeket kevés olívaolajjal, sóval, borssal.",
      "Tálaláskor kanalazz a tetejére görög joghurtot öntetként."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["RIZS", "BROKKOLI", "RÉPA"],
    priority: "P1"
  }
