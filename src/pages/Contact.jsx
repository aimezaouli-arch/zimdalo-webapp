import { useState } from "react";

export default function Contact({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit() {
    alert("Formulaire de démonstration — non connecté à un service d'envoi.");
  }

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Une question ? Écris-nous</h1>
          <p>Réponse sous 48h ouvrées.</p>
        </div>
      </section>
      <section>
        <div className="container contact-grid">
          <div>
            <div className="form-field">
              <label htmlFor="c-name">Nom</label>
              <input
                id="c-name"
                type="text"
                placeholder="Ton nom"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                placeholder="ton@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="c-msg">Message</label>
              <textarea
                id="c-msg"
                rows={5}
                placeholder="Ta question ou ta demande"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </div>
            <button
              className="btn-primary"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
              onClick={handleSubmit}
            >
              Envoyer le message
            </button>
            <p className="form-note">Formulaire de démonstration — non connecté à un service d'envoi.</p>
          </div>
          <div className="contact-info">
            <h4>Autres canaux</h4>
            <div className="row">
              <b>Support</b>support@zimdalo.app
            </div>
            <div className="row">
              <b>Partenariats</b>partenaires@zimdalo.app
            </div>
            <div className="row">
              <b>Communauté</b>
              <a
                onClick={() => navigate("#/communaute")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Rejoindre la communauté →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
