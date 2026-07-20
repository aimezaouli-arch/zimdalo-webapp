import { articles } from "../data/content.js";

export default function Article({ id, navigate }) {
  const a = articles.find((x) => x.id === id) || articles[0];

  return (
    <section>
      <div className="container">
        <button className="back-link" onClick={() => navigate("#/blog")}>
          ← Retour au blog
        </button>
        <div className="article-body">
          <div className="article-meta">
            <span className="article-cat">{a.cat}</span>
            <span className="article-date">
              {a.date} · {a.read}
            </span>
          </div>
          <h1>{a.title}</h1>
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
