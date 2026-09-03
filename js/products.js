/**
 * VITA-NATURA TERMÉK- ÉS CSOMAGADATBÁZIS
 * E-kereskedelmi & Affiliate felkészítés
 */

const VITA_PRODUCTS = [
  {
    id: "prod_magnesium",
    name: "Bioaktív Magnézium-Biszglicinát",
    category: "Ásványi anyag & Izomfunkció",
    goals: ["sleep", "recovery", "energy"],
    description: "Kíméletes szerves magnézium-forma a pihentető esti leállásért és az izmok regenerációjáért.",
    price: 4990,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/magnezium",
    available: true,
    bundleEligible: true,
    form: "capsule"
  },
  {
    id: "prod_omega3",
    name: "Mélytengeri Omega-3 Halolaj",
    category: "Esszenciális zsírsavak",
    goals: ["focus", "general", "beauty"],
    description: "Magas EPA és DHA tartalmú tisztított halolaj a kognitív fókusz és a sejtmembránok védelmére.",
    price: 5490,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/omega3",
    available: true,
    bundleEligible: true,
    form: "capsule"
  },
  {
    id: "prod_bcomplex",
    name: "Bioaktív B-Komplex Foláttal",
    category: "Vitamin komplex",
    goals: ["energy", "focus", "general"],
    description: "Aktív B-vitaminok a természetes sejtszintű energiatermelésért és a mentális állóképességért.",
    price: 4290,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1550572017-edd951baa742?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/bcomplex",
    available: true,
    bundleEligible: true,
    form: "capsule"
  },
  {
    id: "prod_collagen",
    name: "Hidrolizált Peptid Kollagén",
    category: "Fehérje & Bőrápolás",
    goals: ["beauty", "recovery"],
    description: "Könnyen hasznosuló I-es és III-as típusú kollagén peptidek C-vitaminnal a bőr és ízületek rugalmasságáért.",
    price: 6890,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/kollagen",
    available: true,
    bundleEligible: true,
    form: "powder"
  },
  {
    id: "prod_herbal_sleep",
    name: "Esti Citromfű & Levendula Infúzió",
    category: "Gyógynövény teakeverék",
    goals: ["sleep", "general"],
    description: "Kézzel válogatott mezei gyógynövények a szintetikum-mentes esti kikapcsolódási rituáléhoz.",
    price: 2990,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/esti-tea",
    available: true,
    bundleEligible: true,
    form: "tea"
  },
  {
    id: "prod_probiotics",
    name: "Kímélő Élőflóra Komplex",
    category: "Mikrobiom támogatás",
    goals: ["digestion", "immun"],
    description: "Célzott törzseket tartalmazó probiotikum prébiotikus rostokkal az emésztési komfortért.",
    price: 5290,
    currency: "Ft",
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80",
    affiliateUrl: "https://partner-webshop.hu/probiotikum",
    available: true,
    bundleEligible: true,
    form: "capsule"
  }
];

const VITA_BUNDLES = {
  "energy": {
    id: "bundle_energy",
    name: "Vita-Natura Életerő Szett",
    subtitle: "Rutin az egyenletes napi energiaszintért és mentális frissességért.",
    productIds: ["prod_bcomplex", "prod_omega3", "prod_magnesium"],
    discountPercentage: 10
  },
  "sleep": {
    id: "bundle_sleep",
    name: "Vita-Natura Esti Pihenés Szett",
    subtitle: "A természetes éjszakai regeneráció és az idegrendszer leállásának támogatása.",
    productIds: ["prod_magnesium", "prod_herbal_sleep", "prod_omega3"],
    discountPercentage: 10
  },
  "beauty": {
    id: "bundle_beauty",
    name: "Vita-Natura Ragyogás Szett",
    subtitle: "Belső táplálás a sejtek megújulásáért és a kötőszövetek rugalmasságáért.",
    productIds: ["prod_collagen", "prod_omega3", "prod_bcomplex"],
    discountPercentage: 10
  },
  "general": {
    id: "bundle_general",
    name: "Vita-Natura Alapvető Egyensúly Szett",
    subtitle: "Komplex, mindennapos életmódbeli támogatás a tudatos rutin részeként.",
    productIds: ["prod_magnesium", "prod_omega3", "prod_bcomplex"],
    discountPercentage: 10
  }
};
