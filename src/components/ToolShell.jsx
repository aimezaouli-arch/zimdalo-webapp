export default function ToolShell({ tool, navigate, children }) {
  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <button className="back-link" onClick={() => navigate("#outils")}>
            ← Retour aux outils
          </button>
          <span className="eyebrow">Outil {tool.num}</span>
          <h1>{tool.name}</h1>
          <p>{tool.short}</p>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: 640 }}>
          {children}
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="challenge-box" style={{ marginBottom: 0 }}>
            <div>
              <h3 style={{ fontSize: 15 }}>Envie d'aller plus loin ?</h3>
              <p>Le parcours guidé enchaîne cet outil avec les neuf autres, dans l'ordre.</p>
            </div>
            <button className="btn-primary" style={{ background: "var(--amber)" }} onClick={() => navigate("#demo")}>
              Essayer le parcours guidé
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
