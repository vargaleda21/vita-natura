/**
 * VITA-NATURA MAIN APPLICATION CONTROLLER
 * Eseménynapítógép (Analytics Event Bus), Modális ablakok és Módváltó
 */

// Architektúra mód: "DEMO" | "AFFILIATE" | "SHOP"
window.VITA_APP_MODE = "DEMO";

document.addEventListener("DOMContentLoaded", () => {
  initPantryUI();
  initQuiz();
});

// ANALITIKA ESEMÉNYNAPLÓ
window.trackVitaEvent = function(eventName, payload) {
  console.log(`[VITA ANALYTICS EVENT]: ${eventName}`, payload || {});
  // Később könnyen beköthető: gtag('event', eventName, payload);
};

function switchTab(tabId) {
  const tabs = ['pantry', 'quiz', 'symptoms', 'lifestyle', 'cycle', 'packages'];
  
  tabs.forEach(t => {
    const sec = document.getElementById(t + 'TabSection');
    const nav = document.getElementById('nav' + t.charAt(0).toUpperCase() + t.slice(1));
    if (sec) sec.classList.add('hidden');
    if (nav) {
      nav.classList.remove('bg-[#556B4E]', 'text-white', 'shadow-sm');
      nav.classList.add('text-stone-600', 'hover:bg-stone-200/50');
    }
  });

  const activeSec = document.getElementById(tabId + 'TabSection');
  const activeNav = document.getElementById('nav' + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  
  if (activeSec) activeSec.classList.remove('hidden');
  if (activeNav) {
    activeNav.classList.remove('text-stone-600', 'hover:bg-stone-200/50');
    activeNav.classList.add('bg-[#556B4E]', 'text-white', 'shadow-sm');
  }

  if (window.trackVitaEvent) {
    window.trackVitaEvent("tab_switched", { tab: tabId });
  }
}

function openProductModal(productId) {
  const product = VITA_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalInner = document.getElementById("modalInnerContent");
  const modal = document.getElementById("detailModal");

  modalInner.innerHTML = `
    <span class="text-[10px] font-semibold text-stone-400 uppercase tracking-widest block mb-1">${product.category}</span>
    <h3 class="text-2xl font-serif-title text-stone-800 mb-2">${product.name}</h3>
    <p class="text-xs text-stone-600 font-light mb-6 leading-relaxed">${product.description}</p>
    
    <div class="p-4 bg-[#F7F3ED] rounded-xl mb-6 text-xs text-stone-700">
      <span class="font-semibold block mb-1">Miért került az ajánlásodba?</span>
      Illeszkedik a válaszaid alapján meghatározott természetes jólléti fókuszodhoz.
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-stone-100">
      <span class="text-base font-semibold text-stone-800">${product.price} ${product.currency}</span>
      <a href="${product.affiliateUrl}" target="_blank" class="px-6 py-3 bg-[#556B4E] text-white text-xs font-semibold rounded-lg hover:bg-[#44563e] transition">
        Megnevezett beszállítóhoz →
      </a>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function openBundleDemoModal(bundleId) {
  const modalInner = document.getElementById("modalInnerContent");
  const modal = document.getElementById("detailModal");

  modalInner.innerHTML = `
    <span class="text-[10px] font-semibold text-[#F06292] uppercase tracking-widest block mb-1">Előnézet</span>
    <h3 class="text-2xl font-serif-title text-stone-800 mb-2">Vita-Natura Csomag</h3>
    <p class="text-xs text-stone-600 font-light mb-6 leading-relaxed">
      A választott szett szinergikusan tartalmazza a személyes ajánlásodban szereplő elemeket.
    </p>

    <div class="p-4 bg-[#F7F3ED] rounded-2xl mb-6 text-xs text-stone-700 space-y-2">
      <div class="font-medium text-stone-800">Hamarosan egyetlen kosárból rendelhető!</div>
      <p class="font-light text-stone-500">A Vita-Natura saját webshopjában a jövőben egyetlen rendelésben, egyetlen szállítással érheted el a személyes szettedet.</p>
    </div>

    <button onclick="closeDetailModal()" class="w-full py-3 bg-[#556B4E] text-white text-xs font-semibold rounded-lg hover:bg-[#44563e] transition">
      Értem, bezárás
    </button>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}
