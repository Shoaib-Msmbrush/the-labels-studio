import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import wovenImg from "@/assets/woven-detail.jpg";
import wovenAlt from "@/assets/product-woven.jpg";
import leatherImg from "@/assets/leather-denim.jpg";
import leatherAlt from "@/assets/product-leather.jpg";
import hangtagImg from "@/assets/hangtag-luxury.jpg";
import hangtagAlt from "@/assets/product-hangtag.jpg";
import careImg from "@/assets/product-care.jpg";
import embroideredImg from "@/assets/product-embroidered.jpg";
import packagingImg from "@/assets/packaging-suite.jpg";
import packagingAlt from "@/assets/product-packaging.jpg";

type Panel = {
  num: string; title: string; categorySlug: string; chip: string;
  philosophy: string; image: string; cardImage: string;
  productHandle: string; productTitle: string; productMeta: string; priceLabel: string;
};

const PANELS: Panel[] = [
  { num: "01", title: "WOVEN LABELS", categorySlug: "woven-labels", chip: "4 finishes",
    philosophy: "THE SIGNATURE STITCHED INTO EVERY GARMENT.",
    image: wovenImg, cardImage: wovenAlt,
    productHandle: "signature-woven-neck-label", productTitle: "Signature Woven Neck Label",
    productMeta: "Damask weave · MOQ 500 · 10–14 days", priceLabel: "From $0.08/unit" },
  { num: "02", title: "LEATHER PATCHES", categorySlug: "leather-patches", chip: "3 finishes",
    philosophy: "HERITAGE YOU CAN FEEL BETWEEN YOUR FINGERS.",
    image: leatherImg, cardImage: leatherAlt,
    productHandle: "embossed-leather-patch", productTitle: "Embossed Leather Patch",
    productMeta: "Veg-tan · MOQ 300 · 14–20 days", priceLabel: "From $0.35/unit" },
  { num: "03", title: "HANGTAGS", categorySlug: "hangtags", chip: "5 paper stocks",
    philosophy: "THE FIRST HANDSHAKE BETWEEN BRAND AND BUYER.",
    image: hangtagImg, cardImage: hangtagAlt,
    productHandle: "minimal-black-hangtag", productTitle: "Minimal Black Hangtag",
    productMeta: "350gsm matte · MOQ 500 · 7–10 days", priceLabel: "From $0.15/unit" },
  { num: "04", title: "CARE LABELS", categorySlug: "care-labels", chip: "4 fabric types",
    philosophy: "QUIET PRECISION FOR THE INSIDE OF EVERY PIECE.",
    image: careImg, cardImage: careImg,
    productHandle: "soft-touch-care-label", productTitle: "Soft Touch Care Label",
    productMeta: "Satin · MOQ 1000 · 10–14 days", priceLabel: "From $0.05/unit" },
  { num: "05", title: "EMBROIDERED PATCHES", categorySlug: "embroidered-patches", chip: "6 thread options",
    philosophy: "ICONOGRAPHY THAT OUTLASTS THE SEASON.",
    image: embroideredImg, cardImage: embroideredImg,
    productHandle: "embroidered-logo-patch", productTitle: "Embroidered Logo Patch",
    productMeta: "Merrow border · MOQ 300 · 12–18 days", priceLabel: "From $0.30/unit" },
  { num: "06", title: "PACKAGING SUITE", categorySlug: "packaging", chip: "8 brand assets",
    philosophy: "THE UNBOXING IS PART OF THE PRODUCT.",
    image: packagingImg, cardImage: packagingAlt,
    productHandle: "premium-packaging-suite", productTitle: "Premium Packaging Suite",
    productMeta: "Box + tissue + tag · MOQ 300 · 18–25 days", priceLabel: "Custom Quote" },
];

