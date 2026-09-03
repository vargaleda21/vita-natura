import { GOALS, LIFESTYLE_TAGS, DIET_TYPES, ALLERGENS, AVOIDANCE_FACTORS } from './taxonomy.js';

export const userProfile = {
  primaryGoal: null,
  secondaryGoals: [],
  lifestyleContext: [],
  dietType: null,
  supportPreference: null,
  complexity: null,
  avoidIngredients: [],
  avoidFactors: [],
  avoidAllergens: [],
  productOpenness: null,
  completedAt: null,
  isComplete: false
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    key: "primaryGoal",
    type: "single",
    title: "Mire szeretnél most nagyobb figyelmet fordítani?",
    subtitle: "Válassz egy elsődleges területet, amely most a legfontosabb számodra.",
    options: [
      { label: "Több energia és vitalitás", value: GOALS.ENERGY },
      { label: "Pihentetőbb alvás és esti leállás", value: GOALS.SLEEP },
      { label: "Mentális fókusz és koncentráció", value: GOALS.FOCUS },
      { label: "Emésztési komfortérzet", value: GOALS.DIGESTION },
      { label: "Bőr, haj és természetes ragyogás", value: GOALS.BEAUTY },
      { label: "Aktív életerő és regeneráció", value: GOALS.RECOVERY },
      { label: "Női jóllét támogatása", value: GOALS.WOMEN },
      { label: "Általános vitalitás és jó közérzet", value: GOALS.GENERAL_VITALITY }
    ]
  },
  {
    id: 2,
    key: "secondaryGoals",
    type: "single_optional",
    title: "Van olyan kiegészítő terület, amit szívesen összekötnél ezzel?",
    subtitle: "Nem kötelező választani. Ha szeretnél, megjelölhetsz egy másodlagos szempontot.",
    options: [
      { label: "Több energia", value: GOALS.ENERGY },
      { label: "Pihentetőbb alvás", value: GOALS.SLEEP },
      { label: "Mentális fókusz", value: GOALS.FOCUS },
      { label: "Emésztési komfort", value: GOALS.DIGESTION },
      { label: "Bőr és haj szépsége", value: GOALS.BEAUTY },
      { label: "Regeneráció", value: GOALS.RECOVERY },
      { label: "Nincs másodlagos cél (Kihagyás)", value: null }
    ]
  },
  {
    id: 3,
    key: "lifestyleContext",
    type: "multi_max2",
    title: "Milyen most a mindennapi ritmusod?",
    subtitle: "Ez segít, hogy a javasolt szokások reálisan illeszkedjenek a napjaidhoz. (Max 2 választható)",
    options: [
      { label: "Többnyire ülőmunka, kevesebb mozgással", value: LIFESTYLE_TAGS.SEDENTARY },
      { label: "Intenzív, leterhelt vagy stresszes hétköznapok", value: LIFESTYLE_TAGS.HIGH_STRESS },
      { label: "Változó napirend, kiszámíthatatlan idősávok", value: LIFESTYLE_TAGS.IRREGULAR_SCHEDULE },
      { label: "Rendszeresen mozgok, aktív életet élek", value: LIFESTYLE_TAGS.ACTIVE },
      { label: "Rendszeres sportoló / Intenzív edzések", value: LIFESTYLE_TAGS.ATHLETE }
    ]
  },
  {
    id: 4,
    key: "supportPreference",
    type: "single",
    title: "Mivel szeretnéd leginkább támogatni a célodat?",
    subtitle: "Kiválaszthatod a számodra leginkább szimpatikus formát.",
    options: [
      { label: "Elsősorban ételekkel és konyhai alapanyagokkal", value: "food" },
      { label: "Egyszerű napi szokásokkal és rituálékkal", value: "habits" },
      { label: "Célzott funkcionális kiegészítőkkel is", value: "supplements" },
      { label: "Nyitott vagyok mindhárom megközelítésre", value: "all" },
      { label: "Egyelőre csak tájékozódnék", value: "info" }
    ]
  },
  {
    id: 5,
    key: "dietType",
    type: "single",
    title: "Milyen étrendet követsz a mindennapokban?",
    subtitle: "A javasolt receptek és termékek ehhez igazodnak.",
    options: [
      { label: "Vegyes étrend", value: DIET_TYPES.OMNIVORE },
      { label: "Növényi hangsúlyos étrend", value: DIET_TYPES.PLANT_FORWARD },
      { label: "Vegetáriánus", value: DIET_TYPES.VEGETARIAN },
      { label: "Vegán", value: DIET_TYPES.VEGAN }
    ]
  },
  {
    id: 6,
    key: "exclusions",
    type: "multi_exclusions",
    title: "Van olyan összetevő vagy tényező, amit kerülni szeretnél?",
    subtitle: "Jelöld meg, amit elkerülnél. Ha nincs ilyen, lépj tovább.",
    options: [
      { label: "Laktóz / Tejcukor", group: "factors", value: AVOIDANCE_FACTORS.LACTOSE },
      { label: "Tejfehérje", group: "allergens", value: ALLERGENS.MILK_PROTEIN },
      { label: "Glutén", group: "allergens", value: ALLERGENS.GLUTEN },
      { label: "Koffein / Stimulánsok", group: "factors", value: AVOIDANCE_FACTORS.CAFFEINE },
      { label: "Hozzáadott cukor", group: "factors", value: AVOIDANCE_FACTORS.ADDED_SUGAR },
      { label: "Mesterséges édesítők", group: "factors", value: AVOIDANCE_FACTORS.ARTIFICIAL_SWEETENERS }
    ]
  },
  {
    id: 7,
    key: "complexity",
    type: "single",
    title: "Mennyire legyen egyszerű a személyes rutinod?",
    subtitle: "A javasolt lépések és elemek száma ehhez igazodik.",
    options: [
      { label: "Minél egyszerűbb, annál jobb (1–2 lépés)", value: "simple" },
      { label: "Szeretek részletesebben foglalkozni a rutinommal", value: "detailed" }
    ]
  },
  {
    id: 8,
    key: "productOpenness",
    type: "single",
    title: "Szeretnéd, hogy az útmutatód konkrét termékötleteket is tartalmazzon?",
    subtitle: "A döntés a tiéd. A Vita-Natura elsősorban életmódbeli útmutató.",
    options: [
      { label: "Igen, mutasd meg a releváns termékeket és a szettet", value: "yes" },
      { label: "Igen, de csak 1-2 legfontosabb kiegészítőt", value: "few" },
      { label: "Köszönöm, most csak táplálkozási és életmódbeli tippeket kérek", value: "lifestyle_only" }
    ]
  }
];

export function saveProfileToStorage(profile) {
  try {
    localStorage.setItem("vitanatura_user_profile_v1", JSON.stringify(profile));
  } catch (e) {
    console.warn("LocalStorage mentés sikertelen:", e);
  }
}

export function loadProfileFromStorage() {
  try {
    const data = localStorage.getItem("vitanatura_user_profile_v1");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}
