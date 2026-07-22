import { useState } from "react";
import Prestations3D from "../components/Prestations3D.jsx";
import Demo from "../components/Demo.jsx";
import CardGrid from "../components/CardGrid.jsx";
import ToolCard from "../components/ToolCard.jsx";
import MarketplaceGrid from "../components/MarketplaceGrid.jsx";
import { toolsConfig } from "../data/tools.js";
import { features, plans, planSlugs, steps } from "../data/content.js";

export default function Home({ navigate }) {
  const [region, setRegion] = useState("afrique");

  return (
    <>
      {/* HERO */}
      <section className="hero">
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
              ta situation de départ.
            </p>
          </div>
          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">N</div>
              <h4>Nouveau projet</h4>
              <p>
                Tu pars d'une idée ou d'une envie d'entreprendre, sans connaissance technique ou
                business particulière. Zimdalo te guide de A à Z.
              </p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">E</div>
              <h4>Entreprise déjà existante</h4>
              <p>
                Ton entreprise a une existence physique (commerce, société, service) et tu veux te
                digitaliser : SaaS interne, outil client, plateforme de vente.
              </p>
            </div>
            <div className="tool-card">
              <div className="tool-icon">X</div>
              <h4>Extension d'activité</h4>
              <p>
                Tu es déjà entrepreneur et tu veux étendre ton activité vers un nouveau marché, un
                nouveau pays, ou un nouveau produit digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3D PRESTATIONS */}
      <section className="prestations3d" id="prestations">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Nos prestations</span>
            <h2 style={{ color: "var(--paper)" }}>Cinq prestations, un seul parcours connecté</h2>
            <p>
              Construire, digitaliser, étendre, vendre, se former — chaque prestation s'articule
              autour du même accompagnement.
            </p>
          </div>
          <Prestations3D />
        </div>
      </section>

      {/* DEMO */}
      <Demo />

      {/* PARCOURS */}
      <section className="light" id="parcours">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Le parcours Zimdalo
            </span>
            <h2>Six étapes, quel que soit ton point de départ</h2>
            <p>
              Un parcours linéaire pensé pour ne jamais perdre l'utilisateur, qu'il lance un projet,
              digitalise une entreprise existante ou étende une activité — deux à trois questions par
              page, un bouton principal.
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
        </div>
      </section>

      {/* TARIFS */}
      <section className="pricing" id="tarifs">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--ink)" }}>
              Tarifs
            </span>
            <h2>Un plan pour chaque étape de ton parcours</h2>
          </div>
          <div className="toggle-wrap">
            <div className="toggle">
              <button className={region === "afrique" ? "active" : ""} onClick={() => setRegion("afrique")}>
                Afrique
              </button>
              <button className={region === "intl" ? "active" : ""} onClick={() => setRegion("intl")}>
                International
              </button>
            </div>
          </div>
          <div className="plans">
            {plans[region].map((p, i) => (
              <div className={`plan${i === 2 ? " featured" : ""}`} key={p[0]}>
                {i === 2 && <div className="plan-badge">Le plus choisi</div>}
                <h4>{p[0]}</h4>
                <div className="tag">{p[1]}</div>
                <div className="price">
                  {p[2]}
                  <span>{p[3]}</span>
                </div>
                <ul>
                  {p[4].map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button onClick={() => navigate(`#/inscription/${planSlugs[p[1]]}`)}>
                  {p[1] === "Free" ? "Commencer" : `Choisir ${p[1]}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
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
