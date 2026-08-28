/* ---------- Roadmap ---------- */

const ROADMAP_BASE_TASKS = {
  novice: [
    ["Valider l'idée auprès de 10 clients potentiels", 1],
    ["Rédiger le cahier de charge", 1],
    ["Construire un prototype minimal", 3],
    ["Tester le prototype avec 5 utilisateurs", 1],
    ["Lancer une version bêta payante", 2],
  ],
  existante: [
    ["Identifier le point de friction prioritaire", 1],
    ["Cartographier le processus actuel", 1],
    ["Construire l'outil de digitalisation", 3],
    ["Former l'équipe interne", 1],
    ["Mesurer l'impact sur un mois", 4],
  ],
  extension: [
    ["Étudier la réglementation du nouveau marché", 1],
    ["Adapter le pricing local", 1],
    ["Lancer un pilote limité", 3],
    ["Recruter un premier relais local", 2],
    ["Étendre à l'échelle complète", 4],
  ],
};

const ROADMAP_BUDGET_MULTIPLIER = { petit: 1.4, moyen: 1, grand: 0.7 };

export function buildRoadmap(profil, budget) {
  const base = ROADMAP_BASE_TASKS[profil] || ROADMAP_BASE_TASKS.novice;
  const multiplier = ROADMAP_BUDGET_MULTIPLIER[budget] ?? 1;
  return base.map(([task, weeks]) => [task, Math.max(1, Math.round(weeks * multiplier))]);
}

/* ---------- Business model ---------- */

const BUSINESS_MODELS = {
  B2B: {
    pricing: "Abonnement mensuel par siège ou par volume d'usage",
    segments: "PME et indépendants ayant déjà un budget alloué au problème résolu",
    channels: "Prospection directe, partenariats sectoriels, bouche-à-oreille B2B",
  },
  B2C: {
    pricing: "Freemium avec palier payant, ou abonnement mensuel simple",
    segments: "Particuliers urbains, premiers adoptants sensibles au gain de temps",
    channels: "Réseaux sociaux, référencement local, recommandation entre utilisateurs",
  },
  B2G: {
    pricing: "Licence annuelle ou contrat de prestation sur devis",
    segments: "Administrations et collectivités locales",
    channels: "Appels d'offres, réseau institutionnel, démonstrations directes",
  },
};

export function buildBusinessModel(client) {
  return BUSINESS_MODELS[client] || BUSINESS_MODELS.B2C;
}

/* ---------- Plan marketing 30/60/90 ---------- */

const MARKETING_PLANS_BY_BUDGET = {
  petit: {
    30: "Poster 3 fois par semaine sur les réseaux sociaux locaux, contacter 20 clients potentiels directement.",
    60: "Recueillir les 5 premiers retours clients, ajuster le message selon leurs mots exacts.",
    90: "Mettre en place un système de recommandation simple (parrainage) entre utilisateurs.",
  },
  moyen: {
    30: "Lancer une page de présentation avec pré-réservation, campagne ciblée sur les réseaux sociaux.",
    60: "Lancer un programme de parrainage et solliciter les premiers témoignages clients.",
    90: "Tester un canal payant à petite échelle (publicité ciblée) et mesurer le coût d'acquisition.",
  },
  grand: {
    30: "Campagne de lancement multi-canal, partenariats avec des acteurs relais du secteur.",
    60: "Optimiser les canaux les plus performants, lancer du contenu régulier (blog, réseaux).",
    90: "Structurer une équipe commerciale légère ou des ambassadeurs rémunérés à la performance.",
  },
};

export function buildMarketingPlan(budget) {
  return MARKETING_PLANS_BY_BUDGET[budget] || MARKETING_PLANS_BY_BUDGET.moyen;
}

/* ---------- Hosting Advisor ---------- */

const HOSTING_RECOMMENDATIONS = {
  "petit-faible": { plan: "Hébergement Web Premium", estimate: "3 – 6 $/mois", reason: "Suffisant pour un site vitrine ou un SaaS en phase de test, avec un budget limité." },
  "petit-moyen": { plan: "Hébergement Web Business", estimate: "6 – 10 $/mois", reason: "Plus de ressources pour absorber une audience croissante sans changer d'offre trop vite." },
  "moyen-faible": { plan: "Hébergement Web Business", estimate: "6 – 10 $/mois", reason: "Bon équilibre entre budget et marge de croissance pour un SaaS en lancement." },
  "moyen-moyen": { plan: "Hébergement Cloud Startup", estimate: "10 – 20 $/mois", reason: "Ressources dédiées, adapté à un trafic qui commence à être significatif." },
  "moyen-fort": { plan: "VPS (KVM 2 ou supérieur)", estimate: "20 – 40 $/mois", reason: "Le trafic dépasse ce qu'un hébergement mutualisé peut absorber confortablement." },
  "grand-faible": { plan: "Hébergement Cloud Startup", estimate: "10 – 20 $/mois", reason: "Budget confortable, pas besoin de sur-dimensionner tant que le trafic reste modéré." },
  "grand-moyen": { plan: "VPS (KVM 2 – KVM 4)", estimate: "20 – 50 $/mois", reason: "Un serveur dédié virtuel donne plus de contrôle et de marge à mesure que le produit grandit." },
  "grand-fort": { plan: "VPS (KVM 4 ou supérieur) + CDN", estimate: "50 $/mois et plus", reason: "À ce niveau de trafic, isole la base de données et ajoute un CDN pour les assets statiques." },
};

export function buildHostingRecommendation(budget, traffic = "faible") {
  const key = `${budget}-${traffic}`;
  return HOSTING_RECOMMENDATIONS[key] || HOSTING_RECOMMENDATIONS["moyen-moyen"];
}

/* ---------- Cahier de charge ---------- */

const PROFIL_LABELS = {
  novice: "un nouveau projet",
  existante: "la digitalisation d'une entreprise existante",
  extension: "l'extension d'une activité existante",
};

export function buildCahierDeChargeText({ projectName, description, profil }) {
  const date = new Date().toLocaleDateString("fr-FR");
  return `CAHIER DE CHARGE
${projectName || "Nom du projet à définir"}
Généré via Zimdalo — ${date}

1. CONTEXTE
Ce projet concerne ${PROFIL_LABELS[profil] || PROFIL_LABELS.novice}.

2. DESCRIPTION
${description || "Décris ici l'objectif principal du projet."}

3. OBJECTIFS
- Définir clairement le problème résolu et le public visé.
- Lister les fonctionnalités essentielles avant les fonctionnalités secondaires.
- Prévoir un budget et un délai réalistes pour la première version.

4. FONCTIONNALITÉS PRINCIPALES
- [À compléter selon les priorités du projet]

5. CONTRAINTES TECHNIQUES
- [Hébergement, budget, délais, conformité locale le cas échéant]

6. PROCHAINES ÉTAPES
- Valider ce document avec les parties prenantes.
- Prioriser les fonctionnalités pour une première version (MVP).
- Estimer le budget et le planning de développement.
`;
}

/* ---------- Simulation de revenus ---------- */

export function simulateRevenue({ startMrr, growthRate, months }) {
  const points = [];
  let mrr = startMrr;
  for (let m = 1; m <= months; m++) {
    mrr = mrr * (1 + growthRate / 100);
    points.push({ month: m, mrr: Math.round(mrr) });
  }
  return points;
}

/* ---------- Estimation de prix de revente ---------- */

export function estimateResaleValue(monthlyMrr) {
  // Multiple simplifié : 10x le MRR mensuel, cohérent avec les listings de la marketplace.
  return Math.round(monthlyMrr * 10);
}
