import { articles } from "../data/content.js";

export default function Blog({ navigate }) {
  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <span className="eyebrow">Blog</span>
          <h1>Ressources pour construire, digitaliser et vendre</h1>
          <p>
            Des articles courts et pratiques, écrits pour les entrepreneurs francophones d'Afrique et
            de la diaspora.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="blog-grid">
            {articles.map((a) => (
              <div className="article-card" key={a.id} onClick={() => navigate(`#/article/${a.id}`)}>
                <div className="article-meta">
                  <span className="article-cat">{a.cat}</span>
                  <span className="article-date">
                    {a.date} · {a.read}
                  </span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <span className="article-read">Lire l'article →</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
