import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StoreShell } from "@/components/store/StoreShell";
import { fetchProductByHandle, formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, ArrowRight, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/products/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g," ").toUpperCase()} — INDUSTRIA/LAB` },
      { name: "description", content: `Shop ${params.handle.replace(/-/g," ")} from INDUSTRIA/LAB.` },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = useParams({ from: "/products/$handle" });
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);

  useEffect(() => {
    setLoading(true);
    fetchProductByHandle(handle).then(p => {
      setProduct(p);
      setVariantId(p?.variants.edges[0]?.node.id ?? null);
      setLoading(false);
    });
  }, [handle]);

  if (loading) return <StoreShell><div className="px-6 py-24 text-meta">LOADING…</div></StoreShell>;
  if (!product) return (
    <StoreShell>
      <div className="px-6 md:px-12 py-32 text-center">
        <h1 className="display-xxl text-7xl mb-4">NOT FOUND</h1>
        <Link to="/collections/$handle" params={{ handle: "all" }} className="text-meta arrow-cta">BACK TO SHOP <ArrowRight className="size-4" /></Link>
      </div>
    </StoreShell>
  );

  const variant = product.variants.edges.find(v => v.node.id === variantId)?.node ?? product.variants.edges[0]?.node;
  const stock = variant?.quantityAvailable ?? (variant?.availableForSale ? 99 : 0);
  const sizeOpt = product.options.find(o => /size/i.test(o.name));
  const colorOpt = product.options.find(o => /color/i.test(o.name));
  const images = product.images.edges;

  const wrapped = { node: product } as ShopifyProduct;
  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: wrapped, variantId: variant.id, variantTitle: variant.title,
      price: variant.price, quantity: qty, selectedOptions: variant.selectedOptions,
    });
    setAdded(true);
  };

  return (
    <StoreShell>
      <div className="grid lg:grid-cols-12 border-b border-hairline">
        {/* Gallery */}
        <div className="lg:col-span-8 grid grid-cols-12 border-r border-hairline">
          <div className="hidden lg:flex col-span-2 flex-col gap-2 p-3 border-r border-hairline">
            {images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`aspect-square bg-muted overflow-hidden border ${i === imgIdx ? "border-ink" : "border-transparent"}`}>
                <img src={img.node.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-10 aspect-[4/5] lg:aspect-auto lg:min-h-[80vh] bg-bone flex items-center justify-center relative">
            {images[imgIdx] ? (
              <img src={images[imgIdx].node.url} alt={product.title} className="max-h-full max-w-full object-contain p-6" />
            ) : (
              <span className="text-meta text-muted-foreground">NO IMAGE</span>
            )}
            <span className="absolute bottom-4 right-4 text-meta-sm">{(imgIdx+1).toString().padStart(2,"0")} / {images.length.toString().padStart(2,"0")}</span>
          </div>
        </div>

        {/* Buy panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-[72px] lg:self-start">
          <div className="p-6 md:p-10 space-y-5">
            <div className="flex items-center justify-between text-meta-sm">
              <span className="text-muted-foreground">{product.vendor || "INDUSTRIA/LAB"}</span>
              <span className={stock>0 ? "text-emerald-700" : "text-destructive"}>● {stock>0?"IN STOCK":"OUT OF STOCK"}</span>
            </div>
            <h1 className="display-xxl text-5xl md:text-6xl">{product.title.toUpperCase()}</h1>
            <p className="text-2xl font-extrabold">{variant && formatPrice(variant.price.amount, variant.price.currencyCode)}</p>

            {colorOpt && (
              <div>
                <p className="text-meta-sm text-muted-foreground mb-2">COLOR · {variant?.selectedOptions.find(o => /color/i.test(o.name))?.value}</p>
                <div className="flex gap-2 flex-wrap">
                  {colorOpt.values.map(v => {
                    const match = product.variants.edges.find(e => e.node.selectedOptions.some(o => /color/i.test(o.name) && o.value === v));
                    const active = variant?.selectedOptions.some(o => /color/i.test(o.name) && o.value === v);
                    return (
                      <button key={v} onClick={() => match && setVariantId(match.node.id)}
                        className={`size-12 border ${active ? "border-ink" : "border-hairline"} bg-muted overflow-hidden`}>
                        {match?.node.image && <img src={match.node.image.url} alt={v} className="w-full h-full object-cover" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {sizeOpt && (
              <div>
                <div className="flex items-center justify-between text-meta-sm mb-2">
                  <span className="text-muted-foreground">SIZE</span>
                  <button className="underline">SIZE GUIDE</button>
                </div>
                <div className="grid grid-cols-4 gap-px bg-hairline border border-hairline">
                  {sizeOpt.values.map(v => {
                    const match = product.variants.edges.find(e => e.node.selectedOptions.some(o => /size/i.test(o.name) && o.value === v));
                    const active = variant?.selectedOptions.some(o => /size/i.test(o.name) && o.value === v);
                    const avail = match?.node.availableForSale;
                    return (
                      <button key={v} disabled={!avail} onClick={() => match && setVariantId(match.node.id)}
                        className={`bg-paper py-3 text-meta-sm ${active ? "bg-ink text-paper" : ""} ${!avail ? "line-through opacity-40" : ""}`}>{v}</button>
                    );
                  })}
                </div>
                <button className="text-meta-sm text-muted-foreground underline mt-3">DON'T SEE YOUR SIZE?</button>
              </div>
            )}

            {stock > 0 && stock < 12 && variant && (
              <p className="text-meta-sm bg-bone border border-hairline p-3">
                ONLY {stock.toString().padStart(2,"0")} LEFT IN {variant.title.toUpperCase()} · SHIPS BY 2PM
              </p>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-hairline">
                <button className="size-10 flex items-center justify-center" onClick={() => setQty(Math.max(1, qty-1))}><Minus className="size-3" /></button>
                <span className="w-10 text-center text-meta">{qty}</span>
                <button className="size-10 flex items-center justify-center" onClick={() => setQty(qty+1)}><Plus className="size-3" /></button>
              </div>
              <button onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}
                className="flex-1 bg-ink text-paper py-3 text-meta arrow-cta justify-center disabled:opacity-50">
                ADD TO CART <ArrowRight className="size-4" />
              </button>
            </div>
            {added && (
              <button onClick={() => useCartStore.getState().open()} className="w-full bg-checkout text-paper py-3 text-meta arrow-cta justify-center">
                PROCEED TO CHECKOUT <ArrowRight className="size-4" />
              </button>
            )}
            <p className="text-meta-sm text-muted-foreground">Taxes & shipping calculated at checkout.</p>

            {/* Accordions */}
            {["DESCRIPTION", "MANUFACTURING", "CUSTOMERS LOVE", "SHIPPING POLICY"].map((label, i) => (
              <details key={label} className="border-t border-hairline py-3">
                <summary className="cursor-pointer text-meta flex justify-between"><span>{label}</span><ChevronDown className="size-4" /></summary>
                <div className="pt-3 text-meta-sm text-muted-foreground" style={{textTransform:"none",letterSpacing:0}}>
                  {i === 0 ? product.description || "Premium lab-engineered footwear, made in small batches." :
                   i === 1 ? "Hand-finished. Inspected before it leaves the lab." :
                   i === 2 ? "No reviews yet." :
                   "Free worldwide shipping over $200. 30-day returns."}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </StoreShell>
  );
}
