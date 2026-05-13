import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  { eyebrow: "VOLUME 04 / DROP 01", title: "ENGINEERED\nFOR MOTION", cta: "SHOP NOW", to: "/collections/all", bg: "linear-gradient(110deg,#0a0a0a 0%,#1c1c1c 55%,#262626 100%)", accent: "#f4f4f1" },
  { eyebrow: "LAB SERIES · LOW", title: "BUILT IN\nTHE LAB", cta: "VIEW PAGE", to: "/about", bg: "linear-gradient(110deg,#f4f4f1 0%,#e9e9e4 60%,#dcdcd6 100%)", accent: "#050505" },
  { eyebrow: "PRESS · 2026", title: "CULTURE\nIS A FORM", cta: "READ JOURNAL", to: "/press", bg: "linear-gradient(110deg,#050505 0%,#0e0e0e 50%,#1a1a1a 100%)", accent: "#f4f4f1" },
  { eyebrow: "SIGNATURE RUNNER", title: "MADE FOR\nDISTANCE", cta: "SHOP RUNNER", to: "/collections/runners", bg: "linear-gradient(110deg,#1a1a1a,#3a3a3a)", accent: "#f4f4f1" },
  { eyebrow: "ATELIER · CUSTOM", title: "BESPOKE\nFOOTWEAR", cta: "BOOK ATELIER", to: "/services", bg: "linear-gradient(110deg,#fff 0%,#ededed 100%)", accent: "#050505" },
] as const;

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const hover = useRef(false);
  useEffect(() => {
    const id = setInterval(() => { if (!hover.current) setI(p => (p + 1) % SLIDES.length); }, 5000);
    return () => clearInterval(id);
  }, []);
  const s = SLIDES[i];

  return (
    <section
      className="relative w-full h-[72vh] min-h-[600px] overflow-hidden border-b border-hairline"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ background: s.bg, color: s.accent }}
        >
          <div className="absolute inset-0 noise-bg opacity-40" />
          <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12">
            <div className="flex items-start justify-between text-meta-sm opacity-70">
              <span>{s.eyebrow}</span>
              <span>{(i + 1).toString().padStart(2, "0")} / {SLIDES.length.toString().padStart(2, "0")}</span>
            </div>
            <div className="max-w-5xl">
              <h1 className="display-xxl whitespace-pre-line text-[14vw] md:text-[10vw]">{s.title}</h1>
              <Link to={s.to as any} className="arrow-cta mt-8 inline-flex border px-6 py-3 text-meta"
                style={{ borderColor: s.accent, color: s.accent }}>
                {s.cta} <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-meta">
              {SLIDES.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)}
                  className={`tabular-nums transition-opacity ${idx === i ? "opacity-100 font-extrabold" : "opacity-40"}`}>
                  {(idx + 1).toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
