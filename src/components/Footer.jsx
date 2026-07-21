export default function Footer({ navigate }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Zimdalo</div>
            <p style={{ fontSize: 13, maxWidth: 260 }}>
              Le parcours guidé pour lancer un SaaS, digitaliser une entreprise existante, ou étendre
              une activité — de l'idée à la revente.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Produit</h5>
              <a onClick={() => navigate("#parcours")}>Parcours</a>
              <a onClick={() => navigate("#outils")}>Outils</a>
              <a onClick={() => navigate("#marketplace")}>Marketplace</a>
              <a onClick={() => navigate("#tarifs")}>Tarifs</a>
            </div>
            <div className="footer-col">
              <h5>Ressources</h5>
              <a onClick={() => navigate("#/blog")}>Blog</a>
              <a onClick={() => navigate("#/formations")}>Formations</a>
              <a onClick={() => navigate("#/succes")}>Success stories</a>
              <a onClick={() => navigate("#/communaute")}>Communauté</a>
            </div>
            <div className="footer-col">
              <h5>Compte</h5>
              <a onClick={() => navigate("#/connexion")}>Connexion</a>
              <a onClick={() => navigate("#/inscription")}>Créer un compte</a>
              <a onClick={() => navigate("#/contact")}>Contact</a>
            </div>
            <div className="footer-col">
              <h5>Légal</h5>
              <a onClick={() => navigate("#/mentions")}>Mentions légales</a>
              <a onClick={() => navigate("#/confidentialite")}>Confidentialité</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Zimdalo. Tous droits réservés.</span>
          <span className="mono">v0.4 — React/Vite</span>
        </div>
      </div>
    </footer>
  );
}
