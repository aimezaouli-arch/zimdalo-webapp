export const features = [
  ["◆", "Tableau de bord unifié", "Suis ton parcours, tes outils et ta marketplace depuis un seul écran."],
  ["◆", "Rôles multi-utilisateurs", "Invite associés, agents ou employés avec des accès adaptés."],
  ["◆", "Notifications intelligentes", "Reçois une alerte quand une étape ou une échéance approche."],
  ["◆", "Export automatique", "Chaque document généré s'exporte en PDF, prêt à partager."],
  ["◆", "Paiement local", "Connecté à Orange Money, Wave et Mobile Money selon les pays."],
  ["◆", "Mode équipe", "Avance à plusieurs sur le même parcours, avec un historique partagé."],
  ["◆", "Sauvegarde continue", "Ta progression est enregistrée automatiquement à chaque étape."],
  ["◆", "Multi-langue", "Interface disponible en français et en anglais."],
];

export const listings = [
  {
    id: "facture-ci",
    name: "FactureCI",
    tagline: "Facturation OHADA pour PME",
    zone: "Abidjan, Côte d'Ivoire",
    mrr: "420 $ MRR",
    price: "4 200 $",
    founded: "2024",
    stack: ["React", "Node.js", "PostgreSQL"],
    description:
      "FactureCI automatise la facturation conforme OHADA pour les PME ivoiriennes : génération de factures, relances automatiques, export comptable. Utilisé par plus de 60 entreprises actives.",
    included: ["Code source complet", "Documentation technique", "Historique de revenus 12 mois", "Base de 60+ clients actifs"],
  },
  {
    id: "stock-agile",
    name: "StockAgile",
    tagline: "Gestion de stock multi-boutiques",
    zone: "Dakar, Sénégal",
    mrr: "310 $ MRR",
    price: "3 100 $",
    founded: "2023",
    stack: ["Vue.js", "Express", "MySQL"],
    description:
      "StockAgile centralise la gestion de stock pour des commerces multi-points de vente : suivi en temps réel, alertes de rupture, rapports par boutique.",
    included: ["Code source complet", "Documentation technique", "Historique de revenus 8 mois", "Intégrations Mobile Money"],
  },
  {
    id: "rendezvous-plus",
    name: "RendezVous+",
    tagline: "Prise de RDV pour cliniques",
    zone: "Abidjan, Côte d'Ivoire",
    mrr: "680 $ MRR",
    price: "7 500 $",
    founded: "2023",
    stack: ["React", "Supabase", "Tailwind"],
    description:
      "RendezVous+ permet aux cliniques et salons de gérer leurs rendez-vous en ligne avec rappels automatiques par SMS. Croissance stable depuis 14 mois.",
    included: ["Code source complet", "Documentation technique", "Historique de revenus 14 mois", "Base de 20 cliniques partenaires"],
  },
  {
    id: "paye-facile",
    name: "PayeFacile",
    tagline: "Paie et déclarations sociales",
    zone: "Cotonou, Bénin",
    mrr: "250 $ MRR",
    price: "2 600 $",
    founded: "2024",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    description:
      "PayeFacile simplifie le calcul de la paie et les déclarations sociales pour les PME béninoises, avec mise à jour automatique des barèmes.",
    included: ["Code source complet", "Documentation technique", "Historique de revenus 6 mois", "Barèmes sociaux à jour"],
  },
];

export const planSlugs = {
  Free: "explorer",
  Basic: "builder",
  Pro: "pro-saas",
  Premium: "enterprise",
};


export const plans = {
  afrique: [
    ["Explorer", "Free", "Gratuit", "", ["Accès limité au parcours", "1 idée générée", "Support communauté"]],
    ["Builder", "Basic", "7 $", "/mois", ["Parcours complet", "Outils principaux", "Export PDF"]],
    ["Pro SaaS", "Pro", "25 $", "/mois", ["Tout Basic", "Formations avancées", "Templates pro", "Support rapide"]],
    ["Enterprise", "Premium", "Sur devis", "", ["Coaching 1:1", "Partenaires vérifiés", "Analytics avancés"]],
  ],
  intl: [
    ["Explorer", "Free", "Gratuit", "", ["Accès limité au parcours", "1 idée générée", "Support communauté"]],
    ["Builder", "Basic", "12 $", "/mois", ["Parcours complet", "Outils principaux", "Export PDF"]],
    ["Pro SaaS", "Pro", "39 $", "/mois", ["Tout Basic", "Formations avancées", "Templates pro", "Support rapide"]],
    ["Enterprise", "Premium", "100–200 $", "/mois", ["Coaching 1:1", "Partenaires vérifiés", "Analytics avancés"]],
  ],
};

