import { ReactNode } from "react";
import { Header } from "./Header";
import { MenuOverlay } from "./MenuOverlay";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { useCartSync } from "@/hooks/useCartSync";
import { useLenis } from "@/hooks/useLenis";
import { Toaster } from "sonner";

export function StoreShell({ children, withFooter = true }: { children: ReactNode; withFooter?: boolean }) {
  useCartSync();
  useLenis();
  return (
    <div className="min-h-screen bg-bone text-ink ff-display">
      <Header />
      <MenuOverlay />
      <SearchOverlay />
      <CartDrawer />
      <main className="pt-[72px]">{children}</main>
      {withFooter && <Footer />}
      <Toaster position="top-center" />
    </div>
  );
}
