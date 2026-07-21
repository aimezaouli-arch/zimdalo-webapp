import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { priceFor } from "../../data/content.js";

const tool = toolsConfig.find((t) => t.slug === "pricing-calculator");

const ZONE_MULTIPLIER = { ci: 1, afrique: 1.15, intl: 1.9 };
const ZONE_LABEL = { ci: "Côte d'Ivoire", afrique: "Afrique francophone", intl: "International" };

export default function PricingCalculator({ navigate }) {
  const [budget, setBudget] = useState("moyen");
  const [zone, setZone] = useState("ci");
  const [customers, setCustomers] = useState(50);
  const [result, setResult] = useState(null);

  function handleCalculate() {
    const [basePrice] = priceFor(budget);
    const numericBase = parseFloat(basePrice.replace(/[^\d.]/g, ""));
    const adjustedPrice = Math.round(numericBase * ZONE_MULTIPLIER[zone] * 10) / 10;
    const monthlyRevenue = Math.round(adjustedPrice * customers);
    setResult({ adjustedPrice, monthlyRevenue });
  }

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Estime un prix mensuel ajusté au pouvoir d'achat de ta zone, et le revenu potentiel associé.
      </p>

      <FieldGroup label="Budget de développement">
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

      <FieldGroup label="Zone de vente">
        <PillLightRow
          options={[
            ["ci", "Côte d'Ivoire"],
            ["afrique", "Afrique francophone"],
            ["intl", "International"],
          ]}
          selected={zone}
          onSelect={setZone}
        />
      </FieldGroup>

      <FieldGroup label={`Nombre de clients visés : ${customers}`}>
        <input
          type="range"
          min="5"
          max="500"
          step="5"
          value={customers}
          onChange={(e) => setCustomers(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </FieldGroup>

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleCalculate}
      >
        {tool.cta}
      </button>

      {result && (
        <div className="tool-result">
          <h4>Estimation pour {ZONE_LABEL[zone]}</h4>
          <div className="metric-row">
            <span>Prix suggéré</span>
            <b>{result.adjustedPrice} $/mois</b>
          </div>
          <div className="metric-row">
            <span>Revenu mensuel potentiel ({customers} clients)</span>
            <b>{result.monthlyRevenue.toLocaleString("fr-FR")} $/mois</b>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
