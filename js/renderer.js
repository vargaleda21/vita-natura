import { RECOMMENDATION_ROLES } from './taxonomy.js';
import { getProductMatchReason } from './editorialCopy.js';

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// JAVÍTVA: Megszüntettük a "A(z) A(z) fókusz támogatása támogatása" duplikációt!
export function renderHeaderSection(meta, focusAreas) {
  const primary = focusAreas[0];
  const goalTitle = primary ? escapeHtml(primary.title) : 'mindennapi egyensúly';
  
  return `
    <div class="editorial-header">
      <span class="hero-subtitle">Személyes útmutató</span>
      <h2 id="resultMainHeading" tabindex="-1" class="hero-title section-title-sm">A te Vita-Natura rutinod</h2>
      <p class="hero-description max-w-narrow mx-auto">
        A válaszaid alapján most elsősorban a(z) <strong>${goalTitle}</strong> megőrzése lehet számodra a legfontosabb.
      </p>
    </div>
  `;
}

export function renderDailyRoutineSection(dailyRoutine) {
  if (!dailyRoutine || dailyRoutine.length === 0) return '';
  
  const routineItems = dailyRoutine.map(step => `
    <div class="editorial-card">
      <span class="entry-card-tag">${step.timeOfDay === 'morning' ? 'Reggel' : step.timeOfDay === 'midday' ? 'Napközben' : 'Este'}</span>
      <h3 class="entry-card-title">${escapeHtml(step.title)}</h3>
      <p class="entry-card-desc">${escapeHtml(step.action)}</p>
    </div>
  `).join('');

  return `
    <div class="mb-8">
      <h3 class="font-serif-title mb-4 text-center">Napi Rutin (${dailyRoutine.length} lépés)</h3>
      <div class="editorial-grid">${routineItems}</div>
    </div>
  `;
}

export function renderFoodSection(foodSuggestions) {
  if (!foodSuggestions || foodSuggestions.length === 0) return '';
  
  const foodItems = foodSuggestions.map(item => `
    <div class="editorial-card">
      <span class="entry-card-tag">Konyhai alapanyag</span>
      <h3 class="entry-card-title">${escapeHtml(item.displayName)}</h3>
      <p class="entry-card-desc">Friss, természetes összetevőként könnyen beilleszthető a mindennapi étkezéseidbe.</p>
    </div>
  `).join('');

  return `
    <div class="mb-8">
      <h3 class="font-serif-title mb-4 text-center">Konyhai alapanyagok a céljaidhoz</h3>
      <div class="editorial-grid">${foodItems}</div>
      <div class="text-center mt-8">
        <button class="btn btn-secondary" data-action="navigate-pantry">Nézd meg, mit főzhetsz ezekből a Kamrában →</button>
      </div>
    </div>
  `;
}

