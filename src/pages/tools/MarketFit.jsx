import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "market-fit");

const WEIGHTS = { faible: 1, moyenne: 2, forte: 3 };

export default function MarketFit({ navigate }) {
  const [payCapacity, setPayCapacity] = useState("moyenne");
  const [payDesire, setPayDesire] = useState("moyenne");
  const [marketSize, setMarketSize] = useState("moyenne");
  const [result, setResult] = useState(null);

  function handleTest() {
    const score = Math.round(
      ((WEIGHTS[payCapacity] + WEIGHTS[payDesire] + WEIGHTS[marketSize]) / 9) * 100
    );

    let verdict, advice;
    if (score >= 75) {
      verdict = "Marché prometteur";
      advice = "Les trois signaux sont favorables. Tu peux avancer vers une validation par un prototype simple.";
    } else if (score >= 50) {
      verdict = "Marché à affiner";
      advice = "Au moins un signal est faible. Concentre-toi d'abord sur le point le plus bas avant d'investir davantage.";
    } else {
      verdict = "Marché risqué en l'état";
      advice = "Les trois signaux sont faibles ou moyens. Reconsidère le segment ciblé avant de construire quoi que ce soit.";
    }

    setResult({ score, verdict, advice });
  }

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Évalue trois signaux clés de ton marché cible pour obtenir un score de faisabilité.
      </p>

      <FieldGroup label="Capacité à payer de ta cible">
        <PillLightRow
          options={[
            ["faible", "Faible"],
            ["moyenne", "Moyenne"],
            ["forte", "Forte"],
          ]}
          selected={payCapacity}
          onSelect={setPayCapacity}
        />
      </FieldGroup>

      <FieldGroup label="Désir de payer (urgence du problème)">
        <PillLightRow
          options={[
            ["faible", "Faible"],
            ["moyenne", "Moyenne"],
            ["forte", "Forte"],
          ]}
          selected={payDesire}
          onSelect={setPayDesire}
        />
      </FieldGroup>

      <FieldGroup label="Taille du marché atteignable">
        <PillLightRow
          options={[
            ["faible", "Petite"],
            ["moyenne", "Moyenne"],
            ["forte", "Grande"],
          ]}
          selected={marketSize}
          onSelect={setMarketSize}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleTest}
      >
        {tool.cta}
      </button>

      {result && (
        <div className="tool-result">
          <h4>{result.verdict}</h4>
          <div className="metric-row">
            <span>Score de faisabilité</span>
            <b>{result.score}/100</b>
          </div>
          <p style={{ fontSize: 13.5, color: "#5A6472", marginTop: 10 }}>{result.advice}</p>
        </div>
      )}
    </ToolShell>
  );
}
