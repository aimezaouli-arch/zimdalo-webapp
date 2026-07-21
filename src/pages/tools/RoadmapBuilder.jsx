import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "roadmap-builder");

const BASE_TASKS = {
  novice: [
    ["Valider l'idée auprès de 10 clients potentiels", 1],
    ["Rédiger le cahier de charge", 1],
    ["Construire un prototype minimal", 3],
    ["Tester le prototype avec 5 utilisateurs", 1],
    ["Lancer une version bêta payante", 2],
  ],
  existante: [
    ["Identifier le point de friction prioritaire", 1],
    ["Cartographier le processus actuel", 1],
    ["Construire l'outil de digitalisation", 3],
    ["Former l'équipe interne", 1],
    ["Mesurer l'impact sur un mois", 4],
  ],
  extension: [
    ["Étudier la réglementation du nouveau marché", 1],
    ["Adapter le pricing local", 1],
    ["Lancer un pilote limité", 3],
    ["Recruter un premier relais local", 2],
    ["Étendre à l'échelle complète", 4],
  ],
};

const BUDGET_MULTIPLIER = { petit: 1.4, moyen: 1, grand: 0.7 };

export default function RoadmapBuilder({ navigate }) {
  const [profil, setProfil] = useState("novice");
  const [budget, setBudget] = useState("moyen");
  const [roadmap, setRoadmap] = useState(null);

  function handleGenerate() {
    const tasks = BASE_TASKS[profil].map(([task, weeks]) => [
      task,
      Math.max(1, Math.round(weeks * BUDGET_MULTIPLIER[budget])),
    ]);
    setRoadmap(tasks);
  }

  const totalWeeks = roadmap ? roadmap.reduce((sum, [, w]) => sum + w, 0) : 0;

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Génère un planning réaliste selon ta situation de départ et ton budget.
      </p>

      <FieldGroup label="Situation de départ">
        <PillLightRow
          options={[
            ["novice", "Nouveau projet"],
            ["existante", "Entreprise existante"],
            ["extension", "Extension d'activité"],
          ]}
          selected={profil}
          onSelect={setProfil}
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

      {roadmap && (
        <div className="tool-result">
          <h4>Roadmap — {totalWeeks} semaines au total</h4>
          <ul>
            {roadmap.map(([task, weeks], i) => (
              <li key={i}>
                <b className="mono">{weeks} sem.</b> — {task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </ToolShell>
  );
}