export function renderProductsSection(recommendedProducts, primaryGoal) {
  if (!recommendedProducts || recommendedProducts.length === 0) return '';
  
  const productCards = recommendedProducts.map(item => {
    const roleTag = item.contextualRole === RECOMMENDATION_ROLES.PRIMARY_SUPPORT 
      ? 'Elsődleges támogatás' 
      : item.contextualRole === RECOMMENDATION_ROLES.COMPLEMENTARY 
        ? 'Kiegészítő elem' 
        : 'Opcionális rituálé';

    const matchText = getProductMatchReason(item.matchFactors, item.contextualRole, primaryGoal);

    return `
      <div class="editorial-card">
        <div>
          <span class="entry-card-tag">${roleTag}</span>
          <h3 class="entry-card-title">${escapeHtml(item.product.name)}</h3>
          <p class="entry-card-desc">${escapeHtml(item.product.shortDescription)}</p>
          <p class="match-reason-text">${matchText}</p>
        </div>
        <div class="card-action-wrapper">
          <button class="btn btn-secondary" data-action="open-product-modal" data-product-id="${escapeHtml(item.product.id)}">
            Megnézem a részleteket →
          </button>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="mb-8">
      <h3 class="font-serif-title mb-4 text-center">Ajánlott elemek a rutinodhoz</h3>
      <div class="editorial-grid">${productCards}</div>
    </div>
  `;
}

export function renderBundleSection(bundle) {
  if (!bundle) return '';
  
  const itemsList = bundle.items.map(i => `
    <div class="bundle-role-item">
      <strong>${escapeHtml(i.product.name)}</strong> — <span class="entry-card-desc">${i.role === 'primary_support' ? 'Elsődleges elem' : 'Kiegészítő elem'}</span>
    </div>
  `).join('');

  return `
    <div class="bundle-box mb-8">
      <span class="entry-card-tag">Személyes szett</span>
      <h3 class="entry-card-title mb-2">${escapeHtml(bundle.name)}</h3>
      <p class="hero-description max-w-narrow mx-auto mb-4">Ezt a ${bundle.items.length} elemet választottuk a mostani fókuszodhoz.</p>
      <div class="max-w-narrow mx-auto mb-4">${itemsList}</div>
      <button class="btn btn-primary" data-action="open-bundle-modal" data-bundle-id="${escapeHtml(bundle.bundleId)}">
        Megnézem a szett részleteit →
      </button>
    </div>
  `;
}

export function renderLifestyleClosingSection() {
  return `
    <div class="bundle-box mb-8 text-center">
      <span class="entry-card-tag">Tudatos indítás</span>
      <h3 class="entry-card-title mb-2">A te személyes utad</h3>
      <p class="hero-description max-w-narrow mx-auto">
        Most elsősorban a napi rutinodra építettünk. Ezekkel a lépésekkel érdemes kezdened.
      </p>
    </div>
  `;
}

export function renderRecommendationResult(resultData, containerElement, userPreference, isLifestyleOnly) {
  if (!resultData || !containerElement) return;

  let html = '';
  html += renderHeaderSection(resultData.meta, resultData.focusAreas);

  if (isLifestyleOnly || userPreference === "lifestyle_only") {
    html += renderDailyRoutineSection(resultData.dailyRoutine);
    html += renderFoodSection(resultData.foodSuggestions);
    html += renderLifestyleClosingSection();
  } else if (userPreference === "supplements") {
    html += renderDailyRoutineSection(resultData.dailyRoutine);
    if (resultData.bundle) html += renderBundleSection(resultData.bundle);
    if (resultData.recommendedProducts.length > 0) html += renderProductsSection(resultData.recommendedProducts, resultData.focusAreas[0]?.goal);
    html += renderFoodSection(resultData.foodSuggestions);
  } else if (userPreference === "habits") {
    html += renderDailyRoutineSection(resultData.dailyRoutine);
    html += renderFoodSection(resultData.foodSuggestions);
    if (resultData.bundle) html += renderBundleSection(resultData.bundle);
    if (resultData.recommendedProducts.length > 0) html += renderProductsSection(resultData.recommendedProducts, resultData.focusAreas[0]?.goal);
  } else if (userPreference === "food") {
    html += renderFoodSection(resultData.foodSuggestions);
    html += renderDailyRoutineSection(resultData.dailyRoutine);
    if (resultData.bundle) html += renderBundleSection(resultData.bundle);
    if (resultData.recommendedProducts.length > 0) html += renderProductsSection(resultData.recommendedProducts, resultData.focusAreas[0]?.goal);
  } else {
    html += renderDailyRoutineSection(resultData.dailyRoutine);
    if (resultData.bundle) html += renderBundleSection(resultData.bundle);
    if (resultData.recommendedProducts.length > 0) html += renderProductsSection(resultData.recommendedProducts, resultData.focusAreas[0]?.goal);
    html += renderFoodSection(resultData.foodSuggestions);
  }

  containerElement.innerHTML = html;
  containerElement.classList.remove('hidden');

  containerElement.setAttribute('aria-live', 'polite');
  const mainHeading = document.getElementById('resultMainHeading');
  if (mainHeading) mainHeading.focus();
}

export function bindResultZoneEvents(containerElement, eventHandlers) {
  if (!containerElement || containerElement.dataset.eventsBound === "true") return;

  containerElement.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('[data-action]');
    if (!targetBtn) return;

    const action = targetBtn.dataset.action;
    if (action === 'open-product-modal') {
      eventHandlers.onProductClick(targetBtn.dataset.productId);
    } else if (action === 'open-bundle-modal') {
      eventHandlers.onBundleClick(targetBtn.dataset.bundleId);
    } else if (action === 'navigate-pantry') {
      eventHandlers.onPantryNavigate();
    }
  });

  containerElement.dataset.eventsBound = "true";
}
