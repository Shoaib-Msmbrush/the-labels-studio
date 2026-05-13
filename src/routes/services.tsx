import { createFileRoute } from "@tanstack/react-router";
import { StoreShell } from "@/components/store/StoreShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "CUSTOM — The Label Studio" },
      { name: "description", content: "Custom label design and production for fashion brands: woven labels, leather patches, hangtags and packaging." },
      { property: "og:title", content: "Custom Labels — The Label Studio" },
      { property: "og:description", content: "Bespoke labels and packaging for global brands." },
    ],
  }),
  component: Services,
});

const CLIENTS = ["01 / NORTHWAVE APPAREL", "02 / CALDERA STUDIO", "03 / FERAL DENIM", "04 / SOUND LAB WEAR", "05 / AGENT NORTH", "06 / WILDCAT FC", "07 / EDITION HOUSE"];

function Services() {
  return (
    <StoreShell>
      <section className="relative h-[55vh] min-h-[400px] border-b border-hairline overflow-hidden text-paper"
        style={{ background: "linear-gradient(135deg,#0a0a0a,#1a1a1a)" }}>
        <div className="absolute inset-0 noise-bg opacity-30" />
        <div className="relative z-10 h-full flex items-end p-6 md:p-12">
          <h1 className="display-xxl text-[12vw] md:text-[8vw]">CUSTOM LABELS<br/>FOR YOUR BRAND.</h1>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 grid md:grid-cols-12 gap-8 border-b border-hairline bg-paper">
        <div className="md:col-span-2 text-meta-sm text-muted-foreground">CUSTOM / OEM</div>
        <p className="md:col-span-7 text-xl md:text-2xl font-bold uppercase">
          We design and produce custom labels for fashion brands worldwide. From a single sample to full-run production — woven, leather, foil, embroidery and packaging, made for the brands wearing the world.
        </p>
      </section>

      <section className="px-6 md:px-12 py-16 grid md:grid-cols-2 gap-6 border-b border-hairline">
        <div>
          <p className="text-meta-sm text-muted-foreground mb-6">SELECTED CLIENTS / RUNS</p>
          <ul className="border-t border-hairline">
            {CLIENTS.map(c => (
              <li key={c} className="border-b border-hairline py-4 text-2xl md:text-3xl font-bold uppercase">{c}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-px bg-hairline border border-hairline">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square" style={{ background: `linear-gradient(135deg,#1a1a1a ${i*20}%,#3a3a3a)` }}>
              <div className="size-full noise-bg opacity-30" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-paper border-b border-hairline">
        <h2 className="display-xxl text-5xl md:text-7xl mb-10">START A PROJECT.</h2>
        <form onSubmit={e=>e.preventDefault()} className="grid md:grid-cols-2 gap-px bg-hairline border border-hairline max-w-4xl">
          {[["NAME","text"],["EMAIL","email"],["PROJECT TYPE","text"],["BUDGET","text"]].map(([l,t]) => (
            <label key={l} className="bg-paper p-4 flex flex-col gap-2">
              <span className="text-meta-sm text-muted-foreground">{l}</span>
              <input type={t} className="bg-transparent outline-none border-b border-hairline pb-2 text-meta" />
            </label>
          ))}
          <label className="bg-paper p-4 md:col-span-2 flex flex-col gap-2">
            <span className="text-meta-sm text-muted-foreground">MESSAGE</span>
            <textarea rows={4} className="bg-transparent outline-none border-b border-hairline pb-2 text-meta-sm" />
          </label>
          <button className="md:col-span-2 bg-ink text-paper py-4 text-meta">SEND ENQUIRY →</button>
        </form>
      </section>
    </StoreShell>
  );
}
