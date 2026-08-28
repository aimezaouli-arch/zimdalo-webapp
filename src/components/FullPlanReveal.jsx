import { useState } from "react";
import {
  buildRoadmap,
  buildBusinessModel,
  buildMarketingPlan,
  buildHostingRecommendation,
  buildCahierDeChargeText,
  simulateRevenue,
  estimateResaleValue,
} from "../data/generators.js";

/**
 * Affiche immédiatement tout le plan généré pour l'idée choisie — roadmap,
 * cahier de charge, business model, marketing, pricing, simulation de
 * revenus, hébergement, revente — sans obliger l'utilisateur à recliquer
 * sur chaque outil un par un.
 */
export default function FullPlanReveal({ ideaName, ideaDescription, ideaScore, profil, client, budget, pays, price, mrr, navigate }) {
  const [downloaded, setDownloaded] = useState(false);

  const roadmap = buildRoadmap(profil, budget);
  const totalWeeks = roadmap.reduce((sum, [, w]) => sum + w, 0);
  const businessModel = buildBusinessModel(client);
  const marketingPlan = buildMarketingPlan(budget);
  const hostingTraffic = pays === "intl" ? "moyen" : "faible";
  const hosting = buildHostingRecommendation(budget, hostingTraffic);
  const mrrNumeric = parseFloat(String(mrr).replace(/[^\d.]/g, "")) || 0;
  const revenueProjection = simulateRevenue({ startMrr: mrrNumeric, growthRate: 15, months: 12 });
  const resaleValue = estimateResaleValue(revenueProjection[revenueProjection.length - 1].mrr);
  const cahierText = buildCahierDeChargeText({ projectName: ideaName, description: ideaDescription, profil });
  const maxProjection = Math.max(...revenueProjection.map((p) => p.mrr));

  function handleDownload() {
    const blob = new Blob([cahierText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cahier-de-charge-${ideaName.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <div className="full-plan">
      {/* 1. Roadmap */}
      <PlanSection num="01" title={`Roadmap — ${totalWeeks} semaines au total`}>
        <ul className="plan-section-list">
          {roadmap.map(([task, weeks], i) => (
            <li key={i}>
              <b className="mono">{weeks} sem.</b> — {task}
            </li>
          ))}
        </ul>
      </PlanSection>

      {/* 2. Cahier de charge */}
      <PlanSection num="02" title="Cahier de charge">
        <pre className="plan-doc-preview">{cahierText}</pre>
        <button className="btn-primary" style={{ background: "var(--amber)" }} onClick={handleDownload}>
          {downloaded ? "Téléchargé ✓ — retélécharger" : "Télécharger le fichier .txt"}
        </button>
      </PlanSection>

      {/* 3. Business model */}
      <PlanSection num="03" title="Modèle économique">
        <PlanRow label="Pricing" value={businessModel.pricing} />
        <PlanRow label="Segment prioritaire" value={businessModel.segments} />
        <PlanRow label="Canaux d'acquisition" value={businessModel.channels} />
      </PlanSection>

      {/* 4. Pricing détaillé */}
      <PlanSection num="04" title="Pricing">
        <PlanRow label="Prix suggéré" value={`${price}/mois`} />
        <PlanRow label="MRR potentiel" value={mrr} />
        <PlanRow label="Score de viabilité" value={`${ideaScore}/100`} />
      </PlanSection>

      {/* 5. Plan marketing */}
      <PlanSection num="05" title="Plan marketing — 30/60/90 jours">
        <ul className="plan-section-list">
          <li>
            <b className="mono">Jour 30</b> — {marketingPlan[30]}
          </li>
          <li>
            <b className="mono">Jour 60</b> — {marketingPlan[60]}
          </li>
          <li>
            <b className="mono">Jour 90</b> — {marketingPlan[90]}
          </li>
        </ul>
      </PlanSection>

      {/* 6. Simulation de revenus */}
      <PlanSection num="06" title="Simulation de revenus sur 12 mois">
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 70, marginBottom: 10 }}>
          {revenueProjection.map((p) => (
            <div
              key={p.month}
              title={`Mois ${p.month} : ${p.mrr} $`}
              style={{
                flex: 1,
                height: `${Math.max(6, (p.mrr / maxProjection) * 100)}%`,
                background: "var(--cyan)",
                borderRadius: "2px 2px 0 0",
              }}
            />
          ))}
        </div>
        <PlanRow
          label="MRR estimé après 12 mois"
          value={`${revenueProjection[revenueProjection.length - 1].mrr.toLocaleString("fr-FR")} $`}
        />
      </PlanSection>

      {/* 7. Hébergement */}
      <PlanSection num="07" title="Hébergement recommandé">
        <PlanRow label="Offre" value={hosting.plan} />
        <PlanRow label="Coût estimé" value={hosting.estimate} />
        <p className="plan-note">{hosting.reason}</p>
      </PlanSection>

      {/* 8. Estimation de revente */}
      <PlanSection num="08" title="Valeur de revente estimée (après 12 mois)">
        <PlanRow label="Prix de revente estimé" value={`${resaleValue.toLocaleString("fr-FR")} $`} />
        <p className="plan-note">
          Basé sur un multiple de 10x le MRR mensuel projeté — cohérent avec les listings actuels de la
          marketplace.
        </p>
      </PlanSection>

      <div className="plan-cta-row">
        <button className="btn-primary" style={{ background: "var(--amber)" }} onClick={() => navigate("#/vendre")}>
          Vendre ce SaaS une fois lancé
        </button>
        <button className="btn-ghost" onClick={() => navigate("#/inscription")}>
          Créer mon compte pour sauvegarder ce plan
        </button>
      </div>
    </div>
  );
}

function PlanSection({ num, title, children }) {
  return (
    <div className="plan-section">
      <div className="plan-section-head">
        <span className="plan-section-num mono">{num}</span>
        <h4>{title}</h4>
      </div>
      <div className="plan-section-body">{children}</div>
    </div>
  );
}

function PlanRow({ label, value }) {
  return (
    <div className="plan-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
