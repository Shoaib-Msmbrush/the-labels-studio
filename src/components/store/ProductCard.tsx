import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const [hover, setHover] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const isLoading = useCartStore(s => s.isLoading);

  const variant = p.variants.edges[0]?.node;
  const img1 = p.images.edges[0]?.node.url;
  const img2 = p.images.edges[1]?.node.url ?? img1;
  const totalQty = p.variants.edges.reduce((s, v) => s + (v.node.quantityAvailable ?? (v.node.availableForSale ? 99 : 0)), 0);
  const stockLabel = totalQty <= 0 ? "OUT OF STOCK" : totalQty < 5 ? "FEW IN STOCK" : "IN STOCK";

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product, variantId: variant.id, variantTitle: variant.title,
      price: variant.price, quantity: 1, selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <Link to="/products/$handle" params={{ handle: p.handle }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="group block bg-paper border border-hairline -m-px relative">
      <div className="aspect-[4/5] bg-muted overflow-hidden relative">
        {img1 && (
          <img src={hover && img2 ? img2 : img1} alt={p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        )}
        <span className="absolute top-3 right-3 text-meta-sm bg-paper border border-hairline px-2 py-1">{stockLabel}</span>
        <motion.button
          initial={false} animate={{ y: hover ? 0 : 12, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleAdd} disabled={isLoading || !variant?.availableForSale}
          className="absolute bottom-3 left-3 right-3 bg-ink text-paper py-2.5 text-meta arrow-cta justify-center hidden md:flex"
        >QUICK ADD <ArrowRight className="size-3" /></motion.button>
      </div>
      <div className="p-3 md:p-4">
        <p className="text-meta-sm text-muted-foreground">{p.productType || p.vendor || "PRODUCT"}</p>
        <p className="text-meta truncate">{p.title.toUpperCase()}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-meta-sm">
            {p.options.find(o => o.name.toLowerCase() === "color")?.values[0] ?? "—"}
          </span>
          <span className="text-meta-sm font-bold">
            {formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode)}
          </span>
        </div>
      </div>
    </Link>
  );
}
