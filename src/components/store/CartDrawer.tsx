import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/shopify";

const ease = [0.76, 0, 0.24, 1] as const;

export function CartDrawer() {
  const { isOpen, close, items, updateQuantity, removeItem, getCheckoutUrl, isLoading, isSyncing, syncCart } = useCartStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const subtotal = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "USD";

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) { window.open(url, "_blank"); close(); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-paper text-ink ff-display flex flex-col border-l border-hairline"
          >
            <header className="h-12 flex items-center justify-between px-5 border-b border-hairline">
              <span className="text-meta">CART · {items.reduce((s,i)=>s+i.quantity,0).toString().padStart(2,"0")}</span>
              <button onClick={close} className="text-meta flex items-center gap-2"><X className="size-4" /> CLOSE</button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-12 border-b border-hairline">
                  <h2 className="display-xxl text-5xl">YOUR CART<br/>IS EMPTY!</h2>
                  <Link to="/collections/$handle" params={{ handle: "all" }} onClick={close}
                    className="mt-6 inline-block bg-ink text-paper px-6 py-3 text-meta arrow-cta">
                    SHOP NOW <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="px-6 py-6">
                  <p className="text-meta-sm text-muted-foreground">WHY NOT ADD —</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto divide-y divide-hairline">
                  {items.map((it) => (
                    <div key={it.variantId} className="flex gap-4 p-5">
                      <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                        {it.product.node.images.edges[0] && (
                          <img src={it.product.node.images.edges[0].node.url} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <p className="text-meta-sm text-muted-foreground">{it.product.node.productType || "PRODUCT"}</p>
                        <p className="text-meta truncate">{it.product.node.title.toUpperCase()}</p>
                        <p className="text-meta-sm text-muted-foreground">{it.selectedOptions.map(o => o.value).join(" · ")}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-hairline">
                            <button className="size-7 flex items-center justify-center" onClick={() => updateQuantity(it.variantId, it.quantity - 1)}><Minus className="size-3" /></button>
                            <span className="w-7 text-center text-meta-sm">{it.quantity}</span>
                            <button className="size-7 flex items-center justify-center" onClick={() => updateQuantity(it.variantId, it.quantity + 1)}><Plus className="size-3" /></button>
                          </div>
                          <span className="text-meta">{formatPrice(parseFloat(it.price.amount) * it.quantity, it.price.currencyCode)}</span>
                        </div>
                        <button onClick={() => removeItem(it.variantId)} className="text-meta-sm text-muted-foreground hover:text-ink mt-2 self-start">REMOVE</button>
                      </div>
                    </div>
                  ))}
                </div>
                <footer className="border-t border-hairline p-5 space-y-3">
                  <div className="flex justify-between text-meta">
                    <span>SUBTOTAL</span><span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  <p className="text-meta-sm text-muted-foreground">Taxes are calculated at checkout.</p>
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || isSyncing}
                    className="w-full bg-checkout text-paper py-4 text-meta arrow-cta justify-center flex disabled:opacity-50"
                  >
                    PROCEED TO CHECKOUT <ArrowRight className="size-4" />
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
