import { useEffect, useState } from "react";
import { ideaBank, profilCopy, computeIdeaPricing } from "../data/content.js";

const TOTAL_STEPS = 4;

export default function Demo({ initialProfil }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ profil: null, client: null, budget: null, pays: null });
  const [chosenIdx, setChosenIdx] = useState(null);

  useEffect(() => {
    if (initialProfil && ["novice", "existante", "extension"].includes(initialProfil)) {
      setAnswers((a) => ({ ...a, profil: initialProfil }));
      setStep(2);
      setChosenIdx(null);
    }
  }, [initialProfil]);

  function select(group, value) {
    const next = { ...answers, [group]: value };
    setAnswers(next);
    setTimeout(() => {
      if (step < TOTAL_STEPS) {
        setStep(step + 1);
      } else {
        setStep(5);
      }
    }, 260);
  }

  function prevStep() {
    if (step === 5) setStep(4);
    else if (step > 1) setStep(step - 1);
  }

  function restart() {
    setStep(1);
    setAnswers({ profil: null, client: null, budget: null, pays: null });
    setChosenIdx(null);
  }

  const zoneKey = answers.pays === "ci" ? "ci" : answers.pays === "afrique" ? "afrique" : "intl";
  const ideas = answers.client ? ideaBank[answers.client][zoneKey] : [];
  const copy = profilCopy[answers.profil] || profilCopy.novice;

  return (
    <section className="demo" id="demo">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Démo en direct</span>
          <h2>Réponds à 4 questions, obtiens un plan sur mesure</h2>
          <p>
            Aucune saisie de texte — uniquement des choix. C'est exactement ce que vit un nouvel
            utilisateur de Zimdalo, qu'il parte de zéro ou qu'il fasse déjà tourner une entreprise.
          </p>
        </div>

        <div className="demo-card">
          <div className="demo-progress">
            {[1, 2, 3, 4].map((n) => (
              <span key={n}>
                <i style={{ width: n <= step ? "100%" : "0%" }}></i>
              </span>
            ))}
          </div>

          {step === 1 && (
            <div className="demo-step active">
              <div className="demo-q">Question 1 / 4</div>
              <div className="demo-title">Quelle est ta situation de départ ?</div>
              <PillRow
                options={[
                  ["novice", "Nouveau projet"],
                  ["existante", "Entreprise existante"],
                  ["extension", "Extension d'activité"],
                ]}
                selected={answers.profil}
                onSelect={(v) => select("profil", v)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="demo-step active">
              <div className="demo-q">Question 2 / 4</div>
              <div className="demo-title">Quel type de client veux-tu servir ?</div>
              <PillRow
                options={[
                  ["B2B", "Entreprises (B2B)"],
                  ["B2C", "Particuliers (B2C)"],
                  ["B2G", "Institutions (B2G)"],
                ]}
                selected={answers.client}
                onSelect={(v) => select("client", v)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="demo-step active">
              <div className="demo-q">Question 3 / 4</div>
              <div className="demo-title">Quel est ton budget de départ ?</div>
              <PillRow
                options={[
                  ["petit", "Moins de 500 $"],
                  ["moyen", "500 – 3 000 $"],
                  ["grand", "Plus de 3 000 $"],
                ]}
                selected={answers.budget}
                onSelect={(v) => select("budget", v)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="demo-step active">
              <div className="demo-q">Question 4 / 4</div>
              <div className="demo-title">Dans quelle zone veux-tu lancer ou étendre ton activité ?</div>
              <PillRow
                options={[
                  ["ci", "Côte d'Ivoire"],
                  ["afrique", "Afrique francophone"],
                  ["intl", "International"],
                ]}
                selected={answers.pays}
                onSelect={(v) => select("pays", v)}
              />
            </div>
          )}

          {step === 5 && (
            <div className="demo-step active">
              <div className="results-head">Résultat généré</div>
              <div className="demo-title" style={{ marginBottom: 4 }}>
                {copy.head}
              </div>
              <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 4 }}>{copy.lead}</p>
              <div className="idea-cards">
                {ideas.map((idea, i) => {
                  const isBest = idea[2] === Math.max(...ideas.map((x) => x[2]));
                  const [ideaPrice, ideaMrr] = computeIdeaPricing(answers.budget, idea[2]);
                  return (
                    <div key={i} className={`idea-card${chosenIdx === i ? " chosen" : ""}${isBest ? " idea-card--best" : ""}`}>
                      {isBest && <span className="idea-best-badge">Meilleur score</span>}
                      <h4>{idea[0]}</h4>
                      <p className="desc">{idea[1]}</p>
                      <div className="idea-meta">
                        <span>Score de viabilité</span>
                        <b>{idea[2]}/100</b>
                      </div>
                      <div className="score-bar">
                        <i style={{ width: `${idea[2]}%` }}></i>
                      </div>
                      <div className="idea-meta">
                        <span>Prix suggéré</span>
                        <b>{ideaPrice}/mois</b>
                      </div>
                      <div className="idea-meta">
                        <span>MRR potentiel</span>
                        <b>{ideaMrr}</b>
                      </div>
                      <button onClick={() => setChosenIdx(i)}>{copy.cta}</button>
                    </div>
                  );
                })}
              </div>
              {chosenIdx !== null && (
                <div className="followup show">
                  <span>{copy.followupLabel}</span> <b>{ideas[chosenIdx][0]}</b> — ton parcours en 10
                  étapes est prêt.
                  <div className="mini-steps">
                    <span>1. Roadmap</span>
                    <span>2. Cahier de charge</span>
                    <span>3. Pricing</span>
                    <span>4. Plan marketing</span>
                    <span>5. Estimation revenus</span>
                    <span>…</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="demo-nav">
            <button
              className="link-btn"
              onClick={prevStep}
              style={{ visibility: step > 1 ? "visible" : "hidden" }}
            >
              ← Retour
            </button>
            <button
              className="link-btn"
              onClick={restart}
              style={{ display: step === 5 ? "inline-block" : "none" }}
            >
              Recommencer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillRow({ options, selected, onSelect }) {
  return (
    <div className="pill-row">
      {options.map(([value, label]) => (
        <button
          key={value}
          className={`pill${selected === value ? " selected" : ""}`}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
