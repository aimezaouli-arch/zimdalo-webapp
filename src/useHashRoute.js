import { useEffect, useState, useCallback } from "react";

/**
 * Routeur minimal basé sur window.location.hash.
 * Supporte :
 *  - "#/blog", "#/formations", etc. -> page nommée
 *  - "#/article/<id>"               -> page article + id
 *  - "#ancre" ou ""                 -> page "home", puis scroll vers l'ancre
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

function parseHash(hash) {
  if (hash.indexOf("#/article/") === 0) {
    return { page: "article", id: hash.replace("#/article/", ""), anchor: null };
  }
  if (hash.indexOf("#/") === 0) {
    const key = hash.slice(2) || "home";
    return { page: key, id: null, anchor: null };
  }
  if (hash.length > 1) {
    return { page: "home", id: null, anchor: hash };
  }
  return { page: "home", id: null, anchor: null };
}
