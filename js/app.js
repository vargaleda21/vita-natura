import { VITA_PRODUCTS, VITA_BUNDLES } from './products.js';
import { VITA_RECIPES, VITA_INGREDIENTS, searchPantryRecipes } from './recipes.js';
import { validateDataset } from './validation.js';
import { userProfile, QUIZ_QUESTIONS, saveProfileToStorage, loadProfileFromStorage } from './quiz.js';
import { buildRecommendations } from './recommendations.js';
import { renderRecommendationResult, bindResultZoneEvents } from './renderer.js';
import { loadWomenProfileFromStorage, saveWomenProfileToStorage, clearWomenProfileStorage } from './womenProfile.js';
import { renderCycleTab, bindCycleEvents } from './cycleRenderer.js';

let currentQuizStep = 0;
let activeSelectedPantryIngredients = [];

document.addEventListener("DOMContentLoaded", () => {
  validateDataset(VITA_PRODUCTS, VITA_RECIPES, VITA_BUNDLES, VITA_INGREDIENTS);

  const savedProfile = loadProfileFromStorage();
  if (savedProfile && savedProfile.isComplete) {
    Object.assign(userProfile, savedProfile);
  }

  initTabNavigation();
  initQuiz();
  initPantryGrid();
  initCycleTab();
  initModal();
});

function initTabNavigation() {
  const navQuiz = document.getElementById("navQuiz");
  const navPantry = document.getElementById("navPantry");
  const navCycle = document.getElementById("navCycle");

  const quizSec = document.getElementById("quizTabSection");
  const pantrySec = document.getElementById("pantryTabSection");
  const cycleSec = document.getElementById("cycleTabSection");

  function switchTab(target) {
    [navQuiz, navPantry, navCycle].forEach(btn => btn?.classList.remove("active"));
    [quizSec, pantrySec, cycleSec].forEach(sec => sec?.classList.add("hidden"));

    if (target === "quiz") {
      navQuiz?.classList.add("active");
      quizSec?.classList.remove("hidden");
    } else if (target === "pantry") {
      navPantry?.classList.add("active");
      pantrySec?.classList.remove("hidden");
    } else if (target === "cycle") {
      navCycle?.classList.add("active");
      cycleSec?.classList.remove("hidden");
    }
  }

  document.querySelectorAll("[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  document.querySelectorAll("[data-action='start-quiz']").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab("quiz");
      currentQuizStep = 0;
      userProfile.isComplete = false;
      document.getElementById("quizCard")?.classList.remove("hidden");
      document.getElementById("quizResultZone")?.classList.add("hidden");
      renderQuizStep();
    });
  });
}

function initQuiz() {
  const wrapper = document.getElementById("quizQuestionsWrapper");
  if (!wrapper) return;

  if (userProfile.isComplete) {
    showQuizResult();
  } else {
    renderQuizStep();
  }
}

function renderQuizStep() {
  const wrapper = document.getElementById("quizQuestionsWrapper");
  const progressText = document.getElementById("quizProgressText");
  const progressBar = document.getElementById("quizProgressBar");
  if (!wrapper) return;

  const q = QUIZ_QUESTIONS[currentQuizStep];
  if (!q) return;

  if (progressText) progressText.innerText = `0${q.id} / 08`;
  if (progressBar) progressBar.style.width = `${(q.id / 8) * 100}%`;

  let optionsHtml = q.options.map(opt => `
    <button class="quiz-option-btn" data-value="${opt.value}">${opt.label}</button>
  `).join("");

  wrapper.innerHTML = `
    <h2 class="font-serif-title mb-2">${q.title}</h2>
    <p class="hero-description mb-4">${q.subtitle}</p>
    <div class="quiz-options-grid">${optionsHtml}</div>
    ${currentQuizStep > 0 ? '<button id="quizBackBtn" class="btn btn-secondary mt-8">← Vissza</button>' : ''}
  `;

  wrapper.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.value;
      
      if (q.key === "primaryGoal") userProfile.primaryGoal = val;
      else if (q.key === "secondaryGoals") userProfile.secondaryGoals = val ? [val] : [];
      else if (q.key === "lifestyleContext") userProfile.lifestyleContext = [val];
      else if (q.key === "dietType") userProfile.dietType = val;
      else if (q.key === "supportPreference") userProfile.supportPreference = val;
      else if (q.key === "complexity") userProfile.complexity = val;
      else if (q.key === "productOpenness") userProfile.productOpenness = val;
      else if (q.key === "exclusions") {
        if (val === "milk_protein" || val === "gluten") userProfile.avoidAllergens.push(val);
        else if (val) userProfile.avoidFactors.push(val);
      }

      if (currentQuizStep < QUIZ_QUESTIONS.length - 1) {
        currentQuizStep++;
        renderQuizStep();
      } else {
        userProfile.isComplete = true;
        userProfile.completedAt = new Date().toISOString();
        saveProfileToStorage(userProfile);
        showQuizResult();
      }
    });
  });

  document.getElementById("quizBackBtn")?.addEventListener("click", () => {
    if (currentQuizStep > 0) {
      currentQuizStep--;
      renderQuizStep();
    }
  });
}

function showQuizResult() {
  document.getElementById("quizCard")?.classList.add("hidden");
  const resultZone = document.getElementById("quizResultZone");
  if (!resultZone) return;

  const resultData = buildRecommendations(userProfile, VITA_PRODUCTS, VITA_BUNDLES, VITA_INGREDIENTS);
  
  renderRecommendationResult(
    resultData, 
    resultZone, 
    userProfile.supportPreference, 
    userProfile.productOpenness === "lifestyle_only"
  );

  bindResultZoneEvents(resultZone, {
    onProductClick: (id) => openModalWithProduct(id),
    onBundleClick: (id) => openModalWithBundle(id),
    onPantryNavigate: () => document.getElementById("navPantry")?.click()
  });
}

