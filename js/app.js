/**
 * Application Entry Point
 */
document.addEventListener("DOMContentLoaded", () => {
  UIController.initPantryChips();

  document.getElementById("search-recipes-btn").addEventListener("click", () => {
    const timeFilter = document.getElementById("time-filter").value;
    const mealFilter = document.getElementById("meal-filter").value;

    trackVitaEvent('recipe_search_started', {
      selected_ingredients: UIController.selectedConcepts,
      time_filter: timeFilter,
      meal_filter: mealFilter
    });

    const searchResult = RecipeEngine.findMatchingRecipes(
      UIController.selectedConcepts,
      { maxTime: timeFilter, mealType: mealFilter }
    );

    UIController.renderResults(searchResult);
  });

  document.getElementById("reset-pantry-btn").addEventListener("click", () => {
    UIController.resetPantry();
  });

  document.getElementById("add-custom-ingredient-btn").addEventListener("click", () => {
    const input = document.getElementById("custom-ingredient-input");
    const val = input.value.trim().toLowerCase();
    
    if (val) {
      const knownKey = Object.keys(UIController.conceptDictionary).find(k => k.toLowerCase() === val);
      
      if (knownKey) {
        const conceptKey = UIController.conceptDictionary[knownKey];
        if (!UIController.selectedConcepts.includes(conceptKey)) {
          UIController.toggleConcept(conceptKey, knownKey);
        }
      } else {
        // Unrecognized custom ingredient
        const customConcept = val.toUpperCase();
        if (!UIController.selectedConcepts.includes(customConcept)) {
          UIController.selectedConcepts.push(customConcept);
          UIController.renderSelectedSummary();
          
          const warningEl = document.getElementById("custom-warning-text");
          warningEl.innerText = `„${val}”: Ezt az alapanyagot még nem ismerjük a receptjeink között, ezért most nem vettük figyelembe.`;
          warningEl.classList.remove("hidden");
          
          trackVitaEvent('custom_ingredient_unrecognized', { input_value: val });
        }
      }
      input.value = "";
    }
  });

  document.querySelector(".modal-close").addEventListener("click", () => {
    document.getElementById("recipe-modal").classList.add("hidden");
  });
  document.querySelector(".modal-overlay").addEventListener("click", () => {
    document.getElementById("recipe-modal").classList.add("hidden");
  });
});
