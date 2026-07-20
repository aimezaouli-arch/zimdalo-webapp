import { successStories } from "../data/content.js";

export default function Succes() {
  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Success stories</span>
          <h1>Des parcours type, du lancement à la revente</h1>
          <p>Des exemples illustratifs de ce à quoi peut ressembler un parcours complet sur Zimdalo.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <p className="success-note">
            Ces cas sont des exemples illustratifs construits pour présenter la plateforme — ils ne
            représentent pas des entreprises réelles.
          </p>
          <div className="success-grid">
            {successStories.map((s, i) => (
              <div className="success-card" key={i}>
                <div className="metric">{s[0]}</div>
                <div className="metric-label">{s[1]}</div>
                <h4>{s[2]}</h4>
                <div className="tag2">{s[3]}</div>
                <p>{s[4]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
