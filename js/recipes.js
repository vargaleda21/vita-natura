import { CONTENT_STATUS, GOALS, DIET_TYPES, ALLERGENS, AVOIDANCE_FACTORS } from './taxonomy.js';

export const VITA_INGREDIENTS = [
  { id: "csirkemell", displayName: "Csirkemell filé", group: "poultry", allergens: [], avoidFactors: [] },
  { id: "pulykamell", displayName: "Pulykamell filé", group: "poultry", allergens: [], avoidFactors: [] },
  { id: "brokkoli", displayName: "Brokkoli", group: "cruciferous", allergens: [], avoidFactors: [] },
  { id: "karfiol", displayName: "Karfiol", group: "cruciferous", allergens: [], avoidFactors: [] },
  { id: "basmati_rizs", displayName: "Basmati rizs", group: "grains", allergens: [], avoidFactors: [] },
  { id: "spenot", displayName: "Bébispenót", group: "greens", allergens: [], avoidFactors: [] },
  { id: "feta", displayName: "Feta sajt", group: "cheese", allergens: [ALLERGENS.MILK_PROTEIN], avoidFactors: [AVOIDANCE_FACTORS.LACTOSE] },
  { id: "mozzarella", displayName: "Mozzarella", group: "cheese", allergens: [ALLERGENS.MILK_PROTEIN], avoidFactors: [AVOIDANCE_FACTORS.LACTOSE] },
  { id: "edesburgonya", displayName: "Édesburgonya", group: "tubers", allergens: [], avoidFactors: [] },
  { id: "fokhagyma", displayName: "Fokhagyma", group: "aromatics", allergens: [], avoidFactors: [] },
  { id: "citrom", displayName: "Friss citromlé", group: "citrus", allergens: [], avoidFactors: [] },
  { id: "quinoa", displayName: "Quinoa", group: "grains", allergens: [], avoidFactors: [] }
];

export const VITA_RECIPES = [
  {
    id: "rec-demo-01",
    title: "Párolt csirkemell brokkolival & basmati rizzsel",
    description: "Könnyű, jól emészthető konyhai tál fokhagymás és citromos ízesítéssel.",
    ingredients: [
      { id: "csirkemell", required: true },
      { id: "brokkoli", required: true },
      { id: "basmati_rizs", required: true },
      { id: "fokhagyma", required: false },
      { id: "citrom", required: false }
    ],
    dietTypes: [DIET_TYPES.OMNIVORE],
    goals: [GOALS.ENERGY, GOALS.RECOVERY],
    prepTimeMinutes: 25,
    difficulty: "könnyű",
    image: "assets/demo-recipe-chicken.jpg",
    instructions: [
      "1. A basmati rizst kétszeres mennyiségű sós vízben megfőzzük.",
      "2. A csirkemellet felkockázzuk, kíméletesen átsütjük.",
      "3. A brokkolit roppanósra gőzöljük, majd fokhagymával és citromlével összeforgatva tálaljuk."
    ],
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "rec-demo-02",
    title: "Sült édesburgonya tál bébispenóttal & fetával",
    description: "Krémes és tápláló zöldségtál lassan felszívódó szénhidrátokkal.",
    ingredients: [
      { id: "edesburgonya", required: true },
      { id: "spenot", required: true },
      { id: "feta", required: true },
      { id: "fokhagyma", required: false }
    ],
    dietTypes: [DIET_TYPES.VEGETARIAN, DIET_TYPES.OMNIVORE],
    goals: [GOALS.WOMEN, GOALS.RECOVERY, GOALS.SLEEP],
    prepTimeMinutes: 30,
    difficulty: "könnyű",
    image: "assets/demo-recipe-sweetpotato.jpg",
    instructions: [
      "1. Az édesburgonyát kockákra vágjuk és sütőben megpirítjuk.",
      "2. A bébispenótot frissen vagy enyhén fonnyasztva a tálba halmozzuk.",
      "3. Morzsolt fetával és kevés fokhagymás fűszerezéssel tálaljuk."
    ],
    status: CONTENT_STATUS.ACTIVE
  },
  {
    id: "rec-demo-03",
    title: "Meleg quinoatál spenóttal & karfiollal",
    description: "Növényi fehérjében gazdag, könnyen emészthető meleg konyhai fogás.",
    ingredients: [
      { id: "quinoa", required: true },
      { id: "spenot", required: true },
      { id: "karfiol", required: true },
      { id: "citrom", required: false }
    ],
    dietTypes: [DIET_TYPES.VEGAN, DIET_TYPES.VEGETARIAN, DIET_TYPES.OMNIVORE, DIET_TYPES.PLANT_FORWARD],
    goals: [GOALS.ENERGY, GOALS.DIGESTION, GOALS.WOMEN],
    prepTimeMinutes: 20,
    difficulty: "könnyű",
    image: "assets/demo-recipe-quinoa.jpg",
    instructions: [
      "1. A quinoát megfőzzük.",
      "2. A karfiolrózsákat gőzöljük vagy pirítjuk.",
      "3. Összeforgatjuk a spenóttal és friss citromlével ízesítjük."
    ],
    status: CONTENT_STATUS.ACTIVE
  }
];

