import { createFileRoute } from "@tanstack/react-router";
import { StoreShell } from "@/components/store/StoreShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "PRESS — INDUSTRIA/LAB" },
      { name: "description", content: "Press coverage, conversations, and journal entries from INDUSTRIA/LAB." },
      { property: "og:title", content: "Press — INDUSTRIA/LAB" },
      { property: "og:description", content: "Read the lab in print." },
    ],
  }),
  component: Press,
});

const ARTICLES = [
  { date: "MAY · 2026", read: "4 MIN", source: "HYPESTUDIO", title: "Inside the lab building footwear like furniture", latest: true },
  { date: "APR · 2026", read: "6 MIN", source: "FORM JOURNAL", title: "How a small atelier rewrote the runner silhouette" },
  { date: "MAR · 2026", read: "3 MIN", source: "VOLUME", title: "Industrial poetry: a conversation with the founder" },
  { date: "FEB · 2026", read: "5 MIN", source: "EDITION HOUSE", title: "On materials, repair, and the slow design movement" },
  { date: "JAN · 2026", read: "4 MIN", source: "NORTHWAVE", title: "Why we build small. And why we'll keep building small." },
  { date: "DEC · 2025", read: "8 MIN", source: "ATLAS QUARTERLY", title: "A workshop that runs at the speed of its hands" },
];

function Press() {
  return (
    <StoreShell>
      <section className="relative h-[40vh] min-h-[320px] border-b border-hairline px-6 md:px-12 flex items-end pb-10 bg-paper">
        <div>
          <p className="text-meta-sm text-muted-foreground mb-4">PRESS / 2025 — 2026</p>
          <h1 className="display-xxl text-[16vw] md:text-[12vw]">PRESS</h1>
        </div>
      </section>
      <section className="grid md:grid-cols-3 bg-hairline gap-px border-b border-hairline">
        {ARTICLES.map((p, i) => (
          <article key={i} className="group bg-paper hover:bg-ink hover:text-paper transition-colors duration-500 p-6 md:p-8 flex flex-col gap-4 min-h-[280px]">
            <div className="flex items-center justify-between text-meta-sm">
              <span>{p.date} · {p.read}</span>
              {p.latest && <span className="border border-current px-2 py-0.5">LATEST</span>}
            </div>
            <p className="text-meta-sm opacity-60">{p.source}</p>
            <h3 className="text-2xl md:text-3xl font-extrabold uppercase leading-tight mt-auto">{p.title}</h3>
            <span className="arrow-cta text-meta-sm">READ MORE <ArrowRight className="size-3" /></span>
          </article>
        ))}
      </section>
    </StoreShell>
  );
}
