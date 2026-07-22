import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    key: "construire",
    label: "Construire",
    title: "Lance ton SaaS de l'idée au prototype",
    text: "Un parcours guidé, étape par étape, pour transformer une idée en produit testable — sans connaissance technique préalable.",
    stat: ["10", "outils intégrés"],
    icon: <IconBuild />,
  },
  {
    key: "digitaliser",
    label: "Digitaliser",
    title: "Transforme tes processus physiques en outils numériques",
    text: "Ton entreprise existe déjà ? Digitalise le point de friction le plus coûteux en premier, sans tout reconstruire d'un coup.",
    stat: ["6", "étapes du parcours"],
    icon: <IconDigitize />,
  },
  {
    key: "etendre",
    label: "Étendre",
    title: "Adapte ton activité à un nouveau marché",
    text: "Pricing ajusté par pays, cadre réglementaire à vérifier, pilote limité avant l'échelle complète.",
    stat: ["25", "pays couverts"],
    icon: <IconExpand />,
  },
  {
    key: "vendre",
    label: "Vendre",
    title: "Mets ton SaaS en valeur sur la marketplace",
    text: "Prix de revente estimé automatiquement selon le MRR et le marché, transaction sécurisée par séquestre.",
    stat: ["10-15%", "commission marketplace"],
    icon: <IconSell />,
  },
  {
    key: "former",
    label: "Se former",
    title: "Apprends à ton rythme, étape par étape",
    text: "Des formations courtes sur la validation d'idée, le pricing, le marketing et la préparation à la revente.",
    stat: ["6", "formations disponibles"],
    icon: <IconLearn />,
  },
];

const AUTO_ADVANCE_MS = 4800;

export default function PrestationsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  function goTo(i) {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {SLIDES.map((slide) => (
            <div className="carousel-slide" key={slide.key}>
              <div className="carousel-visual">
                <div className="carousel-icon">{slide.icon}</div>
              </div>
              <div className="carousel-info">
                <span className="carousel-label mono">{slide.label}</span>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
                <div className="carousel-stat">
                  <span className="carousel-stat-num">{slide.stat[0]}</span>
                  <span className="carousel-stat-label">{slide.stat[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow carousel-arrow--prev"
          onClick={() => goTo(index - 1)}
          aria-label="Prestation précédente"
        >
          ‹
        </button>
        <button
          className="carousel-arrow carousel-arrow--next"
          onClick={() => goTo(index + 1)}
          aria-label="Prestation suivante"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.key}
            className={`carousel-dot${i === index ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Aller à ${slide.label}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Icônes vectorielles maison, style blueprint ---------- */

function IconBuild() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 46 L32 14 L52 46" strokeLinejoin="round" />
      <circle cx="32" cy="14" r="3" fill="currentColor" stroke="none" />
      <path d="M20 46 h24" />
      <path d="M26 46 v-12 h12 v12" />
    </svg>
  );
}

function IconDigitize() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="16" width="20" height="14" rx="1.5" />
      <rect x="34" y="34" width="20" height="14" rx="1.5" />
      <path d="M20 30 v8 a4 4 0 0 0 4 4 h6" />
      <path d="M44 34 v-8 a4 4 0 0 0 -4 -4 h-6" />
      <path d="M28 22 h-14" strokeDasharray="2 3" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="32" cy="32" r="18" />
      <path d="M32 14 v36 M14 32 h36" strokeDasharray="2 3" />
      <circle cx="32" cy="14" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="50" cy="32" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="32" cy="50" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconSell() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 30 L30 12 h16 v16 L28 46 z" strokeLinejoin="round" />
      <circle cx="38" cy="20" r="3" />
      <path d="M18 40 l6 6" />
      <path d="M12 46 l6 6" />
    </svg>
  );
}

function IconLearn() {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 22 L32 12 L54 22 L32 32 Z" strokeLinejoin="round" />
      <path d="M20 27 v12 c0 3 5 6 12 6 s12 -3 12 -6 v-12" />
      <path d="M54 22 v14" strokeDasharray="2 3" />
    </svg>
  );
}
