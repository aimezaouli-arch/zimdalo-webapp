import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "hosting-advisor");

const RECOMMENDATIONS = {
  "petit-faible": {
    plan: "Hébergement Web Premium",
    reason: "Suffisant pour un site vitrine ou un SaaS en phase de test, avec un budget limité.",
    estimate: "3 – 6 $/mois",
  },
  "petit-moyen": {
    plan: "Hébergement Web Business",
    reason: "Plus de ressources pour absorber une audience croissante sans changer d'offre trop vite.",
    estimate: "6 – 10 $/mois",
  },
  "moyen-faible": {
    plan: "Hébergement Web Business",
    reason: "Bon équilibre entre budget et marge de croissance pour un SaaS en lancement.",
    estimate: "6 – 10 $/mois",
  },
  "moyen-moyen": {
    plan: "Hébergement Cloud Startup",
    reason: "Ressources dédiées, adapté à un trafic qui commence à être significatif.",
    estimate: "10 – 20 $/mois",
  },
  "moyen-fort": {
    plan: "VPS (KVM 2 ou supérieur)",
    reason: "Le trafic dépasse ce qu'un hébergement mutualisé peut absorber confortablement.",
    estimate: "20 – 40 $/mois",
  },
  "grand-faible": {
    plan: "Hébergement Cloud Startup",
    reason: "Budget confortable, pas besoin de sur-dimensionner tant que le trafic reste modéré.",
    estimate: "10 – 20 $/mois",
  },
  "grand-moyen": {
    plan: "VPS (KVM 2 – KVM 4)",
    reason: "Un serveur dédié virtuel donne plus de contrôle et de marge à mesure que le produit grandit.",
    estimate: "20 – 50 $/mois",
  },
  "grand-fort": {
    plan: "VPS (KVM 4 ou supérieur) + CDN",
    reason: "À ce niveau de trafic, isole la base de données et ajoute un CDN pour les assets statiques.",
    estimate: "50 $/mois et plus",
  },
};

export default function HostingAdvisor({ navigate }) {
  const [budget, setBudget] = useState("moyen");
  const [traffic, setTraffic] = useState("moyen");
  const [result, setResult] = useState(null);

  function handleRecommend() {
    const key = `${budget}-${traffic}`;
    setResult(RECOMMENDATIONS[key] || RECOMMENDATIONS["moyen-moyen"]);
  }

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
