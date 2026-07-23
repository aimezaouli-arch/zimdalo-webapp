import { useState } from "react";
import { setDraftProject } from "../lib/draftProject.js";

export default function FreeProjectField({ navigate }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setDraftProject(text.trim());
    navigate("#/outils/cahier-de-charge");
  }

  return (
    <div className="free-project">
      <p className="free-project-label">Tu as déjà une idée précise, dans n'importe quel domaine ?</p>
      <form onSubmit={handleSubmit} className="free-project-form">
        <input
          type="text"
          placeholder="ex. Livraison de repas à Abidjan, atelier de couture en ligne, école de code…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn-primary" style={{ background: "var(--ink)", color: "var(--paper)" }}>
          Utiliser cette idée
        </button>
      </form>
      <p className="free-project-note">Aucun choix imposé — décris ton projet avec tes propres mots.</p>
    </div>
  );
}
