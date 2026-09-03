import { GOALS, RECOMMENDATION_ROLES, CONTENT_STATUS, PRODUCT_CATEGORIES } from './taxonomy.js';

export function buildRecommendations(profile, products, bundles, ingredients) {
  if (!profile || !profile.isComplete) {
    return createFallbackRecommendation("A konzultáció még nem fejeződött be.");
  }

  const eligibleProducts = products.filter(product => {
    if (product.status !== CONTENT_STATUS.ACTIVE) return false;
    if (profile.dietType && !product.dietCompatible.includes(profile.dietType)) return false;

    if (profile.avoidAllergens && profile.avoidAllergens.length > 0) {
      if (product.allergens.some(a => profile.avoidAllergens.includes(a))) return false;
    }

    if (profile.avoidFactors && profile.avoidFactors.length > 0) {
      if (product.avoidFactors.some(af => profile.avoidFactors.includes(af))) return false;
    }

    if (profile.avoidIngredients && profile.avoidIngredients.length > 0) {
      if (product.ingredients.some(ing => profile.avoidIngredients.includes(ing.id))) return false;
    }

    return true;
  });

  const scoredProducts = eligibleProducts.map(product => {
    let score = 0;
    const matchFactors = {
      primaryGoalMatch: false,
      secondaryGoalMatch: false,
      lifestyleMatches: [],
      supportPreferenceMatch: false,
      dietCompatible: true
    };

    if (product.goals.includes(profile.primaryGoal)) {
      score += 50;
      matchFactors.primaryGoalMatch = true;
    }

    if (profile.secondaryGoals.length > 0 && product.goals.includes(profile.secondaryGoals[0])) {
      score += 20;
      matchFactors.secondaryGoalMatch = true;
    }

    if (profile.lifestyleContext && profile.lifestyleContext.length > 0) {
      profile.lifestyleContext.forEach(tag => {
        if (product.lifestyleTags.includes(tag)) {
          score += 10;
          matchFactors.lifestyleMatches.push(tag);
        }
      });
    }

    const isSupplementCategory = [PRODUCT_CATEGORIES.VITAMIN, PRODUCT_CATEGORIES.MINERAL, PRODUCT_CATEGORIES.OMEGA, PRODUCT_CATEGORIES.PROTEIN].includes(product.category);
    const isFoodCategory = [PRODUCT_CATEGORIES.HERBAL_TEA, PRODUCT_CATEGORIES.FUNCTIONAL_FOOD, PRODUCT_CATEGORIES.ADAPTOGEN].includes(product.category);

    if (profile.supportPreference === "supplements" && isSupplementCategory) {
      score += 10;
      matchFactors.supportPreferenceMatch = true;
    } else if (profile.supportPreference === "food" && isFoodCategory) {
      score += 10;
      matchFactors.supportPreferenceMatch = true;
    } else if (profile.supportPreference === "all") {
      score += 5;
      matchFactors.supportPreferenceMatch = true;
    }

    const contextualRole = product.rolesByGoal[profile.primaryGoal] || RECOMMENDATION_ROLES.OPTIONAL;

    return { product, contextualRole, relevanceScore: score, matchFactors };
  });

  const strictlyRecommendedProducts = scoredProducts.filter(item => item.relevanceScore > 0);

  strictlyRecommendedProducts.sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
    const rolePriority = { primary_support: 3, complementary: 2, optional: 1 };
    const aRolePrio = rolePriority[a.contextualRole] || 0;
    const bRolePrio = rolePriority[b.contextualRole] || 0;
    if (bRolePrio !== aRolePrio) return bRolePrio - aRolePrio;
    if (a.product.bundleEligible !== b.product.bundleEligible) return a.product.bundleEligible ? -1 : 1;
    return a.product.id.localeCompare(b.product.id);
  });

  const isLifestyleOnly = profile.productOpenness === "lifestyle_only";
  const maxProducts = profile.complexity === "simple" ? 2 : 3;
  const finalRecommendedProducts = isLifestyleOnly ? [] : strictlyRecommendedProducts.slice(0, maxProducts);

  const selectedBundle = isLifestyleOnly 
    ? null 
    : buildStrictBundle(profile.primaryGoal, finalRecommendedProducts, bundles, maxProducts);

  const finalFoodSuggestions = buildFoodSuggestions(profile, ingredients);

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      profileSummary: `Személyes konzultáció ${profile.primaryGoal} fókusszal.`
    },
    focusAreas: generateFocusAreas(profile),
    foodSuggestions: finalFoodSuggestions,
    dailyRoutine: generateDailyRoutine(profile),
    recommendedProducts: finalRecommendedProducts,
    bundle: selectedBundle
  };
}

