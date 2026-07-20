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
- Contenu centralisé dans `src/data/content.js` — facile à faire évoluer ou à connecter à un backend (Supabase) plus tard.

## Structure

```
src/
  main.jsx              point d'entrée React
  App.jsx                routeur principal (hash-based)
  useHashRoute.js         hook de routage
  styles.css              styles globaux (tokens, sections, composants)
  data/content.js          contenu : outils, fonctionnalités, marketplace, tarifs, blog, formations, success stories, communauté
  components/
    Header.jsx
    Footer.jsx
    CardGrid.jsx           grille de cartes générique (outils, fonctionnalités)
    Demo.jsx                parcours interactif en 4 questions
    Prestations3D.jsx       scène Three.js (import dynamique, cleanup complet)
  pages/
    Home.jsx                landing complète (hero, pour qui, 3D, démo, parcours, outils, marketplace, tarifs)
    Blog.jsx / Article.jsx
    Formations.jsx
    Succes.jsx
    Communaute.jsx
    Mentions.jsx
    Confidentialite.jsx
    Contact.jsx
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

## Déploiement (Vercel)

Le fichier `vercel.json` configure :
- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`
- un rewrite SPA (`/(.*) → /index.html`) pour que le routage par hash fonctionne correctement après un rechargement de page.

Il suffit de connecter le dépôt GitHub à un projet Vercel — aucune variable d'environnement n'est requise pour l'instant (le projet ne consomme pas encore de backend).

## Statut

Prototype avancé — les formulaires (contact, inscription au challenge) ne sont pas connectés à un backend. Le contenu marketplace, blog et success stories est illustratif. Une intégration Supabase (auth, données réelles) pourra être ajoutée dans une prochaine itération, en suivant le même pattern que KONZIMA et ArcaTek (client fetch custom, sans `supabase-js`).
