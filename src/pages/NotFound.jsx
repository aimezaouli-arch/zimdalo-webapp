export default function NotFound({ navigate }) {
  return (
    <section>
      <div className="container legal-body" style={{ textAlign: "center", padding: "40px 0" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Erreur 404
        </span>
        <h1 style={{ margin: "14px 0" }}>Cette page n'existe pas</h1>
        <p>Le lien que tu as suivi est peut-être obsolète, ou l'adresse a été mal saisie.</p>
        <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("#/home")}>
          Retour à l'accueil
        </button>
      </div>
    </section>
  );
}
