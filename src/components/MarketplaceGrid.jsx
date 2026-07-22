import { useMemo, useState } from "react";
import { listings, marketplaceCategories } from "../data/content.js";

const BADGE_LABELS = {
  populaire: "🔥 Populaire",
  "coup-de-coeur": "★ Coup de cœur",
  nouveau: "🆕 Nouveau",
};

const CATEGORY_GRADIENTS = {
  Facturation: "linear-gradient(135deg, #16233F 0%, #1E3A6E 100%)",
  "Gestion de stock": "linear-gradient(135deg, #1B2A4A 0%, #2C4A3E 100%)",
  Santé: "linear-gradient(135deg, #1B2A4A 0%, #4A2C4E 100%)",
  "RH & Paie": "linear-gradient(135deg, #1B2A4A 0%, #4E3A1E 100%)",
};

const SORTS = {
  populaire: (a, b) => b.sales - a.sales,
  note: (a, b) => b.rating - a.rating,
  "prix-asc": (a, b) => a.priceValue - b.priceValue,
  "prix-desc": (a, b) => b.priceValue - a.priceValue,
};

export default function MarketplaceGrid({ navigate }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [sort, setSort] = useState("populaire");
  const [favorites, setFavorites] = useState({});

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      const matchesCategory = category === "Toutes" || l.category === category;
      const matchesQuery =
        !query.trim() ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.tagline.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
    result = [...result].sort(SORTS[sort]);
    return result;
  }, [query, category, sort]);

  function toggleFavorite(id, e) {
    e.stopPropagation();
    setFavorites((f) => ({ ...f, [id]: !f[id] }));
  }

  return (
    <div>
      <div className="mkt-toolbar">
        <div className="mkt-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un SaaS (nom, description)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="mkt-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="populaire">Trier : Populaire</option>
          <option value="note">Trier : Mieux notés</option>
          <option value="prix-asc">Trier : Prix croissant</option>
          <option value="prix-desc">Trier : Prix décroissant</option>
        </select>
      </div>

      <div className="mkt-categories">
        <button
          className={`mkt-cat-pill${category === "Toutes" ? " active" : ""}`}
          onClick={() => setCategory("Toutes")}
        >
          Toutes catégories
        </button>
        {marketplaceCategories.map((c) => (
          <button
            key={c}
            className={`mkt-cat-pill${category === c ? " active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mkt-count mono">
        {filtered.length} SaaS disponible{filtered.length > 1 ? "s" : ""}
      </div>

      {filtered.length === 0 ? (
        <div className="mkt-empty">
          <p>Aucun résultat pour cette recherche.</p>
          <button
            className="link-btn"
            style={{ color: "var(--ink)" }}
            onClick={() => {
              setQuery("");
              setCategory("Toutes");
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="mkt-grid">
          {filtered.map((l) => (
            <div className="mkt-card" key={l.id} onClick={() => navigate(`#/marketplace/${l.id}`)}>
              <div className="mkt-card-visual" style={{ background: CATEGORY_GRADIENTS[l.category] }}>
                <span className="mkt-verified">✓ Vérifié</span>
                {l.badge && <span className={`mkt-badge mkt-badge--${l.badge}`}>{BADGE_LABELS[l.badge]}</span>}
                <button
                  className={`mkt-fav${favorites[l.id] ? " active" : ""}`}
                  onClick={(e) => toggleFavorite(l.id, e)}
                  aria-label="Ajouter aux favoris"
                >
                  {favorites[l.id] ? "♥" : "♡"}
                </button>
                <span className="mkt-visual-initial">{l.name.charAt(0)}</span>
              </div>

              <div className="mkt-card-body">
                <div className="mkt-cat-tag">{l.category}</div>
                <h4>{l.name}</h4>
                <p className="mkt-tagline">{l.tagline}</p>

                <div className="mkt-rating">
                  <span className="mkt-stars">{"★".repeat(Math.round(l.rating))}{"☆".repeat(5 - Math.round(l.rating))}</span>
                  <span className="mkt-rating-value">{l.rating.toFixed(1)}</span>
                  <span className="mkt-rating-count">({l.reviews} avis)</span>
                </div>

                <div className="mkt-meta-row">
                  <span>{l.zone}</span>
                  <span>·</span>
                  <span>{l.sales} ventes</span>
                </div>

                <div className="mkt-card-footer">
                  <div>
                    <div className="mkt-price">{l.price}</div>
                    <div className="mkt-mrr mono">{l.mrr}</div>
                  </div>
                  <button className="mkt-cta" onClick={() => navigate(`#/marketplace/${l.id}`)}>
                    Voir le listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
