import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Upload } from "lucide-react";
import { StoreShell } from "@/components/store/StoreShell";
import studioTable from "@/assets/studio-table.jpg";
import wovenDetail from "@/assets/woven-detail.jpg";
import leatherDenim from "@/assets/leather-denim.jpg";
import hangtagLuxury from "@/assets/hangtag-luxury.jpg";
import careImg from "@/assets/product-care.jpg";
import embroideredImg from "@/assets/product-embroidered.jpg";
import packagingSuite from "@/assets/packaging-suite.jpg";
import handsInspect from "@/assets/hands-inspect.jpg";
import labelsGrid from "@/assets/labels-grid.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "CUSTOM / OEM — The Label Studio" },
      { name: "description", content: "Custom woven labels, leather patches, hangtags, care labels, embroidery and packaging — engineered for fashion brands." },
      { property: "og:title", content: "Custom / OEM — The Label Studio" },
      { property: "og:description", content: "Bespoke garment trims and packaging for global fashion brands." },
    ],
    links: [{ rel: "canonical", href: "https://dock-lab-studio.lovable.app/services" }],
  }),
  component: Services,
});

const SERVICES = [
  { num: "01", title: "Custom Woven Labels", body: "Damask, satin, high-density, organic cotton.", image: wovenDetail, slug: "woven-labels" },
  { num: "02", title: "Leather Patches", body: "Vegetable-tanned, vegan, embossed, debossed.", image: leatherDenim, slug: "leather-patches" },
  { num: "03", title: "Hangtags", body: "Matte, foil, kraft, recycled — debossed or printed.", image: hangtagLuxury, slug: "hangtags" },
  { num: "04", title: "Care Labels", body: "Multi-language, satin or heat-transfer tagless.", image: careImg, slug: "care-labels" },
  { num: "05", title: "Embroidered Patches", body: "Merrow, chenille, 3D puff, twill bases.", image: embroideredImg, slug: "embroidered-patches" },
  { num: "06", title: "Packaging Systems", body: "Boxes, tissue, dust bags, cards, seals.", image: packagingSuite, slug: "packaging" },
  { num: "07", title: "Brand Trim Kits", body: "Every trim your collection needs, as one cohesive system.", image: labelsGrid, slug: "custom-oem" },
  { num: "08", title: "Sampling & Production", body: "Pre-production samples, bulk runs, QC, freight.", image: handsInspect, slug: "custom-oem" },
];

const PROCESS = [
  { num: "01", title: "THE BRIEF", body: "Send your tech pack, brand guide and reference photos. We assign a project lead." },
  { num: "02", title: "THE DESIGN", body: "We translate your artwork into weave files, deboss dies, embroidery digitisation, or print plates." },
  { num: "03", title: "SAMPLING", body: "Pre-production samples shipped within 5–7 days for sign-off." },
  { num: "04", title: "PRODUCTION", body: "Approved files go to our looms and finishing floor. Inspected piece by piece." },
  { num: "05", title: "DELIVERY", body: "Air or sea freight to your factory or warehouse, tracked door-to-door." },
];