export const ideaBank = {
  B2B: {
    ci: [
      ["FactureFlow", "Facturation OHADA automatisée pour PME", 78],
      ["StockPilot", "Gestion de stock multi-boutiques", 71],
      ["PayeSimple", "Paie et déclarations sociales", 65],
    ],
    afrique: [
      ["ContratNet", "Gestion électronique de contrats B2B", 74],
      ["FournisseurMatch", "Mise en relation acheteurs / fournisseurs", 69],
      ["FactureFlow", "Facturation automatisée régionale", 76],
    ],
    intl: [
      ["InvoiceOps", "Facturation multi-devises pour PME", 72],
      ["SupplyLink", "Suivi de chaîne d'approvisionnement", 68],
      ["PayrollEase", "Paie internationale simplifiée", 70],
    ],
  },
  B2C: {
    ci: [
      ["RendezVous+", "Prise de RDV pour cliniques et salons", 80],
      ["EcoleLink", "Communication écoles-parents", 66],
      ["MarketPlace Local", "Petites annonces de quartier", 60],
    ],
    afrique: [
      ["SantéProche", "Prise de RDV médicaux régionale", 75],
      ["EduConnect", "Suivi scolaire pour familles", 64],
      ["TontineDigitale", "Gestion d'épargne collective", 70],
    ],
    intl: [
      ["BookMyDoc", "Prise de RDV santé en ligne", 73],
      ["FamilyBoard", "Organisation familiale partagée", 62],
      ["CircleSave", "Épargne collaborative entre amis", 67],
    ],
  },
  B2G: {
    ci: [
      ["GuichetCivil", "Dématérialisation de démarches administratives", 69],
      ["CollecteTaxe", "Suivi des taxes municipales", 58],
      ["ArchiveGov", "Archivage numérique des services publics", 55],
    ],
    afrique: [
      ["EtatCivilNet", "Actes civils dématérialisés", 67],
      ["TaxeRegion", "Suivi fiscal pour collectivités", 60],
      ["ArchiveGov", "Archivage des institutions publiques", 57],
    ],
    intl: [
      ["CivicFlow", "Services citoyens dématérialisés", 65],
      ["GovTax", "Suivi fiscal pour administrations", 59],
      ["PublicArchive", "Archivage numérique institutionnel", 56],
    ],
  },
};

export const profilCopy = {
  novice: {
    head: "3 idées adaptées à ton profil",
    lead: "Choisis une idée pour lancer ton parcours complet.",
    cta: "Choisir cette idée",
    followupLabel: "Idée choisie :",
  },
  existante: {
    head: "3 pistes de digitalisation pour ton entreprise",
    lead: "Choisis la piste qui correspond le mieux à ton activité actuelle.",
    cta: "Choisir cette piste",
    followupLabel: "Piste choisie :",
  },
  extension: {
    head: "3 pistes d'extension pour ton activité",
    lead: "Choisis la piste sur laquelle étendre ton activité.",
    cta: "Choisir cette piste",
    followupLabel: "Extension choisie :",
  },
};

export function priceFor(budget) {
  if (budget === "petit") return ["9 $", "180 $ MRR"];
  if (budget === "moyen") return ["19 $", "540 $ MRR"];
  return ["39 $", "1 200 $ MRR"];
}

export const steps = [
  ["1", "Onboarding", "Quatre questions : situation de départ (nouveau projet, entreprise existante, extension), type de client visé, budget disponible, pays ou zone."],
  ["2", "Génération d'idées", "Trois idées ou pistes adaptées, avec marché, prix, MRR estimé et score de viabilité."],
  ["3", "Choix d'une piste", "L'utilisateur sélectionne la piste sur laquelle il souhaite avancer."],
  ["4", "Parcours complet généré", "Roadmap, cahier de charge, plan marketing, pricing, estimation de revenus et de prix de revente."],
  ["5", "Accès étape par étape", "Une page par étape, deux à trois questions maximum, un bouton d'action principal."],
  ["6", "Feedback simple", "Une question de satisfaction, trois options, un champ optionnel d'une ligne."],
];

