import { ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (!products.length) {
    return (
      <div className="border border-hairline p-16 text-center text-meta text-muted-foreground">
        NO PRODUCTS FOUND<br/>
        <span className="text-meta-sm normal-case lowercase tracking-normal">Add a product by telling the chat what it is and its price.</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-hairline gap-px border border-hairline">
      {products.map(p => <ProductCard key={p.node.id} product={p} />)}
    </div>
  );
}
