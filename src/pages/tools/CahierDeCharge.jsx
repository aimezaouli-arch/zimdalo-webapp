import { useState } from "react";
import ToolShell from "../../components/ToolShell.jsx";
import { FieldGroup, PillLightRow } from "../../components/ToolFormBits.jsx";
import { toolsConfig } from "../../data/tools.js";

const tool = toolsConfig.find((t) => t.slug === "cahier-de-charge");

export default function CahierDeCharge({ navigate }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [profil, setProfil] = useState("novice");
  const [document, setDocument] = useState(null);

  const profilLabel = {
    novice: "un nouveau projet",
    existante: "la digitalisation d'une entreprise existante",
    extension: "l'extension d'une activité existante",
  };

  function buildDocument() {
    const date = new Date().toLocaleDateString("fr-FR");
    return `CAHIER DE CHARGE
${projectName || "Nom du projet à définir"}
Généré via Zimdalo — ${date}

1. CONTEXTE
Ce projet concerne ${profilLabel[profil]}.

2. DESCRIPTION
${description || "Décris ici l'objectif principal du projet."}

3. OBJECTIFS
- Définir clairement le problème résolu et le public visé.
- Lister les fonctionnalités essentielles avant les fonctionnalités secondaires.
- Prévoir un budget et un délai réalistes pour la première version.

4. FONCTIONNALITÉS PRINCIPALES
- [À compléter selon les priorités du projet]

5. CONTRAINTES TECHNIQUES
- [Hébergement, budget, délais, conformité locale le cas échéant]

6. PROCHAINES ÉTAPES
- Valider ce document avec les parties prenantes.
- Prioriser les fonctionnalités pour une première version (MVP).
- Estimer le budget et le planning de développement.
`;
  }

  function handleGenerate() {
    setDocument(buildDocument());
  }

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
