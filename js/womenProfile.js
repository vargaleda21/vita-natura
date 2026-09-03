export const initialWomenProfile = Object.freeze({
  currentPhase: "unknown",
  phaseSource: "unknown",
  isCycleIrregular: null,
  lastPeriodDate: null,
  cycleLengthDays: null,
  currentEnergy: null,
  movementPreference: null,
  lifestyleFocus: [],
  updatedAt: null
});

export function validateAndSanitizeWomenProfile(input) {
  if (!input || typeof input !== 'object') return { ...initialWomenProfile };

  const sanitized = { ...initialWomenProfile, ...input };

  const validPhases = ["menstruation", "follicular", "ovulation", "luteal", "unknown"];
  if (!validPhases.includes(sanitized.currentPhase)) sanitized.currentPhase = "unknown";

  const validSources = ["user_selected", "date_estimated", "unknown"];
  if (!validSources.includes(sanitized.phaseSource)) sanitized.phaseSource = "unknown";

  if (typeof sanitized.isCycleIrregular !== 'boolean') sanitized.isCycleIrregular = null;

  if (typeof sanitized.cycleLengthDays === 'number') {
    if (sanitized.cycleLengthDays < 20 || sanitized.cycleLengthDays > 45) {
      sanitized.cycleLengthDays = null;
    }
  } else {
    sanitized.cycleLengthDays = null;
  }

  if (sanitized.lastPeriodDate && typeof sanitized.lastPeriodDate === 'string') {
    const d = new Date(sanitized.lastPeriodDate);
    if (isNaN(d.getTime())) sanitized.lastPeriodDate = null;
  } else {
    sanitized.lastPeriodDate = null;
  }

  // INVARIANT CHECK
  if (sanitized.phaseSource === "date_estimated") {
    const isValidDate = sanitized.lastPeriodDate !== null;
    const isValidLength = sanitized.cycleLengthDays !== null;
    const isNotIrregular = sanitized.isCycleIrregular !== true;

    if (!isValidDate || !isValidLength || !isNotIrregular) {
      sanitized.phaseSource = "unknown";
      sanitized.currentPhase = "unknown";
    }
  }

  if (sanitized.phaseSource === "unknown") {
    sanitized.currentPhase = "unknown";
  }

  if (sanitized.phaseSource === "user_selected" && sanitized.currentPhase === "unknown") {
    sanitized.phaseSource = "unknown";
  }

  if (!Array.isArray(sanitized.lifestyleFocus)) {
    sanitized.lifestyleFocus = [];
  } else {
    sanitized.lifestyleFocus = sanitized.lifestyleFocus.slice(0, 2);
  }

  return sanitized;
}

export function saveWomenProfileToStorage(profile) {
  try {
    const valid = validateAndSanitizeWomenProfile(profile);
    valid.updatedAt = new Date().toISOString();
    localStorage.setItem("vitanatura_women_profile_v3", JSON.stringify(valid));
  } catch (e) {
    console.warn("Women profile storage save error:", e);
  }
}

export function loadWomenProfileFromStorage() {
  try {
    const raw = localStorage.getItem("vitanatura_women_profile_v3");
    if (!raw) return { ...initialWomenProfile };
    return validateAndSanitizeWomenProfile(JSON.parse(raw));
  } catch (e) {
    return { ...initialWomenProfile };
  }
}

export function clearWomenProfileStorage() {
  try {
    localStorage.removeItem("vitanatura_women_profile_v3");
  } catch (e) {
    console.warn("Women profile storage clear error:", e);
  }
}
