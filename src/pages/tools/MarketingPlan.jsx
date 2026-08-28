import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { buildMarketingPlan } from "../../data/generators.js";

const tool = toolsConfig.find((t) => t.slug === "marketing-plan");

export default function MarketingPlan({ navigate }) {
  const [budget, setBudget] = useState("moyen");
  const [plan, setPlan] = useState(null);

  function handleGenerate() {
    setPlan(buildMarketingPlan(budget));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGenerate(); }, []);

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
