import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-labels-1.jpg";
import hero2 from "@/assets/hero-labels-3.jpg";
import hero3 from "@/assets/labels-grid.jpg";
import heroNature from "@/assets/product-nature.jpeg";
import hero4 from "@/assets/hero-labels-2.jpg";

const SLIDES = [
  { eyebrow: "STUDIO 04 / SEASON 01", title: "LABELS\nFOR THE WORLD'S\nBEST BRANDS.", cta: "EXPLORE LABELS", to: "/collections/all", image: heroNature, accent: "#f4f4f1", overlay: 0.55 },
  { eyebrow: "WOVEN · LEATHER · HANGTAG", title: "THE DETAIL\nIS THE BRAND.", cta: "SEE THE CRAFT", to: "/about", image: hero1, accent: "#f4f4f1", overlay: 0.45 },
  { eyebrow: "CUSTOM STUDIO", title: "DESIGNED.\nWOVEN.\nDELIVERED.", cta: "START A PROJECT", to: "/services", image: hero3, accent: "#f4f4f1", overlay: 0.55 },
  { eyebrow: "PACKAGING SUITE", title: "EVERY TOUCH\nIS A STATEMENT.", cta: "SEE PACKAGING", to: "/collections/packaging", image: hero2, accent: "#f4f4f1", overlay: 0.45 },
  { eyebrow: "SIGNATURE TAG", title: "HERRINGBONE.\nNAVY. ICONIC.", cta: "VIEW TAGS", to: "/collections/hangtags", image: hero4, accent: "#f4f4f1", overlay: 0.4 },
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
          style={{ color: s.accent }}
        >
          <img
            src={s.image}
            alt=""
            width={1920}
            height={1080}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(5,5,15,${s.overlay*0.4}) 0%, rgba(5,5,15,${s.overlay}) 100%)` }} />
          <div className="absolute inset-0 noise-bg opacity-20" />
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
