import { listings } from "../data/content.js";

export default function ListingDetail({ id, navigate }) {
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <section>
        <div className="container legal-body" style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: 14 }}>Listing introuvable</h1>
          <p>Ce SaaS n'existe pas ou n'est plus disponible à la vente.</p>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("#marketplace")}>
            Retour à la marketplace
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <button className="back-link" onClick={() => navigate("#marketplace")}>
          ← Retour à la marketplace
        </button>

        <div className="article-body">
          <div className="article-meta">
            <span className="article-cat">Vérifié</span>
            <span className="article-date">
              {listing.zone} · fondé en {listing.founded}
            </span>
          </div>
          <h1>{listing.name}</h1>
          <p style={{ color: "#5A6472", fontSize: 15, marginTop: -8, marginBottom: 20 }}>{listing.tagline}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 14,
              marginBottom: 26,
            }}
          >
            <MetricBox label="Revenu récurrent" value={listing.mrr} />
            <MetricBox label="Prix demandé" value={listing.price} />
            <MetricBox label="Stack technique" value={listing.stack.join(" · ")} />
          </div>

          <p>{listing.description}</p>

          <h3 style={{ fontSize: 15, marginTop: 24, marginBottom: 10, color: "var(--ink)" }}>
            Ce qui est inclus dans la vente
          </h3>
          <ul style={{ paddingLeft: 20, color: "#5A6472", fontSize: 14, marginBottom: 26 }}>
            {listing.included.map((item) => (
              <li key={item} style={{ marginBottom: 6 }}>
                {item}
              </li>
            ))}
          </ul>

          <button
            className="btn-primary"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
            onClick={() => navigate(`#/contact/listing/${listing.id}`)}
          >
            Faire une offre pour {listing.name}
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricBox({ label, value }) {
  return (
    <div style={{ border: "1px solid #E3E7EE", borderRadius: 6, padding: "14px 16px" }}>
      <div
        className="mono"
        style={{ fontSize: 10.5, textTransform: "uppercase", color: "#8A93A3", marginBottom: 6 }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)" }}>{value}</div>
    </div>
  );
}
