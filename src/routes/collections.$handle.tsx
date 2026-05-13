import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter as FilterIcon, ChevronDown, Grid3x3, LayoutGrid } from "lucide-react";
import { StoreShell } from "@/components/store/StoreShell";
import { CATEGORY_CHIPS, CATEGORY_HEROES, CATEGORY_LABELS, getProductsByCategory, LabelProduct } from "@/lib/labelCatalog";

export const Route = createFileRoute("/collections/$handle")({
  head: ({ params }) => {
    const name = (CATEGORY_LABELS as any)[params.handle] ?? params.handle.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name.toUpperCase()} — The Label Studio` },
        { name: "description", content: `Premium ${name.toLowerCase()} for fashion brands — sampled, approved, produced.` },
        { property: "og:title", content: `${name} — The Label Studio` },
        { property: "og:description", content: `Browse our ${name.toLowerCase()} collection.` },
      ],
    };
  },
  component: CollectionPage,
});

const SORTS = ["FEATURED", "FASTEST LEAD TIME", "LOWEST MOQ", "PREMIUM FIRST"];

function CollectionPage() {
  const { handle } = useParams({ from: "/collections/$handle" });
  const products = getProductsByCategory(handle);
  const [grid, setGrid] = useState<"col" | "overview">("col");
  const [sort, setSort] = useState(SORTS[0]);
  const [showFilter, setShowFilter] = useState(false);

  const sorted = [...products];
  if (sort === "FASTEST LEAD TIME") {
    sorted.sort((a, b) => parseInt(a.leadTime) - parseInt(b.leadTime));
  } else if (sort === "LOWEST MOQ") {
    sorted.sort((a, b) => parseInt(a.moq) - parseInt(b.moq));
  } else if (sort === "PREMIUM FIRST") {
    sorted.sort((a, b) => (b.badge === "PREMIUM FINISH" ? 1 : 0) - (a.badge === "PREMIUM FINISH" ? 1 : 0));
  }

  const title = (CATEGORY_LABELS as any)[handle] ?? handle.replace(/-/g, " ");
  const hero = CATEGORY_HEROES[handle] ?? CATEGORY_HEROES["all"];

  return (
    <StoreShell>
      <section className="relative h-[60vh] min-h-[420px] border-b border-hairline overflow-hidden text-paper">
        <img src={hero.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,15,0.25), rgba(5,5,15,0.7))" }} />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 py-10">
          <p className="text-meta-sm opacity-70 mb-4">COLLECTION / {title.toUpperCase()}</p>
          <h1 className="display-xxl text-[14vw] md:text-[10vw]">{title.toUpperCase()}</h1>
          <p className="text-meta md:text-base opacity-80 max-w-xl mt-4" style={{ textTransform: "none", letterSpacing: 0 }}>{hero.tagline}</p>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 bg-bone/95 backdrop-blur border-b border-hairline">
        <div className="px-6 md:px-12 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <button onClick={() => setGrid("col")} aria-label="Card grid" className={`size-8 flex items-center justify-center border border-hairline ${grid === "col" ? "bg-ink text-paper" : ""}`}><LayoutGrid className="size-4" /></button>
            <button onClick={() => setGrid("overview")} aria-label="Compact grid" className={`size-8 flex items-center justify-center border border-hairline ${grid === "overview" ? "bg-ink text-paper" : ""}`}><Grid3x3 className="size-4" /></button>
            <span className="hidden md:inline ml-3 text-meta-sm text-muted-foreground">{sorted.length.toString().padStart(2, "0")} ITEMS</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilter(true)} className="flex items-center gap-2 text-meta-sm border border-hairline px-3 py-1.5">
              <FilterIcon className="size-3" /> FILTER
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
          {CATEGORY_CHIPS.map(c => (
            <Link key={c.slug} to="/collections/$handle" params={{ handle: c.slug }}
              className={`text-meta-sm whitespace-nowrap px-3 py-1.5 border ${handle === c.slug ? "bg-ink text-paper border-ink" : "border-hairline hover:bg-ink hover:text-paper transition-colors"}`}>
              {c.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      <section className="px-6 md:px-12 py-10 bg-paper">
        {sorted.length === 0 ? (
          <div className="border border-hairline p-16 text-center text-meta text-muted-foreground">NO PRODUCTS IN THIS COLLECTION YET.</div>
        ) : grid === "overview" ? (
          <div className="grid grid-cols-3 md:grid-cols-6 bg-hairline gap-px border border-hairline">
            {sorted.map(p => (
              <Link key={p.handle} to="/products/$handle" params={{ handle: p.handle }} className="bg-paper aspect-square overflow-hidden group relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <span className="absolute bottom-2 left-2 right-2 text-meta-sm text-paper opacity-0 group-hover:opacity-100 transition bg-ink/70 px-2 py-1 truncate">{p.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-hairline gap-px border border-hairline">
            {sorted.map((p, i) => <LabelCard key={p.handle} p={p} i={i} />)}
          </div>
        )}
      </section>

      {showFilter && (
        <div className="fixed inset-0 z-50">
          <div onClick={() => setShowFilter(false)} className="absolute inset-0 bg-ink/40" />
          <aside className="absolute top-0 right-0 h-full w-full sm:w-[380px] bg-paper border-l border-hairline p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-meta">FILTER</span>
              <button onClick={() => setShowFilter(false)} className="text-meta">CLOSE</button>
            </div>
            {["MATERIAL", "FINISH", "MOQ", "LEAD TIME", "PRICE BAND"].map(g => (
              <details key={g} className="border-t border-hairline py-4">
                <summary className="text-meta cursor-pointer flex justify-between">{g} <span>+</span></summary>
                <div className="pt-3 text-meta-sm text-muted-foreground">Talk to the studio for tailored options.</div>
              </details>
            ))}
          </aside>
        </div>
      )}
    </StoreShell>
  );
}

function LabelCard({ p, i }: { p: LabelProduct; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.5, delay: (i % 8) * 0.04 }}>
      <Link to="/products/$handle" params={{ handle: p.handle }}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="group block bg-paper relative">
        <div className="aspect-[4/5] bg-bone overflow-hidden relative">
          <img src={hover ? p.hover : p.image} alt={p.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]" loading="lazy" />
          <span className="absolute top-3 left-3 text-meta-sm bg-paper/90 border border-hairline px-2 py-1">{p.badge}</span>
          <span className="absolute bottom-3 right-3 text-meta-sm bg-ink/80 text-paper px-2 py-1 backdrop-blur opacity-0 group-hover:opacity-100 transition">VIEW DETAILS →</span>
        </div>
        <div className="p-4 space-y-1.5">
          <p className="text-meta-sm text-muted-foreground">{p.categoryLabel.toUpperCase()}</p>
          <p className="text-meta truncate">{p.title.toUpperCase()}</p>
          <div className="flex items-center justify-between text-meta-sm text-muted-foreground pt-1">
            <span>{p.finish}</span>
            <span>MOQ {p.moq}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-hairline mt-2">
            <span className="text-meta-sm">{p.leadTime}</span>
            <span className="text-meta font-bold">{p.priceLabel}</span>
          </div>
          <div className="flex gap-2 pt-3">
            <span className="flex-1 text-center border border-hairline text-meta-sm py-2">REQUEST QUOTE</span>
            <span className="text-center border border-hairline text-meta-sm py-2 px-3">+</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