export function searchPantryRecipes(canonicalSelectedIds, userProfile, recipes, ingredientRegistry) {
  if (!canonicalSelectedIds || canonicalSelectedIds.length === 0) return [];

  const selectedSet = new Set(canonicalSelectedIds);
  const ingredientMap = new Map(ingredientRegistry.map(ing => [ing.id, ing]));
  const matchedResults = [];

  recipes.forEach(recipe => {
    if (recipe.status !== CONTENT_STATUS.ACTIVE) return;

    if (userProfile && userProfile.dietType) {
      if (!recipe.dietTypes.includes(userProfile.dietType)) return;
    }

    const recipeFullIngredients = recipe.ingredients.map(item => {
      const regDetails = ingredientMap.get(item.id) || { allergens: [], avoidFactors: [], displayName: item.id };
      return {
        id: item.id,
        required: item.required,
        displayName: regDetails.displayName,
        allergens: regDetails.allergens || [],
        avoidFactors: regDetails.avoidFactors || []
      };
    });

    if (userProfile) {
      if (userProfile.avoidIngredients && userProfile.avoidIngredients.length > 0) {
        if (recipeFullIngredients.some(ing => userProfile.avoidIngredients.includes(ing.id))) return;
      }
      if (userProfile.avoidAllergens && userProfile.avoidAllergens.length > 0) {
        if (recipeFullIngredients.some(ing => ing.allergens.some(a => userProfile.avoidAllergens.includes(a)))) return;
      }
      if (userProfile.avoidFactors && userProfile.avoidFactors.length > 0) {
        if (recipeFullIngredients.some(ing => ing.avoidFactors.some(af => userProfile.avoidFactors.includes(af)))) return;
      }
    }

    const requiredIngredients = recipeFullIngredients.filter(i => i.required);
    const optionalIngredients = recipeFullIngredients.filter(i => !i.required);

    const matchedRequired = requiredIngredients.filter(i => selectedSet.has(i.id));
    const matchedOptional = optionalIngredients.filter(i => selectedSet.has(i.id));
    const totalMatches = matchedRequired.length + matchedOptional.length;

    if (totalMatches === 0) return;

    const missingRequired = requiredIngredients
      .filter(i => !selectedSet.has(i.id))
      .map(i => ({ ingredientId: i.id, displayName: i.displayName }));

    const matchedRequiredRatio = requiredIngredients.length > 0 ? matchedRequired.length / requiredIngredients.length : 0;
    const hasStrongGoalMatch = userProfile && userProfile.primaryGoal ? recipe.goals.includes(userProfile.primaryGoal) : false;

    if (matchedRequiredRatio < 0.5 && !hasStrongGoalMatch) return;

    let score = (matchedRequired.length * 30) + (matchedOptional.length * 10) - (missingRequired.length * 15);
    if (hasStrongGoalMatch) score += 20;

    matchedResults.push({
      recipe,
      matchCount: totalMatches,
      totalSelected: canonicalSelectedIds.length,
      matchedRequiredCount: matchedRequired.length,
      totalRequiredCount: requiredIngredients.length,
      missingRequired,
      isPerfectMatch: missingRequired.length === 0,
      pantryScore: score
    });
  });

  matchedResults.sort((a, b) => {
    if (b.pantryScore !== a.pantryScore) return b.pantryScore - a.pantryScore;
    if (a.isPerfectMatch !== b.isPerfectMatch) return a.isPerfectMatch ? -1 : 1;
    return a.recipe.id.localeCompare(b.recipe.id);
  });

  return matchedResults;
}
