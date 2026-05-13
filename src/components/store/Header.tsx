import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useUiStore } from "@/hooks/useUiStore";
import { useCartStore } from "@/stores/cartStore";

const TICKER = [
  "FREE SHIPPING ON ALL ORDERS",
  "NEW DROP — LIMITED ARRIVALS",
  "SHOP THE LAB · BUILT DIFFERENT",
  "ENGINEERED FOR MOTION",
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
      <div className="h-12 flex items-center justify-between px-4 md:px-6">
        {/* Left */}
        <nav className="hidden md:flex items-center gap-6 text-meta">
          <button onClick={toggleMenu} className="flex items-center gap-2 hover:opacity-60">
            {menuOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
            <span>{menuOpen ? "CLOSE" : "MENU"}</span>
          </button>
          <Link to="/collections/$handle" params={{ handle: "all" }} className="hover:opacity-60">SHOP</Link>
          <Link to="/press" className="hover:opacity-60">PRESS</Link>
          <Link to="/about" className="hover:opacity-60">OUR STORY</Link>
          <Link to="/services" className="hover:opacity-60">ATELIER</Link>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-meta flex items-center gap-2">
          {menuOpen ? <X className="size-4" /> : <MenuIcon className="size-4" />}
          {menuOpen ? "CLOSE" : "MENU"}
        </button>

        {/* Center logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-extrabold tracking-[0.18em] text-[18px] uppercase">
          INDUSTRIA<span className="text-muted-foreground">/</span>LAB
        </Link>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-5 text-meta">
          <button onClick={toggleSearch} className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <Search className="size-4" /> SEARCH
          </button>
          <button className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <User className="size-4" /> ACCOUNT
          </button>
          <button className="hidden md:flex items-center gap-1.5 hover:opacity-60">
            <Heart className="size-4" /> WISHLIST(0)
          </button>
          <button onClick={openCart} className="flex items-center gap-1.5 hover:opacity-60">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">CART</span>({cartCount.toString().padStart(2,"0")})
          </button>
          <button onClick={toggleSearch} className="md:hidden">
            <Search className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
