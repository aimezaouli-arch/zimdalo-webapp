export default function ToolCard({ tool, navigate }) {
  const target = `#/outils/${tool.slug}`;

  function handleCardClick(e) {
    // Évite une double navigation si on a cliqué directement sur un bouton interne.
    if (e.target.closest("button, a")) return;
    navigate(target);
  }

  return (
    <div className="tool-card tool-card--clickable" onClick={handleCardClick}>
      <div className="tool-icon">{tool.num}</div>
      <h4>
        <a onClick={() => navigate(target)} style={{ cursor: "pointer" }}>
          {tool.name}
        </a>
      </h4>
      <p>{tool.short}</p>
      <div className="tool-card-actions">
        <button className="tool-cta-primary" onClick={() => navigate(target)}>
          {tool.cta}
        </button>
        <a className="tool-cta-secondary" onClick={() => navigate(target)}>
          Voir le détail
        </a>
      </div>
    </div>
  );
}
