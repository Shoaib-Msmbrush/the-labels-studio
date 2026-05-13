import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { fetchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import wovenImg from "@/assets/product-woven.jpg";
import leatherImg from "@/assets/product-leather.jpg";
import hangtagImg from "@/assets/product-hangtag.jpg";
import careImg from "@/assets/product-care.jpg";
import embroideredImg from "@/assets/product-embroidered.jpg";
import packagingImg from "@/assets/product-packaging.jpg";

const PLACEHOLDER_PANELS = [
  { num: "01", title: "WOVEN LABELS", colors: 4, philosophy: "THE SIGNATURE STITCHED INTO EVERY GARMENT.", fallback: wovenImg },
  { num: "02", title: "LEATHER PATCHES", colors: 3, philosophy: "HERITAGE YOU CAN FEEL BETWEEN YOUR FINGERS.", fallback: leatherImg },
  { num: "03", title: "HANGTAGS", colors: 5, philosophy: "THE FIRST HANDSHAKE BETWEEN BRAND AND BUYER.", fallback: hangtagImg },
  { num: "04", title: "CARE LABELS", colors: 2, philosophy: "QUIET PRECISION FOR THE INSIDE OF EVERY PIECE.", fallback: careImg },
  { num: "05", title: "EMBROIDERED PATCHES", colors: 6, philosophy: "ICONOGRAPHY THAT OUTLASTS THE SEASON.", fallback: embroideredImg },
  { num: "06", title: "PACKAGING SUITE", colors: 3, philosophy: "THE UNBOXING IS PART OF THE PRODUCT.", fallback: packagingImg },
] as const;

export function ScrollDockShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => { fetchProducts(6).then(setProducts); }, []);

  // Build panel data, merging placeholder + real products
  const panels = PLACEHOLDER_PANELS.map((p, idx) => {
    const prod = products[idx];
    return {
      ...p,
      product: prod,
      title: prod ? prod.node.title.toUpperCase() : p.title,
      image: prod?.node.images.edges[0]?.node.url ?? p.fallback,
      price: prod ? formatPrice(prod.node.priceRange.minVariantPrice.amount, prod.node.priceRange.minVariantPrice.currencyCode) : null,
      handle: prod?.node.handle,
    };
  });

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max((-rect.top) / total, 0), 0.999);
      const idx = Math.floor(progress * panels.length);
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [panels.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > 0 || r.bottom < window.innerHeight) return;
      const segment = (el.offsetHeight - window.innerHeight) / panels.length;
      if (e.key === "ArrowDown") window.scrollBy({ top: segment, behavior: "smooth" });
      if (e.key === "ArrowUp") window.scrollBy({ top: -segment, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panels.length]);

  return (
    <section ref={sectionRef} className="relative bg-paper" style={{ height: `${panels.length * 100}vh` }}>
      <div className="sticky top-12 h-[calc(100vh-48px)] overflow-hidden border-y border-hairline flex flex-col">
        {/* Top dock — previous panels */}
        <div className="border-b border-hairline">
          {panels.slice(0, active).map((p, i) => (
            <DockBar key={i} num={p.num} title={p.title} />
          ))}
        </div>

        {/* Active panel */}
        <ActivePanel panel={panels[active]} index={active} total={panels.length} />

        {/* Bottom dock — upcoming panels */}
        <div className="border-t border-hairline mt-auto">
          {panels.slice(active + 1).map((p, i) => (
            <DockBar key={i} num={p.num} title={p.title} />
          ))}
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

function ActivePanel({ panel, index, total }: { panel: any; index: number; total: number }) {
  return (
    <div className="flex-1 grid grid-cols-12 grid-rows-6 relative bg-paper">
      <div className="col-span-12 border-b border-hairline px-6 h-10 flex items-center justify-between text-meta-sm">
        <span>{panel.num}. / {panel.title} / {panel.colors} {panel.colors === 1 ? "COLOR" : "COLORS"}</span>
        <span className="text-muted-foreground">{(index + 1).toString().padStart(2, "0")} — {total.toString().padStart(2, "0")}</span>
      </div>

      {/* Quote left */}
      <div className="hidden md:flex col-span-3 row-span-5 border-r border-hairline p-6 flex-col justify-between">
        <p className="text-meta-sm text-muted-foreground">PRODUCT PHILOSOPHY</p>
        <p className="text-2xl font-bold uppercase leading-tight">"{panel.philosophy}"</p>
        <p className="text-meta-sm text-muted-foreground">— THE LAB</p>
      </div>

      {/* Image */}
      <div className="col-span-12 md:col-span-6 row-span-5 relative bg-bone overflow-hidden">
        {panel.image ? (
          <img key={panel.image} src={panel.image} alt={panel.title}
            className="absolute inset-0 w-full h-full object-cover animate-[heroSlide_.7s_cubic-bezier(.22,1,.36,1)_both]" />
        ) : (
          <div className="size-full flex items-center justify-center text-muted-foreground text-meta border border-dashed border-hairline">
            PRODUCT IMAGE — ADD A PRODUCT FROM THE CHAT
          </div>
        )}
      </div>

      {/* Right card */}
      <div className="col-span-12 md:col-span-3 row-span-5 border-t md:border-t-0 md:border-l border-hairline p-6 flex flex-col justify-between bg-paper">
        <div>
          <p className="text-meta-sm text-muted-foreground">{panel.num} / FEATURED</p>
          {panel.image && (
            <div className="mt-4 aspect-square bg-muted overflow-hidden">
              <img src={panel.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        <div>
          <p className="text-meta">{panel.title}</p>
          {panel.price && <p className="text-2xl font-extrabold mt-1">{panel.price}</p>}
          {panel.handle ? (
            <Link to="/products/$handle" params={{ handle: panel.handle }}
              className="arrow-cta mt-4 inline-flex border border-ink px-4 py-2 text-meta-sm">
              EXPLORE <ArrowUpRight className="size-3" />
            </Link>
          ) : (
            <Link to="/collections/$handle" params={{ handle: "all" }}
              className="arrow-cta mt-4 inline-flex border border-ink px-4 py-2 text-meta-sm">
              SHOP THE LAB <ArrowUpRight className="size-3" />
            </Link>
          )}
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
