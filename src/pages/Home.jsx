import PrestationsCarousel from "../components/PrestationsCarousel.jsx";
import HeroBackgroundSlider from "../components/HeroBackgroundSlider.jsx";
import BeforeAfter from "../components/BeforeAfter.jsx";
import FreeProjectField from "../components/FreeProjectField.jsx";
import Demo from "../components/Demo.jsx";
import CardGrid from "../components/CardGrid.jsx";
import ToolCard from "../components/ToolCard.jsx";
import MarketplaceGrid from "../components/MarketplaceGrid.jsx";
import PricingSection from "../components/PricingSection.jsx";
import { toolsConfig } from "../data/tools.js";
import { features, steps } from "../data/content.js";

export default function Home({ navigate, demoPreset }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <HeroBackgroundSlider />
        <div className="container hero-inner">
          <span className="eyebrow">Guide · Outils · Marketplace</span>
          <h1>
            Lance un SaaS, digitalise ton entreprise,
            <br />
            ou <em>étends</em> ton activité.
          </h1>
          <p className="sub">
            Zimdalo guide aussi bien les porteurs d'un nouveau projet que les entreprises déjà
            existantes — commerces, sociétés physiques, entrepreneurs en expansion — pour construire,
            digitaliser ou vendre leur activité. Pensé pour l'Afrique et la diaspora francophone, sans
            jargon technique.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => navigate("#demo")}>
              Essayer le parcours
            </button>
            <button className="btn-ghost" onClick={() => navigate("#marketplace")}>
              Voir la marketplace
            </button>
          </div>

          <div className="path-wrap">
            <HeroPath />
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <BeforeAfter navigate={navigate} />

      {/* POUR QUI */}
      <section id="public" style={{ background: "#FBFCFD" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Pour qui ?
            </span>
            <h2>Trois profils, un seul parcours</h2>
            <p>
              Que tu partes de zéro ou que tu diriges déjà une activité, Zimdalo adapte le parcours à
              ta situation de départ. Clique sur ton profil pour démarrer directement.
            </p>
          </div>
          <div className="tools-grid">
            <div className="tool-card tool-card--clickable" onClick={() => navigate("#demo-novice")}>
              <div className="tool-icon">N</div>
              <h4>Nouveau projet</h4>
              <p>
                Tu pars d'une idée ou d'une envie d'entreprendre, sans connaissance technique ou
                business particulière. Zimdalo te guide de A à Z.
              </p>
              <div className="tool-card-actions">
                <button className="tool-cta-primary" onClick={() => navigate("#demo-novice")}>
                  Démarrer
                </button>
              </div>
            </div>
            <div className="tool-card tool-card--clickable" onClick={() => navigate("#demo-existante")}>
              <div className="tool-icon">E</div>
              <h4>Entreprise déjà existante</h4>
              <p>
                Ton entreprise a une existence physique (commerce, société, service) et tu veux te
                digitaliser : SaaS interne, outil client, plateforme de vente.
              </p>
              <div className="tool-card-actions">
                <button className="tool-cta-primary" onClick={() => navigate("#demo-existante")}>
                  Démarrer
                </button>
              </div>
            </div>
            <div className="tool-card tool-card--clickable" onClick={() => navigate("#demo-extension")}>
              <div className="tool-icon">X</div>
              <h4>Extension d'activité</h4>
              <p>
                Tu es déjà entrepreneur et tu veux étendre ton activité vers un nouveau marché, un
                nouveau pays, ou un nouveau produit digital.
              </p>
              <div className="tool-card-actions">
                <button className="tool-cta-primary" onClick={() => navigate("#demo-extension")}>
                  Démarrer
                </button>
              </div>
            </div>
          </div>

          <FreeProjectField navigate={navigate} />
        </div>
      </section>

      {/* 3D PRESTATIONS */}
      <section className="prestations-section" id="prestations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nos prestations</span>
            <h2 style={{ color: "var(--paper)" }}>Cinq prestations, un seul parcours connecté</h2>
            <p>
              Construire, digitaliser, étendre, vendre, se former — chaque prestation s'articule
              autour du même accompagnement.
            </p>
          </div>
          <PrestationsCarousel />
        </div>
      </section>

      {/* DEMO */}
      <Demo initialProfil={demoPreset} navigate={navigate} />

      {/* PARCOURS */}
      <section className="light" id="parcours">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Le parcours Zimdalo
            </span>
            <h2>Six étapes, quel que soit ton point de départ</h2>
            <p>
              Un chemin clair, pensé pour ne jamais te perdre — que tu lances un projet, digitalises
              une entreprise existante ou étendes une activité déjà en place. Deux à trois choix par
              étape, jamais plus.
            </p>
          </div>
          <div className="steps-list">
            {steps.map(([n, title, desc]) => (
              <div className="step-item" data-n={n} key={n}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTILS */}
      <section id="outils" style={{ background: "#FBFCFD" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Boîte à outils
            </span>
            <h2>Dix outils autonomes, utilisables un par un</h2>
            <p>
              Chaque outil s'ouvre directement, sans passer par le parcours guidé. Tu peux aussi les
              enchaîner via le parcours si tu préfères tout faire d'un coup.
            </p>
          </div>
          <div className="tools-grid">
            {toolsConfig.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* FONCTIONNALITES */}
      <section id="fonctionnalites">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Fonctionnalités
            </span>
            <h2>Ce que la plateforme fait tourner en coulisses</h2>
            <p>Des fonctionnalités transverses, disponibles quel que soit le profil ou le plan choisi.</p>
          </div>
          <CardGrid items={features} />
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="market" id="marketplace">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Marketplace
            </span>
            <h2>Achète ou revends un SaaS ou une activité digitale</h2>
            <p>Listings vérifiés, prix estimé par pays, transaction sécurisée par séquestre.</p>
          </div>
          <MarketplaceGrid navigate={navigate} />

          <div className="sell-banner">
            <div>
              <span className="eyebrow" style={{ marginBottom: 8 }}>
                Tu es de l'autre côté ?
              </span>
              <h3>Vends ton SaaS à des acheteurs qualifiés</h3>
              <p>Vérification sous 48h, visibilité dans 25 pays, transaction sécurisée par séquestre.</p>
            </div>
            <button className="btn-primary" style={{ background: "var(--amber)" }} onClick={() => navigate("#/vendre")}>
              Vendre mon SaaS
            </button>
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <PricingSection navigate={navigate} />
    </>
  );
}

function HeroPath() {
  const nodes = [
    { x: 40, y: 90, l: "Idée" },
    { x: 220, y: 60, l: "Marché" },
    { x: 380, y: 70, l: "Prix" },
    { x: 560, y: 75, l: "Roadmap" },
    { x: 760, y: 55, l: "Vente" },
  ];
  return (
    <svg viewBox="0 0 860 140" className="path-svg">
      <path
        className="path-line"
        d="M40,90 C160,20 260,150 380,70 C480,0 560,140 640,60 C700,10 760,90 820,50"
      />
      <g>
        {nodes.map((n, i) => (
          <g key={n.l}>
            <circle cx={n.x} cy={n.y} r={6} className="path-node" />
            <circle cx={n.x} cy={n.y} r={2.4} className="path-node-inner" />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              className={`path-label${i === 0 ? " active" : ""}`}
            >
              {n.l}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
