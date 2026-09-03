/**
 * VITA-NATURA RECOMMENDATION ENGINE
 * Súlyozott ajánlás, "Ne vedd meg" bizalomépítő szűrő és Editorial eredménygenerálás
 */

function generateRecommendations(userAnswers) {
  const quizCard = document.getElementById("quizCard");
  const resultZone = document.getElementById("quizResultZone");

  if (quizCard) quizCard.classList.add("hidden");
  if (resultZone) resultZone.classList.remove("hidden");

  // 1. INTEGRITÁS / BIZALOMÉPÍTŐ "NE VEDD MEG" STRATÉGIA
  const isMinimalist = userAnswers.naturalLevel === "food" || 
                        userAnswers.wantsProductRecs === false ||
                        (userAnswers.diet === "balanced" && userAnswers.simplicity === "simple");

  if (isMinimalist) {
    renderMinimalistIntegrityResult(resultZone, userAnswers);
    return;
  }

  // 2. SZEMÉLYRE SZABOTT TERMÉK- ÉS CSOMAGAJÁNLÁS
  renderPersonalizedEditorialResult(resultZone, userAnswers);
}

function renderMinimalistIntegrityResult(container, answers) {
  const goalNames = {
    energy: "Energia és vitalitás",
    sleep: "Pihentetőbb alvás",
    focus: "Fókusz és koncentráció",
    beauty: "Bőr, haj és szépség",
    digestion: "Emésztés és komfortérzet",
    recovery: "Regeneráció",
    general: "Általános jóllét",
    women: "Női jóllét"
  };

  const selectedGoalTitles = answers.goals.map(g => goalNames[g] || "Tudatos rutin").join(" & ");

  container.innerHTML = `
    <div class="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm text-center">
      <span class="inline-block bg-[#F7F3ED] text-[#556B4E] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Személyes Ajánlásod</span>
      <h2 class="text-3xl md:text-4xl font-serif-title text-stone-800 mb-4">A te Vita-Natura fókuszod: ${selectedGoalTitles}</h2>
      <p class="text-stone-600 text-sm max-w-xl mx-auto font-light leading-relaxed mb-8">
        A válaszaid alapján a táplálkozásod kiegyensúlyozott. A Vita-Natura elve, hogy nem ajánlunk fölösleges kiegészítőket. Első lépésként ezt a 3 természetes élelmiszer-alapú rutint javasoljuk:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-xs mb-10">
        <div class="p-6 bg-[#F7F3ED] rounded-2xl border border-stone-200/60">
          <span class="text-stone-400 font-serif-title text-sm block mb-1">01</span>
          <h4 class="font-bold text-stone-800 mb-2">Élelmiszer fókusz</h4>
          <p class="text-stone-600 leading-relaxed font-light">Érdemes beépítened a friss spenótot, tökmagot és a kímélő teljes kiőrlésű gabonákat a szerves mikrotápanyagokért.</p>
        </div>
        <div class="p-6 bg-[#F7F3ED] rounded-2xl border border-stone-200/60">
          <span class="text-stone-400 font-serif-title text-sm block mb-1">02</span>
          <h4 class="font-bold text-stone-800 mb-2">Esti rituálé</h4>
          <p class="text-stone-600 leading-relaxed font-light">Próbálj ki esténként egy csésze langyos citromfű- vagy levendulás gyógynövényteát a kék fény kikapcsolása mellett.</p>
        </div>
        <div class="p-6 bg-[#F7F3ED] rounded-2xl border border-stone-200/60">
          <span class="text-stone-400 font-serif-title text-sm block mb-1">03</span>
          <h4 class="font-bold text-stone-800 mb-2">Konyhai rutin</h4>
          <p class="text-stone-600 leading-relaxed font-light">Használj hidegen sajtolott olívaolajat és friss fűszernövényeket az ételeid természetes ízesítésére.</p>
        </div>
      </div>

      <button onclick="switchTab('pantry')" class="px-8 py-4 bg-[#556B4E] text-white text-xs font-semibold rounded-xl hover:bg-[#44563e] transition">
        Mit főzzek ma? →
      </button>
    </div>
  `;
}

