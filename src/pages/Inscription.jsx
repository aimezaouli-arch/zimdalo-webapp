import { useState } from "react";
import { api } from "../lib/apiClient.js";
import { plans, planSlugs } from "../data/content.js";

const PLAN_LABELS = Object.fromEntries(
  Object.entries(planSlugs).map(([tag, slug]) => [slug, tag])
);

export default function Inscription({ navigate, plan }) {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const selectedTag = plan && PLAN_LABELS[plan] ? PLAN_LABELS[plan] : null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Merci d'indiquer ton nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "L'adresse email n'est pas valide.";
    if (form.password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères.";
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
    const { error } = await api.signUp({ ...form, plan: selectedTag });
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
          <h1 style={{ marginBottom: 14 }}>Compte créé 🎉</h1>
          <p>
            Bienvenue sur Zimdalo{selectedTag ? `, ton plan ${selectedTag} est enregistré` : ""}. Un
            email de confirmation vient de t'être envoyé.
          </p>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => navigate("#/home")}>
            Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Inscription</span>
          <h1>Crée ton compte Zimdalo</h1>
          <p>
            {selectedTag
              ? `Tu t'inscris sur le plan ${selectedTag}. Tu pourras changer de formule à tout moment.`
              : "Commence gratuitement, tu pourras choisir un plan payant plus tard."}
          </p>
        </div>
      </section>
      <section>
        <div className="container" style={{ maxWidth: 420 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="s-name">Nom complet</label>
              <input
                id="s-name"
                type="text"
                placeholder="Ton nom"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="s-email">Email</label>
              <input
                id="s-email"
                type="email"
                placeholder="ton@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="s-password">Mot de passe</label>
              <input
                id="s-password"
                type="password"
                placeholder="6 caractères minimum"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
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
              {status === "sending" ? "Création en cours…" : "Créer mon compte"}
            </button>
            <p className="form-note">
              Déjà un compte ?{" "}
              <a
                onClick={() => navigate("#/connexion")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Se connecter
              </a>
            </p>
          </form>

          {!selectedTag && (
            <div style={{ marginTop: 36 }}>
              <p style={{ fontSize: 12.5, color: "#8A93A3", marginBottom: 10 }}>Ou choisis directement un plan :</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {plans.afrique.map((p) => (
                  <button
                    key={p[0]}
                    className="pill"
                    style={{ borderColor: "#DDE3EC", color: "var(--ink)" }}
                    onClick={() => navigate(`#/inscription/${planSlugs[p[1]]}`)}
                    type="button"
                  >
                    {p[0]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