export function ScrollDockShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max((-rect.top) / total, 0), 0.999);
      setActive(Math.floor(progress * PANELS.length));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > 0 || r.bottom < window.innerHeight) return;
      const segment = (el.offsetHeight - window.innerHeight) / PANELS.length;
      if (e.key === "ArrowDown") window.scrollBy({ top: segment, behavior: "smooth" });
      if (e.key === "ArrowUp") window.scrollBy({ top: -segment, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-paper" style={{ height: `${PANELS.length * 100}vh` }}>
      <div className="sticky top-12 h-[calc(100vh-48px)] overflow-hidden border-y border-hairline flex flex-col">
        <div className="border-b border-hairline">
          {PANELS.slice(0, active).map((p, i) => <DockBar key={i} num={p.num} title={p.title} />)}
        </div>
        <ActivePanel panel={PANELS[active]} index={active} total={PANELS.length} />
        <div className="border-t border-hairline mt-auto">
          {PANELS.slice(active + 1).map((p, i) => <DockBar key={i} num={p.num} title={p.title} />)}
        </div>
      </div>
    </section>
  );
}

function DockBar({ num, title }: { num: string; title: string }) {
  return (
    <div className="h-[46px] border-b border-hairline last:border-b-0 flex items-center justify-between px-6 text-meta-sm bg-paper">
      <span className="text-muted-foreground">{num}.</span>
      <span>{title}</span>
      <span className="text-muted-foreground">—</span>
    </div>
  );
}

function ActivePanel({ panel, index, total }: { panel: Panel; index: number; total: number }) {
  return (
    <div className="flex-1 grid grid-cols-12 grid-rows-6 relative bg-paper">
      <div className="col-span-12 border-b border-hairline px-6 h-10 flex items-center justify-between text-meta-sm">
        <span>{panel.num}. / {panel.title} / {panel.chip.toUpperCase()}</span>
        <span className="text-muted-foreground">{(index + 1).toString().padStart(2, "0")} — {total.toString().padStart(2, "0")}</span>
      </div>

      <div className="hidden md:flex col-span-3 row-span-5 border-r border-hairline p-6 flex-col justify-between">
        <p className="text-meta-sm text-muted-foreground">PRODUCT PHILOSOPHY</p>
        <p className="text-2xl font-bold uppercase leading-tight">"{panel.philosophy}"</p>
        <p className="text-meta-sm text-muted-foreground">— THE STUDIO</p>
      </div>

      <div className="col-span-12 md:col-span-6 row-span-3 md:row-span-5 relative bg-bone overflow-hidden">
        <img key={panel.image} src={panel.image} alt={panel.title}
          className="absolute inset-0 w-full h-full object-cover animate-[heroSlide_.7s_cubic-bezier(.22,1,.36,1)_both]" />
      </div>

      <div className="col-span-12 md:col-span-3 row-span-2 md:row-span-5 border-t md:border-t-0 md:border-l border-hairline p-4 md:p-6 flex flex-col md:flex-col justify-between bg-paper overflow-hidden">
        <div>
          <p className="text-meta-sm text-muted-foreground">{panel.num} / FEATURED</p>
          <div className="mt-4 aspect-square bg-muted overflow-hidden hidden md:block">
            <img src={panel.cardImage} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div>
          <p className="text-meta-sm text-muted-foreground">{panel.title}</p>
          <p className="text-meta">{panel.productTitle.toUpperCase()}</p>
          <p className="text-meta-sm text-muted-foreground mt-1" style={{ textTransform: "none", letterSpacing: 0 }}>{panel.productMeta}</p>
          <p className="text-2xl font-extrabold mt-2">{panel.priceLabel}</p>
          <div className="flex gap-2 mt-4">
            <Link to="/products/$handle" params={{ handle: panel.productHandle }}
              className="arrow-cta inline-flex border border-ink px-3 py-2 text-meta-sm flex-1 justify-center">
              EXPLORE PRODUCT <ArrowUpRight className="size-3" />
            </Link>
            <Link to="/collections/$handle" params={{ handle: panel.categorySlug }}
              className="inline-flex border border-hairline px-3 py-2 text-meta-sm">ALL</Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroSlide {
          from { transform: translateX(-80px) scale(.92); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
