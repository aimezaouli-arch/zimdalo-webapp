import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { buildRoadmap } from "../../data/generators.js";

const tool = toolsConfig.find((t) => t.slug === "roadmap-builder");

export default function RoadmapBuilder({ navigate }) {
  const [profil, setProfil] = useState("novice");
  const [budget, setBudget] = useState("moyen");
  const [roadmap, setRoadmap] = useState(null);

  function handleGenerate() {
    setRoadmap(buildRoadmap(profil, budget));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGenerate(); }, []);

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
