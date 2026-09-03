/**
 * VITA-NATURA KÁRTYÁS KÉRDŐÍV ÁLLAPOT- ÉS LÉPTETŐ ENGINE
 */

const VITA_QUIZ_CONFIG = {
  totalSteps: 8,
  currentStep: 1,
  answers: {
    goals: [],
    naturalLevel: "",
    recommendationTypes: [],
    diet: "",
    avoidIngredients: [],
    simplicity: "",
    wantsProductRecs: true,
    frequency: ""
  }
};

function initQuiz() {
  VITA_QUIZ_CONFIG.currentStep = 1;
  VITA_QUIZ_CONFIG.answers = {
    goals: [],
    naturalLevel: "",
    recommendationTypes: [],
    diet: "",
    avoidIngredients: [],
    simplicity: "",
    wantsProductRecs: true,
    frequency: ""
  };
  updateQuizProgress();
}

function updateQuizProgress() {
  const progressBar = document.getElementById("quizProgressBar");
  const progressText = document.getElementById("quizProgressText");
  if (progressBar && progressText) {
    const percentage = (VITA_QUIZ_CONFIG.currentStep / VITA_QUIZ_CONFIG.totalSteps) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `${VITA_QUIZ_CONFIG.currentStep} / ${VITA_QUIZ_CONFIG.totalSteps}`;
  }
}

function selectQuizGoal(goalKey, element) {
  const index = VITA_QUIZ_CONFIG.answers.goals.indexOf(goalKey);
  if (index > -1) {
    VITA_QUIZ_CONFIG.answers.goals.splice(index, 1);
    element.classList.remove("border-[#556B4E]", "bg-[#F7F3ED]");
    element.classList.add("border-stone-200", "bg-white");
  } else {
    if (VITA_QUIZ_CONFIG.answers.goals.length >= 2) {
      alert("A fókusz megőrzése érdekében kérjük, válassz legfeljebb 2 célt!");
      return;
    }
    VITA_QUIZ_CONFIG.answers.goals.push(goalKey);
    element.classList.remove("border-stone-200", "bg-white");
    element.classList.add("border-[#556B4E]", "bg-[#F7F3ED]");
  }
}

function selectSingleOption(field, value, nextStepNum) {
  VITA_QUIZ_CONFIG.answers[field] = value;
  goToQuizStep(nextStepNum);
}

function toggleMultiOption(field, value, element) {
  if (!Array.isArray(VITA_QUIZ_CONFIG.answers[field])) {
    VITA_QUIZ_CONFIG.answers[field] = [];
  }
  const index = VITA_QUIZ_CONFIG.answers[field].indexOf(value);
  if (index > -1) {
    VITA_QUIZ_CONFIG.answers[field].splice(index, 1);
    element.classList.remove("border-[#556B4E]", "bg-[#F7F3ED]");
    element.classList.add("border-stone-200", "bg-white");
  } else {
    VITA_QUIZ_CONFIG.answers[field].push(value);
    element.classList.remove("border-stone-200", "bg-white");
    element.classList.add("border-[#556B4E]", "bg-[#F7F3ED]");
  }
}

function goToQuizStep(stepNum) {
  if (stepNum > VITA_QUIZ_CONFIG.currentStep) {
    if (VITA_QUIZ_CONFIG.currentStep === 1 && VITA_QUIZ_CONFIG.answers.goals.length === 0) {
      alert("Kérjük, válassz ki legalább 1 fókuszterületet a folytatáshoz!");
      return;
    }
  }

  const currentStepEl = document.getElementById(`quizStep${VITA_QUIZ_CONFIG.currentStep}`);
  if (currentStepEl) currentStepEl.classList.add("hidden");

  VITA_QUIZ_CONFIG.currentStep = stepNum;
  updateQuizProgress();

  const nextStepEl = document.getElementById(`quizStep${stepNum}`);
  if (nextStepEl) {
    nextStepEl.classList.remove("hidden");
  }

  if (window.trackVitaEvent) {
    window.trackVitaEvent("quiz_step_viewed", { step: stepNum });
  }
}

function finishQuiz() {
  if (window.trackVitaEvent) {
    window.trackVitaEvent("quiz_completed", VITA_QUIZ_CONFIG.answers);
  }
  generateRecommendations(VITA_QUIZ_CONFIG.answers);
}