function initPantryGrid() {
  const container = document.getElementById("pantryGridContainer");
  const findBtn = document.getElementById("findRecipesBtn");
  const resultsWrapper = document.getElementById("pantryRecipeResults");
  if (!container) return;

  container.innerHTML = VITA_INGREDIENTS.map(ing => `
    <button class="quiz-option-btn" data-ing-id="${ing.id}">${ing.displayName}</button>
  `).join("");

  container.querySelectorAll("[data-ing-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.ing-id;
      btn.classList.toggle("selected");
      if (activeSelectedPantryIngredients.includes(id)) {
        activeSelectedPantryIngredients = activeSelectedPantryIngredients.filter(x => x !== id);
      } else {
        activeSelectedPantryIngredients.push(id);
      }
    });
  });

  findBtn?.addEventListener("click", () => {
    const matched = searchPantryRecipes(activeSelectedPantryIngredients, userProfile, VITA_RECIPES, VITA_INGREDIENTS);
    if (!resultsWrapper) return;

    if (matched.length === 0) {
      resultsWrapper.innerHTML = `
        <div class="bundle-box text-center max-w-narrow mx-auto" style="grid-column: 1 / -1;">
          <h3 class="entry-card-title mb-2">Sajnos nem találtunk pontos receptet</h3>
          <p class="hero-description">Próbálj meg több alapanyagot kijelölni a fenti listából.</p>
        </div>
      `;
      return;
    }

    resultsWrapper.innerHTML = matched.map(m => `
      <div class="editorial-card">
        <div>
          <span class="entry-card-tag">${m.isPerfectMatch ? '✓ Minden alapanyag megvan' : 'Hiányzó elemekkel'}</span>
          <h3 class="entry-card-title">${m.recipe.title}</h3>
          <p class="entry-card-desc">${m.recipe.description}</p>
          ${m.missingRequired.length > 0 ? `<p class="match-reason-text">Még hiányzik hozzá: ${m.missingRequired.map(x => x.displayName).join(', ')}</p>` : ''}
        </div>
        <div class="card-action-wrapper">
          <button class="btn btn-secondary" data-action="open-recipe-modal" data-recipe-id="${m.recipe.id}">Recept megtekintése →</button>
        </div>
      </div>
    `).join("");

    resultsWrapper.querySelectorAll("[data-recipe-id]").forEach(btn => {
      btn.addEventListener("click", () => openModalWithRecipe(btn.dataset.recipeId));
    });
  });
}

function initCycleTab() {
  const container = document.getElementById("cycleContainer");
  if (!container) return;

  const womenProf = loadWomenProfileFromStorage();
  renderCycleTab(womenProf, container);

  bindCycleEvents(container, {
    onPhaseSelect: (phaseId) => {
      womenProf.currentPhase = phaseId;
      womenProf.phaseSource = "user_selected";
      saveWomenProfileToStorage(womenProf);
      renderCycleTab(womenProf, container);
    },
    onClearProfile: () => {
      clearWomenProfileStorage();
      renderCycleTab(loadWomenProfileFromStorage(), container);
    }
  });
}

function initModal() {
  const modal = document.getElementById("detailModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });
}

function openModalWithProduct(id) {
  const prod = VITA_PRODUCTS.find(p => p.id === id);
  if (!prod) return;
  showModalContent(`
    <span class="entry-card-tag">${prod.category}</span>
    <h3 class="font-serif-title mb-2">${prod.name}</h3>
    <p class="hero-description mb-4">${prod.description}</p>
    <p class="entry-card-desc mb-4"><strong>Napi használat:</strong> ${prod.usage}</p>
    <p class="entry-card-desc mb-4"><strong>Összetevők:</strong> ${prod.ingredients.map(i => i.name).join(', ')}</p>
    <div class="text-center mt-8">
      <button class="btn btn-primary" onclick="alert('Demo mód: A termék kosárba helyezése jelenleg szimulált.')">Kosárba teszem (${prod.price} ${prod.currency})</button>
    </div>
  `);
}

function openModalWithBundle(id) {
  const bundle = VITA_BUNDLES.find(b => b.id === id);
  if (!bundle) return;
  showModalContent(`
    <span class="entry-card-tag">Személyes Szett</span>
    <h3 class="font-serif-title mb-2">${bundle.name}</h3>
    <p class="hero-description mb-4">${bundle.description}</p>
    <div class="text-center mt-8">
      <button class="btn btn-primary" onclick="alert('Demo mód: A szett megrendelése szimulált.')">Szett megrendelése</button>
    </div>
  `);
}

function openModalWithRecipe(id) {
  const rec = VITA_RECIPES.find(r => r.id === id);
  if (!rec) return;
  showModalContent(`
    <span class="entry-card-tag">Recept útmutató</span>
    <h3 class="font-serif-title mb-2">${rec.title}</h3>
    <p class="hero-description mb-4">${rec.description}</p>
    <p class="entry-card-desc mb-4"><strong>Elkészítési idő:</strong> ${rec.prepTimeMinutes} perc (${rec.difficulty})</p>
    <div class="mb-4">
      <strong>Elkészítés:</strong>
      <ol style="padding-left: 1.25rem; margin-top: 0.5rem; font-size: 0.8125rem; color: var(--text-muted);">
        ${rec.instructions.map(ins => `<li style="margin-bottom: 0.25rem;">${ins}</li>`).join('')}
      </ol>
    </div>
  `);
}

function showModalContent(html) {
  const modal = document.getElementById("detailModal");
  const content = document.getElementById("modalInnerContent");
  if (!modal || !content) return;

  content.innerHTML = html;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}
