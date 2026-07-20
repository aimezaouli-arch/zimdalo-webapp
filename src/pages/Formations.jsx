import { formations } from "../data/content.js";

export default function Formations() {
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
                <span className="duration">{f[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
