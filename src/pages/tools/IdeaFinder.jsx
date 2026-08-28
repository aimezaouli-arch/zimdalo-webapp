import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { ideaBank } from "../../data/content.js";

const tool = toolsConfig.find((t) => t.slug === "idea-finder");

export default function IdeaFinder({ navigate }) {
  const [client, setClient] = useState("B2C");
  const [zone, setZone] = useState("ci");
  const [ideas, setIdeas] = useState(null);

  function handleLaunch() {
    setIdeas(ideaBank[client][zone]);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleLaunch(); }, []);

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Choisis ton type de client et ta zone : l'outil te propose 3 idées de SaaS avec leur score de
        viabilité.
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

      <FieldGroup label="Zone">
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

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleLaunch}
      >
        {tool.cta}
      </button>

      {ideas && (
        <div className="tool-result">
          <h4>3 idées adaptées</h4>
          {ideas.map((idea) => (
            <div className="metric-row" key={idea[0]}>
              <span>
                <b>{idea[0]}</b> — {idea[1]}
              </span>
              <b>{idea[2]}/100</b>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
