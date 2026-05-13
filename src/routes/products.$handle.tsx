import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { StoreShell } from "@/components/store/StoreShell";
import { getProductByHandle, PRODUCTS } from "@/lib/labelCatalog";

export const Route = createFileRoute("/products/$handle")({
  head: ({ params }) => {
    const p = getProductByHandle(params.handle);
    const title = p?.title ?? params.handle.replace(/-/g, " ");
    return {
      meta: [
        { title: `${title.toUpperCase()} — The Label Studio` },
        { name: "description", content: p?.description ?? "Premium custom labels for fashion brands." },
        { property: "og:title", content: `${title} — The Label Studio` },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:image", content: p?.image ?? "" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = useParams({ from: "/products/$handle" });
  const product = getProductByHandle(handle);
  const [imgIdx, setImgIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return (
      <StoreShell>
        <div className="px-6 md:px-12 py-32 text-center">
          <h1 className="display-xxl text-7xl mb-4">NOT FOUND</h1>
          <Link to="/collections/$handle" params={{ handle: "all" }} className="text-meta arrow-cta">BACK TO LABELS <ArrowRight className="size-4" /></Link>
        </div>
      </StoreShell>
    );
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.handle !== product.handle).slice(0, 4);

  return (
    <StoreShell>
      <div className="px-6 md:px-12 py-3 text-meta-sm text-muted-foreground border-b border-hairline">
        <Link to="/" className="hover:text-ink">HOME</Link> / <Link to="/collections/$handle" params={{ handle: product.category }} className="hover:text-ink">{product.categoryLabel.toUpperCase()}</Link> / <span className="text-ink">{product.title.toUpperCase()}</span>
      </div>

      <div className="grid lg:grid-cols-12 border-b border-hairline">
        {/* Gallery */}
        <div className="lg:col-span-8 grid grid-cols-12 border-r border-hairline">
          <div className="hidden lg:flex col-span-2 flex-col gap-2 p-3 border-r border-hairline">
            {product.gallery.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`aspect-square bg-bone overflow-hidden border ${i === imgIdx ? "border-ink" : "border-transparent"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-10 aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] bg-bone relative overflow-hidden">
            <img src={product.gallery[imgIdx]} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
            <span className="absolute bottom-4 right-4 text-meta-sm bg-paper/80 px-2 py-1">{(imgIdx + 1).toString().padStart(2, "0")} / {product.gallery.length.toString().padStart(2, "0")}</span>
          </div>
        </div>

        {/* Buy panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-[72px] lg:self-start">
          <div className="p-6 md:p-10 space-y-5">
            <div className="flex items-center justify-between text-meta-sm">
              <span className="text-muted-foreground">{product.categoryLabel.toUpperCase()}</span>
              <span className="border border-hairline px-2 py-0.5">{product.badge}</span>
            </div>
            <h1 className="display-xxl text-4xl md:text-5xl">{product.title.toUpperCase()}</h1>
            <p className="text-meta-sm text-muted-foreground" style={{ textTransform: "none", letterSpacing: 0 }}>{product.description}</p>
            <p className="text-2xl font-extrabold">{product.priceLabel}</p>

            <div className="grid grid-cols-2 gap-px bg-hairline border border-hairline text-meta-sm">
              <div className="bg-paper p-3"><p className="text-muted-foreground">FINISH</p><p>{product.finish}</p></div>
              <div className="bg-paper p-3"><p className="text-muted-foreground">MOQ</p><p>{product.moq}</p></div>
              <div className="bg-paper p-3"><p className="text-muted-foreground">LEAD TIME</p><p>{product.leadTime}</p></div>
              <div className="bg-paper p-3"><p className="text-muted-foreground">CATEGORY</p><p>{product.categoryLabel}</p></div>
            </div>

            <div>
              <p className="text-meta-sm text-muted-foreground mb-2">BEST FOR</p>
              <div className="flex flex-wrap gap-2">
                {product.bestFor.map(b => (
                  <span key={b} className="text-meta-sm border border-hairline px-2.5 py-1">{b.toUpperCase()}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button onClick={() => setSubmitted(true)}
                className="w-full bg-ink text-paper py-3 text-meta arrow-cta justify-center">REQUEST A QUOTE <ArrowRight className="size-4" /></button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setSubmitted(true)} className="border border-ink py-3 text-meta">ORDER SAMPLE</button>
                <button onClick={() => setSubmitted(true)} className="border border-ink py-3 text-meta">ADD TO PROJECT</button>
              </div>
              {submitted && <p className="text-meta-sm text-muted-foreground">Thank you — the studio will reply within one business day.</p>}
            </div>

            {[
              ["PRODUCT DETAILS", product.description],
              ["MATERIALS & FINISH", product.materials],
              ["ARTWORK REQUIREMENTS", product.artwork],
              ["PRODUCTION TIMELINE", `Sampling 5–7 days · Production ${product.leadTime} · Inspection 2 days · Air or sea freight worldwide.`],
              ["SHIPPING & SAMPLING", "Pre-production samples included on orders above MOQ. Worldwide DHL & FedEx; sea freight for bulk."],
            ].map(([label, body]) => (
              <details key={label} className="border-t border-hairline py-3 group">
                <summary className="cursor-pointer text-meta flex justify-between items-center"><span>{label}</span><ChevronDown className="size-4 group-open:rotate-180 transition" /></summary>
                <div className="pt-3 text-meta-sm text-muted-foreground" style={{ textTransform: "none", letterSpacing: 0 }}>{body}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="px-6 md:px-12 py-16 bg-paper border-b border-hairline">
          <div className="flex items-end justify-between mb-8">
            <h2 className="display-xxl text-4xl md:text-6xl">FROM THE SAME LINE</h2>
            <Link to="/collections/$handle" params={{ handle: product.category }} className="arrow-cta text-meta">ALL {product.categoryLabel.toUpperCase()} <ArrowUpRight className="size-4" /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 bg-hairline gap-px border border-hairline">
            {related.map(r => (
              <Link key={r.handle} to="/products/$handle" params={{ handle: r.handle }} className="bg-paper group">
                <div className="aspect-[4/5] bg-bone overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-meta-sm text-muted-foreground">{r.categoryLabel.toUpperCase()}</p>
                  <p className="text-meta truncate">{r.title.toUpperCase()}</p>
                  <p className="text-meta-sm mt-1">{r.priceLabel}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </StoreShell>
  );
}
