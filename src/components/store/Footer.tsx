import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import footerStrip from "@/assets/footer-strip.jpg";

export function Footer() {
  return (
    <footer className="bg-ink text-paper ff-display border-t border-hairline">
      <div className="grid md:grid-cols-4 border-b border-paper/10">
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">JOIN THE STUDIO LIST</p>
          <h3 className="text-3xl font-extrabold uppercase leading-[0.95] mb-5">FOR BRANDS<br/>WHO SWEAT<br/>THE DETAIL.</h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex border-b border-paper/30 pb-2">
            <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
            <input id="footer-newsletter-email" type="email" placeholder="EMAIL ADDRESS" aria-label="Email address" className="flex-1 bg-transparent outline-none text-meta placeholder:opacity-80 text-paper" />
            <button aria-label="Subscribe" className="text-meta opacity-80 hover:opacity-100">→</button>
          </form>
        </div>
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">LABELS</p>
          <ul className="space-y-2 text-meta">
            <li><Link to="/collections/$handle" params={{handle:"all"}}>ALL LABELS</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"woven-labels"}}>WOVEN LABELS</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"leather-patches"}}>LEATHER PATCHES</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"hangtags"}}>HANGTAGS</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"care-labels"}}>CARE LABELS</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"embroidered-patches"}}>EMBROIDERED PATCHES</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"packaging"}}>PACKAGING</Link></li>
          </ul>
        </div>
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">STUDIO</p>
          <ul className="space-y-2 text-meta">
            <li><Link to="/about">THE STUDIO</Link></li>
            <li><Link to="/services">CUSTOM / OEM</Link></li>
            <li><Link to="/services">PROCESS</Link></li>
            <li><Link to="/press">PRESS</Link></li>
            <li><a href="#">LOOKBOOK</a></li>
          </ul>
        </div>
        <div className="p-8 md:p-10">
          <p className="text-meta-sm opacity-60 mb-4">CONTACT</p>
          <ul className="space-y-2 text-meta">
            <li><a href="mailto:hello@thelabelstudio.com">HELLO@THELABELSTUDIO.COM</a></li>
            <li className="arrow-cta"><a href="#">INSTAGRAM <ArrowUpRight className="size-3" /></a></li>
            <li><a href="#">TERMS & CONDITIONS</a></li>
            <li><a href="#">PRIVACY POLICY</a></li>
          </ul>
        </div>
      </div>

      {/* Manifesto */}
      <div className="px-6 md:px-10 py-16 md:py-24 min-h-[80vh] flex items-center">
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-4 md:gap-6 leading-[0.85]">
            <span className="display-xxl text-[18vw] md:text-[15vw]">THE</span>
            <span className="inline-block h-[14vw] md:h-[12vw] w-[28vw] md:w-[24vw] my-2 overflow-hidden border border-paper/10">
              <img src={footerStrip} alt="Woven label ribbon" className="w-full h-full object-cover" loading="lazy" />
            </span>
            <span className="display-xxl text-[18vw] md:text-[15vw]">LABEL</span>
            <span className="display-xxl text-[18vw] md:text-[15vw]">STUDIO.</span>
          </div>
          <div className="mt-12 flex justify-between text-meta-sm opacity-60">
            <span>© THE LABEL STUDIO · {new Date().getFullYear()}</span>
            <span>STITCHED FOR BRANDS · WORLDWIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
