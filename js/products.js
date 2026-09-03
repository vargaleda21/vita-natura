import { 
  GOALS, 
  PRODUCT_CATEGORIES, 
  RECOMMENDATION_ROLES, 
  CONTENT_STATUS, 
  DIET_TYPES, 
  ALLERGENS, 
  AVOIDANCE_FACTORS, 
  LIFESTYLE_TAGS, 
  USAGE_TIME 
} from './taxonomy.js';

export const VITA_PRODUCTS = [
  {
    id: "prod-demo-magnesium",
    name: "Bioaktív Magnézium-Biszglicinát",
    shortDescription: "Kímélő szerves magnézium az esti leállási rituálé és a pihentető alvás támogatására.",
    description: "Szerves kötelékű magnézium-forma, amely kiválóan beilleszthető a mindennapi esti lelassulási rutinba és az aktív napok utáni feltöltődésbe.",
    category: PRODUCT_CATEGORIES.MINERAL,
    subcategory: "Szerves ásványi sók",
    goals: [GOALS.SLEEP, GOALS.RECOVERY, GOALS.ENERGY],
    rolesByGoal: {
      [GOALS.SLEEP]: RECOMMENDATION_ROLES.PRIMARY_SUPPORT,
      [GOALS.RECOVERY]: RECOMMENDATION_ROLES.PRIMARY_SUPPORT,
      [GOALS.ENERGY]: RECOMMENDATION_ROLES.COMPLEMENTARY
    },
    lifestyleTags: [LIFESTYLE_TAGS.HIGH_STRESS, LIFESTYLE_TAGS.ATHLETE],
    dietCompatible: [DIET_TYPES.OMNIVORE, DIET_TYPES.VEGETARIAN, DIET_TYPES.VEGAN, DIET_TYPES.PLANT_FORWARD],
    ingredients: [{ id: "magnesium_bisglycinate", name: "Magnézium-biszglicinát", amount: "200mg" }],
    allergens: [],
    avoidFactors: [AVOIDANCE_FACTORS.SYNTHETIC_ADDITIVES],
    usage: USAGE_TIME.EVENING,
    format: "kapszula",
    image: "assets/demo-magnesium.jpg",
    price: 4990,
    currency: "HUF",
    demo: true,
    affiliateUrl: null,
    shopUrl: null,
    bundleEligible: true,
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "prod-demo-bcomplex",
    name: "Bioaktív B-Komplex",
    shortDescription: "Bioaktív B-vitaminok a kiegyensúlyozott napi energiaszintért.",
    description: "Megfelelő felszívódású B-vitaminok gyűjteménye a napi frissesség támogatására.",
    category: PRODUCT_CATEGORIES.VITAMIN,
    subcategory: "B-Komplex",
    goals: [GOALS.ENERGY, GOALS.FOCUS, GOALS.GENERAL_VITALITY],
    rolesByGoal: {
      [GOALS.ENERGY]: RECOMMENDATION_ROLES.PRIMARY_SUPPORT,
      [GOALS.FOCUS]: RECOMMENDATION_ROLES.COMPLEMENTARY,
      [GOALS.GENERAL_VITALITY]: RECOMMENDATION_ROLES.PRIMARY_SUPPORT
    },
    lifestyleTags: [LIFESTYLE_TAGS.SEDENTARY, LIFESTYLE_TAGS.HIGH_STRESS],
    dietCompatible: [DIET_TYPES.OMNIVORE, DIET_TYPES.VEGETARIAN, DIET_TYPES.VEGAN, DIET_TYPES.PLANT_FORWARD],
    ingredients: [{ id: "b_vitamins", name: "B-vitamin komplex", amount: "100%" }],
    allergens: [],
    avoidFactors: [AVOIDANCE_FACTORS.CAFFEINE],
    usage: USAGE_TIME.MORNING,
    format: "kapszula",
    image: "assets/demo-bcomplex.jpg",
    price: 4290,
    currency: "HUF",
    demo: true,
    affiliateUrl: null,
    shopUrl: null,
    bundleEligible: true,
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "prod-demo-omega3",
    name: "Mélytengeri Omega-3 Halolaj",
    shortDescription: "Tisztított halolaj a kognitív fókusz és a mindennapi egyensúly támogatására.",
    description: "Mélytengeri halolaj magas EPA és DHA tartalommal a szellemi frissességért.",
    category: PRODUCT_CATEGORIES.OMEGA,
    subcategory: "Zsírsavak",
    goals: [GOALS.FOCUS, GOALS.GENERAL_VITALITY, GOALS.BEAUTY],
    rolesByGoal: {
      [GOALS.FOCUS]: RECOMMENDATION_ROLES.PRIMARY_SUPPORT,
      [GOALS.GENERAL_VITALITY]: RECOMMENDATION_ROLES.COMPLEMENTARY
    },
    lifestyleTags: [LIFESTYLE_TAGS.SEDENTARY],
    dietCompatible: [DIET_TYPES.OMNIVORE],
    ingredients: [{ id: "fish_oil", name: "Halolaj", amount: "1000mg" }],
    allergens: [ALLERGENS.FISH],
    avoidFactors: [],
    usage: USAGE_TIME.WITH_MEAL,
    format: "lágykapszula",
    image: "assets/demo-omega3.jpg",
    price: 5490,
    currency: "HUF",
    demo: true,
    affiliateUrl: null,
    shopUrl: null,
    bundleEligible: true,
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "prod-demo-herbal-sleep",
    name: "Esti Citromfű & Levendula Infúzió",
    shortDescription: "Gyógynövény teakeverék a képernyőmentes esti leállási rituáléhoz.",
    description: "Kézzel válogatott mezei gyógynövények az esti lassulás támogatására.",
    category: PRODUCT_CATEGORIES.HERBAL_TEA,
    subcategory: "Gyógytea",
    goals: [GOALS.SLEEP, GOALS.GENERAL_VITALITY],
    rolesByGoal: {
      [GOALS.SLEEP]: RECOMMENDATION_ROLES.COMPLEMENTARY,
      [GOALS.GENERAL_VITALITY]: RECOMMENDATION_ROLES.OPTIONAL
    },
    lifestyleTags: [LIFESTYLE_TAGS.HIGH_STRESS],
    dietCompatible: [DIET_TYPES.OMNIVORE, DIET_TYPES.VEGETARIAN, DIET_TYPES.VEGAN, DIET_TYPES.PLANT_FORWARD],
    ingredients: [{ id: "lemon_balm", name: "Citromfű, levendula", amount: "50g" }],
    allergens: [],
    avoidFactors: [],
    usage: USAGE_TIME.EVENING,
    format: "teakeverék",
    image: "assets/demo-tea.jpg",
    price: 2990,
    currency: "HUF",
    demo: true,
    affiliateUrl: null,
    shopUrl: null,
    bundleEligible: true,
    status: CONTENT_STATUS.ACTIVE
  }
];

export const VITA_BUNDLES = [
  {
    id: "bundle-demo-energy",
    name: "Vita-Natura Életerő Szett",
    primaryGoal: GOALS.ENERGY,
    description: "Összehangolt napindító rutin a kiegyensúlyozott hétköznapokért.",
    items: [
      { productId: "prod-demo-bcomplex", role: RECOMMENDATION_ROLES.PRIMARY_SUPPORT, priority: 1 },
      { productId: "prod-demo-magnesium", role: RECOMMENDATION_ROLES.COMPLEMENTARY, priority: 2 }
    ],
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "bundle-demo-sleep",
    name: "Vita-Natura Esti Pihenés Szett",
    primaryGoal: GOALS.SLEEP,
    description: "Kímélő szett a szervezet esti leállási rituáléjának támogatására.",
    items: [
      { productId: "prod-demo-magnesium", role: RECOMMENDATION_ROLES.PRIMARY_SUPPORT, priority: 1 },
      { productId: "prod-demo-herbal-sleep", role: RECOMMENDATION_ROLES.COMPLEMENTARY, priority: 2 }
    ],
    status: CONTENT_STATUS.ACTIVE
  }
];