function renderPersonalizedEditorialResult(container, answers) {
  const primaryGoal = answers.goals[0] || "general";
  
  // Megfelelő termékek kiválasztása
  const matchedProducts = VITA_PRODUCTS.filter(p => 
    p.goals.some(g => answers.goals.includes(g))
  ).slice(0, 3);

  // Csomag kiválasztása
  const bundle = VITA_BUNDLES[primaryGoal] || VITA_BUNDLES["general"];

  let productsHtml = matchedProducts.map(p => `
    <div class="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
      <div>
        <span class="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">${p.category}</span>
        <h4 class="font-serif-title text-lg text-stone-800 mb-2">${p.name}</h4>
        <p class="text-xs text-stone-600 font-light leading-relaxed mb-4">${p.description}</p>
        <p class="text-xs font-serif-title text-stone-500 italic mb-4">A válaszaid alapján ez illeszthető be a tudatos rutinodba.</p>
      </div>
      <div class="pt-4 border-t border-stone-100 flex items-center justify-between">
        <span class="font-semibold text-stone-800 text-sm">${p.price} ${p.currency}</span>
        <button onclick="openProductModal('${p.id}')" class="px-4 py-2 bg-[#F7F3ED] text-[#556B4E] text-xs font-semibold rounded-lg hover:bg-[#556B4E] hover:text-white transition">
          Megnézem
        </button>
      </div>
    </div>
  `).join("");

  const currentMode = window.VITA_APP_MODE || "DEMO";

  container.innerHTML = `
    <div class="bg-white p-8 md:p-12 rounded-3xl border border-stone-200 shadow-sm">
      <div class="text-center max-w-xl mx-auto mb-10">
        <span class="inline-block bg-[#F7F3ED] text-[#556B4E] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">Személyes Útmutató</span>
        <h2 class="text-3xl md:text-4xl font-serif-title text-stone-800 mb-3">A te Vita-Natura rutinod</h2>
        <p class="text-stone-600 text-xs md:text-sm font-light leading-relaxed">
          A válaszaid alapján ezt a néhány természetes megközelítést és kiegészítő opciót érdemes most előtérbe helyezned.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        ${productsHtml}
      </div>

      <!-- KEMELT CSOMAG KÁRTYA -->
      <div class="bg-[#F7F3ED] p-8 md:p-10 rounded-3xl border border-stone-200/80 text-center relative">
        <span class="text-[10px] font-semibold text-[#F06292] uppercase tracking-widest block mb-2">Összeállított Szett</span>
        <h3 class="text-2xl font-serif-title text-stone-800 mb-2">${bundle.name}</h3>
        <p class="text-xs text-stone-600 font-light max-w-md mx-auto mb-6 leading-relaxed">${bundle.subtitle}</p>

        <div class="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-stone-200 mb-6 text-xs text-stone-700 font-medium">
          <span>✓ 3 összehangolt elem</span>
          <span class="text-stone-300">|</span>
          <span>10% szett kedvezmény</span>
        </div>

        <div>
          ${currentMode === "DEMO" ? `
            <button onclick="openBundleDemoModal('${bundle.id}')" class="px-8 py-4 bg-[#556B4E] text-white text-xs font-semibold rounded-xl hover:bg-[#44563e] transition shadow-sm">
              Megnézem a nekem összeállított csomagot →
            </button>
            <p class="text-[10px] text-stone-400 mt-2 font-light">Hamarosan egyetlen Vita-Natura kosárból rendelhető.</p>
          ` : `
            <button onclick="addBundleToCart('${bundle.id}')" class="px-8 py-4 bg-[#556B4E] text-white text-xs font-semibold rounded-xl hover:bg-[#44563e] transition shadow-sm">
              Mindet a kosárba teszem →
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}
