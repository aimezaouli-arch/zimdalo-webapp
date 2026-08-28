import { useEffect, useState } from "react";

const SLIDE_DURATION_MS = 5000;

/**
 * Fond du hero en deux "scènes" qui alternent en fondu.
 *
 * Actuellement composées en CSS pur (dégradés + motifs), faute de photo sous
 * licence utilisable en production. Pour passer à de vraies photos : dépose
 * les fichiers dans /public/hero/slide-1.jpg et /public/hero/slide-2.jpg,
 * puis décommente le bloc `background-image` correspondant dans styles.css
 * (`.hero-slide--photo`) et ajoute la classe sur chaque `.hero-slide`.
 */
export default function HeroBackgroundSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setActive((i) => (i === 0 ? 1 : 0));
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider" aria-hidden="true">
      <div className={`hero-slide hero-slide--a${active === 0 ? " is-active" : ""}`} />
      <div className={`hero-slide hero-slide--b${active === 1 ? " is-active" : ""}`} />
    </div>
  );
}
