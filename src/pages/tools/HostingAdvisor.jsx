import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { buildHostingRecommendation } from "../../data/generators.js";

const tool = toolsConfig.find((t) => t.slug === "hosting-advisor");

export default function HostingAdvisor({ navigate }) {
  const [budget, setBudget] = useState("moyen");
  const [traffic, setTraffic] = useState("moyen");
  const [result, setResult] = useState(null);

  function handleRecommend() {
    setResult(buildHostingRecommendation(budget, traffic));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleRecommend(); }, []);

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Recommandation calibrée sur les offres Hostinger, selon ton budget et le trafic attendu.
      </p>

      <FieldGroup label="Budget d'hébergement">
        <PillLightRow
          options={[
            ["petit", "Moins de 10 $/mois"],
            ["moyen", "10 – 30 $/mois"],
            ["grand", "Plus de 30 $/mois"],
          ]}
          selected={budget}
          onSelect={setBudget}
        />
      </FieldGroup>

      <FieldGroup label="Trafic mensuel attendu">
        <PillLightRow
          options={[
            ["faible", "Moins de 5 000 visites"],
            ["moyen", "5 000 – 50 000 visites"],
            ["fort", "Plus de 50 000 visites"],
          ]}
          selected={traffic}
          onSelect={setTraffic}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleRecommend}
      >
        {tool.cta}
      </button>

      {result && (
        <div className="tool-result">
          <h4>{result.plan}</h4>
          <div className="metric-row">
            <span>Coût estimé</span>
            <b>{result.estimate}</b>
          </div>
          <p style={{ fontSize: 13.5, color: "#5A6472", marginTop: 10 }}>{result.reason}</p>
        </div>
      )}
    </ToolShell>
  );
}
