import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "revenue-simulator");

export default function RevenueSimulator({ navigate }) {
  const [startMrr, setStartMrr] = useState(300);
  const [growthRate, setGrowthRate] = useState(15);
  const [months, setMonths] = useState(12);
  const [projection, setProjection] = useState(null);

  function handleSimulate() {
    const points = [];
    let mrr = startMrr;
    for (let m = 1; m <= months; m++) {
      mrr = mrr * (1 + growthRate / 100);
      points.push({ month: m, mrr: Math.round(mrr) });
    }
    setProjection(points);
  }

  const maxMrr = projection ? Math.max(...projection.map((p) => p.mrr)) : 0;

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Projette ton revenu récurrent mensuel (MRR) selon un taux de croissance constant.
      </p>

      <FieldGroup label={`MRR de départ : ${startMrr} $`}>
        <input
          type="range"
          min="50"
          max="5000"
          step="50"
          value={startMrr}
          onChange={(e) => setStartMrr(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </FieldGroup>

      <FieldGroup label={`Croissance mensuelle visée : ${growthRate} %`}>
        <input
          type="range"
          min="1"
          max="40"
          step="1"
          value={growthRate}
          onChange={(e) => setGrowthRate(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </FieldGroup>

      <FieldGroup label={`Durée de la projection : ${months} mois`}>
        <input
          type="range"
          min="3"
          max="24"
          step="1"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleSimulate}
      >
        {tool.cta}
      </button>

      {projection && (
        <div className="tool-result">
          <h4>
            Projection sur {months} mois — MRR final :{" "}
            {projection[projection.length - 1].mrr.toLocaleString("fr-FR")} $
          </h4>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 100, marginTop: 14 }}>
            {projection.map((p) => (
              <div
                key={p.month}
                title={`Mois ${p.month} : ${p.mrr} $`}
                style={{
                  flex: 1,
                  height: `${Math.max(6, (p.mrr / maxMrr) * 100)}%`,
                  background: "var(--cyan)",
                  borderRadius: "2px 2px 0 0",
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: "#8A93A3", marginTop: 8 }} className="mono">
            Mois 1 → Mois {months}
          </p>
        </div>
      )}
    </ToolShell>
  );
}
