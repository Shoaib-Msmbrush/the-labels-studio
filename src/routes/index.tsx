import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { StoreShell } from "@/components/store/StoreShell";
import { HeroCarousel } from "@/components/store/HeroCarousel";
import { ScrollDockShowcase } from "@/components/store/ScrollDockShowcase";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import insideImg from "@/assets/hero-labels-1.jpg";
import socialImg from "@/assets/hero-labels-3.jpg";
import journeyImg from "@/assets/labels-grid.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "THE LABEL STUDIO — Premium Labels for the World's Best Brands" },
      { name: "description", content: "A studio designing custom woven labels, leather patches, hangtags and care labels for fashion brands worldwide." },
      { property: "og:title", content: "THE LABEL STUDIO — Designed. Woven. Delivered." },
      { property: "og:description", content: "Premium custom labels and packaging for global fashion brands." },
    ],
  }),
  component: Home,
});

const JOURNEY = [
  { num: "01", label: "THE BRIEF", body: "It begins with a brand. A material. A finish. Every label starts as a conversation about identity." },
  { num: "02", label: "THE DESIGN", body: "We sketch, weave samples, refine threads. Each label is the residue of dozens of rejected ones." },
  { num: "03", label: "THE STITCH", body: "Produced in our studio with Jacquard looms and master finishers. Inspected and packed by hand." },
  { num: "04", label: "THE DELIVERY", body: "From our floor to your factory anywhere in the world. Tracked, certified, on time." },
] as const;

const PRESS: Array<{ date: string; read: string; source: string; title: string; latest?: boolean }> = [
  { date: "MAY · 2026", read: "4 MIN", source: "WGSN", title: "The studio rebuilding the woven label for modern fashion", latest: true },
  { date: "APR · 2026", read: "6 MIN", source: "BUSINESS OF FASHION", title: "Why the hangtag is the most underrated brand asset" },
  { date: "MAR · 2026", read: "3 MIN", source: "TEXTILE INSIGHT", title: "Inside The Label Studio's Jacquard atelier" },
] as const;

function Home() {
  return (
    <StoreShell>
      <HeroCarousel />
      <EditorialIntro />
      <ScrollDockShowcase />
      <InsideTheLab />
      <JourneyCarousel />
      <PressSection />
      <NewsletterSocialBlock />
    </StoreShell>
  );
}

function EditorialIntro() {
  return (
    <section className="bg-paper border-y border-hairline px-6 md:px-12 py-24 md:py-40">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2 text-meta-sm text-muted-foreground">
          <p>01 / MANIFESTO</p>
        </div>
        <div className="md:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display-xxl text-[12vw] md:text-[8vw]"
          >
            DESIGNED FOR BRANDS.<br/>STITCHED FOR THE WORLD.
          </motion.h2>
        </div>
        <div className="md:col-span-2 text-meta-sm text-muted-foreground md:pt-2">
          <p>A STUDIO CRAFTING CUSTOM WOVEN LABELS, LEATHER PATCHES & HANGTAGS FOR FASHION BRANDS — HONEST MATERIALS, OBSESSIVE FINISHING.</p>
        </div>
      </div>
    </section>
  );
}

