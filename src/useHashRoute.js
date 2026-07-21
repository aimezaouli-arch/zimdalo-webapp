import { useEffect, useState, useCallback } from "react";

/**
 * Routeur minimal basé sur window.location.hash.
 *
 * Routes supportées :
 *   ""  ou "#ancre"                  -> page "home", scroll vers l'ancre éventuelle
 *   "#/<page>"                       -> page nommée (blog, formations, succes, ...)
 *   "#/article/<id>"                 -> page article
 *   "#/marketplace/<id>"             -> page détail d'un listing marketplace
 *   "#/inscription" ou "#/inscription/<plan>" -> page inscription, plan optionnel
 *   "#/contact/listing/<id>"         -> page contact pré-remplie pour un listing
 */
export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((hash) => {
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}

const NAMED_PAGES = new Set([
  "home",
  "blog",
  "formations",
  "succes",
  "communaute",
  "mentions",
  "confidentialite",
  "contact",
  "inscription",
  "connexion",
]);

function parseHash(hash) {
  if (hash.indexOf("#/article/") === 0) {
    return { page: "article", id: hash.replace("#/article/", ""), plan: null, anchor: null };
  }
  if (hash.indexOf("#/marketplace/") === 0) {
    return { page: "listing", id: hash.replace("#/marketplace/", ""), plan: null, anchor: null };
  }
  if (hash.indexOf("#/inscription/") === 0) {
    return { page: "inscription", id: null, plan: hash.replace("#/inscription/", ""), anchor: null };
  }
  if (hash.indexOf("#/contact/listing/") === 0) {
    return { page: "contact", id: hash.replace("#/contact/listing/", ""), plan: null, anchor: null };
  }
  if (hash.indexOf("#/") === 0) {
    const key = hash.slice(2) || "home";
    if (!NAMED_PAGES.has(key)) {
      return { page: "notfound", id: null, plan: null, anchor: null };
    }
    return { page: key, id: null, plan: null, anchor: null };
  }
  if (hash.length > 1) {
    return { page: "home", id: null, plan: null, anchor: hash };
  }
  return { page: "home", id: null, plan: null, anchor: null };
}
