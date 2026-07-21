# Zimdalo

Plateforme guidée pour :

- lancer un nouveau SaaS à partir d'une idée,
- digitaliser une entreprise déjà existante,
- ou étendre une activité vers un nouveau marché.

Pensée pour les entrepreneurs francophones d'Afrique et de la diaspora.

## Stack

- **React 18** + **Vite 5** — build rapide, HMR en développement.
- **Three.js** (chargé en lazy-import) pour l'animation 3D des prestations.
- CSS classique avec tokens (`:root` custom properties) — pas de Tailwind, pas de framework CSS.
- Routage interne léger basé sur `window.location.hash` (`src/useHashRoute.js`), sans dépendance à `react-router`.
- Contenu centralisé dans `src/data/content.js`.
- Client API générique (`src/lib/apiClient.js`), basé sur `fetch`, agnostique du backend — prêt à être branché sur une API déployée sur **Hostinger** (Node/Express, PHP, ou autre).

## Structure

```
src/
  main.jsx                 point d'entrée React
  App.jsx                  routeur principal (hash-based)
  useHashRoute.js           hook de routage
  styles.css                styles globaux (tokens, sections, composants)
  data/content.js            contenu : outils, fonctionnalités, marketplace, tarifs, blog, formations, success stories, communauté
  lib/apiClient.js            client API générique (contact, inscription au challenge, auth)
  components/
    Header.jsx
    Footer.jsx
    CardGrid.jsx              grille de cartes générique (outils, fonctionnalités)
    Demo.jsx                   parcours interactif en 4 questions
    Prestations3D.jsx          scène Three.js (import dynamique, cleanup complet)
  pages/
    Home.jsx                   landing complète (hero, pour qui, 3D, démo, parcours, outils, marketplace, tarifs)
    Blog.jsx / Article.jsx
    Formations.jsx
    Succes.jsx
    Communaute.jsx              formulaire d'inscription au challenge (réel, via apiClient)
    Mentions.jsx
    Confidentialite.jsx
    Contact.jsx                 formulaire de contact (réel, via apiClient, pré-rempli depuis un listing)
    Inscription.jsx             création de compte, avec plan présélectionné depuis les tarifs
    Connexion.jsx
    ListingDetail.jsx            fiche détaillée d'un SaaS en vente sur la marketplace
    NotFound.jsx                 page 404
public/
  favicon.svg
  robots.txt
  sitemap.xml
  .htaccess                   configuration Apache (cache, compression) pour Hostinger
```

## Backend

Le frontend est **agnostique du backend**. `src/lib/apiClient.js` attend une API REST classique à l'URL définie par `VITE_API_URL`, avec les endpoints suivants (convention libre, à adapter côté serveur) :

```
POST /api/contact            { name, email, message, subject? }
POST /api/challenge-signup   { email }
POST /api/auth/signup        { fullName, email, password, plan? }
POST /api/auth/login         { email, password }
```

Tant que `VITE_API_URL` n'est pas renseignée, l'application fonctionne en **mode démonstration** : les formulaires simulent un envoi (délai réseau réaliste, succès garanti) sans nécessiter de backend — pratique pour présenter le prototype avant que l'API ne soit prête.

Copier `.env.example` vers `.env.local` et renseigner l'URL une fois l'API déployée :

```bash
cp .env.example .env.local
# puis éditer VITE_API_URL
```

## Développement local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

Le build génère `dist/`. Le chunk Three.js est séparé du bundle principal (chargé uniquement quand la section 3D est affichée).

## Déploiement sur Hostinger

1. Renseigner `VITE_API_URL` dans `.env.production` si l'API est déjà disponible (sinon le site reste en mode démonstration).
2. `npm run build` en local.
3. Uploader **le contenu** du dossier `dist/` (pas le dossier lui-même) dans `public_html/` via le gestionnaire de fichiers Hostinger ou un client FTP.
4. Le fichier `public/.htaccess` est copié automatiquement dans `dist/` au build — il active la compression et le cache navigateur. Aucune règle de réécriture d'URL n'est nécessaire : le routage se fait entièrement côté client via le hash (`#/...`).
5. Activer le certificat SSL gratuit Hostinger, puis décommenter la redirection HTTPS dans `.htaccess` si besoin.

## Statut

Prototype avancé, prêt pour un branchement backend réel. Le contenu marketplace, blog et success stories reste illustratif. Les formulaires (contact, inscription, connexion, challenge) sont fonctionnels côté frontend et prêts à être connectés à une API réelle hébergée sur Hostinger.
