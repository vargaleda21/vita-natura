/**
 * Vita-Natura UI Controller v2.1 (Warm Spa & Editorial Care Edition)
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

  editorialQuotes: [
    {
      title: "🕯️ HORMONBARÁT FŰSZEREZÉS",
      text: "A gyömbér és a kurkuma szinergiában működnek: nemcsak gyulladáscsökkentők, de segítik a máj ösztrogén-kiválasztását is a luteális fázisban."
    },
    {
      title: "🌿 SZIMBIOTIKUS BÉLFLÓRA",
      text: "A hüvelyesek és a keresztesvirágúak (pl. cukkini, brokkoli) lassú felszívódású rostjai a bélbaktériumok első számú tápanyagai. A jó emésztés a nyugodt idegrendszer alapja."
    },
    {
      title: "🍵 CSENDES RITUÁLÉ A KONYHÁBAN",
      text: "Az este 6 órás főzés lehet lassulás is: az alapanyagok előkészítése és az illatok felébresztése átállítja az agyat a napi stresszből a pihenésre."
    }
  ],

  selectedIngredients: [],
  currentMode: 'pantry',
  lastSearchResults: [],

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchBtn = document.getElementById("search-btn");
    const inputField = document.getElementById("ingredient-input");
    const moodFilter = document.getElementById("filter-mood");
    const timeFilter = document.getElementById("filter-time");
    const mealFilter = document.getElementById("filter-meal");

    if (searchBtn) searchBtn.addEventListener("click", () => this.handleSearch());

    if (inputField) {
      inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSearch();
        }
      });
    }

    if (moodFilter) moodFilter.addEventListener("change", () => this.executeSearch());
    if (timeFilter) timeFilter.addEventListener("change", () => this.executeSearch());
    if (mealFilter) mealFilter.addEventListener("change", () => this.executeSearch());
  },

  switchMode(mode) {
    this.currentMode = mode;
    const body = document.body;
    const tabPantry = document.getElementById("tab-pantry");
    const tabCycle = document.getElementById("tab-cycle");
    const cycleBox = document.getElementById("cycle-calculator-section");

    const heroEyebrow = document.getElementById("hero-eyebrow");
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");

    if (mode === 'cycle') {
      body.classList.add("cycle-mode");
      if (tabCycle) tabCycle.classList.add("active");
      if (tabPantry) tabPantry.classList.remove("active");
      if (cycleBox) cycleBox.style.display = "block";

      if (heroEyebrow) heroEyebrow.innerText = "NŐI EGÉSZSÉG & HARMONÓGIA";
      if (heroTitle) heroTitle.innerHTML = "Étel-szinkronizáció<br>a ciklusoddal.";
      if (heroSubtitle) heroSubtitle.innerText = "Támogasd a testedet az aktuális hormonális fázisodban. Mi megmutatjuk, miből főzz ma.";
    } else {
      body.classList.remove("cycle-mode");
      if (tabPantry) tabPantry.classList.add("active");
      if (tabCycle) tabCycle.classList.remove("active");
      if (cycleBox) cycleBox.style.display = "none";

      if (heroEyebrow) heroEyebrow.innerText = "Döntéstámogató Konyha";
      if (heroTitle) heroTitle.innerHTML = "Kevesebb keresgélés.<br>Több jó döntés.";
      if (heroSubtitle) heroSubtitle.innerText = "Te mondd meg, mid van otthon, mi megmutatjuk, mit főzhetsz belőle csendben, stresszmentesen.";
    }
  },

  /* 9. GONDOSKODÓ PASZTELL FÁZIS-SZÍNKÓDOLÁS CALCULATOR */
  calculateCyclePhase() {
    const startDateInput = document.getElementById("cycle-start-date");
    const cycleLengthInput = document.getElementById("cycle-length");
    const resultCard = document.getElementById("cycle-result");

    if (!startDateInput || !startDateInput.value) {
      alert("Kérjük, válaszd ki az utolsó menstruációd kezdő napját!");
      return;
    }

    const startDate = new Date(startDateInput.value);
    const cycleLengthVal = parseInt(cycleLengthInput ? cycleLengthInput.value : 28) || 28;
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % cycleLengthVal + 1;

    let phaseName = "";
    let phaseDesc = "";
    let recommendedIngredient = "";
    let phaseBg = "var(--phase-menstrual)";

    if (diffDays >= 1 && diffDays <= 5) {
      phaseName = "Menstruációs fázis";
      phaseDesc = "A testednek most vasra, pihenésre és meleget adó, könnyen emészthető ételekre van szüksége.";
      recommendedIngredient = "spenót";
      phaseBg = "var(--phase-menstrual)";
    } else if (diffDays >= 6 && diffDays <= 13) {
      phaseName = "Follikuláris fázis";
      phaseDesc = "Emelkedik az energiaszinted! Friss, erjesztett és ropogós zöldségek támogatják a petefészek működését.";
      recommendedIngredient = "brokkoli";
      phaseBg = "var(--phase-follicular)";
    } else if (diffDays >= 14 && diffDays <= 17) {
      phaseName = "Ovulációs fázis";
      phaseDesc = "A csúcsértékeden vagy. Rostban gazdag, cinkben és B-vitaminban dús alapanyagok segítik a hormonlebontást.";
      recommendedIngredient = "cukkini";
      phaseBg = "var(--phase-ovulatory)";
    } else {
      phaseName = "Luteális fázis";
      phaseDesc = "A menstruáció előtti napok. A testednek több magnéziumra, B6-vitaminra és lassú szénhidrátra van szüksége a puffadás és a sóvárgás ellen.";
      recommendedIngredient = "édesburgonya";
      phaseBg = "var(--phase-luteal)";
    }

    if (resultCard) {
      resultCard.style.display = "block";
      resultCard.style.background = phaseBg;
      resultCard.style.padding = "20px";
      resultCard.style.borderRadius = "12px";
      resultCard.innerHTML = `
        <h4 style="color: var(--color-bordeaux-cta); font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 6px;">Ma a ciklusod <strong>${diffDays}. napján</strong> vagy (${phaseName})</h4>
        <p style="font-size: 0.88rem; margin-bottom: 12px; opacity: 0.9;">${phaseDesc}</p>
        <button class="btn-couture" onclick="UIController.addIngredientFromEditorial('${recommendedIngredient}', '${recommendedIngredient.toUpperCase()}')">+ Ajánlott alapanyag (${recommendedIngredient}) hozzáadása</button>
      `;
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
    const moodType = document.getElementById("filter-mood") ? document.getElementById("filter-mood").value : "any";

    const results = RecipeEngine.findMatchingRecipes(this.selectedIngredients, { maxTime, mealType, moodType });
    this.lastSearchResults = results;
    this.renderResults(results);
  },

  selectQuickCollection(type, btnElement) {
    const allCollectionBtns = document.querySelectorAll('.capsule-btn');
    allCollectionBtns.forEach(btn => btn.classList.remove('active-collection'));

    if (btnElement) {
      btnElement.classList.add('active-collection');
    }

    const timeFilter = document.getElementById("filter-time");
    const mealFilter = document.getElementById("filter-meal");
    const moodFilter = document.getElementById("filter-mood");

    if (type === 'quick_20') {
      if (timeFilter) timeFilter.value = "25";
      if (mealFilter) mealFilter.value = "vacsora";
      if (moodFilter) moodFilter.value = "any";
    } else if (type === 'breakfast') {
      if (timeFilter) timeFilter.value = "any";
      if (mealFilter) mealFilter.value = "reggeli";
      if (moodFilter) moodFilter.value = "any";
    } else if (type === 'gut_health') {
      this.addIngredientTag("cukkini", "CUKKINI", "any");
    }

    this.executeSearch();
  },

  addIngredientFromEditorial(displayName, concept) {
    this.addIngredientTag(displayName, concept, "any");
    this.executeSearch();
  },

  promptDisambiguation(displayName, concept) {promptDisambiguation(displayName, concept) {
    const modal = document.getElementById("recipe-modal");
    const modalContent = document.getElementById("modal-content-container");

    if (!modal || !modalContent) {
      this.addIngredientTag(displayName, concept, "any");
      this.executeSearch();
      return;
    }

    modalContent.innerHTML = `
      <h3 class="serif-heading" style="font-size: 1.8rem; margin-bottom: 10px; color: var(--color-charcoal-warm);">${displayName} választó</h3>
      <p style="margin-bottom: 20px; color: var(--color-charcoal-warm); opacity: 0.85;">Válassz a pontosabb recepttalálatokhoz:</p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button class="btn-couture" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'canned_tuna')">
          🥫 Konzerv tonhal
        </button>

        <button class="btn-couture" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'tuna_steak')">
          🥩 Tonhal steak / filé
        </button>

        <button class="btn-couture" style="background: var(--color-ivory-satin); color: var(--color-charcoal-warm); border: 1px solid var(--color-input-border);" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'any')">
          ❓ Nem tudom / mindegy
        </button>
      </div>
    `;

    modal.style.display = "flex";
  }

    modalContent.innerHTML = `
      <h3 class="serif-heading" style="font-size: 1.8rem; margin-bottom: 10px;">Milyen ${displayName} van otthon?</h3>
      <p style="margin-bottom: 20px;">Válassz a pontosabb recepttalálatokhoz:</p>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button class="btn-couture" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'canned_tuna')">
          🥫 Konzerv tonhal
        </button>

        <button class="btn-couture" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'tuna_steak')">
          🥩 Tonhal steak / filé
        </button>

        <button class="capsule-btn" onclick="UIController.confirmDisambiguation('${displayName}', '${concept}', 'any')">
          ❓ Nem tudom / Mindegy
        </button>
      </div>
    `;

    modal.style.display = "flex";
  },

  confirmDisambiguation(displayName, concept, chosenForm) {
    this.closeModal();

    let updatedDisplayName = displayName;

    if (chosenForm === "canned_tuna") updatedDisplayName = "konzerv tonhal";
    if (chosenForm === "tuna_steak") updatedDisplayName = "tonhal steak/filé";

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
      tag.className = "capsule-btn active-collection";
      tag.style.cursor = "default";
      tag.innerHTML = `${item.displayName} <button onclick="UIController.removeIngredientTag('${item.concept}')" style="background:none; border:none; color:var(--color-white); margin-left:6px; cursor:pointer;">×</button>`;
      container.appendChild(tag);
    });
  },

  renderMealPrepPlan() {
    const container = document.getElementById("recipe-results-container");
    if (!container || !this.lastSearchResults || !this.lastSearchResults.matches || this.lastSearchResults.matches.length < 2) return;

    const recipe1 = this.lastSearchResults.matches[0].recipe;
    const recipe2 = this.lastSearchResults.matches[1].recipe;

    container.innerHTML = `
      <div style="background: var(--color-cloud-pink); border: 1px solid var(--color-bordeaux-cta); border-radius: var(--radius-card); padding: 36px; margin-bottom: 40px; box-shadow: var(--shadow-soft-cloud);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span class="eyebrow">CSENDES MENÜTERVEZŐ</span>
            <h3 class="serif-heading" style="font-size: 2rem; color: var(--color-bordeaux-cta);">2 Napos Kombinált Vacsora-Terv</h3>
          </div>
          <button class="capsule-btn" onclick="UIController.renderResults(UIController.lastSearchResults)">← Vissza a listához</button>
        </div>
        <p style="margin-bottom: 24px; color: var(--color-charcoal-warm); opacity: 0.85;">Ezekből az alapanyagokból egyetlen előkészítéssel letudhatod a hét közepe vacsoráit:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div style="background: var(--color-ivory-satin); padding: 24px; border-radius: 12px; border-left: 3px solid var(--color-bordeaux-cta);">
            <span style="font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing:0.15em; color: var(--color-bordeaux-cta);">1. NAP VACSORA</span>
            <h4 class="serif-heading" style="font-size: 1.5rem; margin: 8px 0;">${recipe1.title}</h4>
            <p style="font-size: 0.85rem; margin-bottom: 12px; opacity: 0.8;">${recipe1.description}</p>
            <span style="font-size: 0.8rem; font-weight: 600;">⏱️ ${recipe1.prepTime} perc</span>
          </div>

          <div style="background: var(--color-ivory-satin); padding: 24px; border-radius: 12px; border-left: 3px solid var(--color-bordeaux-cta);">
            <span style="font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing:0.15em; color: var(--color-bordeaux-cta);">2. NAP VACSORA</span>
            <h4 class="serif-heading" style="font-size: 1.5rem; margin: 8px 0;">${recipe2.title}</h4>
            <p style="font-size: 0.85rem; margin-bottom: 12px; opacity: 0.8;">${recipe2.description}</p>
            <span style="font-size: 0.8rem; font-weight: 600;">⏱️ ${recipe2.prepTime} perc</span>
          </div>
        </div>
      </div>
    `;
  },

  renderResults(results) {
    const container = document.getElementById("recipe-results-container");
    if (!container) return;

    container.innerHTML = "";

    if (!results.matches || results.matches.length === 0) {
      container.innerHTML = `<div style="padding: 40px; text-align: center;"><p class="serif-heading" style="font-size: 1.5rem;">Sajnos nem találtunk közös receptet ezekhez az alapanyagokhoz.</p></div>`;
      this.trackAnalytics("recipe_results_viewed", { result_count: 0, top_status: "NO_COMMON_RECIPE" });
      return;
    }

    const topStatus = results.matches[0].statusType;
    this.trackAnalytics("recipe_results_viewed", { result_count: results.matches.length, top_status: topStatus });

    if (results.matches.length >= 2) {
      const prepBanner = document.createElement("div");
      prepBanner.style.cssText = "background: var(--color-cloud-pink); padding: 20px 24px; border-radius: 12px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: var(--shadow-soft-cloud);";
      prepBanner.innerHTML = `
        <div>
          <strong style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-bordeaux-cta);">🗓️ Szeretnél 2 napra előre tervezni?</strong>
          <p style="font-size: 0.85rem; opacity: 0.85; margin: 0;">Ezekből az alapanyagokból kombinált 2 napos vacsora-tervet készítünk neked.</p>
        </div>
        <button class="btn-couture" onclick="UIController.renderMealPrepPlan()" style="padding: 8px 18px; font-size: 0.68rem;">2 Napos Terv Generálása</button>
      `;
      container.appendChild(prepBanner);
    }

    results.matches.forEach(({ recipe, substitutionsApplied, statusType }, index) => {
      
      if (index > 0 && index % 2 === 0) {
        const quoteObj = this.editorialQuotes[(index / 2 - 1) % this.editorialQuotes.length];
        const quoteCard = document.createElement("div");
        quoteCard.style.cssText = "background: var(--color-cloud-pink); border-left: 2px solid var(--color-bordeaux-cta); padding: 24px; border-radius: 12px; margin: 32px 0;";
        quoteCard.innerHTML = `
          <span style="display: block; font-weight: 600; font-size: 0.7rem; letter-spacing: 0.15em; color: var(--color-bordeaux-cta); margin-bottom: 6px;">${quoteObj.title}</span>
          <p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-charcoal-warm); font-style: italic; margin: 0;">"${quoteObj.text}"</p>
        `;
        container.appendChild(quoteCard);
      }

      const card = document.createElement("div");
      card.className = "recipe-card";

      let subHtml = "";
      if (substitutionsApplied && substitutionsApplied.length > 0) {
        subHtml = substitutionsApplied.map(sub => {
          let prefix = "↪ Helyettesítheted ezzel:";
          if (sub.type === "Alternative") prefix = "↪ Más karakterű lesz, de működik:";
          if (sub.type === "Enhancement") prefix = "💡 Tálalási ötlet:";

          return `<div style="margin: 12px 0; font-size: 0.85rem; color: var(--color-charcoal-warm);"><strong>${prefix}</strong> ${sub.note}</div>`;
        }).join("");
      }

      let badgeLabel = "✓ Minden megvan";

      if (statusType === "SUBSTITUTED_MATCH") {
        badgeLabel = "🔄 Helyettesítve";
      } else if (statusType === "ONE_MISSING_MATCH") {
        badgeLabel = "⚠️ 1 hiányzó elem";
      } else if (statusType === "STRONG_FALLBACK" || statusType === "SPLIT_FALLBACK") {
        badgeLabel = "💡 Ajánlott recept";
      }

      let rescueCount = this.selectedIngredients.length > 0 ? this.selectedIngredients.length : 1;
      let rescueHtml = `<div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed var(--color-input-border); font-size: 0.78rem; color: var(--color-bordeaux-cta); font-weight: 600;">🌱 Kamramentés: ${rescueCount} meglévő alapanyagodat használtad fel ehhez a fogáshoz.</div>`;
      let intoleranceTip = `<div style="margin-top: 6px; font-size: 0.78rem; color: var(--color-terracotta-warm); font-style: italic;">🌱 Mentes alternatíva: Tejtermékek esetén növényi opciókkal (pl. zabtejszín, kókuszjoghurt) is 100%-ban működik.</div>`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h3>${recipe.title}</h3>
          <span style="font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.12em; padding: 4px 12px; border-radius: 12px; background: var(--color-cloud-pink); color: var(--color-bordeaux-cta);">${badgeLabel}</span>
        </div>
        <p style="color: var(--color-charcoal-warm); opacity: 0.82; margin-bottom: 16px; font-size: 0.92rem;">${recipe.description}</p>
        <div style="display: flex; gap: 20px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; color: var(--color-bordeaux-cta); font-weight:600;">
          <span>⏱️ ${recipe.prepTime} perc</span>
          <span>🍽️ ${recipe.servings} adag</span>
        </div>
        ${rescueHtml}
        ${intoleranceTip}
        ${subHtml}
        <button class="btn-couture" onclick="UIController.openRecipeModal('${recipe.id}')" style="margin-top: 16px;">Recept megtekintése</button>
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
        <div style="background: var(--color-cloud-pink); border: 1px solid var(--color-bordeaux-cta); padding: 20px; border-radius: 12px; margin-top: 24px;">
          <h4 class="serif-heading" style="font-size: 1.3rem; margin-bottom: 6px;">🛒 Hiányzik a(z) ${affiliateProduct.name}?</h4>
          <p style="font-size: 0.85rem; margin-bottom: 12px;">Rendeld meg közvetlenül a kamrádba szállítási kedvezménnyel:</p>
          <a href="${affiliateProduct.affiliate_url || '#'}" target="_blank" class="btn-couture" style="text-decoration: none; display:inline-block;">Ajánlat megtekintése &rarr;</a>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <h2 class="serif-heading" style="font-size: 2.2rem; margin-bottom: 12px; color:var(--color-bordeaux-cta);">${recipe.title}</h2>
      <p style="margin-bottom: 24px; color: var(--color-charcoal-warm); opacity:0.85;">${recipe.description}</p>
      
      <h3 class="serif-heading" style="font-size: 1.4rem; margin-bottom: 12px;">Hozzávalók:</h3>
      <ul style="margin-bottom: 24px; padding-left: 20px; font-size:0.9rem;">
        ${recipe.quantities ? recipe.quantities.map(q => `<li style="margin-bottom: 6px;">${q}</li>`).join("") : ""}
      </ul>

      <h3 class="serif-heading" style="font-size: 1.4rem; margin-bottom: 12px;">Elkészítés:</h3>
      <ol style="padding-left: 20px; font-size:0.9rem;">
        ${recipe.instructions.map(step => `<li style="margin-bottom: 10px;">${step}</li>`).join("")}
      </ol>

      ${affiliateHtml}
    `;

    modal.style.display = "flex";
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
