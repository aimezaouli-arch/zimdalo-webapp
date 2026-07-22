import { useState } from "react";
import { plans, planSlugs } from "../data/content.js";

const PLAN_ICONS = { Free: "◇", Basic: "◆", Pro: "★", Premium: "⬢" };

const TRUST_ITEMS = [
  "Support en français",
  "Mises à jour incluses",
  "Hébergement compatible Hostinger",
  "Sans engagement (hors Enterprise)",
];

export default function PricingSection({ navigate }) {
  const [region, setRegion] = useState("afrique");

  return (
    <section className="pricing" id="tarifs">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" style={{ color: "var(--ink)" }}>
            Tarifs
          </span>
          <h2>Un plan pour chaque étape de ton parcours</h2>
          <p>Change de formule à tout moment, sans perdre ta progression.</p>
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
              <div className="plan-icon">{PLAN_ICONS[p[1]] || "◆"}</div>
              <h4>{p[0]}</h4>
              <div className="tag">{p[1]}</div>
              <div className="price">
                {p[2]}
                <span>{p[3]}</span>
              </div>
              <ul>
                {p[4].map((f) => (
                  <li key={f}>
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate(`#/inscription/${planSlugs[p[1]]}`)}>
                {p[1] === "Free" ? "Commencer gratuitement" : `Choisir ${p[1]}`}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-trust">
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="pricing-trust-item">
              <CheckIcon small /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ small }) {
  const size = small ? 12 : 14;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
