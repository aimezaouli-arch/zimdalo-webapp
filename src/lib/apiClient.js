/**
 * Client API minimal, basé sur fetch — agnostique du backend.
 *
 * Zimdalo est destiné à être hébergé sur Hostinger. Ce client ne présuppose
 * aucune techno de backend particulière (Node/Express, PHP, etc.) : il parle
 * simplement à une API REST classique, configurée via une variable
 * d'environnement Vite :
 *
 *   VITE_API_URL   ex. https://api.zimdalo.app  (ou l'URL du backend Hostinger)
 *
 * Tant que cette variable n'est pas renseignée, le client bascule en
 * "mode démonstration" : les écritures sont simulées (délai réseau réaliste,
 * succès garanti) pour que l'interface reste testable sans backend connecté.
 * Dès que l'API réelle est déployée sur Hostinger, il suffit de renseigner
 * VITE_API_URL — aucun changement de code n'est nécessaire côté composants.
 *
 * Endpoints REST attendus côté backend (convention libre, à adapter) :
 *   POST /api/contact           { name, email, message, subject? }
 *   POST /api/challenge-signup  { email }
 *   POST /api/auth/signup       { fullName, email, password, plan? }
 *   POST /api/auth/login        { email, password }
 *   POST /api/sell-submission   { name, tagline, category, mrr, askingPrice, description, email }
 */

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const IS_CONFIGURED = Boolean(API_URL);

if (!IS_CONFIGURED && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.info(
    "[zimdalo] Backend non configuré — mode démonstration actif (VITE_API_URL absent). " +
      "Renseigne VITE_API_URL une fois l'API déployée sur Hostinger."
  );
}

function simulateLatency(min = 500, max = 900) {
  const delay = min + Math.random() * (max - min);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function post(path, payload) {
  if (!IS_CONFIGURED) {
    await simulateLatency();
    return { data: { ok: true, demo: true, ...payload }, error: null };
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await safeJson(res);
    if (!res.ok) {
      return { data: null, error: (body && body.message) || "Une erreur est survenue. Réessaie dans un instant." };
    }
    return { data: body, error: null };
  } catch (e) {
    return { data: null, error: "Impossible de contacter le serveur. Vérifie ta connexion et réessaie." };
  }
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  sendContactMessage: (payload) => post("/api/contact", payload),
  joinChallenge: (payload) => post("/api/challenge-signup", payload),
  signUp: (payload) => post("/api/auth/signup", payload),
  signIn: (payload) => post("/api/auth/login", payload),
  submitListing: (payload) => post("/api/sell-submission", payload),
};

export const isApiConfigured = IS_CONFIGURED;
