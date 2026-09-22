/**
 * Vita-Natura Master Recipe Registry
 * Runtime Canonical Schema: primaryUserConcepts
 * Frozen & QA Certified Datasets: rec-001 to rec-036 (Batch 1, Batch 2 & Batch 3)
 */

const RECIPES = [
  // --- BATCH 1 (rec-001 - rec-012) ---
  {
    id: "rec-001",
    title: "Mediterrán cukkinis rántotta",
    description: "Serpenyőben pirított zsenge cukkinivel és szaftos paradicsommal készült tojásétel.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] }
    ],
    mainIngredients: [
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] },
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato"] }
    ],
    optionalIngredients: [
      { concept: "FETA", acceptedForms: ["feta_cheese"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "FETA": {
        context: "topping",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Enhancement",
        note: "Feta hiányzik, de a görög joghurtoddal tálaláskor krémesítheted a rántottát."
      }
    },
    quantities: ["2 db tojás", "1/2 db cukkini", "1 db paradicsom", "30g feta"],
    instructions: [
      "Kockázd fel a cukkinit és a paradicsomot.",
      "Kevés olívaolajon pirítsd a cukkinit 3-4 percig, majd add hozzá a paradicsomot.",
      "Öntsd rá a felvert, sózott tojásokat, és lassú tűzön süsd szaftosra. Tálaláskor morzsolj rá fetát vagy kanalazz rá görög joghurtot."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "CUKKINI", "PARADICSOM"],
    priority: "P1"
  },
  {
    id: "rec-002",
    title: "Paradicsomos omlett",
    description: "Szaftos és gyors reggeli friss paradicsommal és serpenyőben pirított hagyma alappal.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 10,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato"] }
    ],
    optionalIngredients: [
      { concept: "HAGYMA", acceptedForms: ["onion"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {},
    quantities: ["2 db tojás", "1 db paradicsom", "1/4 fej hagyma"],
    instructions: [
      "Vágd vékony szeletekre a hagymát és a paradicsomot.",
      "Pirítsd a hagymát és a paradicsomot olívaolajon 2-3 percig.",
      "Habard el a tojásokat a fűszerekkel, öntsd a paradicsomra, és fedő alatt süsd készre az omlettet."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "PARADICSOM"],
    priority: "P1"
  },
  {
    id: "rec-003",
    title: "Brokkolis-sajtos frittata",
    description: "Olasz stílusú, tepsiben vagy serpenyőben sült brokkolis tojáslepény sajttal.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] }
    ],
    mainIngredients: [
      { concept: "BROKKOLI", acceptedForms: ["fresh_broccoli"] }
    ],
    optionalIngredients: [
      { concept: "TRAPPISTA", acceptedForms: ["trappista_cheese"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "BROKKOLI": {
        context: "vegetable_base",
        substituteWithConcept: "KARFIOL",
        type: "Direct",
        note: "Brokkoli helyett karfiollal is 1:1 arányban elkészíthető."
      }
    },
    quantities: ["3 db tojás", "100g brokkoli", "40g trappista sajt"],
    instructions: [
      "Szedd apró rózsáira a brokkolit és párold 3 percig sós vízben vagy serpenyőben kevés olajon.",
      "Verd fel a tojásokat fűszerekkel és a reszelt sajttal.",
      "Öntsd a tojáskeveréket a brokkolira és lassú tűzön, fedő alatt süsd szilárdulásig."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "BROKKOLI"],
    priority: "P1"
  },
  {
    id: "rec-004",
    title: "Görög joghurtos zabkása",
    description: "Fehérjedús, krémes meleg zabkása hűsítő görög joghurttal és friss gyümölccsel.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 10,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "ZAB", acceptedForms: ["oats"] },
      { concept: "GÖRÖG_JOGHURT", acceptedForms: ["greek_yogurt"] }
    ],
    mainIngredients: [],
    optionalIngredients: [
      { concept: "ALMA", acceptedForms: ["apple"] },
      { concept: "BANÁN", acceptedForms: ["banana"] }
    ],
    pantryStaples: [],
    substitutions: {},
    quantities: ["50g zabpehely", "150g görög joghurt", "1/2 db alma", "1/2 db banán"],
    instructions: [
      "Főzd meg a zabpelyhet 1.5 dl vízzel 3-4 perc alatt sűrűre.",
      "Húzd le a tűzről, és keverd hozzá a hideg görög joghurtot.",
      "Tálald szeletelt almával vagy banánnal a tetején."
    ],
    affiliateOpportunity: "mogyoróvaj",
    primaryUserConcepts: ["ZAB", "GÖRÖG_JOGHURT"],
    priority: "P1"
  },
  {
    id: "rec-005",
    title: "Almatortás zabkása",
    description: "Meleg, fahéjas sült alma ízét idéző krémes reggeli zabkása.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "ZAB", acceptedForms: ["oats"] }
    ],
    mainIngredients: [
      { concept: "ALMA", acceptedForms: ["apple"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["fahéj"],
    substitutions: {},
    quantities: ["50g zabpehely", "1 db alma", "1/2 kávéskanál fahéj"],
    instructions: [
      "Kockázd fel az almát és dinszteld meg kevés vízzel és fahéjjal egy kis lábasban 3 percig.",
      "Add hozzá a zabpelyhet és 1.5 dl vizet, majd lassú tűzön főzd krémesre 4-5 perc alatt.",
      "Melegen tálald."
    ],
    affiliateOpportunity: "mogyoróvaj",
    primaryUserConcepts: ["ZAB", "ALMA"],
    priority: "P2"
  },
  {
    id: "rec-006",
    title: "Mogyoróvajas banános zabkása",
    description: "Laktató és energiadús reggeli krémes mogyoróvajjal és banánkarikákkal.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 10,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "ZAB", acceptedForms: ["oats"] },
      { concept: "MOGYORÓVAJ", acceptedForms: ["peanut_butter"] }
    ],
    mainIngredients: [
      { concept: "BANÁN", acceptedForms: ["banana"] }
    ],
    optionalIngredients: [],
    pantryStaples: [],
    substitutions: {},
    quantities: ["50g zabpehely", "1 evőkanál mogyoróvaj", "1 db banán"],
    instructions: [
      "Főzd meg a zabpelyhet 1.5 dl vízzel 3-4 perc alatt krémesre.",
      "Keverd bele a mogyoróvajat, amíg el nem olvad a meleg zabkásában.",
      "Karikázd rá a banánt és azonnal tálald."
    ],
    affiliateOpportunity: "mogyoróvaj",
    primaryUserConcepts: ["ZAB", "MOGYORÓVAJ", "BANÁN"],
    priority: "P2"
  },
  {
    id: "rec-007",
    title: "Tükörtojás pirított kenyerén",
    description: "Klasszikus, ropogós kenyérre helyezett lágy tükörtojás friss paradicsommal.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 10,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] },
      { concept: "KENYÉR", acceptedForms: ["bread_slice", "whole_wheat_bread"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato"] }
    ],
    optionalIngredients: [
      { concept: "PAPRIKA", acceptedForms: ["bell_pepper"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "KENYÉR": {
        context: "carbohydrate_base",
        substituteWithConcept: "PITA",
        type: "Alternative",
        note: "Kenyér helyett pitát is megpiríthatsz alapként."
      }
    },
    quantities: ["2 db tojás", "2 szelet kenyér", "1 db paradicsom", "1/2 db paprika"],
    instructions: [
      "Pirítsd meg a kenyérszeleteket pirítóban vagy serpenyőben.",
      "Kevés olívaolajon készíts tükörtojásokat úgy, hogy a sárgája lágy maradjon.",
      "Helyezd a tojásokat a pirítósra és tálald szeletelt paradicsommal meg paprikával."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "KENYÉR", "PARADICSOM"],
    priority: "P1"
  },
  {
    id: "rec-008",
    title: "Avokádós-tojásos melegszendvics",
    description: "Krémes avokádókrémmel és tojással készített ropogós melegszendvics.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 12,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] },
      { concept: "KENYÉR", acceptedForms: ["bread_slice", "whole_wheat_bread"] }
    ],
    mainIngredients: [
      { concept: "AVOKÁDÓ", acceptedForms: ["fresh_avocado"] }
    ],
    optionalIngredients: [
      { concept: "TRAPPISTA", acceptedForms: ["trappista_cheese"] }
    ],
    pantryStaples: ["só", "bors"],
    substitutions: {},
    quantities: ["1 db tojás", "2 szelet kenyér", "1/2 db avokádó", "30g trappista sajt"],
    instructions: [
      "Törd össze az avokádót egy csipet sóval és borssal, majd kend a kenyérszeletekre a reszelt sajttal együtt.",
      "Pirítsd meg a szendvicset melegszendvics-sütőben vagy serpenyőben, amíg a sajt rásül.",
      "Süss külön egy lágy tükörtojást kevés olajon, és tálaláskor csúsztasd a meleg sajtos-avokádós szendvics tetejére."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "KENYÉR", "AVOKÁDÓ"],
    priority: "P2"
  },
  {
    id: "rec-009",
    title: "Spenótos rántotta fetával",
    description: "Fokhagymás friss spenóttal és sós morzsolt fetával készült tojásétel.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 12,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] }
    ],
    mainIngredients: [
      { concept: "SPENÓT", acceptedForms: ["fresh_spinach"] }
    ],
    optionalIngredients: [
      { concept: "FETA", acceptedForms: ["feta_cheese"] }
    ],
    pantryStaples: ["só", "fokhagyma", "olívaolaj"],
    substitutions: {
      "FETA": {
        context: "topping",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Enhancement",
        note: "Feta hiányzik, de görög joghurttal is krémesítheted a spenótos rántottát."
      }
    },
    quantities: ["2 db tojás", "80g friss spenót", "30g feta", "1 gerezd fokhagyma"],
    instructions: [
      "Futtasd meg a zúzott fokhagymát olívaolajon, majd dobd rá a spenótot és párold 2 percig, amíg összeesik.",
      "Öntsd rá a felvert, sózott tojásokat, és kevergesd lassú tűzön.",
      "Húzd le a tűzről és morzsold rá a fetát tálaláskor."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "SPENÓT"],
    priority: "P2"
  },
  {
    id: "rec-010",
    title: "Tejfölös-sajtos melegszendvics",
    description: "Nosztalgikus fokhagymás-tejfölös krémmel és ráolvasztott sajtos réteggel sült kenyér.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 10,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "KENYÉR", acceptedForms: ["bread_slice", "whole_wheat_bread"] }
    ],
    mainIngredients: [
      { concept: "TEJFÖL", acceptedForms: ["sour_cream"] },
      { concept: "TRAPPISTA", acceptedForms: ["trappista_cheese"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "fokhagyma"],
    substitutions: {
      "TEJFÖL": {
        context: "spread_base",
        substituteWithConcept: "GÖRÖG_JOGHURT",
        type: "Alternative",
        note: "Tejföl helyett görög joghurttal is elkészítheted a szendvicskrémet."
      }
    },
    quantities: ["2 szelet kenyér", "2 evőkanál tejföl", "50g trappista sajt", "1 gerezd fokhagyma"],
    instructions: [
      "Keverd össze a tejfölt a zúzott fokhagymával és egy csipet sóval.",
      "Kend vastagon a kenyérszeletekre, majd szórd meg bőségesen reszelt sajttal.",
      "Süsd sütőben vagy melegszendvics-sütőben 5-7 percig, amíg a sajt rásül."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["KENYÉR", "TEJFÖL", "TRAPPISTA"],
    priority: "P3"
  },
  {
    id: "rec-011",
    title: "Paprikás omlett sajttal",
    description: "Ropogós paprikakockákkal és nyúlós olvadt sajttal töltött kiadós omlett.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 12,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] }
    ],
    mainIngredients: [
      { concept: "PAPRIKA", acceptedForms: ["bell_pepper"] }
    ],
    optionalIngredients: [
      { concept: "MOZZARELLA", acceptedForms: ["mozzarella_cheese"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "MOZZARELLA": {
        context: "cheese_filling",
        substituteWithConcept: "TRAPPISTA",
        type: "Direct",
        note: "Mozzarella helyett trappista sajttal is sütheted."
      }
    },
    quantities: ["2 db tojás", "1/2 db paprika", "40g mozzarella"],
    instructions: [
      "Kockázd fel a paprikát és pirítsd olívaolajon 3 percig.",
      "Öntsd rá a fűszerezett, felvert tojást.",
      "Amikor a tojás alja megszilárdult, szórd rá a sajtot, hajtsd félbe az omlettet és süsd még 1 percig."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "PAPRIKA"],
    priority: "P2"
  },
  {
    id: "rec-012",
    title: "Banános zabpalacsinta",
    description: "Hozzáadott liszt és cukor nélküli, zabpehelyből és banánból sütött puha amerikai palacsinta.",
    mealType: "reggeli",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 1,
    requiredCoreIngredients: [
      { concept: "TOJÁS", acceptedForms: ["raw_egg"] },
      { concept: "ZAB", acceptedForms: ["oats"] }
    ],
    mainIngredients: [
      { concept: "BANÁN", acceptedForms: ["banana"] }
    ],
    optionalIngredients: [],
    pantryStaples: [],
    substitutions: {},
    quantities: ["1 db tojás", "40g zabpehely", "1 db érett banán"],
    instructions: [
      "Törd össze a banánt egy villával egy tálban.",
      "Keverd hozzá a tojást és a zabpelyhet homogén tésztává.",
      "Tapadásmentes serpenyőben, szárazon süss belőle kis méretű palacsintákat (2-2 perc mindkét oldalukon)."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TOJÁS", "ZAB", "BANÁN"],
    priority: "P1"
  },

  // --- BATCH 2 (rec-013 - rec-024) ---
  {
    id: "rec-013",
    title: "Paradicsomos csirkemell rizzsel",
    description: "Szaftos, paradicsomos szószban párolt csirkemellcsíkok pergős főtt rizs körettel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 30,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "RIZS", acceptedForms: ["white_rice", "brown_rice", "basmati_rice"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato", "passata"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "olívaolaj", "hagyma"],
    substitutions: {
      "CSIRKEMELL": {
        context: "protein_base",
        substituteWithConcept: "PULYKAMELL",
        type: "Direct",
        note: "Csirkemell helyett pulykamellel is 1:1 arányban elkészíthető."
      }
    },
    quantities: ["300g csirkemell", "150g rizs", "200g paradicsompüré / 2 db friss paradicsom", "1/2 fej hagyma"],
    instructions: [
      "Főzd meg a rizst kétszeres mennyiségű sós vízben 15-20 perc alatt.",
      "Kockázd fel a csirkemellet és vágd apróra a hagymát.",
      "Pirítsd meg a hagymát olívaolajon, add hozzá a csirkemellet és fehéredésig pirítsd 4-5 percig.",
      "Öntsd rá a paradicsomot (vagy passátát), fűszerezd sóval, borssal, és lassú tűzön rotyogtasd 10-12 percig, amíg a szósz besűrűsödik.",
      "A paradicsomos csirkét a meleg rizzsel tálald."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["CSIRKEMELL", "RIZS", "PARADICSOM"],
    priority: "P1"
  },
  {
    id: "rec-014",
    title: "Cukkinis-tejszínes csirkemell rizzsel",
    description: "Krémes, joghurtos szaftban sült cukkini és csirkemellcsíkok párolt rizzsel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 30,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "RIZS", acceptedForms: ["white_rice", "basmati_rice"] }
    ],
    mainIngredients: [
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] }
    ],
    optionalIngredients: [
      { concept: "GÖRÖG_JOGHURT", acceptedForms: ["greek_yogurt"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "CSIRKEMELL": {
        context: "protein_base",
        substituteWithConcept: "PULYKAMELL",
        type: "Direct",
        note: "Csirkemell helyett pulykamellel is elkészíthető."
      }
    },
    quantities: ["300g csirkemell", "150g rizs", "1 db cukkini", "100g görög joghurt"],
    instructions: [
      "Főzd meg a rizst sós vízben kíméletesen 15 perc alatt.",
      "Vágd csíkokra a csirkemellet és félkarikákra a cukkinit.",
      "Pirítsd meg a csirkemellet olívaolajon 5 perc alatt, majd dobd rá a cukkinit és pirítsd további 4-5 percig.",
      "Húzd le a serpenyőt a tűzről, fűszerezd sóval, borssal, majd keverd hozzá a görög joghurtot a krémes, tejszínes jellegű szaftért (hőkezelés nélkül, a tűzről lehúzva, hogy ne csapódjon ki).",
      "Tálald a szaftos cukkinis csirkét a párolt rizzsel."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["CSIRKEMELL", "CUKKINI", "RIZS"],
    priority: "P1"
  },
  {
    id: "rec-015",
    title: "Fokhagymás csirkemell sült burgonyával",
    description: "Ropogós tepsis burgonyacikkek fokhagymás, serpenyőben pirult csirkemell falatokkal.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 35,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "BURGONYA", acceptedForms: ["potato"] }
    ],
    mainIngredients: [
      { concept: "HAGYMA", acceptedForms: ["onion"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "fokhagyma", "olívaolaj"],
    substitutions: {
      "BURGONYA": {
        context: "carbohydrate_base",
        substituteWithConcept: "ÉDESBURGONYA",
        type: "Alternative",
        note: "Burgonya helyett édesburgonyával is süthető (édesebb, puhább állagot ad)."
      }
    },
    quantities: ["300g csirkemell", "400g burgonya", "1 fej hagyma", "2 gerezd fokhagyma"],
    instructions: [
      "Melegítsd elő a sütőt 200°C-ra. Hámozd meg és vágd cikkekre a burgonyát.",
      "Forgasd össze a burgonyát olívaolajjal, sóval, borssal, és süsd tepsiben 25-30 percig, amíg ropogós aranybarna nem lesz.",
      "Vágd kockákra a csirkemellet és szeleteld fel a hagymát.",
      "Süss csirkét és hagymát serpenyőben 6-8 percig, a végén add hozzá a zúzott fokhagymát 1 percre, hogy meg ne égjen.",
      "Frissen tálald a fokhagymás csirkét a meleg tepsis burgonyával."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["CSIRKEMELL", "BURGONYA"],
    priority: "P1"
  },
  {
    id: "rec-016",
    title: "Gyors csirkés-zöldséges tortilla wrap",
    description: "Serpenyős fűszeres csirkemellcsíkok friss salátával és paradicsommal tortillába tekerve.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "TORTILLA", acceptedForms: ["tortilla_wrap", "tortilla_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "SALÁTA", acceptedForms: ["fresh_lettuce"] },
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "TORTILLA": {
        context: "bread_wrap_base",
        substituteWithConcept: "PITA",
        type: "Alternative",
        note: "Tortilla helyett pitába töltve is elkészíthető."
      }
    },
    quantities: ["250g csirkemell", "2 db tortilla wrap", "4 levél saláta", "1 db paradicsom"],
    instructions: [
      "Vágd vékony csíkokra a csirkemellet, fűszerezd sóval, borssal, és pirítsd meg olívaolajon 6-7 perc alatt.",
      "Mosd meg és csíkozd fel a salátát meg a paradicsomot.",
      "Melegítsd át a tortilla lapokat száraz serpenyőben 15-20 másodpercig oldalanként.",
      "Halmozd a salátát, paradicsomot és a sült csíkokat a tortillák közepére, majd tekerd fel szorosan.",
      "Félbevágva tálald."
    ],
    affiliateOpportunity: "tortilla",
    primaryUserConcepts: ["CSIRKEMELL", "TORTILLA", "SALÁTA"],
    priority: "P1"
  },
  {
    id: "rec-017",
    title: "Brokkolis csirkemell bulgurral",
    description: "Párolt roppanós brokkoli és fűszeres csirke szaftos bulgur körettel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "BULGUR", acceptedForms: ["bulgur_grain"] }
    ],
    mainIngredients: [
      { concept: "BROKKOLI", acceptedForms: ["fresh_broccoli"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "BULGUR": {
        context: "carbohydrate_side",
        substituteWithConcept: "RIZS",
        type: "Direct",
        note: "Bulgur helyett rizzsel is 1:1 arányban elkészíthető köretként."
      }
    },
    quantities: ["300g csirkemell", "150g bulgur", "200g brokkoli"],
    instructions: [
      "Öntsd le a bulgurt kétszeres mennyiségű forró sós vízzel, fedd le, és hagyd állni 15 percig, amíg megpuhul.",
      "Szedd rózsáira a brokkolit és párold kevés sós vízben 4-5 percig, amíg még roppanós marad.",
      "Kockázd fel a csirkemellet, fűszerezd sóval, borssal, és pirítsd meg olívaolajon 6-8 perc alatt.",
      "Keverd össze a pirított csirkét, a párolt brokkolit és a megduzzadt bulgurt egy serpenyőben 1 perc alatt.",
      "Melegen tálald."
    ],
    affiliateOpportunity: "bulgur",
    primaryUserConcepts: ["CSIRKEMELL", "BULGUR", "BROKKOLI"],
    priority: "P2"
  },
  {
    id: "rec-018",
    title: "Teriyaki jellegű mogyoróvajas csirke rizzsel",
    description: "Mogyoróvajas, szaftos csirkemellfalatok párolt sárgarépával és meleg rizzsel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 25,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "CSIRKEMELL", acceptedForms: ["chicken_breast"] },
      { concept: "RIZS", acceptedForms: ["white_rice", "basmati_rice"] }
    ],
    mainIngredients: [
      { concept: "MOGYORÓVAJ", acceptedForms: ["peanut_butter"] }
    ],
    optionalIngredients: [
      { concept: "RÉPA", acceptedForms: ["carrot"] }
    ],
    pantryStaples: ["só", "fokhagyma", "olívaolaj"],
    substitutions: {
      "CSIRKEMELL": {
        context: "protein_base",
        substituteWithConcept: "PULYKAMELL",
        type: "Direct",
        note: "Csirkemell helyett pulykamellel is elkészíthető."
      }
    },
    quantities: ["300g csirkemell", "150g rizs", "2 evőkanál mogyoróvaj", "1 db sárgarépa", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd meg a rizst sós vízben 15 perc alatt.",
      "Vágd vékony csíkokra a sárgarépát és kockákra a csirkemellet.",
      "Pirítsd meg a csirkét olívaolajon 5 percig, add hozzá a répaszalagokat és a zúzott fokhagymát még 2 percre.",
      "Keverd ki a mogyoróvajat 0.5 dl meleg vízzel és egy csipet sóval híg szafttá, majd öntsd a serpenyőbe a csirkére.",
      "Kevergesd lassú tűzön 2 percig, amíg a szaft bevonja a húst, majd tálald a rizzsel."
    ],
    affiliateOpportunity: "mogyoróvaj",
    primaryUserConcepts: ["CSIRKEMELL", "RIZS", "MOGYORÓVAJ"],
    priority: "P2"
  },
  {
    id: "rec-019",
    title: "Darált húsos tepsis burgonya",
    description: "Fűszeres darált hússal és paradicsommal rétegezett, sütőben sült burgonyatál.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 40,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "DARÁLT_HÚS", acceptedForms: ["minced_meat", "minced_pork", "minced_turkey"] },
      { concept: "BURGONYA", acceptedForms: ["potato"] }
    ],
    mainIngredients: [
      { concept: "HAGYMA", acceptedForms: ["onion"] },
      { concept: "PARADICSOM", acceptedForms: ["passata", "fresh_tomato"] }
    ],
    optionalIngredients: [
      { concept: "TEJFÖL", acceptedForms: ["sour_cream"] }
    ],
    pantryStaples: ["só", "bors", "fokhagyma", "olívaolaj"],
    substitutions: {},
    quantities: ["300g darált hús", "400g burgonya", "1 fej hagyma", "150g paradicsompüré / passata", "2 evőkanál tejföl", "1 gerezd fokhagyma"],
    instructions: [
      "Hámozd meg a burgonyát, vágd vékony karikákra, és főzd elő sós vízben 8 percig (ne essen szét).",
      "Pirítsd meg az aprított hagymát olívaolajon, add hozzá a darált húst, és pirítsd 6-8 percig.",
      "Add a húshoz a paradicsomot, fokhagymát, sót, borsot, és rotyogtasd 5 percig.",
      "Egy kis tepsibe rétegezd a burgonyakarikákat és a szaftos darált húst.",
      "Ha használsz tejfölt, kend a tetejére, majd süsd 190°C-os sütőben 15-20 percig, amíg átsül."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["DARÁLT_HÚS", "BURGONYA"],
    priority: "P1"
  },
  {
    id: "rec-020",
    title: "Bolognese jellegű darált húsos tészta",
    description: "Klasszikus paradicsomos-húsos ragu durum tésztával tálalva.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 30,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "DARÁLT_HÚS", acceptedForms: ["minced_meat", "minced_pork"] },
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["passata", "fresh_tomato"] }
    ],
    optionalIngredients: [
      { concept: "TRAPPISTA", acceptedForms: ["trappista_cheese"] }
    ],
    pantryStaples: ["só", "bors", "fokhagyma", "olívaolaj"],
    substitutions: {
      "TÉSZTA": {
        context: "carbohydrate_base",
        substituteWithConcept: "BULGUR",
        type: "Alternative",
        note: "Tészta helyett bulgurra szedve is finom ragus tálat kapsz."
      }
    },
    quantities: ["300g darált hús", "160g durum tészta", "200g paradicsompüré / passata", "40g trappista sajt", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd kifőtt tésztát bő, sós, forró vízben a csomagolási idő szerint (kb. 8-10 perc).",
      "Pirítsd meg a darált húst kevés olívaolajon 6-8 percig, amíg megbarnul.",
      "Öntsd rá a paradicsomot/passatát, fűszerezd sóval, borssal, zúzott fokhagymával, és főzd kis lángon 10-12 percig.",
      "Keverd össze a kifőtt tésztát a szaftos raguval.",
      "Tálaláskor szórd meg reszelt trappista sajttal."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["DARÁLT_HÚS", "TÉSZTA", "PARADICSOM"],
    priority: "P1"
  },
  {
    id: "rec-021",
    title: "Darált húsos-cukkinis tál bulgurral",
    description: "Cukkinivel együtt pirított fűszeres darált hús pergős bulgur körettel.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 30,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "DARÁLT_HÚS", acceptedForms: ["minced_meat", "minced_turkey"] },
      { concept: "BULGUR", acceptedForms: ["bulgur_grain"] }
    ],
    mainIngredients: [
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {
      "BULGUR": {
        context: "carbohydrate_side",
        substituteWithConcept: "RIZS",
        type: "Direct",
        note: "Bulgur helyett rizzsel is 1:1 arányban elkészíthető."
      }
    },
    quantities: ["300g darált hús", "150g bulgur", "1 db cukkini"],
    instructions: [
      "Forrázd le a bulgurt kétszeres mennyiségű sós vízzel, takard le, és hagyd állni 15 percig.",
      "Kockázd apróra a cukkinit.",
      "Pirítsd meg a darált húst olívaolajon 6 perc alatt, majd add hozzá a cukkinit és pirítsd még 5 percig sóval, borssal.",
      "Keverd a cukkinis darált húst a puha bulgurhoz.",
      "Melegen tálald."
    ],
    affiliateOpportunity: "bulgur",
    primaryUserConcepts: ["DARÁLT_HÚS", "BULGUR", "CUKKINI"],
    priority: "P2"
  },
  {
    id: "rec-022",
    title: "Avokádós tonhalsaláta",
    description: "Tápláló, krémes avokádóból és halfiléből vagy konzervből készült gyors friss saláta.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 15,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TONHAL", acceptedForms: ["canned_tuna", "tuna_fillet", "tuna_steak"] },
      { concept: "AVOKÁDÓ", acceptedForms: ["fresh_avocado"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["fresh_tomato", "cherry_tomato"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "bors", "citrom"],
    substitutions: {},
    quantities: ["160g tonhal (1 konzerv vagy készre sütött/főtt tonhalfilé)", "1 db érett avokádó", "2 db paradicsom", "1 evőkanál citromlé"],
    instructions: [
      "Ha konzerv tonhalat használsz, csepegtesd le alaposan. Ha friss tonhalfilét vagy tonhal steaket használsz, kockázd fel, serpenyőben kevés olívaolajon süsd át 3-4 perc alatt, hagyd langyosra hűlni, majd úgy forgasd a salátához.",
      "Kockázd fel az avokádót és a paradicsomot.",
      "Keverd össze a tonhalat, avokádót és paradicsomot egy tálban.",
      "Locsold meg citromlével, fűszerezd sóval, borssal, és óvatosan forgasd össze.",
      "Azonnal tálald."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TONHAL", "AVOKÁDÓ"],
    priority: "P1"
  },
  {
    id: "rec-023",
    title: "Serpenyős tonhal steak párolt cukkínivel",
    description: "Kívül pörzsös, belül szaftos nemes tonhal steak hirtelen pirított cukkini szeletekkel.",
    mealType: "vacsora",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TONHAL", acceptedForms: ["tuna_steak"] }
    ],
    mainIngredients: [
      { concept: "CUKKINI", acceptedForms: ["fresh_zucchini"] }
    ],
    optionalIngredients: [
      { concept: "CITROM", acceptedForms: ["fresh_lemon", "lemon_juice"] }
    ],
    pantryStaples: ["só", "bors", "olívaolaj"],
    substitutions: {},
    quantities: ["2 db tonhal steak (kb. 300g)", "1 db cukkini", "1/2 db citrom"],
    instructions: [
      "Szeleteld fels a cukkinit karikákra. Forró serpenyőben, kevés olívaolajon pirítsd 2-3 percig oldalanként sóval, borssal, hogy roppanós maradjon.",
      "Itasd szárazra a tonhal steakeket papírtörlővel, majd sózd és borsozd mindkét oldalát.",
      "Nagyon forró serpenyőben, kevés olívaolajon süsd a tonhal steakeket pontosan 2-2.5 percig oldalanként (ne süsd túl, hogy szaftos maradjon a közepe).",
      "Helyezd a tonhal steaket a pirított cukkinire, és facsarj rá friss citromlevet tálaláskor."
    ],
    affiliateOpportunity: null,
    primaryUserConcepts: ["TONHAL", "CUKKINI"],
    priority: "P1"
  },
  {
    id: "rec-024",
    title: "Tonhalas-paradicsomos durum tészta",
    description: "Gyors mediterrán tészta lecsöpögtetett tonhalkonzervvel és szaftos paradicsomszósszal.",
    mealType: "ebed",
    complexity: "egyszerű",
    prepTime: 20,
    servings: 2,
    requiredCoreIngredients: [
      { concept: "TONHAL", acceptedForms: ["canned_tuna"] },
      { concept: "TÉSZTA", acceptedForms: ["pasta_durum", "pasta_wholegrain"] }
    ],
    mainIngredients: [
      { concept: "PARADICSOM", acceptedForms: ["passata", "fresh_tomato"] }
    ],
    optionalIngredients: [],
    pantryStaples: ["só", "fokhagyma", "olívaolaj"],
    substitutions: {
      "TÉSZTA": {
        context: "carbohydrate_base",
        substituteWithConcept: "BULGUR",
        type: "Alternative",
        note: "Tészta helyett bulgur alapra szedve is kiváló."
      }
    },
    quantities: ["160g tonhalkonzerv", "160g durum tészta", "200g paradicsompüré / passata", "1 gerezd fokhagyma"],
    instructions: [
      "Főzd kifőtt tésztát sós vízben al dente állagúra (kb. 8-9 perc).",
      "Futtasd meg a zúzott fokhagymát olívaolajon, öntsd rá a paradicsomot/passatát, fűszerezd sóval, és rotyogtasd 5 percig.",
      "Add a szószhoz az alaposan lecsöpögtetett tonhalkonzervet, és óvatosan keverd át, hogy a hal darabos maradjon (1 percig melegítsd).",
      "Forgasd össze a főtt tésztát a tonhalas paradicsomszósszal.",
      "Frissen, forrón tálald."
    ],
    affiliateOpportunity: "tészta",
    primaryUserConcepts: ["TONHAL", "TÉSZTA", "PARADICSOM"],
    priority: "P1"
  },

  // --- BATCH 3 (rec-025 - rec-036) ---
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
];
