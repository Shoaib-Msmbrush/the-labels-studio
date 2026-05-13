import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StoreShell } from "@/components/store/StoreShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "OUR STORY — INDUSTRIA/LAB" },
      { name: "description", content: "Inside the lab: how we design, prototype, and build footwear in small batches." },
      { property: "og:title", content: "Our Story — INDUSTRIA/LAB" },
      { property: "og:description", content: "A small atelier making footwear like furniture." },
    ],
  }),
  component: About,
});

const PILLARS = [
  { num: "01", title: "DESIGN STUDIO / PROTOTYPING LAB", body: "Drawings become lasts. Lasts become molds. Molds become arguments about how a shoe should feel." },
  { num: "02", title: "MANUFACTURING / PRODUCT BUILD", body: "Small batches, hand-finished, numbered. Made to be repaired, not replaced." },
  { num: "03", title: "CULTURE / COMMUNITY", body: "We design with the people who actually wear them: athletes, artists, builders." },
];

function About() {
  return (
    <StoreShell>
      <section className="relative h-[60vh] min-h-[420px] border-b border-hairline overflow-hidden text-paper"
        style={{ background: "linear-gradient(135deg,#050505,#1a1a1a 60%,#262626)" }}>
        <div className="absolute inset-0 noise-bg opacity-30" />
        <div className="relative z-10 h-full flex items-end p-6 md:p-12">
          <div>
            <p className="text-meta-sm opacity-60 mb-4">OUR STORY</p>
            <h1 className="display-xxl text-[14vw] md:text-[10vw]">ABOUT<br/>INDUSTRIA/LAB.</h1>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 grid md:grid-cols-12 gap-8 border-b border-hairline">
        <div className="md:col-span-2 text-meta-sm text-muted-foreground">FOUNDER · M. ARJUN</div>
        <div className="md:col-span-7">
          <p className="text-2xl md:text-3xl font-bold uppercase leading-tight">
            We started in a 40-square-meter room with one last and one idea — that footwear could behave like furniture: built once, repaired forever, signed by the maker.
          </p>
        </div>
      </section>

      <section className="bg-paper border-b border-hairline">
        {PILLARS.map((p, i) => (
          <motion.div key={p.num}
            initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="grid md:grid-cols-12 border-b border-hairline last:border-b-0 px-6 md:px-12 py-16 md:py-24">
            <div className="md:col-span-2"><span className="display-xxl text-7xl md:text-8xl">{p.num}</span></div>
            <div className="md:col-span-7"><h3 className="text-3xl md:text-5xl font-extrabold uppercase">{p.title}</h3></div>
            <div className="md:col-span-3 text-meta-sm text-muted-foreground" style={{textTransform:"none",letterSpacing:0}}>{p.body}</div>
          </motion.div>
        ))}
      </section>
    </StoreShell>
  );
}
