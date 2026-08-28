import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { buildBusinessModel } from "../../data/generators.js";

const tool = toolsConfig.find((t) => t.slug === "business-model");

export default function BusinessModel({ navigate }) {
  const [client, setClient] = useState("B2C");
  const [budget, setBudget] = useState("moyen");
  const [result, setResult] = useState(null);

  function handleGenerate() {
    setResult(buildBusinessModel(client));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGenerate(); }, []);

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Obtiens une base de modèle économique adaptée à ton type de client.
      </p>

      <FieldGroup label="Type de client">
        <PillLightRow
          options={[
            ["B2B", "Entreprises (B2B)"],
            ["B2C", "Particuliers (B2C)"],
            ["B2G", "Institutions (B2G)"],
          ]}
          selected={client}
          onSelect={setClient}
        />
      </FieldGroup>

      <FieldGroup label="Budget disponible">
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

      {result && (
        <div className="tool-result">
          <h4>Modèle économique suggéré</h4>
          <div className="metric-row">
            <span>Pricing</span>
            <b style={{ textAlign: "right", maxWidth: 260 }}>{result.pricing}</b>
          </div>
          <div className="metric-row">
            <span>Segment prioritaire</span>
            <b style={{ textAlign: "right", maxWidth: 260 }}>{result.segments}</b>
          </div>
          <div className="metric-row">
            <span>Canaux d'acquisition</span>
            <b style={{ textAlign: "right", maxWidth: 260 }}>{result.channels}</b>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