export const articles = [
  {
    id: "idee-viable",
    cat: "Idéation",
    date: "3 juil. 2026",
    read: "4 min",
    title: "Comment savoir si ton idée de SaaS est viable",
    excerpt: "Trois questions à te poser avant d'investir du temps ou du budget dans une idée.",
    body: [
      "Une idée n'est pas viable parce qu'elle te plaît — elle l'est parce que quelqu'un est prêt à payer pour le problème qu'elle résout, et que ce quelqu'un est assez nombreux pour construire une activité durable.",
      "Commence par vérifier la capacité à payer : ton client cible a-t-il déjà un budget alloué à ce type de problème, même sous une autre forme (Excel, cahier, prestataire externe) ? Si le budget n'existe pas encore, il faudra le créer, ce qui prend plus de temps.",
      "Ensuite, regarde la taille du marché atteignable dans ta zone de lancement : mieux vaut un petit marché que tu domines qu'un grand marché où tu es invisible.",
      "Enfin, teste le désir de payer avant de coder quoi que ce soit : une simple page de présentation avec un bouton de pré-réservation te donnera plus d'information qu'un mois de développement.",
    ],
  },
  {
    id: "digitaliser-entreprise",
    cat: "Digitalisation",
    date: "28 juin 2026",
    read: "5 min",
    title: "Digitaliser une entreprise existante : par où commencer",
    excerpt: "La digitalisation ne veut pas dire tout reconstruire — voici comment prioriser.",
    body: [
      "Quand une entreprise existe déjà physiquement, la tentation est de vouloir tout digitaliser d'un coup : ventes, stock, facturation, communication client. C'est souvent le meilleur moyen de ne rien terminer.",
      "Commence par le point de friction le plus coûteux aujourd'hui — celui qui te fait perdre du temps, de l'argent, ou des clients chaque semaine. C'est généralement là que la digitalisation aura le retour sur investissement le plus rapide.",
      "Digitalise en gardant le processus existant reconnaissable pour tes équipes : un outil que personne n'utilise parce qu'il change trop de choses d'un coup n'apporte aucune valeur.",
      "Mesure l'impact sur un mois avant de passer au chantier suivant : temps gagné, erreurs évitées, satisfaction client. Ces chiffres serviront aussi à justifier la suite du budget.",
    ],
  },
  {
    id: "etendre-activite",
    cat: "Extension",
    date: "20 juin 2026",
    read: "6 min",
    title: "Étendre son activité vers un nouveau pays : les pièges à éviter",
    excerpt: "Ce qui fonctionne dans un pays ne se copie pas automatiquement dans un autre.",
    body: [
      "Le premier piège est de considérer une zone voisine comme identique à celle où l'activité fonctionne déjà. Les habitudes de paiement, la réglementation et la concurrence locale peuvent être très différentes d'un pays à l'autre, même au sein d'une même région.",
      "Avant d'étendre, vérifie le cadre réglementaire applicable (fiscalité, droit du travail, cadre OHADA le cas échéant) : ce qui est simple dans un pays peut demander une structure juridique locale ailleurs.",
      "Adapte le pricing plutôt que de le copier : le pouvoir d'achat et la perception de la valeur varient fortement d'un marché à l'autre.",
      "Enfin, commence petit : un pilote limité dans le nouveau pays permet de corriger les erreurs avant d'engager un budget d'extension complet.",
    ],
  },
  {
    id: "pricing-par-pays",
    cat: "Pricing",
    date: "12 juin 2026",
    read: "4 min",
    title: "Pricing par pays : pourquoi un même SaaS ne coûte pas le même prix partout",
    excerpt: "Le pouvoir d'achat local change complètement la perception d'un prix.",
    body: [
      "Un prix qui semble raisonnable dans un marché peut être perçu comme excessif — ou au contraire trop bas pour être crédible — dans un autre.",
      "Le pricing par pays ne consiste pas à appliquer une conversion de devise brute, mais à ajuster le prix perçu en fonction du pouvoir d'achat local et de la concurrence existante sur ce marché précis.",
      "Une bonne pratique consiste à définir un prix de référence international, puis à appliquer des paliers régionaux documentés, plutôt que de négocier au cas par cas.",
      "Garde une trace des ajustements : ils te serviront de base de données pour les futures extensions vers d'autres pays.",
    ],
  },
  {
    id: "ohada-facturation",
    cat: "Conformité",
    date: "5 juin 2026",
    read: "5 min",
    title: "OHADA et facturation : ce que ton SaaS doit respecter",
    excerpt: "Les bases à connaître si ton SaaS gère de la facturation dans l'espace OHADA.",
    body: [
      "L'espace OHADA impose des règles précises sur la forme et le contenu des documents comptables et des factures. Un SaaS qui génère des factures pour des entreprises de cette zone doit en tenir compte dès la conception.",
      "Les références de transaction doivent rester traçables et cohérentes dans le temps : c'est un point de contrôle fréquent lors d'un audit.",
      "Les devises, les mentions légales obligatoires et les délais de conservation des documents varient selon le pays précis au sein de l'espace OHADA — une vérification locale reste nécessaire.",
      "Prévoir cette conformité dès le départ évite une refonte coûteuse du module de facturation une fois le SaaS déjà en production.",
    ],
  },
  {
    id: "prix-revente",
    cat: "Marketplace",
    date: "29 mai 2026",
    read: "4 min",
    title: "Vendre son SaaS : comment est calculé le prix de revente",
    excerpt: "Les multiples de valorisation utilisés sur la marketplace, expliqués simplement.",
    body: [
      "Le prix de revente d'un SaaS se calcule généralement à partir d'un multiple appliqué au revenu récurrent mensuel (MRR), et non au chiffre d'affaires total.",
      "Ce multiple varie selon la croissance, la rétention des clients, et la dépendance du SaaS à son fondateur : un SaaS qui tourne sans intervention quotidienne se vend plus cher qu'un SaaS qui dépend entièrement d'une seule personne.",
      "La marketplace ajuste aussi ce multiple selon le marché de destination : un acheteur local et un acheteur international n'évaluent pas toujours le risque de la même façon.",
      "Avant de mettre en vente, prépare une documentation claire : historique de revenus, code source, dépendances techniques. Cela accélère la vente et rassure l'acheteur.",
    ],
  },
];

