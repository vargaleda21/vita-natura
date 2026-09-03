function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return unsafe;
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getProductMatchReason(matchFactors, contextualRole, goalName) {
  if (matchFactors.primaryGoalMatch && matchFactors.lifestyleMatches.length > 0) {
    return escapeHtml(`Ez az elem közvetlenül a(z) ${goalName || 'választott'} fókuszodhoz illeszkedik, és figyelembe veszi a mindennapi ritmusodat.`);
  }
  if (matchFactors.primaryGoalMatch) {
    return escapeHtml(`A döntési logika alapján ez a termék a(z) ${goalName || 'választott'} fókuszod elsődleges támogatása.`);
  }
  if (matchFactors.secondaryGoalMatch) {
    return escapeHtml(`A másodlagos jólléti célod elérését kiegészítő elem.`);
  }
  return "Kímélő opcióként illeszthető be a napi rutinodba.";
}
