import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { StoreShell } from "@/components/store/StoreShell";
import heroPress from "@/assets/process-weave.jpg";
import wovenDetail from "@/assets/woven-detail.jpg";
import hangtagLuxury from "@/assets/hangtag-luxury.jpg";
import packagingSuite from "@/assets/process-delivery.jpg";
import leatherDenim from "@/assets/leather-denim.jpg";
import labelsGrid from "@/assets/process-brief.jpg";
import studioTable from "@/assets/process-finish.jpg";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "PRESS — The Label Studio" },
      { name: "description", content: "Editorial coverage and journal entries from The Label Studio." },
      { property: "og:title", content: "Press — The Label Studio" },
      { property: "og:description", content: "Read the studio in print." },
    ],
  }),
  component: Press,
});

const ARTICLES = [
  { date: "MAY · 2026", read: "4 MIN", source: "WGSN", image: wovenDetail,
    title: "Why labels are the smallest detail with the biggest brand impact",
    excerpt: "Inside the return of woven trims as fashion's most under-leveraged identity surface.", latest: true },
  { date: "APR · 2026", read: "6 MIN", source: "BUSINESS OF FASHION", image: hangtagLuxury,
    title: "Inside the return of premium woven trims",
    excerpt: "How emerging labels are restoring the hangtag, neck label and care tag to the centre of the brand." },
  { date: "MAR · 2026", read: "5 MIN", source: "TEXTILE INSIGHT", image: packagingSuite,
    title: "How emerging fashion brands build stronger packaging systems",
    excerpt: "A studio-led approach to unboxing as a continuation of the garment." },
  { date: "FEB · 2026", read: "3 MIN", source: "VOLUME", image: leatherDenim,
    title: "The new standard for custom garment labels",
    excerpt: "Materials, finish, lead time — what production-ready trims look like in 2026." },
  { date: "JAN · 2026", read: "4 MIN", source: "EDITION HOUSE", image: labelsGrid,
    title: "On materials, repair, and the slow design movement",
    excerpt: "A conversation with the studio on building trims that age with the garment." },
  { date: "DEC · 2025", read: "8 MIN", source: "ATLAS QUARTERLY", image: studioTable,
    title: "A workshop that runs at the speed of its hands",
    excerpt: "Inside the looms, ledgers, and Pantone cards of an independent label studio." },
];

function Press() {
  return (
    <StoreShell>
      <section className="relative h-[55vh] min-h-[400px] border-b border-hairline overflow-hidden text-paper">
        <img src={heroPress} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,15,0.25), rgba(5,5,15,0.75))" }} />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <p className="text-meta-sm opacity-70 mb-4">PRESS / 2025 — 2026</p>
          <h1 className="display-xxl text-[16vw] md:text-[12vw]">PRESS</h1>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 bg-hairline gap-px border-b border-hairline">
        {ARTICLES.map((p, i) => (
          <article key={i} className="group bg-paper relative overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-bone overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center justify-between text-meta-sm">
                <span>{p.date} · {p.read}</span>
                {p.latest && <span className="border border-current px-2 py-0.5">LATEST</span>}
              </div>
              <p className="text-meta-sm opacity-60">{p.source}</p>
              <h3 className="text-xl md:text-2xl font-extrabold uppercase leading-tight">{p.title}</h3>
              <p className="text-meta-sm text-muted-foreground" style={{ textTransform: "none", letterSpacing: 0 }}>{p.excerpt}</p>
              <span className="arrow-cta text-meta-sm mt-auto">READ MORE <ArrowRight className="size-3" /></span>
            </div>
          </article>
        ))}
      </section>
    </StoreShell>
  );
}
