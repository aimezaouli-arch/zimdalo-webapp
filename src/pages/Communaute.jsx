import { useState } from "react";
import { api } from "../lib/apiClient.js";
import { communityCats } from "../data/content.js";

export default function Communaute() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleJoin(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("L'adresse email n'est pas valide.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { error } = await api.joinChallenge({ email });
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
          <span className="eyebrow">Communauté</span>
          <h1>Avance moins seul</h1>
          <p>
            Échange avec d'autres porteurs de projet, entreprises en digitalisation et entrepreneurs en
            extension.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="challenge-box">
            <div>
              <h3>Challenge en cours — Lancer un SaaS en 30 jours</h3>
              <p>Un groupe, un rythme commun, un accompagnement quotidien pendant 30 jours.</p>
            </div>

            {status === "success" ? (
              <div className="mono" style={{ color: "var(--green)", fontSize: 13.5 }}>
                ✓ Inscription confirmée — surveille ta boîte mail.
              </div>
            ) : (
              <form onSubmit={handleJoin} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 4,
                    padding: "11px 13px",
                    color: "var(--paper)",
                    fontSize: 13.5,
                    minWidth: 200,
                  }}
                />
                <button className="btn-primary" style={{ background: "var(--amber)" }} disabled={status === "sending"}>
                  {status === "sending" ? "Inscription…" : "Rejoindre le challenge"}
                </button>
              </form>
            )}
          </div>
          {status === "error" && (
            <p style={{ color: "#F2A73B", fontSize: 13, marginTop: -20, marginBottom: 24 }}>{errorMsg}</p>
          )}

          <div className="community-grid">
            {communityCats.map((c, i) => (
              <div className="community-card" key={i}>
                <h4>{c[0]}</h4>
                <p>{c[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
