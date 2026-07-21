import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "marketing-plan");

const PLANS_BY_BUDGET = {
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

export default function MarketingPlan({ navigate }) {
  const [budget, setBudget] = useState("moyen");
  const [plan, setPlan] = useState(null);

  function handleGenerate() {
    setPlan(PLANS_BY_BUDGET[budget]);
  }

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Génère un plan d'action marketing sur 30, 60 et 90 jours, adapté à ton budget.
      </p>

      <FieldGroup label="Budget marketing disponible">
        <PillLightRow
          options={[
            ["petit", "Moins de 500 $"],
            ["moyen", "500 – 3 000 $"],
            ["grand", "Plus de 3 000 $"],
          ]}
          selected={budget}
          onSelect={setBudget}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleGenerate}
      >
        {tool.cta}
      </button>

      {plan && (
        <div className="tool-result">
          <h4>Plan sur 90 jours</h4>
          <ul>
            <li>
              <b className="mono">Jour 30</b> — {plan[30]}
            </li>
            <li>
              <b className="mono">Jour 60</b> — {plan[60]}
            </li>
            <li>
              <b className="mono">Jour 90</b> — {plan[90]}
            </li>
          </ul>
        </div>
      )}
    </ToolShell>
  );
}