export const formations = [
  ["Débutant", "Valider son idée avant de construire", "Apprends à tester la demande réelle avant d'investir du temps ou du budget.", "45 min"],
  ["Débutant", "Rédiger un cahier de charge clair", "Structure ton projet pour qu'un développeur ou une équipe puisse le comprendre sans toi.", "1 h 10"],
  ["Intermédiaire", "Bases techniques pour non-développeurs", "Comprends le vocabulaire technique essentiel pour piloter ton projet sans coder.", "1 h 30"],
  ["Intermédiaire", "Marketing pour SaaS naissant", "Construis un plan d'acquisition simple pour tes 100 premiers clients.", "1 h"],
  ["Avancé", "Construire son pricing par marché", "Ajuste ton prix selon le pays et le pouvoir d'achat de ta cible.", "50 min"],
  ["Avancé", "Préparer la revente de son SaaS", "Documente et valorise ton SaaS pour une future mise en vente sur la marketplace.", "1 h 15"],
];

export const successStories = [
  ["+3×", "MRR en 6 mois", "FactureFlow", "Facturation OHADA · Côte d'Ivoire", "Parti d'un tableur interne, le fondateur a transformé son outil de facturation en SaaS ouvert à d'autres PME de son secteur."],
  ["12 pays", "Zone couverte", "StockAgile", "Gestion de stock · Afrique de l'Ouest", "Une entreprise de distribution déjà existante a digitalisé sa gestion de stock avant d'étendre l'outil à d'autres commerces partenaires."],
  ["7 500 $", "Prix de revente", "RendezVous+", "Prise de RDV santé · Côte d'Ivoire", "Lancé comme projet secondaire, ce SaaS de prise de rendez-vous a été revendu sur la marketplace après 14 mois d'exploitation."],
  ["4 employés", "Équipe formée", "PayeFacile", "Paie et RH · Bénin", "Une PME familiale a formé son équipe comptable aux outils Zimdalo avant de digitaliser entièrement sa gestion de paie."],
];

export const communityCats = [
  ["Idéation", "Partage ton idée et reçois des retours avant de te lancer."],
  ["Technique", "Pose tes questions sur les outils, l'hébergement ou l'intégration."],
  ["Marketing", "Échange des tactiques d'acquisition qui fonctionnent dans ta zone."],
  ["Financement", "Discute des options de financement adaptées à ton pays."],
  ["Entraide par pays", "Retrouve des porteurs de projet proches de chez toi."],
];
