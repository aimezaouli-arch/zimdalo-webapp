/**
 * Transmet le texte libre saisi par l'utilisateur (nom/description de son
 * projet) vers l'outil Cahier de Charge, via sessionStorage — le temps de la
 * navigation entre la page d'accueil et la page de l'outil. Ne contient rien
 * de sensible, purement une commodité d'UX.
 */
const KEY = "zimdalo:draft-project";

export function setDraftProject(text) {
  try {
    sessionStorage.setItem(KEY, text);
  } catch {
    // sessionStorage indisponible (navigation privée stricte, etc.) — sans impact bloquant.
  }
}

export function consumeDraftProject() {
  try {
    const value = sessionStorage.getItem(KEY);
    if (value) sessionStorage.removeItem(KEY);
    return value || "";
  } catch {
    return "";
  }
}