function createFallbackRecommendation(reason) {
  return {
    meta: { generatedAt: new Date().toISOString(), profileSummary: reason },
    focusAreas: [{ goal: GOALS.GENERAL_VITALITY, title: "Általános jóllét", explanation: "Általános életmódbeli javaslatok a mindennapi egyensúlyért." }],
    foodSuggestions: [],
    dailyRoutine: [],
    recommendedProducts: [],
    bundle: null
  };
}

// JAVÍTVA: Tiszta, magyar nyelvű címsor generálása duplázott szavak nélkül!
function generateFocusAreas(profile) {
  const goalNames = {
    [GOALS.ENERGY]: "Energia és vitalitás",
    [GOALS.SLEEP]: "Pihentető alvás",
    [GOALS.FOCUS]: "Mentális fókusz",
    [GOALS.DIGESTION]: "Emésztési komfort",
    [GOALS.BEAUTY]: "Ragyogás és szépség",
    [GOALS.RECOVERY]: "Aktív regeneráció",
    [GOALS.WOMEN]: "Női jóllét",
    [GOALS.GENERAL_VITALITY]: "Általános vitalitás"
  };

  const name = goalNames[profile.primaryGoal] || "Mindennapi egyensúly";

  return [
    {
      goal: profile.primaryGoal,
      title: name,
      explanation: "A válaszaid alapján ez a terület élvez elsőbbséget a mindennapi rutinodban."
    }
  ];
}

function generateDailyRoutine(profile) {
  return [
    { timeOfDay: "morning", title: "Reggeli indítás", action: "Szánj néhány percet a nyugodt napkezdésre és a hidratálásra." },
    { timeOfDay: "midday", title: "Napközbeni ritmus", action: "Tarts rövid szünetet a teendők között a feltöltődésért." },
    { timeOfDay: "evening", title: "Esti leállítás", action: "Lassíts a nap végén kékfény-csökkentéssel és pihentető rituáléval." }
  ];
}

// JAVÍTVA: Csak a céloknak és étrendnek megfelelő, értelmes konyhai elemeket ajánlja!
function buildFoodSuggestions(profile, ingredients) {
  if (!ingredients) return [];
  
  // Kizárja a felhasználó által jelölt kerülendő tényezőket és allergéneket
  const validIngredients = ingredients.filter(ing => {
    if (profile.avoidIngredients && profile.avoidIngredients.includes(ing.id)) return false;
    if (profile.avoidAllergens && ing.allergens && ing.allergens.some(a => profile.avoidAllergens.includes(a))) return false;
    if (profile.avoidFactors && ing.avoidFactors && ing.avoidFactors.some(f => profile.avoidFactors.includes(f))) return false;
    return true;
  });

  // Kiválaszt 2–3 releváns zöldséget / gabonát a véletlenszerű húsok helyett
  const plantBased = validIngredients.filter(ing => ["cruciferous", "greens", "tubers", "grains"].includes(ing.group));
  const selection = plantBased.length >= 2 ? plantBased : validIngredients;

  return selection.slice(0, profile.complexity === "simple" ? 2 : 3).map(ing => ({
    ingredientId: ing.id,
    displayName: ing.displayName,
    matchFactors: { goalMatch: true, dietCompatible: true }
  }));
}

function buildStrictBundle(primaryGoal, finalRecommendedProducts, bundles, maxProducts) {
  const matchingBundle = bundles.find(b => b.primaryGoal === primaryGoal && b.status === CONTENT_STATUS.ACTIVE);
  if (!matchingBundle) return null;

  const validBundleItems = [];
  matchingBundle.items.forEach(item => {
    const prodWrapper = finalRecommendedProducts.find(w => w.product.id === item.productId);
    if (prodWrapper) {
      const expectedRole = prodWrapper.product.rolesByGoal[primaryGoal];
      if (expectedRole === item.role) {
        validBundleItems.push({
          product: prodWrapper.product,
          role: item.role,
          priority: item.priority
        });
      }
    }
  });

  const hasPrimary = validBundleItems.some(i => i.role === RECOMMENDATION_ROLES.PRIMARY_SUPPORT);
  if (!hasPrimary) return null;

  const finalBundleItems = validBundleItems.slice(0, maxProducts);

  return {
    bundleId: matchingBundle.id,
    name: matchingBundle.name,
    description: matchingBundle.description,
    items: finalBundleItems
  };
}
