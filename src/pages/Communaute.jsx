import { communityCats } from "../data/content.js";

export default function Communaute() {
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
            <button
              className="btn-primary"
              style={{ background: "var(--amber)" }}
              onClick={() => alert("Démonstration — inscription non connectée.")}
            >
              Rejoindre le challenge
            </button>
          </div>
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
