import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StoreShell } from "@/components/store/StoreShell";
import atelierImg from "@/assets/studio-atelier.jpg";
import craftImg from "@/assets/studio-craft.jpg";
import loomImg from "@/assets/hero-labels-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "THE STUDIO — The Label Studio" },
      { name: "description", content: "Inside The Label Studio: how we design, weave, and finish premium labels for fashion brands worldwide." },
      { property: "og:title", content: "The Studio — The Label Studio" },
      { property: "og:description", content: "A studio designing custom labels for the world's best brands." },
    ],
  }),
  component: About,
});

const PILLARS = [
  { num: "01", title: "DESIGN STUDIO / SAMPLING ROOM", body: "Sketches become weave files. Threads become finishes. Finishes become the brand identity stitched into every garment." },
  { num: "02", title: "JACQUARD LOOMS / FINISHING", body: "Woven on industrial Jacquard machines, cut, sealed, and inspected by hand. Made to outlast the garment." },
  { num: "03", title: "GLOBAL BRAND PARTNERS", body: "We work with independent labels, heritage houses, and emerging designers across 20+ countries." },
];

function About() {
  return (
    <StoreShell>
      <section className="relative h-[60vh] min-h-[420px] border-b border-hairline overflow-hidden text-paper">
        <img src={craftImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,5,15,0.3), rgba(5,5,15,0.75))" }} />
        <div className="absolute inset-0 noise-bg opacity-30" />
        <div className="relative z-10 h-full flex items-end p-6 md:p-12">
          <div>
            <p className="text-meta-sm opacity-60 mb-4">THE STUDIO</p>
            <h1 className="display-xxl text-[14vw] md:text-[10vw]">A STUDIO<br/>FOR LABELS.</h1>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 border-b border-hairline">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-hairline">
          <img src={atelierImg} alt="Inside the atelier" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
          <img src={loomImg} alt="Jacquard loom in motion" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 grid md:grid-cols-12 gap-8 border-b border-hairline">
        <div className="md:col-span-2 text-meta-sm text-muted-foreground">EST. STUDIO · WORLDWIDE</div>
        <div className="md:col-span-7">
          <p className="text-2xl md:text-3xl font-bold uppercase leading-tight">
            The Label Studio is where we design custom labels for fashion brands all over the world. Woven labels, leather patches, hangtags, care labels and packaging — engineered to make every garment unmistakably yours.
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
            <div className="md:col-span-7"><h2 className="text-3xl md:text-5xl font-extrabold uppercase">{p.title}</h2></div>
            <div className="md:col-span-3 text-meta-sm text-muted-foreground" style={{textTransform:"none",letterSpacing:0}}>{p.body}</div>
          </motion.div>
        ))}
      </section>
    </StoreShell>
  );
}
