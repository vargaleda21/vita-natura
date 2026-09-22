/**
 * Vita-Natura UI Controller v1.1 (FINAL LOCKED & VERIFIED)
 * Ingredient Master Dictionary v1.1 (36 Concepts) & Event Management
 */

const UIController = {
  conceptDictionary: {
    "tojás": "TOJÁS",
    "csirkemell": "CSIRKEMELL",
    "pulykamell": "PULYKAMELL",
    "darált hús": "DARÁLT_HÚS",
    "tonhal": "TONHAL",
    "lazac": "LAZAC",
    "feta": "FETA",
    "mozzarella": "MOZZARELLA",
    "trappista": "TRAPPISTA",
    "görög joghurt": "GÖRÖG_JOGHURT",
    "tejföl": "TEJFÖL",
    "rizs": "RIZS",
    "tészta": "TÉSZTA",
    "bulgur": "BULGUR",
    "tortilla": "TORTILLA",
    "pita": "PITA",
    "burgonya": "BURGONYA",
    "édesburgonya": "ÉDESBURGONYA",
    "zab": "ZAB",
    "kenyér": "KENYÉR",
    "paradicsom": "PARADICSOM",
    "uborka": "UBORKA",
    "paprika": "PAPRIKA",
    "cukkini": "CUKKINI",
    "brokkoli": "BROKKOLI",
    "karfiol": "KARFIOL",
    "spenót": "SPENÓT",
    "saláta": "SALÁTA",
    "répa": "RÉPA",
    "hagyma": "HAGYMA",
    "fokhagyma": "FOKHAGYMA",
    "avokádó": "AVOKÁDÓ",
    "citrom": "CITROM",
    "alma": "ALMA",
    "banán": "BANÁN",
    "mogyoróvaj": "MOGYORÓVAJ"
  },

  selectedIngredients: [],

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchBtn = document.getElementById("search-btn");
    const inputField = document.getElementById("ingredient-input");

    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.handleSearch());
    }

    if (inputField) {
      inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSearch();
        }
      });
    }
  },

  handleSearch() {
    const inputField = document.getElementById("ingredient-input");
    if (!inputField) return;

    const rawValue = inputField.value.trim().toLowerCase();

    if (rawValue) {
      const concept = this.conceptDictionary[rawValue];
      const warningBox = document.getElementById("unrecognized-warning");

      if (concept) {
        if (warningBox) warningBox.style.display = "none";

        if (concept === "TONHAL") {
          inputField.value = "";
          this.promptDisambiguation(rawValue, concept);
          return;
        } else {
          this.addIngredientTag(rawValue, concept, "any");
          inputField.value = "";
        }
      } else {
        if (warningBox) {
          warningBox.innerText = `💡 A(z) "${rawValue}" alapanyagot még nem ismerjük a szótárunkban, de a többi ismert alapanyagoddal keressük a recepteket!`;
          warningBox.style.display = "block";
        }
        this.trackAnalytics("custom_ingredient_unrecognized", { input: rawValue });
        inputField.value = "";
      }
    }

    this.executeSearch();
  },

  executeSearch() {
    this.trackAnalytics("recipe_search_started", { count: this.selectedIngredients.length });

    const maxTime = document.getElementById("filter-time") ? document.getElementById("filter-time").value : "any";
    const mealType = document.getElementById("filter-meal") ? document.getElementById("filter-meal").value : "any";

    const results = RecipeEngine.findMatchingRecipes(this.selectedIngredients, { maxTime, mealType });
    this.renderResults(results);
  },

  promptDisambiguation(displayName, concept) {
    const modal = document.getElementById("recipe-modal");
    const modalContent = document.getElementById("modal-content-container");

    if (!modal || !modalContent) {
      this.addIngredientTag(displayName, concept, "any");
      this.executeSearch();
      return;
    }

    modalContent.innerHTML = `
      <h3>Milyen ${displayName} van otthon?</h3>
      <p>Válassz a pontosabb recepttalálatokhoz:</p>

      <div class="disambiguation-options" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
        <button class="btn-primary" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'canned_tuna')">
          🥫 Konzerv tonhal
        </button>

        <button class="btn-primary" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'tuna_steak')">
          🥩 Tonhal steak / filé
        </button>

        <button class="btn-secondary" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'any')">
          ❓ Nem tudom / Mindegy
        </button>
      </div>
    `;

    modal.style.display = "block";
  },

  confirmDisambiguation(displayName, concept, chosenForm) {
    this.closeModal();

    let updatedDisplayName = displayName;

    if (chosenForm === "canned_tuna") {
      updatedDisplayName = "konzerv tonhal";
    }

    if (chosenForm === "tuna_steak") {
      updatedDisplayName = "tonhal steak/filé";
    }

    this.addIngredientTag(updatedDisplayName, concept, chosenForm);
    this.executeSearch();
  },

  addIngredientTag(displayName, concept, form = "any") {
    if (this.selectedIngredients.some(i => i.concept === concept)) return;

    this.selectedIngredients.push({ displayName, concept, form });
    this.renderIngredientTags();
  },

  removeIngredientTag(concept) {
    this.selectedIngredients = this.selectedIngredients.filter(i => i.concept !== concept);
    this.renderIngredientTags();
    this.executeSearch();
  },

  renderIngredientTags() {
    const container = document.getElementById("ingredient-tags");
    if (!container) return;

    container.innerHTML = "";
    this.selectedIngredients.forEach(item => {
      const tag = document.createElement("span");
      tag.className = "tag-item";
      tag.innerHTML = `${item.displayName} <button onclick="UIController.removeIngredientTag('${item.concept}')">×</button>`;
      container.appendChild(tag);
    });
  },

  renderResults(results) {
    const container = document.getElementById("recipe-results-container");
    if (!container) return;

    container.innerHTML = "";

    if (!results.matches || results.matches.length === 0) {
      container.innerHTML = `<div class="no-results"><p>Sajnos nem találtunk közös receptet ezekhez az alapanyagokhoz.</p></div>`;
      this.trackAnalytics("recipe_results_viewed", { result_count: 0, top_status: "NO_COMMON_RECIPE" });
      return;
    }

    const topStatus = results.matches[0].statusType;
    this.trackAnalytics("recipe_results_viewed", { result_count: results.matches.length, top_status: topStatus });

    results.matches.forEach(({ recipe, substitutionsApplied, statusType }) => {
      const card = document.createElement("div");
      card.className = `recipe-card status-${statusType.toLowerCase()}`;

      let subHtml = "";
      if (substitutionsApplied && substitutionsApplied.length > 0) {
        subHtml = substitutionsApplied.map(sub => {
          let prefix = "↪ Helyettesítheted ezzel:";
          let cssClass = "status-substitute-direct";

          if (sub.type === "Alternative") {
            prefix = "↪ Más karakterű lesz, de működik:";
            cssClass = "status-substitute-alt";
          } else if (sub.type === "Enhancement") {
            prefix = "💡 Tálalási ötlet:";
            cssClass = "status-enhancement";
          }

          return `<div class="${cssClass}"><strong>${prefix}</strong> ${sub.note}</div>`;
        }).join("");
      }

      let badgeLabel = "✓ Minden megvan";
      let badgeClass = "badge-100";

      if (statusType === "SUBSTITUTED_MATCH") {
        badgeLabel = "🔄 Helyettesítve";
        badgeClass = "badge-sub";
      } else if (statusType === "ONE_MISSING_MATCH") {
        badgeLabel = "⚠️ 1 hiányzó elem";
        badgeClass = "badge-missing";
      } else if (statusType === "STRONG_FALLBACK" || statusType === "SPLIT_FALLBACK") {
        badgeLabel = "💡 Ajánlott recept";
        badgeClass = "badge-fallback";
      }

      card.innerHTML = `
        <div class="recipe-card-header">
          <h3>${recipe.title}</h3>
          <span class="badge-status ${badgeClass}">${badgeLabel}</span>
        </div>
        <p class="recipe-desc">${recipe.description}</p>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.prepTime} perc</span>
          <span>🍽️ ${recipe.servings} adag</span>
        </div>
        ${subHtml}
        <button class="btn-open-recipe" onclick="UIController.openRecipeModal('${recipe.id}')">Recept megtekintése</button>
      `;

      container.appendChild(card);
    });
  },

  openRecipeModal(recipeId) {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    this.trackAnalytics("recipe_opened", { recipe_id: recipe.id, title: recipe.title });

    const modal = document.getElementById("recipe-modal");
    const modalContent = document.getElementById("modal-content-container");
    if (!modal || !modalContent) return;

    const affiliateProduct = RecipeEngine.getAffiliateProductForRecipe(recipe, this.selectedIngredients);
    let affiliateHtml = "";

    if (affiliateProduct) {
      this.trackAnalytics("affiliate_offer_viewed", { product_id: affiliateProduct.id, category: affiliateProduct.category });
      affiliateHtml = `
        <div class="affiliate-box" style="background: #fdf8f0; border: 1px solid #e0c8a0; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <h4 style="margin-top:0;">🛒 Hiányzik a(z) ${affiliateProduct.name}?</h4>
          <p>Rendeld meg közvetlenül a kamrádba szállítási kedvezménnyel:</p>
          <a href="${affiliateProduct.affiliate_url || '#'}" target="_blank" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 8px 16px; margin-top: 5px;">Ajánlat megtekintése &rarr;</a>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <h2>${recipe.title}</h2>
      <p class="modal-desc">${recipe.description}</p>
      
      <h3>Hozzávalók:</h3>
      <ul>
        ${recipe.quantities ? recipe.quantities.map(q => `<li>${q}</li>`).join("") : ""}
      </ul>

      <h3>Elkészítés:</h3>
      <ol>
        ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
      </ol>

      ${affiliateHtml}
    `;

    modal.style.display = "block";
  },

  closeModal() {
    const modal = document.getElementById("recipe-modal");
    if (modal) modal.style.display = "none";
  },

  trackAnalytics(eventName, payload) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  UIController.init();
});
