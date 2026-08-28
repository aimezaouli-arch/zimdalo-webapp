import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "health-checker");

const SCORES = { faible: 1, moyen: 2, bon: 3 };

export default function HealthChecker({ navigate }) {
  const [churn, setChurn] = useState("moyen");
  const [growth, setGrowth] = useState("moyen");
  const [satisfaction, setSatisfaction] = useState("moyen");
  const [result, setResult] = useState(null);

  function handleCheck() {
    const score = Math.round(((SCORES[churn] + SCORES[growth] + SCORES[satisfaction]) / 9) * 100);

    let verdict, recommendations;
    if (score >= 75) {
      verdict = "SaaS en bonne santé";
      recommendations = [
        "Continue de mesurer ces indicateurs chaque mois.",
        "Envisage une extension géographique ou une nouvelle offre.",
      ];
    } else if (score >= 50) {
      verdict = "SaaS stable, à surveiller";
      recommendations = [
        "Identifie lequel des trois indicateurs tire le score vers le bas.",
        "Priorise une action corrective avant d'investir dans la croissance.",
      ];
    } else {
      verdict = "SaaS fragile";
      recommendations = [
        "Concentre-toi sur la rétention avant l'acquisition de nouveaux clients.",
        "Interroge directement 5 clients récents sur leur niveau de satisfaction.",
      ];
    }

    setResult({ score, verdict, recommendations });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleCheck(); }, []);

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Évalue rapidement la santé de ton SaaS à partir de trois indicateurs clés.
      </p>

      <FieldGroup label="Taux de désabonnement (churn)">
        <PillLightRow
          options={[
            ["faible", "Élevé (mauvais signe)"],
            ["moyen", "Moyen"],
            ["bon", "Faible (bon signe)"],
          ]}
          selected={churn}
          onSelect={setChurn}
        />
      </FieldGroup>

      <FieldGroup label="Croissance du MRR">
        <PillLightRow
          options={[
            ["faible", "Stagnante"],
            ["moyen", "Modérée"],
            ["bon", "Forte"],
          ]}
          selected={growth}
          onSelect={setGrowth}
        />
      </FieldGroup>

      <FieldGroup label="Satisfaction client perçue">
        <PillLightRow
          options={[
            ["faible", "Faible"],
            ["moyen", "Moyenne"],
            ["bon", "Élevée"],
          ]}
          selected={satisfaction}
          onSelect={setSatisfaction}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleCheck}
      >
        {tool.cta}
      </button>

      {result && (
        <div className="tool-result">
          <h4>{result.verdict}</h4>
          <div className="metric-row">
            <span>Score de santé</span>
            <b>{result.score}/100</b>
          </div>
          <ul>
            {result.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </ToolShell>
  );
}
