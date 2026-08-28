import { useEffect, useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";
import { consumeDraftProject } from "../../lib/draftProject.js";
import { buildCahierDeChargeText } from "../../data/generators.js";

const tool = toolsConfig.find((t) => t.slug === "cahier-de-charge");

export default function CahierDeCharge({ navigate }) {
  const [draftValue] = useState(() => consumeDraftProject());
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState(() => draftValue || "");
  const [profil, setProfil] = useState("novice");
  const [document, setDocument] = useState(null);
  const [prefilled] = useState(() => Boolean(draftValue));

  function handleGenerate() {
    setDocument(buildCahierDeChargeText({ projectName, description, profil }));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGenerate(); }, []);

  function handleDownload() {
    const blob = new Blob([document], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `cahier-de-charge-${(projectName || "projet").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell tool={tool} navigate={navigate}>
      <p style={{ fontSize: 13.5, color: "#5A6472", marginBottom: 20 }}>
        Remplis les champs ci-dessous pour générer un cahier de charge de base, téléchargeable
        immédiatement.
      </p>

      {prefilled && (
        <div
          style={{
            background: "#EFFAF4",
            border: "1px solid #BEEBD3",
            borderRadius: 6,
            padding: "10px 14px",
            fontSize: 12.5,
            color: "#3A6B52",
            marginBottom: 18,
          }}
        >
          Ton idée a été reprise depuis la page d'accueil — modifie-la librement ci-dessous.
        </div>
      )}

      <div className="form-field">
        <label htmlFor="cc-name">Nom du projet</label>
        <input
          id="cc-name"
          type="text"
          placeholder="ex. FactureFlow"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label htmlFor="cc-desc">Description en une phrase</label>
        <textarea
          id="cc-desc"
          rows={3}
          placeholder="ex. Facturation automatisée conforme OHADA pour les PME ivoiriennes."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

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

      <button
        className="btn-primary"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
        onClick={handleGenerate}
      >
        {tool.cta}
      </button>

      {document && (
        <div className="tool-result">
          <h4>Aperçu du document</h4>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: 12.5,
              color: "#3A4152",
              fontFamily: "'IBM Plex Mono', monospace",
              lineHeight: 1.6,
              maxHeight: 280,
              overflowY: "auto",
              marginBottom: 16,
            }}
          >
            {document}
          </pre>
          <button
            className="btn-primary"
            style={{ background: "var(--amber)" }}
            onClick={handleDownload}
          >
            Télécharger le fichier .txt
          </button>
        </div>
      )}
    </ToolShell>
  );
}
