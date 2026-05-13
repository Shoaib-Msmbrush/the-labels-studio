import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useUiStore } from "@/hooks/useUiStore";
import { useEffect } from "react";
import menuFeatured from "@/assets/menu-featured.jpg";

const ease = [0.76, 0, 0.24, 1] as const;

const SHOP_LINKS = [
  { label: "ALL LABELS", to: "/collections/$handle", params: { handle: "all" } },
  { label: "WOVEN", to: "/collections/$handle", params: { handle: "woven-labels" } },
  { label: "LEATHER", to: "/collections/$handle", params: { handle: "leather-patches" } },
  { label: "HANGTAGS", to: "/collections/$handle", params: { handle: "hangtags" } },
  { label: "CUSTOM OEM", to: "/collections/$handle", params: { handle: "custom-oem" } },
];
const COLLECTIONS: Array<{ label: string; handle: string }> = [
  { label: "WOVEN LABELS", handle: "woven-labels" },
  { label: "LEATHER PATCHES", handle: "leather-patches" },
  { label: "HANGTAGS", handle: "hangtags" },
  { label: "CARE LABELS", handle: "care-labels" },
  { label: "EMBROIDERED PATCHES", handle: "embroidered-patches" },
  { label: "PACKAGING", handle: "packaging" },
];
const SOCIAL = ["INSTAGRAM", "TIKTOK", "YOUTUBE", "X / TWITTER"];

export function MenuOverlay() {
  const { menuOpen, closeMenu } = useUiStore();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          key="menu"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease }}
          className="fixed inset-0 z-40 ff-display bg-paper text-ink pt-[72px] overflow-y-auto"
        >
          <div className="grid md:grid-cols-4 border-t border-hairline min-h-[calc(100vh-72px)]">
            {/* Col 1 */}
            <Stagger className="border-r border-hairline p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-meta-sm text-muted-foreground mb-6">01 / SHOP</p>
                <ul className="space-y-3">
                  {SHOP_LINKS.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} params={l.params} onClick={closeMenu}
                        className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight hover:opacity-60 block">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12">
                <p className="text-meta-sm text-muted-foreground mb-3">SOCIAL</p>
                <ul className="space-y-1.5 text-meta">
                  {SOCIAL.map(s => <li key={s} className="hover:opacity-60 cursor-pointer">{s} ↗</li>)}
                </ul>
              </div>
            </Stagger>

            {/* Col 2 */}
            <Stagger className="border-r border-hairline p-8 md:p-10">
              <p className="text-meta-sm text-muted-foreground mb-6">02 / COLLECTIONS</p>
              <ul className="space-y-3">
                {COLLECTIONS.map(c => (
                  <li key={c.handle}>
                    <Link to="/collections/$handle" params={{ handle: c.handle }} onClick={closeMenu}
                      className="text-2xl md:text-3xl font-bold uppercase hover:opacity-60 block">{c.label}</Link>
                  </li>
                ))}
              </ul>
            </Stagger>

            {/* Col 3 — featured */}
            <Stagger className="border-r border-hairline relative bg-ink text-paper overflow-hidden min-h-[40vh]">
              <img src={menuFeatured} alt="Signature woven label inside a wool overcoat" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,15,0.25) 0%, rgba(5,5,15,0.85) 100%)" }} />
              <div className="absolute inset-0 noise-bg opacity-20" />
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <p className="text-meta-sm opacity-80">FEATURED COLLECTION</p>
                <div>
                  <h3 className="display-xxl text-5xl md:text-6xl">SIGNATURE WOVEN LABELS</h3>
                  <p className="text-meta mt-3 opacity-80">DAMASK · NAVY · IVORY · MOQ 500</p>
                  <Link to="/collections/$handle" params={{ handle: "all" }} onClick={closeMenu}
                    className="arrow-cta mt-6 inline-flex text-meta">
                    EXPLORE COLLECTION <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Stagger>

            {/* Col 4 — newsletter */}
            <Stagger className="bg-ink text-paper p-8 md:p-10 flex flex-col">
              <p className="text-meta-sm opacity-60 mb-4">04 / STAY UPDATED</p>
              <h3 className="text-3xl md:text-4xl font-extrabold uppercase leading-[0.95] mb-4">
                FIRST TO SEE.<br/>FIRST TO STITCH.
              </h3>
              <p className="text-meta opacity-60 mb-6 max-w-xs">
                Studio releases, label trends, and material lookbooks for fashion brands.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-auto">
                <div className="flex border-b border-paper/40 pb-2 mb-4">
                  <input type="email" required placeholder="EMAIL ADDRESS"
                    className="bg-transparent flex-1 outline-none text-meta placeholder:opacity-80 text-paper" />
                </div>
                <button className="w-full border border-paper/60 hover:bg-paper hover:text-ink py-3 text-meta transition-colors">
                  JOIN THE COMMUNITY →
                </button>
              </form>
            </Stagger>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.15 }}
      className={className}
    >{children}</motion.div>
  );
}
