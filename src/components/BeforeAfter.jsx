const BEFORE_ITEMS = [
  "Idée floue, sans structure claire",
  "Aucun business plan ni pricing défini",
  "Prix fixé au hasard, sans étude de marché",
  "Cahier de charge inexistant ou incomplet",
  "Des mois perdus avant le premier client",
];

const AFTER_ITEMS = [
  "Parcours structuré en 6 étapes claires",
  "Business model généré en quelques clics",
  "Pricing calculé selon ton marché et ta zone",
  "Cahier de charge prêt à télécharger",
  "Un plan complet dès la première session",
];

const VALUE_PROPS = [
  ["Parcours guidé", <IconPath />],
  ["Outils automatisés", <IconTool />],
  ["Pricing local", <IconCoin />],
  ["Marketplace intégrée", <IconStore />],
  ["Sécurisé & fiable", <IconShield />],
];

export default function BeforeAfter({ navigate }) {
  return (
    <section className="before-after">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Avant / Après Zimdalo</span>
          <h2>Ton projet mérite mieux qu'une idée qui traîne</h2>
          <p>Ce qui change concrètement quand tu passes par un parcours structuré.</p>
        </div>

        <div className="ba-grid">
          <div className="ba-panel ba-panel--before">
            <span className="ba-badge ba-badge--before">Avant</span>
            <h3>Seul face à ton idée</h3>
            <ul className="ba-list">
              {BEFORE_ITEMS.map((item) => (
                <li key={item}>
                  <IconX /> {item}
                </li>
              ))}
            </ul>
            <div className="ba-mock ba-mock--before">
              <div className="ba-mock-bar">
                <span></span><span></span><span></span>
                <div className="ba-mock-url">nouveau-projet.txt</div>
              </div>
              <div className="ba-mock-body ba-mock-body--before">
                <p>Je ne sais pas trop par où commencer…</p>
                <p>Il faut que je trouve un prix, un plan, un nom…</p>
              </div>
            </div>
          </div>

          <div className="ba-divider">
            <span className="ba-arrow">»</span>
          </div>

          <div className="ba-panel ba-panel--after">
            <span className="ba-badge ba-badge--after">Avec Zimdalo</span>
            <h3>Un plan complet, tout de suite</h3>
            <ul className="ba-list">
              {AFTER_ITEMS.map((item) => (
                <li key={item}>
                  <IconCheck /> {item}
                </li>
              ))}
            </ul>
            <div className="ba-mock ba-mock--after">
              <div className="ba-mock-bar ba-mock-bar--dark">
                <span></span><span></span><span></span>
                <div className="ba-mock-url">zimdalo.app/outils/cahier-de-charge</div>
              </div>
              <div className="ba-mock-body ba-mock-body--after">
                <div className="ba-mock-row"><span>Roadmap</span><b>4 sem.</b></div>
                <div className="ba-mock-row"><span>Pricing suggéré</span><b>19 $/mois</b></div>
                <div className="ba-mock-row"><span>Score de viabilité</span><b>78/100</b></div>
              </div>
            </div>
          </div>
        </div>

        <div className="ba-stats">
          <div className="ba-stat"><span>10</span>outils autonomes</div>
          <div className="ba-stat"><span>6</span>étapes du parcours</div>
          <div className="ba-stat"><span>25</span>pays couverts</div>
          <div className="ba-stat"><span>48h</span>vérification marketplace</div>
        </div>

        <p className="ba-tagline">
          On ne construit pas juste un outil, <span>on construit ton succès digital.</span>
        </p>

        <div className="ba-props">
          {VALUE_PROPS.map(([label, icon]) => (
            <div className="ba-prop" key={label}>
              <div className="ba-prop-icon">{icon}</div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="ba-cta-bar">
          <button className="btn-primary" style={{ background: "var(--amber)" }} onClick={() => navigate("#demo")}>
            Construire mon plan maintenant
          </button>
          <div className="ba-contact">
            <a onClick={() => navigate("#/contact")}>support@zimdalo.app</a>
            <span>·</span>
            <a onClick={() => navigate("#/home")}>zimdalo.app</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Icônes ---------- */

function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12.5l2.5 2.5L16 9" />
    </svg>
  );
}
function IconPath() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="19" r="2" /><circle cx="19" cy="5" r="2" />
      <path d="M7 19h6a4 4 0 0 0 4-4V9" strokeDasharray="2 3" />
    </svg>
  );
}
function IconTool() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
  );
}
function IconCoin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9 9.5h4.2a1.8 1.8 0 0 1 0 3.6H10a1.8 1.8 0 0 0 0 3.6H15" />
    </svg>
  );
}
function IconStore() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9l1-5h14l1 5" />
      <path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <path d="M5 9v10h14V9" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
