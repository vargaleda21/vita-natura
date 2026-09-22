import { GOALS } from './taxonomy.js';

export const VITA_CYCLE_PHASES = [
  {
    id: "menstruation",
    title: "Menstruáció",
    subtitle: "A lelassulás és a befelé figyelés ideje",
    icon: "🌸",
    lifestyleFocus: "Sokan igénylik ilyenkor a több pihenést és a melengető ételeket. Ha te is ezt tapasztalod, engedd meg magadnak a lassabb tempót.",
    nutritionTips: ["Meleg, tápláló levesek és egytálételek", "Rendszeres folyadékpótlás meleg gyógyteákkal"],
    suggestedGoal: GOALS.RECOVERY
  },
  {
    id: "follicular",
    title: "Follikuláris szakasz",
    subtitle: "Az új energiák és a megújulás fázisa",
    icon: "🌱",
    lifestyleFocus: "Ebben az időszakban gyakran könnyebbnek érezzük az új lendületet és a frissítéseket a rutinunkban.",
    nutritionTips: ["Friss, könnyed ételek és zöldségek", "Fehérjedús alapanyagok a megújulásért"],
    suggestedGoal: GOALS.ENERGY
  },
  {
    id: "ovulation",
    title: "Ovuláció",
    subtitle: "A kiteljesedés és az aktív jelenlét ideje",
    icon: "✨",
    lifestyleFocus: "Sokan energikusabbnak érzik magukat, ami jó alkalom lehet az aktív mozgásra vagy a közösségi élményekre.",
    nutritionTips: ["Változatos, színes zöldségtálak", "Könnyű gabonák és roppanós gyümölcsök"],
    suggestedGoal: GOALS.GENERAL_VITALITY
  },
  {
    id: "luteal",
    title: "Luteális szakasz",
    subtitle: "A rákészülés és a lezárás szakasza",
    icon: "🌙",
    lifestyleFocus: "Különösen sokat adhat ilyenkor a kiszámíthatóság, a rendszeres étkezés és a nyugodtabb esti tempó.",
    nutritionTips: ["Lassan felszívódó szénhidrátok (édesburgonya, quinoa)", "Rendszeres hidratálás és kímélő ételek"],
    suggestedGoal: GOALS.SLEEP
  }
];
