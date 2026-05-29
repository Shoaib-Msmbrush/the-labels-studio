import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useUiStore } from "@/hooks/useUiStore";
import { useCartStore } from "@/stores/cartStore";
import logo from "@/assets/logo.jpeg";

const TICKER = [
  "FREE WORLDWIDE SHIPPING ON BULK ORDERS",
  "NEW SEASON LABEL DROP — LIMITED RUN",
  "WOVEN · LEATHER · HANGTAGS · CARE",
  "DESIGNED FOR BRANDS, BUILT FOR GARMENTS",
];

export function Header() {
  const { menuOpen, toggleMenu, toggleSearch } = useUiStore();
  const cartItems = useCartStore(s => s.items);
  const openCart = useCartStore(s => s.open);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 ff-display ${scrolled ? "bg-paper/95 backdrop-blur" : "bg-paper/80 backdrop-blur"} border-b border-hairline`}>
      {/* Ticker */}
      <div className="h-6 overflow-hidden bg-paper text-ink border-b border-hairline">
        <div className="marquee h-full items-center text-meta-sm whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) => TICKER.map((t, i) => (
            <span key={`${k}-${i}`} className="flex items-center gap-3">
              <span className="inline-block size-1 bg-ink rounded-full" /> {t}
            </span>
          )))}
        </div>
      </div>

      {/* Main nav */}
      <div className="h-12 flex items-center px-3 md:px-6 gap-2">
        {/* Left */}
        <nav className="hidden md:flex items-center gap-6 text-meta md:min-w-[320px]">
          <button onClick={toggleMenu} className="flex items-center gap-2 hover:opacity-60">
            {menuOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
          <Link to="/collections/$handle" params={{ handle: "all" }} className="hover:opacity-60">LABELS</Link>
          <Link to="/press" className="hover:opacity-60">PRESS</Link>
          <Link to="/about" className="hover:opacity-60">THE STUDIO</Link>
          <Link to="/services" className="hover:opacity-60">CUSTOM</Link>
        </nav>
        <button onClick={toggleMenu} aria-label="Menu" className="md:hidden text-meta flex items-center gap-2 min-w-[40px]">
          {menuOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
          <span className="hidden sm:inline">{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>

        {/* Center logo */}
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 min-w-0 px-2 md:absolute md:left-1/2 md:-translate-x-1/2 md:flex-none md:px-0"
        >
          <img src={logo} alt="The Label Studio" className="h-5 md:h-7 w-auto object-contain shrink-0" />
          <span className="font-extrabold tracking-[0.18em] text-[11px] sm:text-[13px] md:text-[15px] uppercase leading-none text-[color:var(--navy)] truncate">
            THE LABEL <span className="text-ink">STUDIO</span>
          </span>
        </Link>

        {/* Right */}
        <div className="flex items-center justify-end gap-3 md:gap-5 text-meta min-w-[40px] md:min-w-[320px] md:ml-auto">
          <button onClick={toggleSearch} className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <Search className="size-4" /> SEARCH
          </button>
          <button className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <User className="size-4" /> ACCOUNT
          </button>
          <button className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <Heart className="size-4" /> WISHLIST(0)
          </button>
          <button aria-label="Wishlist" className="md:hidden hover:opacity-60">
            <Heart className="size-4" />
          </button>
          <button onClick={openCart} aria-label="Cart" className="flex items-center gap-1.5 hover:opacity-60">
            <ShoppingBag className="size-4" />
            <span className="hidden md:inline">CART</span>
            <span className="tabular-nums">({cartCount.toString().padStart(2,"0")})</span>
          </button>
          <button onClick={toggleSearch} aria-label="Search" className="md:hidden hover:opacity-60">
            <Search className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
