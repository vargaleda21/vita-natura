/**
 * VITA-NATURA KITCHEN & KAMRA ENGINE
 * Relációs recept-alapanyag adatmodell 0-match kizárással
 */

const VITA_INGREDIENTS = [
  { id: "csirkemell", displayName: "Csirkemell / Pulyka", cat: "protein" },
  { id: "marhahus", displayName: "Marhahús / Sovány hús", cat: "protein" },
  { id: "lazac", displayName: "Lazacfilé / Pisztráng", cat: "protein" },
  { id: "tojas", displayName: "Tojás", cat: "protein" },
  { id: "feta", displayName: "Feta / Mozzarella", cat: "protein" },
  { id: "jogurt", displayName: "Görög joghurt / Kefir", cat: "protein" },
  { id: "brokkoli", displayName: "Brokkoli / Karfiol", cat: "veg" },
  { id: "spenot", displayName: "Spenót / Bébispenót", cat: "veg" },
  { id: "cekla", displayName: "Cékla", cat: "veg" },
  { id: "edesburgonya", displayName: "Édesburgonya", cat: "veg" },
  { id: "fokhagyma", displayName: "Fokhagyma", cat: "veg" },
  { id: "citrom", displayName: "Citrom / Lime", cat: "veg" },
  { id: "rizs", displayName: "Barna rizs / Basmati rizs", cat: "grain" },
  { id: "quinoa", displayName: "Quinoa / Hajdina", cat: "grain" },
  { id: "zabpehely", displayName: "Zabpehely", cat: "grain" },
  { id: "tokmag", displayName: "Tökmag / Lenmag", cat: "grain" }
];

const VITA_RECIPES = [
  {
    id: "rec_1",
    title: "Párolt csirkemell brokkolival & basmati rizzsel",
    desc: "Könnyű, jól emészthető tál selymes fokhagymás öntettel és illatos basmati rizzsel.",
    coreIngredients: ["csirkemell", "brokkoli", "rizs"],
    extraIngredients: ["fokhagyma", "citrom", "jogurt"],
    steps: "1. A basmati rizst sós vízben megfőzzük.\n2. A csirkemellet átsütjük, a brokkolit roppanósra gőzöljük.\n3. Citromos-fokhagymás joghurttal tálaljuk."
  },
  {
    id: "rec_2",
    title: "Sült édesburgonya tál bébispenóttal & fetával",
    desc: "Melengető tepsis édesburgonya karikák friss spenóttal és morzsolt fetával.",
    coreIngredients: ["edesburgonya", "spenot", "feta"],
    extraIngredients: ["fokhagyma", "tokmag"],
    steps: "1. Az édesburgonyát tepsiben puhára sütjük.\n2. Összeforgatjuk a friss spenóttal és fetával szórjuk."
  },
  {
    id: "rec_3",
    title: "Pácolt lazacfilé citromos rizzsel",
    desc: "Omega-3 zsírsavakban gazdag kímélő fogás citromlével meglocsolt rizzsel.",
    coreIngredients: ["lazac", "rizs"],
    extraIngredients: ["citrom", "fokhagyma"],
    steps: "1. A lazacot kíméletesen megsütjük.\n2. Citromos basmati rizzsel tálaljuk."
  }
];

function initPantryUI() {
  const container = document.getElementById("pantryGridContainer");
  if (!container) return;
  container.innerHTML = "";

  VITA_INGREDIENTS.forEach(ing => {
    container.innerHTML += `
      <label class="p-3 bg-white rounded-xl border border-stone-200/80 flex items-center justify-between cursor-pointer hover:border-stone-300 transition">
        <span class="text-xs text-stone-700 font-medium">${ing.displayName}</span>
        <input type="checkbox" value="${ing.id}" class="pantry-check text-[#556B4E] rounded focus:ring-0">
      </label>
    `;
  });
}

function findRecipesFromPantry() {
  const checked = document.querySelectorAll(".pantry-check:checked");
  const selectedIds = Array.from(checked).map(c => c.value);
  const resultsGrid = document.getElementById("pantryRecipeResults");

  if (!resultsGrid) return;
  resultsGrid.innerHTML = "";

  if (selectedIds.length === 0) {
    resultsGrid.innerHTML = `
      <p class="col-span-2 text-center text-xs text-stone-500 font-light p-8 bg-white rounded-2xl border border-stone-200">
        Kérjük, válassz ki legalább 1 alapanyagot a hűtődből!
      </p>
    `;
    return;
  }

  // RELEVANCIA ÉS MATCH SZÁMÍTÁS (0-MATCH KIZÁRVA)
  const matches = [];

  VITA_RECIPES.forEach(recipe => {
    const allIngredients = [...recipe.coreIngredients, ...recipe.extraIngredients];
    const usedSelected = selectedIds.filter(id => allIngredients.includes(id));

    if (usedSelected.length > 0) {
      const missingCore = recipe.coreIngredients.filter(id => !selectedIds.includes(id));
      const missingExtras = recipe.extraIngredients.filter(id => !selectedIds.includes(id));

      matches.push({
        recipe,
        matchCount: usedSelected.length,
        totalSelected: selectedIds.length,
        missingCore,
        missingExtras,
        score: (usedSelected.length * 10) - missingCore.length
      });
    }
  });

  if (matches.length === 0) {
    resultsGrid.innerHTML = `
      <p class="col-span-2 text-center text-xs text-stone-500 font-light p-8 bg-white rounded-2xl border border-stone-200">
        Sajnos nem találtunk olyan receptet, amely felhasználná a kiválasztott alapanyagokat.
      </p>
    `;
    return;
  }

  // RANGSOROLÁS
  matches.sort((a, b) => b.score - a.score);

  matches.forEach(item => {
    const r = item.recipe;
    const missingNames = [...item.missingCore, ...item.missingExtras].map(id => {
      const ing = VITA_INGREDIENTS.find(i => i.id === id);
      return ing ? ing.displayName : id;
    });

    resultsGrid.innerHTML += `
      <div class="bg-white p-6 rounded-2xl border border-stone-200/80 flex flex-col justify-between">
        <div>
          <span class="text-[10px] font-semibold text-[#556B4E] bg-[#F7F3ED] px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
            ${item.matchCount}/${item.totalSelected} otthoni alapanyag felhasználva
          </span>
          <h4 class="font-serif-title text-lg text-stone-800 mb-2">${r.title}</h4>
          <p class="text-xs text-stone-600 font-light mb-4 leading-relaxed">${r.desc}</p>
          
          ${missingNames.length > 0 ? `
            <div class="p-3 bg-[#F7F3ED] rounded-xl text-xs text-stone-600 font-light mb-4">
              <span class="font-medium text-stone-700 block mb-1">Még ez hiányzik hozzá:</span>
              ${missingNames.join(", ")}
            </div>
          ` : `
            <div class="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium mb-4">
              ✓ Minden alapanyagod megvan hozzá!
            </div>
          `}
        </div>

        <button onclick="openRecipeModal('${r.id}')" class="w-full py-2.5 bg-[#F7F3ED] text-[#556B4E] text-xs font-semibold rounded-lg hover:bg-[#556B4E] hover:text-white transition">
          Recept megtekintése →
        </button>
      </div>
    `;
  });

  if (window.trackVitaEvent) {
    window.trackVitaEvent("pantry_searched", { ingredients: selectedIds, resultsCount: matches.length });
  }
}
