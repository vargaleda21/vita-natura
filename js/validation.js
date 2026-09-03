import { 
  GOALS, 
  PRODUCT_CATEGORIES, 
  RECOMMENDATION_ROLES, 
  CONTENT_STATUS 
} from './taxonomy.js';

export function validateDataset(products, recipes, bundles, knownIngredients) {
  const errors = [];
  const productMap = new Map();
  const knownIngredientIds = new Set(knownIngredients.map(i => i.id));

  products.forEach(product => {
    if (!product.id) errors.push(`Termék ID hiányzik.`);
    if (productMap.has(product.id)) errors.push(`Duplikált termék ID: ${product.id}`);
    productMap.set(product.id, product);

    if (!product.name) errors.push(`Terméknév hiányzik: ${product.id}`);
    if (!Object.values(PRODUCT_CATEGORIES).includes(product.category)) {
      errors.push(`Érvénytelen kategória (${product.id}): ${product.category}`);
    }
    if (!Object.values(CONTENT_STATUS).includes(product.status)) {
      errors.push(`Érvénytelen státusz (${product.id}): ${product.status}`);
    }

    if (!product.rolesByGoal || typeof product.rolesByGoal !== 'object') {
      errors.push(`Hiányzó 'rolesByGoal' objektum: ${product.id}`);
    } else {
      Object.entries(product.rolesByGoal).forEach(([goal, role]) => {
        if (!Object.values(GOALS).includes(goal)) errors.push(`Érvénytelen cél (${product.id}): ${goal}`);
        if (!product.goals.includes(goal)) errors.push(`A rolesByGoal tartalmazza a '${goal}' célt, de a goals tömb nem (${product.id})`);
        if (!Object.values(RECOMMENDATION_ROLES).includes(role)) errors.push(`Érvénytelen szerep (${product.id}): ${role}`);
      });
    }
  });

  recipes.forEach(recipe => {
    if (!recipe.id) errors.push(`Recept ID hiányzik.`);
    if (recipe.ingredients) {
      recipe.ingredients.forEach(ing => {
        if (!knownIngredientIds.has(ing.id)) errors.push(`Ismeretlen alapanyag (${ing.id}) a receptben: ${recipe.id}`);
      });
    }
  });

  bundles.forEach(bundle => {
    if (!bundle.id) errors.push(`Csomag ID hiányzik.`);
    if (bundle.items) {
      bundle.items.forEach(item => {
        const referencedProd = productMap.get(item.productId);
        if (!referencedProd) errors.push(`Hiányzó termék ID (${item.productId}) a csomagban: ${bundle.id}`);
      });
    }
  });

  if (errors.length > 0) {
    console.error("[VITA DATASET VALIDATION FAILED]:", errors);
    return false;
  }
  return true;
}
