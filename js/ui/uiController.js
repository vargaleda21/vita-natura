handleSearch() {
    const inputField = document.getElementById("ingredient-input");
    
    // Ha van beírt szöveg a mezőben, de még nem nyomott Entert a user, dolgozzuk fel előbb!
    if (inputField && inputField.value.trim() !== "") {
      this.addIngredientFromInput();
    }

    this.trackAnalytics("recipe_search_started", { count: this.selectedIngredients.length });

    const maxTime = document.getElementById("filter-time") ? document.getElementById("filter-time").value : "any";
    const mealType = document.getElementById("filter-meal") ? document.getElementById("filter-meal").value : "any";

    const results = RecipeEngine.findMatchingRecipes(this.selectedIngredients, { maxTime, mealType });
    this.renderResults(results);
  },
