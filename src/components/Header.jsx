export default function Header({ navigate }) {
  return (
    <header>
      <div className="nav">
        <button className="logo" onClick={() => navigate("#/home")}>
          <span className="dot"></span> Zimdalo
        </button>
        <nav className="nav-links nav-mobile-hide">
          <a onClick={() => navigate("#public")}>Pour qui</a>
          <a onClick={() => navigate("#parcours")}>Parcours</a>
          <a onClick={() => navigate("#outils")}>Outils</a>
          <a onClick={() => navigate("#marketplace")}>Marketplace</a>
          <a onClick={() => navigate("#/blog")}>Blog</a>
          <a onClick={() => navigate("#tarifs")}>Tarifs</a>
          <a onClick={() => navigate("#/connexion")}>Connexion</a>
        </nav>
        <button className="nav-cta" onClick={() => navigate("#/inscription")}>
          Commencer
        </button>
      </div>
    </header>
  );
}
