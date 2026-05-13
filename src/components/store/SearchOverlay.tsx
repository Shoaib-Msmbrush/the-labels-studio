import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, ArrowUpRight, Search as SearchIcon } from "lucide-react";
import { useUiStore } from "@/hooks/useUiStore";
import { fetchProducts, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { Link } from "@tanstack/react-router";

const ease = [0.76, 0, 0.24, 1] as const;

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUiStore();
  const [q, setQ] = useState("");
  const [products, setProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(async () => {
      const items = await fetchProducts(8, q ? `title:*${q}* OR product_type:*${q}*` : undefined);
      setProducts(items);
    }, 200);
    return () => clearTimeout(t);
  }, [q, searchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-50 bg-paper text-ink ff-display overflow-y-auto"
        >
          <div className="border-b border-hairline px-6 h-12 flex items-center justify-between">
            <span className="text-meta">SEARCH</span>
            <button onClick={closeSearch} className="text-meta flex items-center gap-2"><X className="size-4" /> CLOSE</button>
          </div>

          <div className="px-6 md:px-10 py-10 md:py-16 max-w-7xl mx-auto">
            <h1 className="display-xxl text-[14vw] md:text-[10vw] leading-[0.85]">SEARCH</h1>
            <div className="mt-8 border-b-2 border-ink flex items-center gap-3 pb-3">
              <SearchIcon className="size-5" />
              <input
                autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="WHAT ARE YOU LOOKING FOR?"
                className="flex-1 bg-transparent outline-none text-2xl md:text-4xl uppercase font-bold placeholder:text-muted-foreground/60"
              />
              {q && <button onClick={() => setQ("")} className="text-meta">CLEAR</button>}
            </div>

            <p className="text-meta-sm text-muted-foreground mt-10 mb-4">MOST SEARCHED PRODUCTS</p>
            {products.length === 0 ? (
              <div className="border border-hairline p-10 text-center text-meta text-muted-foreground">
                NO PRODUCTS YET — ADD ONE FROM THE CHAT.
              </div>
            ) : (
              <motion.div
                initial="h" animate="v"
                variants={{ v: { transition: { staggerChildren: 0.04 } } }}
                className="grid grid-cols-2 md:grid-cols-4 gap-px bg-hairline border border-hairline"
              >
                {products.slice(0, 8).map((p) => (
                  <motion.div key={p.node.id}
                    variants={{ h: { opacity: 0, y: 14 }, v: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease }}
                    className="bg-paper p-3"
                  >
                    <Link to="/products/$handle" params={{ handle: p.node.handle }} onClick={closeSearch}>
                      <div className="aspect-square bg-muted overflow-hidden mb-2">
                        {p.node.images.edges[0] && (
                          <img src={p.node.images.edges[0].node.url} alt={p.node.title}
                            className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500" />
                        )}
                      </div>
                      <p className="text-meta-sm text-muted-foreground">{p.node.productType || "PRODUCT"}</p>
                      <p className="text-meta">{p.node.title.toUpperCase()}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-meta-sm">{formatPrice(p.node.priceRange.minVariantPrice.amount, p.node.priceRange.minVariantPrice.currencyCode)}</span>
                        <span className="text-meta-sm arrow-cta">EXPLORE <ArrowUpRight className="size-3" /></span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <Link to="/collections/$handle" params={{ handle: "all" }} onClick={closeSearch}
              className="arrow-cta mt-8 text-meta inline-flex">
              EXPLORE ALL PRODUCTS <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
