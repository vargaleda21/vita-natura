
/**
 * Vita-Natura Recipe Engine v2.4 (LOCKED)
 * Strictly enforces Core Gate, Main Ingredient limits, Contextual Substitutions,
 * Form-Aware Fallback & Affiliate eligibility.
 */

const RecipeEngine = {
  findMatchingRecipes(userSelections, filters = {}) {
    if (!userSelections || userSelections.length === 0) {
      return { matches: [], isFallback: false, fallbackReason: 'empty_input' };
    }

    const knownConceptKeys = Object.values(UIController.conceptDictionary);
    const validSelections = userSelections.filter(s => knownConceptKeys.includes(s.concept));
    const userConcepts = validSelections.map(s => s.concept);

    // 1. Forbidden Category Check (e.g. Mogyoróvaj + Tészta)
    if (userConcepts.length === 2 && userConcepts.includes("MOGYORÓVAJ") && userConcepts.includes("TÉSZTA")) {
      return { matches: [], isFallback: true, fallbackReason: "NO_COMMON_RECIPE" };
    }

    const evaluatedRecipes = [];

    // Form-Aware Matching Helper
    const matchSelection = (reqItem) => {
  return validSelections.find(sel => 
    sel.concept === reqItem.concept && 
    (!reqItem.acceptedForms || reqItem.acceptedForms.length === 0 || sel.form === "any" || reqItem.acceptedForms.includes(sel.form))
  );
};

    RECIPES.forEach(recipe => {
      // FILTER CHECK IN FALLBACK
if (filters.maxTime && filters.maxTime !== "any" && recipe.prepTime > parseInt(filters.maxTime)) return;
if (filters.mealType && filters.mealType !== "any" && recipe.mealType !== filters.mealType) return;
      // A) CHECK REQUIRED CORE INGREDIENTS (STRICT GATE)
      let coreFailed = false;
      const actuallyMatchedCoreConcepts = new Set();
      const coreSubstitutionsApplied = [];

      recipe.requiredCoreIngredients.forEach(coreReq => {
        const directMatch = matchSelection(coreReq);
        if (directMatch) {
          actuallyMatchedCoreConcepts.add(coreReq.concept);
        } else {
          // Check for explicit substitution rule for this core
          const subRule = recipe.substitutions ? recipe.substitutions[coreReq.concept] : null;
          if (subRule) {
            const subMatch = validSelections.find(sel => sel.concept === subRule.substituteWithConcept);
            if (subMatch) {
              coreSubstitutionsApplied.push({
                missingConcept: coreReq.concept,
                substituteWithConcept: subRule.substituteWithConcept,
                type: subRule.type,
                note: subRule.note,
                isCore: true
              });
              return;
            }
          }
          coreFailed = true; // Core missing without valid sub -> DROP RECIPE
        }
      });

      if (coreFailed) return;

      // B) CHECK MAIN INGREDIENTS
      const matchedMains = [];
      const missingMains = [];

      recipe.mainIngredients.forEach(mainReq => {
        if (matchSelection(mainReq)) {
          matchedMains.push(mainReq.concept);
        } else {
          missingMains.push(mainReq.concept);
        }
      });

      let mainSubstitution = null;
      let effectiveMissingMainsCount = missingMains.length;

      if (missingMains.length === 1) {
        const missingConcept = missingMains[0];
        const subRule = recipe.substitutions ? recipe.substitutions[missingConcept] : null;
        if (subRule) {
          const subMatch = validSelections.find(sel => sel.concept === subRule.substituteWithConcept);
          if (subMatch) {
            mainSubstitution = {
              missingConcept,
              substituteWithConcept: subRule.substituteWithConcept,
              type: subRule.type,
              note: subRule.note,
              isMain: true
            };
            effectiveMissingMainsCount = 0;
          }
        }
      }

      // STRICT GATE: If 2 or more mains are missing -> DROP from normal results!
      if (effectiveMissingMainsCount >= 2) {
        return;
      }

      // C) CHECK OPTIONAL INGREDIENTS & ENHANCEMENTS
      const matchedOptionals = [];
      const optionalSubstitutionsApplied = [];

      recipe.optionalIngredients.forEach(optReq => {
        if (matchSelection(optReq)) {
          matchedOptionals.push(optReq.concept);
        } else {
          const subRule = recipe.substitutions ? recipe.substitutions[optReq.concept] : null;
          if (subRule) {
            const subMatch = validSelections.find(sel => sel.concept === subRule.substituteWithConcept);
            if (subMatch) {
              optionalSubstitutionsApplied.push({
                missingConcept: optReq.concept,
                substituteWithConcept: subRule.substituteWithConcept,
                type: subRule.type,
                note: subRule.note,
                isOptional: true
              });
            }
          }
        }
      });

      // D) FILTERS CHECK
      if (filters.maxTime && filters.maxTime !== "any" && recipe.prepTime > parseInt(filters.maxTime)) return;
      if (filters.mealType && filters.mealType !== "any" && recipe.mealType !== filters.mealType) return;

      // E) DETERMINISTIC STATUS & RANK WEIGHT
      let statusType = "EXACT_MATCH";
      let statusRankWeight = 1;

      const coreOrMainSubstitutions = [...coreSubstitutionsApplied];
      if (mainSubstitution) coreOrMainSubstitutions.push(mainSubstitution);

      if (coreOrMainSubstitutions.length > 0) {
        statusType = "SUBSTITUTED_MATCH";
        const hasAlternative = coreOrMainSubstitutions.some(s => s.type === "Alternative");
        statusRankWeight = hasAlternative ? 3 : 2;
      } else if (effectiveMissingMainsCount === 1) {
        statusType = "ONE_MISSING_MATCH";
        statusRankWeight = 4;
      }

      const allActiveSubstitutions = [...coreOrMainSubstitutions, ...optionalSubstitutionsApplied];

      // F) USAGE SCORE CALCULATION
      // Formula: (matchedCoreCount * 4) + (matchedMainsCount * 3) + (matchedOptionalsCount * 1)
      const matchedCoreCount = actuallyMatchedCoreConcepts.size;
      const usageScore = (matchedCoreCount * 4) + (matchedMains.length * 3) + (matchedOptionals.length * 1);

      evaluatedRecipes.push({
        recipe,
        matchedCore: Array.from(actuallyMatchedCoreConcepts),
        substitutedCore: coreSubstitutionsApplied,
        matchedMains,
        substitutedMains: mainSubstitution ? [mainSubstitution] : [],
        missingMains: mainSubstitution ? [] : missingMains,
        matchedOptionals,
        substitutedOptionals: optionalSubstitutionsApplied,
        substitutionsApplied: allActiveSubstitutions,
        statusType,
        statusRankWeight,
        usageScore
      });
    });

    // RANKING: 1. statusRankWeight -> 2. usageScore -> 3. prepTime
    evaluatedRecipes.sort((a, b) => {
      if (a.statusRankWeight !== b.statusRankWeight) return a.statusRankWeight - b.statusRankWeight;
      if (b.usageScore !== a.usageScore) return b.usageScore - a.usageScore;
      return a.recipe.prepTime - b.recipe.prepTime;
    });

    const topMatches = evaluatedRecipes.slice(0, 3);

    if (topMatches.length > 0) {
      return { matches: topMatches, isFallback: false };
    }

    return this.generateFallbackResults(validSelections, filters);
  },

  generateFallbackResults(validSelections, filters) {
    const strongFallbacks = [];
    const splitFallbacks = [];

    const matchSelection = (reqItem) => {
  return validSelections.find(sel => 
    sel.concept === reqItem.concept && 
    (!reqItem.acceptedForms || reqItem.acceptedForms.length === 0 || sel.form === "any" || reqItem.acceptedForms.includes(sel.form))
  );
};

    RECIPES.forEach(recipe => {      
      // Apply the same filters in fallback mode as in normal matching.
      if (filters.maxTime && filters.maxTime !== "any" && recipe.prepTime > parseInt(filters.maxTime)) return;
      if (filters.mealType && filters.mealType !== "any" && recipe.mealType !== filters.mealType) return;
      const matchedCore = recipe.requiredCoreIngredients.filter(coreReq => matchSelection(coreReq));
      const matchedMains = recipe.mainIngredients.filter(mainReq => matchSelection(mainReq));
      const totalCoherentMatched = matchedCore.length + matchedMains.length;

      if (totalCoherentMatched >= 2) {
        strongFallbacks.push({
          recipe,
          matchedCore: matchedCore.map(c => c.concept),
          substitutedCore: [],
          matchedMains: matchedMains.map(m => m.concept),
          substitutedMains: [],
          missingMains: recipe.mainIngredients.filter(m => !matchSelection(m)).map(m => m.concept),
          matchedOptionals: [],
          substitutedOptionals: [],
          substitutionsApplied: [],
          statusType: "STRONG_FALLBACK",
          statusRankWeight: 5,
          usageScore: totalCoherentMatched
        });
      } else if (totalCoherentMatched === 1) {
        splitFallbacks.push({
          recipe,
          matchedCore: matchedCore.map(c => c.concept),
          substitutedCore: [],
          matchedMains: matchedMains.map(m => m.concept),
          substitutedMains: [],
          missingMains: recipe.mainIngredients.filter(m => !matchSelection(m)).map(m => m.concept),
          matchedOptionals: [],
          substitutedOptionals: [],
          substitutionsApplied: [],
          statusType: "SPLIT_FALLBACK",
          statusRankWeight: 6,
          usageScore: totalCoherentMatched
        });
      }
    });

    if (strongFallbacks.length > 0) {
      strongFallbacks.sort((a, b) => b.usageScore - a.usageScore);
      return { matches: strongFallbacks.slice(0, 3), isFallback: true, fallbackReason: "STRONG_FALLBACK" };
    }

    if (splitFallbacks.length > 0) {
      splitFallbacks.sort((a, b) => b.usageScore - a.usageScore);
      return { matches: splitFallbacks.slice(0, 3), isFallback: true, fallbackReason: "SPLIT_FALLBACK" };
    }

    return { matches: [], isFallback: true, fallbackReason: "NO_COMMON_RECIPE" };
  },

  getAffiliateProductForRecipe(recipe, userSelections) {
    if (!recipe.suggestedStockableCategory && !recipe.affiliateOpportunity) return null;

    const categoryKey = recipe.affiliateOpportunity || recipe.suggestedStockableCategory;
    const candidateProduct = typeof DEMO_PRODUCTS !== 'undefined' ? DEMO_PRODUCTS.find(p => p.category === categoryKey) : null;
    if (!candidateProduct) return null;

    // Strict Rules: PANTRY only, SUPPLEMENTs forbidden
    if (candidateProduct.product_commerce_type !== "PANTRY") return null;
    if (candidateProduct.product_commerce_type === "SUPPLEMENT") return null;

    const userConcepts = userSelections.map(s => s.concept);
    if (userConcepts.includes(categoryKey.toUpperCase())) return null;

    if (recipe.pantryStaples && recipe.pantryStaples.includes(categoryKey)) return null;

    return candidateProduct;
  }
};
