import { VITA_CYCLE_PHASES } from './cycleData.js';
import { buildWomenWellnessResult } from './cycleEngine.js';

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderCycleTab(profileData, containerElement) {
  if (!containerElement) return;

  const result = buildWomenWellnessResult(profileData);

  const phaseCards = VITA_CYCLE_PHASES.map(phase => `
    <div class="editorial-card">
      <span class="entry-card-tag">${escapeHtml(phase.title)}</span>
      <h3 class="entry-card-title">${escapeHtml(phase.subtitle)}</h3>
      <p class="entry-card-desc mb-4">${escapeHtml(phase.lifestyleFocus)}</p>
      <div class="mb-4">
        <strong style="font-size: 0.75rem; color: var(--text-main);">Táplálkozási szempontok:</strong>
        <ul style="padding-left: 1rem; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;">
          ${phase.nutritionTips.map(tip => `<li>${escapeHtml(tip)}</li>`).join('')}
        </ul>
      </div>
      <button class="btn btn-secondary mt-8" data-action="select-phase" data-phase="${escapeHtml(phase.id)}">
        Személyes rutin ehhez a fázishoz →
      </button>
    </div>
  `).join('');

  containerElement.innerHTML = `
    <div class="editorial-result">
      <div class="editorial-header">
        <span class="hero-subtitle">Edukációs Útmutató</span>
        <h2 class="hero-title section-title-sm">${escapeHtml(result.headline)}</h2>
        <p class="hero-description max-w-narrow mx-auto mb-4">${escapeHtml(result.energyText)}</p>
        <p class="hero-description max-w-narrow mx-auto" style="font-size: 0.8125rem;">
          A ciklus különböző szakaszaihoz kapcsolódó életmódbeli és táplálkozási szempontok a mindennapi egyensúlyért.
        </p>
      </div>

      <div class="editorial-grid mb-8">${phaseCards}</div>

      <div class="bundle-box text-center">
        <span class="entry-card-tag">Privacy-first Adatkezelés</span>
        <h3 class="entry-card-title mb-2">A te adataid a te eszközödön maradnak</h3>
        <p class="hero-description max-w-narrow mx-auto mb-4">
          A megadott beállításaidat kizárólag a te böngésződ tárolja. A Vita-Natura nem továbbítja és nem gyűjti a ciklusadataidat.
        </p>
        <button class="btn btn-secondary" data-action="clear-women-profile">Adatok törlése ezen az eszközön</button>
      </div>
    </div>
  `;
}

export function bindCycleEvents(containerElement, eventHandlers) {
  if (!containerElement || containerElement.dataset.eventsBound === "true") return;

  containerElement.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('[data-action]');
    if (!targetBtn) return;

    const action = targetBtn.dataset.action;
    if (action === 'select-phase') {
      eventHandlers.onPhaseSelect(targetBtn.dataset.phase);
    } else if (action === 'clear-women-profile') {
      eventHandlers.onClearProfile();
    }
  });

  containerElement.dataset.eventsBound = "true";
}
