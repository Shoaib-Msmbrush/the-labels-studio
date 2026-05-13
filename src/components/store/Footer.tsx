import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ink text-paper ff-display border-t border-hairline">
      <div className="grid md:grid-cols-4 border-b border-paper/10">
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">JOIN THE COMMUNITY</p>
          <h3 className="text-3xl font-extrabold uppercase leading-[0.95] mb-5">BE FIRST.<br/>NEVER MISS<br/>A DROP.</h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex border-b border-paper/30 pb-2">
            <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-transparent outline-none text-meta placeholder:opacity-50 text-paper" />
            <button className="text-meta opacity-80 hover:opacity-100">→</button>
          </form>
        </div>
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">SHOP</p>
          <ul className="space-y-2 text-meta">
            <li><Link to="/collections/$handle" params={{handle:"all"}}>SHOP ALL</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"men"}}>MEN</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"women"}}>WOMEN</Link></li>
            <li><Link to="/collections/$handle" params={{handle:"new-drops"}}>NEW DROPS</Link></li>
          </ul>
        </div>
        <div className="p-8 md:p-10 border-r border-paper/10">
          <p className="text-meta-sm opacity-60 mb-4">ABOUT</p>
          <ul className="space-y-2 text-meta">
            <li><Link to="/about">OUR STORY</Link></li>
            <li><Link to="/services">ATELIER / CUSTOM</Link></li>
            <li><Link to="/press">PRESS</Link></li>
            <li><a href="#">JOURNAL</a></li>
          </ul>
        </div>
        <div className="p-8 md:p-10">
          <p className="text-meta-sm opacity-60 mb-4">CONTACT</p>
          <ul className="space-y-2 text-meta">
            <li><a href="mailto:hello@industria.lab">HELLO@INDUSTRIA.LAB</a></li>
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
            <span className="display-xxl text-[18vw] md:text-[15vw]">WE</span>
            <span className="inline-block h-[14vw] md:h-[12vw] w-[28vw] md:w-[24vw] my-2"
              style={{ background: "linear-gradient(110deg,#1a1a1a,#3a3a3a 40%,#0a0a0a)" }} />
            <span className="display-xxl text-[18vw] md:text-[15vw]">BUILD</span>
            <span className="display-xxl text-[18vw] md:text-[15vw]">DIFFERENT.</span>
          </div>
          <div className="mt-12 flex justify-between text-meta-sm opacity-60">
            <span>© INDUSTRIA/LAB · {new Date().getFullYear()}</span>
            <span>BUILT IN THE LAB · WORLDWIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
