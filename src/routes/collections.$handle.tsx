import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StoreShell } from "@/components/store/StoreShell";
import { ProductGrid } from "@/components/store/ProductGrid";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Filter as FilterIcon, ChevronDown, Grid3x3, LayoutGrid } from "lucide-react";

export const Route = createFileRoute("/collections/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g," ").toUpperCase()} — INDUSTRIA/LAB` },
      { name: "description", content: `Shop the ${params.handle.replace(/-/g," ")} collection from INDUSTRIA/LAB.` },
    ],
  }),
  component: CollectionPage,
});

const CHIPS = ["ALL", "SNEAKERS", "BOOTS", "SLIDES", "RUNNERS", "ACCESSORIES"];
const SORTS = ["FEATURED", "BEST SELLING", "PRICE LOW–HIGH", "PRICE HIGH–LOW"];

function CollectionPage() {
  const { handle } = useParams({ from: "/collections/$handle" });
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [chip, setChip] = useState("ALL");
  const [grid, setGrid] = useState<"col" | "overview">("col");
  const [sort, setSort] = useState(SORTS[0]);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = handle === "all" ? undefined : `tag:${handle} OR product_type:${handle}`;
    fetchProducts(48, q).then(p => { setProducts(p); setLoading(false); });
  }, [handle]);

  const sorted = [...products].sort((a, b) => {
    const pa = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const pb = parseFloat(b.node.priceRange.minVariantPrice.amount);
    if (sort === "PRICE LOW–HIGH") return pa - pb;
    if (sort === "PRICE HIGH–LOW") return pb - pa;
    return 0;
  });

  const title = handle.replace(/-/g, " ").toUpperCase();

  return (
    <StoreShell>
      <section className="border-b border-hairline px-6 md:px-12 py-16 md:py-24 bg-paper">
        <p className="text-meta-sm text-muted-foreground mb-4">COLLECTION / {title}</p>
        <h1 className="display-xxl text-[16vw] md:text-[12vw]">{title}</h1>
      </section>

      <div className="sticky top-[72px] z-30 bg-bone/95 backdrop-blur border-b border-hairline">
        <div className="px-6 md:px-12 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button onClick={() => setGrid("col")} className={`size-8 flex items-center justify-center border border-hairline ${grid==="col" ? "bg-ink text-paper" : ""}`}><LayoutGrid className="size-4" /></button>
            <button onClick={() => setGrid("overview")} className={`size-8 flex items-center justify-center border border-hairline ${grid==="overview" ? "bg-ink text-paper" : ""}`}><Grid3x3 className="size-4" /></button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilter(true)} className="flex items-center gap-2 text-meta-sm border border-hairline px-3 py-1.5">
              <FilterIcon className="size-3" /> FILTER (0)
            </button>
            <label className="flex items-center gap-2 text-meta-sm">
              SORT:
              <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent border-none outline-none text-meta-sm">
                {SORTS.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="size-3" />
            </label>
          </div>
        </div>
        <div className="px-6 md:px-12 py-2 flex items-center gap-2 overflow-x-auto border-t border-hairline">
          {CHIPS.map(c => (
            <button key={c} onClick={() => setChip(c)}
              className={`text-meta-sm whitespace-nowrap px-3 py-1.5 border ${chip === c ? "bg-ink text-paper border-ink" : "border-hairline hover:bg-ink hover:text-paper"}`}>{c}</button>
          ))}
        </div>
      </div>

      <section className="px-6 md:px-12 py-10">
        {loading ? (
          <div className={`grid grid-cols-2 md:grid-cols-${grid==="overview" ? 6 : 4} bg-hairline gap-px border border-hairline`}>
            {Array.from({ length: grid==="overview"?12:8 }).map((_, i) => (
              <div key={i} className="bg-paper aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : grid === "overview" ? (
          <div className="grid grid-cols-3 md:grid-cols-6 bg-hairline gap-px border border-hairline">
            {sorted.length === 0 ? (
              <div className="col-span-full p-12 text-center text-meta text-muted-foreground bg-paper">NO PRODUCTS YET — ADD ONE FROM THE CHAT.</div>
            ) : sorted.map(p => (
              <a key={p.node.id} href={`/products/${p.node.handle}`} className="bg-paper aspect-square overflow-hidden group">
                {p.node.images.edges[0] && <img src={p.node.images.edges[0].node.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />}
              </a>
            ))}
          </div>
        ) : (
          <ProductGrid products={sorted} />
        )}
      </section>

      {/* Filter drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-50">
          <div onClick={() => setShowFilter(false)} className="absolute inset-0 bg-ink/40" />
          <aside className="absolute top-0 right-0 h-full w-full sm:w-[380px] bg-paper border-l border-hairline p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-meta">FILTER</span>
              <button onClick={() => setShowFilter(false)} className="text-meta">CLOSE</button>
            </div>
            {["COLLECTION", "SIZE", "COLOR", "AVAILABILITY", "PRICE"].map(g => (
              <details key={g} className="border-t border-hairline py-4">
                <summary className="text-meta cursor-pointer flex justify-between">{g} <span>+</span></summary>
                <div className="pt-3 text-meta-sm text-muted-foreground">No options yet.</div>
              </details>
            ))}
          </aside>
        </div>
      )}
    </StoreShell>
  );
}