function Services() {
  return (
    <StoreShell>
      <section className="relative h-[60vh] min-h-[420px] border-b border-hairline overflow-hidden text-paper">
        <img src={studioTable} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,15,0.25), rgba(5,5,15,0.75))" }} />
        <div className="absolute inset-0 noise-bg opacity-20" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <p className="text-meta-sm opacity-70 mb-4">CUSTOM / OEM</p>
          <h1 className="display-xxl text-[12vw] md:text-[8vw]">CUSTOM TRIMS<br/>FOR FASHION BRANDS.</h1>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 grid md:grid-cols-12 gap-8 border-b border-hairline bg-paper">
        <div className="md:col-span-2 text-meta-sm text-muted-foreground">01 / WHAT WE MAKE</div>
        <p className="md:col-span-7 text-xl md:text-2xl font-bold uppercase leading-tight">
          From a single sample to full-run production. Woven, leather, foil, embroidery, care and packaging — sampled, approved, produced.
        </p>
        <div className="md:col-span-3 text-meta-sm text-muted-foreground" style={{ textTransform: "none", letterSpacing: 0 }}>
          One studio, eight disciplines, one project lead. No middlemen, no compromises on finish.
        </div>
      </section>

      <section className="bg-paper border-b border-hairline">
        <div className="px-6 md:px-12 pt-16">
          <p className="text-meta-sm text-muted-foreground mb-4">02 / SERVICES</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-hairline gap-px border-y border-hairline mt-6">
          {SERVICES.map(s => (
            <Link key={s.num} to="/collections/$handle" params={{ handle: s.slug }}
              className="group bg-paper relative overflow-hidden">
              <div className="aspect-[4/5] bg-bone overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
              </div>
              <div className="p-5">
                <p className="text-meta-sm text-muted-foreground">{s.num}</p>
                <p className="text-meta mt-1">{s.title.toUpperCase()}</p>
                <p className="text-meta-sm text-muted-foreground mt-1" style={{ textTransform: "none", letterSpacing: 0 }}>{s.body}</p>
                <span className="arrow-cta text-meta-sm mt-3 inline-flex">EXPLORE <ArrowRight className="size-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-bone border-b border-hairline">
        <div className="px-6 md:px-12 py-16">
          <p className="text-meta-sm text-muted-foreground mb-4">03 / THE PROCESS</p>
          <h2 className="display-xxl text-5xl md:text-7xl mb-10">BRIEF → DELIVERY</h2>
          <div className="grid md:grid-cols-5 bg-hairline gap-px border border-hairline">
            {PROCESS.map(p => (
              <div key={p.num} className="bg-paper p-6 flex flex-col gap-3 min-h-[180px]">
                <span className="display-xxl text-5xl">{p.num}</span>
                <p className="text-meta">{p.title}</p>
                <p className="text-meta-sm text-muted-foreground" style={{ textTransform: "none", letterSpacing: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 bg-paper border-b border-hairline">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="text-meta-sm text-muted-foreground mb-4">04 / START YOUR PROJECT</p>
            <h2 className="display-xxl text-5xl md:text-7xl">SEND<br/>A BRIEF.</h2>
            <p className="text-meta-sm text-muted-foreground mt-6 max-w-md" style={{ textTransform: "none", letterSpacing: 0 }}>
              Tell us about the brand, the product, and the trims. We reply within one business day with a tailored quote and sample plan.
            </p>
          </div>
          <form onSubmit={e => e.preventDefault()} className="md:col-span-7 grid md:grid-cols-2 gap-px bg-hairline border border-hairline">
            {[
              ["BRAND NAME", "text"],
              ["EMAIL", "email"],
              ["PRODUCT TYPE", "text"],
              ["QUANTITY", "text"],
              ["TIMELINE", "text"],
              ["PHONE (OPTIONAL)", "tel"],
            ].map(([l, t]) => (
              <label key={l} className="bg-paper p-4 flex flex-col gap-2">
                <span className="text-meta-sm text-muted-foreground">{l}</span>
                <input type={t} className="bg-transparent outline-none border-b border-hairline pb-2 text-meta" />
              </label>
            ))}
            <label className="bg-paper p-4 md:col-span-2 flex flex-col gap-2">
              <span className="text-meta-sm text-muted-foreground">UPLOAD ARTWORK (.AI / .EPS / .PDF)</span>
              <div className="flex items-center gap-2 border border-dashed border-hairline px-3 py-3 text-meta-sm text-muted-foreground">
                <Upload className="size-4" /> DRAG FILES OR CLICK TO BROWSE
                <input type="file" className="hidden" />
              </div>
            </label>
            <label className="bg-paper p-4 md:col-span-2 flex flex-col gap-2">
              <span className="text-meta-sm text-muted-foreground">MESSAGE</span>
              <textarea rows={4} className="bg-transparent outline-none border-b border-hairline pb-2 text-meta-sm" />
            </label>
            <button className="md:col-span-2 bg-ink text-paper py-4 text-meta arrow-cta justify-center">SEND PROJECT BRIEF <ArrowRight className="size-4" /></button>
          </form>
        </div>
      </section>
    </StoreShell>
  );
}
