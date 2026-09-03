/**
 * VITA-NATURA KÖZPONTI TAXONÓMIA
 * Típusbiztos, immutable konstansok
 */

export const CONTENT_STATUS = Object.freeze({
  DRAFT: "draft",
  ACTIVE: "active",
  HIDDEN: "hidden"
});

export const GOALS = Object.freeze({
  ENERGY: "energy",
  SLEEP: "sleep",
  FOCUS: "focus",
  DIGESTION: "digestion",
  BEAUTY: "beauty",
  RECOVERY: "recovery",
  WOMEN: "women",
  GENERAL_VITALITY: "general_vitality"
});

export const LIFESTYLE_TAGS = Object.freeze({
  SEDENTARY: "sedentary",
  ACTIVE: "active",
  HIGH_STRESS: "high_stress",
  IRREGULAR_SCHEDULE: "irregular_schedule",
  ATHLETE: "athlete"
});

export const DIET_TYPES = Object.freeze({
  OMNIVORE: "omnivore",
  VEGETARIAN: "vegetarian",
  VEGAN: "vegan",
  PLANT_FORWARD: "plant_forward",
  SPECIAL: "special"
});

export const PRODUCT_CATEGORIES = Object.freeze({
  VITAMIN: "vitamin",
  MINERAL: "mineral",
  HERBAL_TEA: "herbal_tea",
  FUNCTIONAL_FOOD: "functional_food",
  ADAPTOGEN: "adaptogen",
  OMEGA: "omega",
  PROTEIN: "protein",
  WELLNESS: "wellness"
});

export const RECOMMENDATION_ROLES = Object.freeze({
  PRIMARY_SUPPORT: "primary_support",
  COMPLEMENTARY: "complementary",
  OPTIONAL: "optional"
});

export const ALLERGENS = Object.freeze({
  MILK_PROTEIN: "milk_protein",
  GLUTEN: "gluten",
  SOY: "soy",
  EGG: "egg",
  FISH: "fish",
  SHELLFISH: "shellfish",
  TREE_NUTS: "tree_nuts",
  PEANUTS: "peanuts",
  SULPHITES: "sulphites"
});

export const AVOIDANCE_FACTORS = Object.freeze({
  LACTOSE: "lactose",
  CAFFEINE: "caffeine",
  ADDED_SUGAR: "added_sugar",
  ALCOHOL: "alcohol",
  ARTIFICIAL_SWEETENERS: "artificial_sweeteners",
  GELATIN: "gelatin",
  SYNTHETIC_ADDITIVES: "synthetic_additives"
});

export const USAGE_TIME = Object.freeze({
  MORNING: "morning",
  MIDDAY: "midday",
  EVENING: "evening",
  WITH_MEAL: "with_meal",
  ANYTIME: "anytime"
});
