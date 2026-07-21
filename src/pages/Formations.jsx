import { formations } from "../data/content.js";

export default function Formations({ navigate }) {
  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Formations</span>
          <h1>Apprends à ton rythme, étape par étape</h1>
          <p>Des formations courtes, pensées pour accompagner chaque étape du parcours Zimdalo.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="formations-grid">
            {formations.map((f, i) => (
              <div className="formation-card" key={i}>
                <span className="level">{f[0]}</span>
                <h4>{f[1]}</h4>
                <p>{f[2]}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                  <span className="duration">{f[3]}</span>
                  <button
                    onClick={() => navigate("#/inscription")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--ink)",
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Commencer →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