function InsideTheLab() {
  return (
    <section className="bg-bone border-b border-hairline">
      <div className="grid md:grid-cols-2">
        <motion.div initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0 0)" }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.76,0,0.24,1] }}
          className="aspect-[4/5] md:aspect-auto md:min-h-[80vh] relative overflow-hidden border-r border-hairline">
          <img src={insideImg} alt="Inside the studio" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-6 left-6 text-meta-sm text-paper/80">FIG · 02 — STUDIO FLOOR / FINAL INSPECTION</span>
        </motion.div>
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <p className="text-meta-sm text-muted-foreground mb-6">02 / INSIDE THE STUDIO</p>
          <h2 className="display-xxl text-5xl md:text-7xl mb-6">THE DETAIL<br/>IS THE BRAND.</h2>
          <p className="max-w-md text-meta-sm normal-case lowercase tracking-normal text-muted-foreground leading-relaxed mb-8" style={{ textTransform: "none", letterSpacing: 0 }}>
            Designed in-studio, woven on Jacquard looms, and finished by hand. Every label is a small argument about how a brand should feel — precise, tactile, and worthy of the garment it lives on.
          </p>
          <Link to="/about" className="arrow-cta border border-ink px-6 py-3 text-meta self-start">
            INSIDE THE STUDIO <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function JourneyCarousel() {
  const [active, setActive] = useState(0);
  const item = JOURNEY[active];
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div className="grid md:grid-cols-12 min-h-[80vh]">
        <div className="md:col-span-2 p-8 border-r border-paper/10">
          <p className="text-meta-sm opacity-50">03 / THE PROCESS</p>
          <p className="text-meta-sm opacity-50 mt-3">BRIEF · DESIGN · STITCH · SHIP</p>
        </div>
        <motion.div key={item.num}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="md:col-span-7 relative border-r border-paper/10 min-h-[60vh]"
        >
          <img src={journeyImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
          <p className="absolute top-6 left-6 display-xxl text-7xl md:text-9xl opacity-80">{item.num}</p>
          <p className="absolute bottom-6 left-6 text-meta opacity-70">{item.label}</p>
        </motion.div>
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          <div>
            <p className="text-meta-sm opacity-50 mb-3">CHAPTER {item.num}</p>
            <h3 className="text-3xl font-extrabold uppercase mb-4">{item.label}</h3>
            <p className="text-meta-sm opacity-70" style={{ textTransform: "none", letterSpacing: 0 }}>{item.body}</p>
          </div>
          <button className="arrow-cta border border-paper/40 px-4 py-2 text-meta-sm self-start mt-6">READ MORE <ArrowRight className="size-3" /></button>
        </div>
      </div>
      <div className="grid grid-cols-4 border-t border-paper/10">
        {JOURNEY.map((j, i) => (
          <button key={j.num} onClick={() => setActive(i)}
            className={`p-4 md:p-6 border-r border-paper/10 last:border-r-0 text-left transition ${i === active ? "bg-paper text-ink" : "hover:bg-paper/5"}`}>
            <p className={`text-meta-sm ${i === active ? "opacity-100" : "opacity-50"}`}>{j.num}.</p>
            <p className={`text-meta mt-2 ${i === active ? "" : "opacity-80"}`}>{j.label}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function PressSection() {
  return (
    <section className="bg-paper border-t border-hairline px-6 md:px-12 py-20 md:py-32">
      <div className="flex items-end justify-between mb-10">
        <h2 className="display-xxl text-7xl md:text-9xl">PRESS</h2>
        <Link to="/press" className="arrow-cta text-meta">ALL ARTICLES <ArrowUpRight className="size-4" /></Link>
      </div>
      <div className="grid md:grid-cols-3 bg-hairline gap-px border border-hairline">
        {PRESS.map((p, i) => (
          <motion.article key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group bg-paper hover:bg-ink hover:text-paper transition-colors duration-500 p-6 md:p-8 flex flex-col gap-4 min-h-[280px]">
            <div className="flex items-center justify-between text-meta-sm">
              <span>{p.date} · {p.read}</span>
              {p.latest && <span className="border border-current px-2 py-0.5">LATEST</span>}
            </div>
            <p className="text-meta-sm opacity-60">{p.source}</p>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight mt-auto">{p.title}</h3>
            <span className="arrow-cta text-meta-sm">READ MORE <ArrowRight className="size-3" /></span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function NewsletterSocialBlock() {
  return (
    <section className="grid md:grid-cols-2 border-t border-hairline">
      <div className="bg-paper p-10 md:p-16 border-r border-hairline">
        <p className="text-meta-sm text-muted-foreground mb-4">04 / NEWSLETTER</p>
        <h2 className="display-xxl text-5xl md:text-7xl mb-6">BE FIRST.<br/>NEVER MISS<br/>A DROP.</h2>
        <form onSubmit={e=>e.preventDefault()} className="max-w-md">
          <div className="flex border-b border-ink pb-2 mb-4">
            <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 bg-transparent outline-none text-meta placeholder:text-muted-foreground" />
            <button className="text-meta">SUBMIT →</button>
          </div>
        </form>
      </div>
      <div className="relative min-h-[40vh] md:min-h-0 text-paper p-10 md:p-16 flex flex-col justify-end overflow-hidden">
        <img src={socialImg} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10">
          <p className="text-meta-sm opacity-60 mb-4">05 / SOCIAL</p>
          <h2 className="display-xxl text-5xl md:text-7xl mb-6">FOLLOW<br/>THE STUDIO.</h2>
          <button className="arrow-cta border border-paper px-6 py-3 text-meta">FOLLOW @THELABELSTUDIO <ArrowUpRight className="size-4" /></button>
        </div>
      </div>
    </section>
  );
}
