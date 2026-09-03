import { VITA_CYCLE_PHASES } from './cycleData.js';
import { validateAndSanitizeWomenProfile } from './womenProfile.js';

export function calculateEstimatedPhase(lastPeriodDateStr, cycleLengthDays, isIrregular) {
  if (isIrregular === true || !lastPeriodDateStr || !cycleLengthDays) {
    return { phase: "unknown", source: "unknown" };
  }

  const lastPeriod = new Date(lastPeriodDateStr);
  const now = new Date();
  const diffDays = Math.floor((now - lastPeriod) / (1000 * 60 * 60 * 24));

  if (diffDays < 0 || diffDays > cycleLengthDays * 2) {
    return { phase: "unknown", source: "unknown" };
  }

  const currentDay = (diffDays % cycleLengthDays) + 1;

  let phase = "follicular";
  if (currentDay <= 5) {
    phase = "menstruation";
  } else if (currentDay <= cycleLengthDays - 15) {
    phase = "follicular";
  } else if (currentDay <= cycleLengthDays - 12) {
    phase = "ovulation";
  } else {
    phase = "luteal";
  }

  return { phase, source: "date_estimated" };
}

export function buildWomenWellnessResult(rawProfile) {
  const profile = validateAndSanitizeWomenProfile(rawProfile);
  
  const phaseObj = VITA_CYCLE_PHASES.find(p => p.id === profile.currentPhase) || null;

  let headline = "Személyes ritmusod támogatása";
  if (profile.phaseSource === "user_selected" && phaseObj) {
    headline = `Megadott szakasz: ${phaseObj.title}`;
  } else if (profile.phaseSource === "date_estimated" && phaseObj) {
    headline = `Becsült szakasz: ${phaseObj.title}`;
  }

  const energyText = profile.currentEnergy === "low" 
    ? "Most pihentetőbb, kímélő tempóra van szükséged." 
    : profile.currentEnergy === "high" 
      ? "Aktív, lendületes szakaszban vagy." 
      : "A mindennapi egyensúly megőrzése a fő fókusz.";

  return {
    meta: {
      phaseSource: profile.phaseSource,
      isAnonymous: profile.phaseSource === "unknown"
    },
    headline,
    energyText,
    phaseDetails: phaseObj,
    suggestedGoal: phaseObj ? phaseObj.suggestedGoal : null
  };
}
