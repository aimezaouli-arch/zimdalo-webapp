import { useEffect, useState } from "react";
import { api } from "../lib/apiClient.js";
import { listings } from "../data/content.js";

export default function Contact({ navigate, listingId }) {
  const prefillListing = listingId ? listings.find((l) => l.id === listingId) : null;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (prefillListing) {
      setForm((f) => ({
        ...f,
        message: `Bonjour, je souhaite faire une offre pour le SaaS "${prefillListing.name}" (${prefillListing.price}). `,
      }));
    }
  }, [listingId]); // eslint-disable-line react-hooks/exhaustive-deps

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Merci d'indiquer ton nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "L'adresse email n'est pas valide.";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "Le message doit contenir au moins 10 caractères.";
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
    const { error } = await api.sendContactMessage({
      ...form,
      subject: prefillListing ? `Offre — ${prefillListing.name}` : "Contact général",
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }
    setStatus("success");
  }

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>{prefillListing ? `Faire une offre pour ${prefillListing.name}` : "Une question ? Écris-nous"}</h1>
          <p>Réponse sous 48h ouvrées.</p>
        </div>
      </section>
      <section>
        <div className="container contact-grid">
          <div>
            {status === "success" ? (
              <div
                style={{
                  background: "#EFFAF4",
                  border: "1px solid #BEEBD3",
                  borderRadius: 6,
                  padding: "18px 20px",
                }}
              >
                <h4 style={{ marginBottom: 6, color: "var(--ink)" }}>Message envoyé ✓</h4>
                <p style={{ fontSize: 13.5, color: "#3A6B52" }}>
                  Merci{form.name ? `, ${form.name}` : ""} — nous te répondons sous 48h ouvrées à{" "}
                  {form.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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

                {status === "error" && (
                  <p style={{ color: "#C0392B", fontSize: 13, marginBottom: 14 }}>{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ background: "var(--ink)", color: "var(--paper)" }}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            )}
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
