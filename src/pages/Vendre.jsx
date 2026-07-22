import { useState } from "react";
import { api } from "../lib/apiClient.js";
import { marketplaceCategories } from "../data/content.js";

const STEPS = [
  ["01", "Soumets ton projet", "Renseigne les informations clés : nom, catégorie, revenus, prix souhaité."],
  ["02", "Vérification sous 48h", "Notre équipe vérifie les informations avant mise en ligne du listing."],
  ["03", "Mise en ligne", "Ton SaaS apparaît dans la marketplace, visible par les acheteurs qualifiés."],
  ["04", "Vente sécurisée", "La transaction passe par un séquestre. Zimdalo prélève 10 à 15 % à la vente."],
];

export default function Vendre({ navigate }) {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    category: marketplaceCategories[0],
    mrr: "",
    askingPrice: "",
    description: "",
    email: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Merci d'indiquer le nom de ton SaaS.";
    if (!form.tagline.trim()) return "Merci d'ajouter une courte description (une phrase).";
    if (!form.mrr.trim()) return "Merci d'indiquer ton revenu récurrent mensuel actuel.";
    if (!form.askingPrice.trim()) return "Merci d'indiquer le prix de vente souhaité.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "L'adresse email n'est pas valide.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { error } = await api.submitListing(form);
    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <section>
        <div className="container legal-body" style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: 14 }}>Projet soumis ✓</h1>
          <p>
            Merci, <b>{form.name}</b> est en cours de vérification. Tu recevras une réponse sous 48h
            ouvrées à {form.email}.
          </p>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("#marketplace")}>
            Voir la marketplace
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Vendre</span>
          <h1>Vends ton SaaS à des acheteurs qualifiés</h1>
          <p>
            Que ton SaaS génère 50 $ ou 5 000 $ de MRR, mets-le en valeur sur la marketplace Zimdalo —
            visible dans 25 pays, transaction sécurisée par séquestre.
          </p>
        </div>
      </section>

      {/* Étapes du processus vendeur */}
      <section style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="sell-steps">
            {STEPS.map(([num, title, text]) => (
              <div className="sell-step" key={num}>
                <span className="sell-step-num mono">{num}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Argumentaire chiffré */}
      <section style={{ paddingTop: 0, paddingBottom: 40 }}>
        <div className="container">
          <div className="sell-stats">
            <div className="sell-stat">
              <div className="sell-stat-num">25</div>
              <div className="sell-stat-label">pays touchés par la marketplace</div>
            </div>
            <div className="sell-stat">
              <div className="sell-stat-num">10-15%</div>
              <div className="sell-stat-label">commission, prélevée uniquement à la vente</div>
            </div>
            <div className="sell-stat">
              <div className="sell-stat-num">48h</div>
              <div className="sell-stat-label">délai moyen de vérification d'un listing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de soumission */}
      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="sell-form-card">
            <h3 style={{ fontSize: 17, marginBottom: 4 }}>Soumettre ton SaaS</h3>
            <p style={{ fontSize: 13, color: "#8A93A3", marginBottom: 22 }}>
              Ces informations serviront à créer ton listing après vérification.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="v-name">Nom du SaaS</label>
                <input
                  id="v-name"
                  type="text"
                  placeholder="ex. FactureFlow"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="v-tagline">Description courte</label>
                <input
                  id="v-tagline"
                  type="text"
                  placeholder="ex. Facturation OHADA automatisée pour PME"
                  value={form.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="v-category">Catégorie</label>
                <select
                  id="v-category"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #DDE3EC",
                    borderRadius: 4,
                    padding: "11px 13px",
                    fontSize: 14,
                    color: "var(--ink)",
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  {marketplaceCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="form-field">
                  <label htmlFor="v-mrr">MRR actuel ($)</label>
                  <input
                    id="v-mrr"
                    type="text"
                    placeholder="ex. 420"
                    value={form.mrr}
                    onChange={(e) => update("mrr", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="v-price">Prix souhaité ($)</label>
                  <input
                    id="v-price"
                    type="text"
                    placeholder="ex. 4200"
                    value={form.askingPrice}
                    onChange={(e) => update("askingPrice", e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="v-desc">Description détaillée (optionnel)</label>
                <textarea
                  id="v-desc"
                  rows={4}
                  placeholder="Fonctionnalités clés, stack technique, historique de croissance…"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="v-email">Ton email</label>
                <input
                  id="v-email"
                  type="email"
                  placeholder="ton@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#C0392B", fontSize: 13, marginBottom: 14 }}>{errorMsg}</p>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ background: "var(--ink)", color: "var(--paper)", width: "100%" }}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Envoi en cours…" : "Soumettre mon SaaS à la vente"}
              </button>
              <p className="form-note">Vérification sous 48h ouvrées. Aucun frais avant la vente.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
