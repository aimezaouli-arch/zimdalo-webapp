import { useState } from "react";
import { api } from "../lib/apiClient.js";

export default function Connexion({ navigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error");
      setErrorMsg("L'adresse email n'est pas valide.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { error } = await api.signIn(form);
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
          <h1 style={{ marginBottom: 14 }}>Connexion réussie</h1>
          <p>Tu es maintenant connecté à ton espace Zimdalo.</p>
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
          <span className="eyebrow">Connexion</span>
          <h1>Retrouve ton parcours</h1>
          <p>Connecte-toi pour reprendre là où tu t'es arrêté.</p>
        </div>
      </section>
      <section>
        <div className="container" style={{ maxWidth: 420 }}>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="l-email">Email</label>
              <input
                id="l-email"
                type="email"
                placeholder="ton@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="l-password">Mot de passe</label>
              <input
                id="l-password"
                type="password"
                placeholder="Ton mot de passe"
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
              {status === "sending" ? "Connexion en cours…" : "Se connecter"}
            </button>
            <p className="form-note">
              Pas encore de compte ?{" "}
              <a
                onClick={() => navigate("#/inscription")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Créer un compte
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
