import wovenImg from "@/assets/product-woven.jpg";
import wovenDetail from "@/assets/woven-detail.jpg";
import leatherImg from "@/assets/product-leather.jpg";
import leatherDenim from "@/assets/leather-denim.jpg";
import hangtagImg from "@/assets/product-hangtag.jpg";
import hangtagLuxury from "@/assets/hangtag-luxury.jpg";
import careImg from "@/assets/product-care.jpg";
import embroideredImg from "@/assets/product-embroidered.jpg";
import packagingImg from "@/assets/product-packaging.jpg";
import packagingSuite from "@/assets/packaging-suite.jpg";
import studioTable from "@/assets/studio-table.jpg";
import handsInspect from "@/assets/hands-inspect.jpg";
import labelsGrid from "@/assets/labels-grid.jpg";
import studioCraft from "@/assets/studio-craft.jpg";
import careDetail from "@/assets/care-detail.jpg";
import processBrief from "@/assets/process-brief.jpg";
import processDesign from "@/assets/process-design.jpg";
import processWeave from "@/assets/process-weave.jpg";
import processFinish from "@/assets/process-finish.jpg";
import processDelivery from "@/assets/process-delivery.jpg";

export type LabelCategory =
  | "woven-labels"
  | "leather-patches"
  | "hangtags"
  | "care-labels"
  | "embroidered-patches"
  | "packaging"
  | "custom-oem";

export interface LabelProduct {
  handle: string;
  title: string;
  category: LabelCategory;
  categoryLabel: string;
  finish: string;
  moq: string;
  leadTime: string;
  priceLabel: string;
  bestFor: string[];
  badge: "MADE TO ORDER" | "SAMPLE AVAILABLE" | "FAST TURNAROUND" | "PREMIUM FINISH";
  description: string;
  materials: string;
  artwork: string;
  image: string;
  hover: string;
  gallery: string[];
}

export const CATEGORY_LABELS: Record<LabelCategory, string> = {
  "woven-labels": "Woven Labels",
  "leather-patches": "Leather Patches",
  "hangtags": "Hangtags",
  "care-labels": "Care Labels",
  "embroidered-patches": "Embroidered Patches",
  "packaging": "Packaging",
  "custom-oem": "Custom OEM",
};

export const CATEGORY_CHIPS: Array<{ slug: string; label: string }> = [
  { slug: "all", label: "All Labels" },
  { slug: "woven-labels", label: "Woven" },
  { slug: "leather-patches", label: "Leather" },
  { slug: "hangtags", label: "Hangtags" },
  { slug: "care-labels", label: "Care" },
  { slug: "embroidered-patches", label: "Embroidered" },
  { slug: "packaging", label: "Packaging" },
  { slug: "custom-oem", label: "Custom" },
];

export const PRODUCTS: LabelProduct[] = [
  {
    handle: "signature-woven-neck-label",
    title: "Signature Woven Neck Label",
    category: "woven-labels", categoryLabel: "Woven Labels",
    finish: "Damask weave", moq: "500 pcs", leadTime: "10–14 days",
    priceLabel: "From $0.08/unit", badge: "MADE TO ORDER",
    bestFor: ["Streetwear", "Minimal clothing brands", "Denim"],
    description: "A precision damask neck label for brands that obsess over the inside of the garment. Tactile, refined, and built to outlast the piece it lives on.",
    materials: "100% polyester yarn, soft-touch backing, fold options: end-fold, center-fold, straight-cut.",
    artwork: "Vector .ai or .eps preferred. Pantone TPX/TCX references for thread matching.",
    image: wovenDetail, hover: wovenImg, gallery: [wovenDetail, wovenImg, studioTable, handsInspect],
  },
  {
    handle: "luxury-satin-woven-label",
    title: "Luxury Satin Woven Label",
    category: "woven-labels", categoryLabel: "Woven Labels",
    finish: "Soft satin", moq: "500 pcs", leadTime: "10–14 days",
    priceLabel: "From $0.10/unit", badge: "PREMIUM FINISH",
    bestFor: ["Luxury fashion", "Lingerie", "Silk garments"],
    description: "A whisper of satin against the skin. Engineered for luxury garments where the inside finish is the brand.",
    materials: "Satin weave polyester, ultra-soft hand feel, available end-fold or manhattan-fold.",
    artwork: "High resolution logo, monochrome or two-color. We weave to match.",
    image: wovenImg, hover: wovenDetail, gallery: [wovenImg, wovenDetail, labelsGrid],
  },
  {
    handle: "high-density-damask-label",
    title: "High-Density Damask Label",
    category: "woven-labels", categoryLabel: "Woven Labels",
    finish: "Fine detail weave", moq: "1000 pcs", leadTime: "14–18 days",
    priceLabel: "Custom Quote", badge: "PREMIUM FINISH",
    bestFor: ["Heritage houses", "Tailoring", "Outerwear"],
    description: "Up to 100,000 stitches per square inch. For artwork that needs to read with absolute clarity.",
    materials: "Dense polyester weave, multi-color thread up to 8 shades.",
    artwork: "Send vector artwork; we'll prepare a weave file and physical pre-production sample.",
    image: wovenDetail, hover: handsInspect, gallery: [wovenDetail, handsInspect, studioTable],
  },
  {
    handle: "organic-cotton-woven-label",
    title: "Organic Cotton Woven Label",
    category: "woven-labels", categoryLabel: "Woven Labels",
    finish: "Natural cotton", moq: "500 pcs", leadTime: "12–16 days",
    priceLabel: "From $0.12/unit", badge: "SAMPLE AVAILABLE",
    bestFor: ["Sustainable brands", "Childrenswear", "Loungewear"],
    description: "GOTS-friendly cotton yarns, naturally undyed, woven with the same precision as our standard line.",
    materials: "Certified organic cotton, optional unbleached backing.",
    artwork: "Two-color limit recommended for cotton clarity.",
    image: handsInspect, hover: wovenImg, gallery: [handsInspect, wovenImg, labelsGrid],
  },
  {
    handle: "embossed-leather-patch",
    title: "Embossed Leather Patch",
    category: "leather-patches", categoryLabel: "Leather Patches",
    finish: "Debossed logo", moq: "300 pcs", leadTime: "14–20 days",
    priceLabel: "From $0.35/unit", badge: "PREMIUM FINISH",
    bestFor: ["Denim", "Workwear", "Heritage"],
    description: "Full-grain leather, debossed under heat and pressure. Ages with the garment, never against it.",
    materials: "Vegetable-tanned cowhide, 1.4–2.0mm thickness, available in tan, cognac, black, oxblood.",
    artwork: "Single-line vector logos work best for clean deboss results.",
    image: leatherDenim, hover: leatherImg, gallery: [leatherDenim, leatherImg, studioCraft],
  },
  {
    handle: "vegan-leather-brand-patch",
    title: "Vegan Leather Brand Patch",
    category: "leather-patches", categoryLabel: "Leather Patches",
    finish: "Heat-stamped", moq: "300 pcs", leadTime: "14–20 days",
    priceLabel: "From $0.28/unit", badge: "SAMPLE AVAILABLE",
    bestFor: ["Vegan brands", "Streetwear", "Activewear"],
    description: "Plant-based PU leather with a hand feel matched to chrome-tanned hides. The look without the cattle.",
    materials: "Cactus-fiber and recycled PU blend, certified animal-free.",
    artwork: "Vector logo + foil or deboss specification.",
    image: leatherImg, hover: leatherDenim, gallery: [leatherImg, leatherDenim, studioCraft],
  },
  {
    handle: "denim-waistband-patch",
    title: "Denim Waistband Patch",
    category: "leather-patches", categoryLabel: "Leather Patches",
    finish: "Vintage brown", moq: "500 pcs", leadTime: "16–22 days",
    priceLabel: "Custom Quote", badge: "MADE TO ORDER",
    bestFor: ["Denim", "Selvedge", "Workwear"],
    description: "The American back-pocket patch, reborn. Thick vegetable-tanned leather with a deep heritage emboss.",
    materials: "2.0mm vegetable-tan, washed and waxed for a vintage finish.",
    artwork: "Detailed vector emblem; metal die created in-house.",
    image: leatherDenim, hover: leatherImg, gallery: [leatherDenim, leatherImg],
  },
  {
    handle: "minimal-black-hangtag",
    title: "Minimal Black Hangtag",
    category: "hangtags", categoryLabel: "Hangtags",
    finish: "Matte black card", moq: "500 pcs", leadTime: "7–10 days",
    priceLabel: "From $0.15/unit", badge: "FAST TURNAROUND",
    bestFor: ["Minimal clothing brands", "Luxury fashion"],
    description: "350gsm matte uncoated black card, debossed logo, natural cotton string. The first handshake.",
    materials: "Black-through pulp card, no white edges. Cotton or jute string included.",
    artwork: "Single-color vector logo for deboss; two-sided artwork supported.",
    image: hangtagLuxury, hover: hangtagImg, gallery: [hangtagLuxury, hangtagImg, studioTable],
  },
  {
    handle: "luxury-foil-hangtag",
    title: "Luxury Foil Hangtag",
    category: "hangtags", categoryLabel: "Hangtags",
    finish: "Gold/silver foil", moq: "500 pcs", leadTime: "10–14 days",
    priceLabel: "From $0.22/unit", badge: "PREMIUM FINISH",
    bestFor: ["Luxury fashion", "Evening wear", "Accessories"],
    description: "Hot foil stamped onto premium uncoated card. Available in champagne gold, silver, copper, holographic.",
    materials: "400gsm cotton card, foil block dies cut in-house.",
    artwork: "Vector artwork with foil-only layer specified.",
    image: hangtagLuxury, hover: hangtagImg, gallery: [hangtagLuxury, hangtagImg],
  },
  {
    handle: "recycled-kraft-hangtag",
    title: "Recycled Kraft Hangtag",
    category: "hangtags", categoryLabel: "Hangtags",
    finish: "Eco kraft paper", moq: "500 pcs", leadTime: "7–10 days",
    priceLabel: "From $0.12/unit", badge: "FAST TURNAROUND",
    bestFor: ["Sustainable brands", "Streetwear"],
    description: "Post-consumer recycled kraft, FSC-certified. Honest texture, honest ink.",
    materials: "300gsm recycled kraft, soy-based ink.",
    artwork: "Mono ink prints best; deboss available as upgrade.",
    image: hangtagImg, hover: hangtagLuxury, gallery: [hangtagImg, hangtagLuxury],
  },
  {
    handle: "soft-touch-care-label",
    title: "Soft Touch Care Label",
    category: "care-labels", categoryLabel: "Care Labels",
    finish: "Satin wash label", moq: "1000 pcs", leadTime: "10–14 days",
    priceLabel: "From $0.05/unit", badge: "MADE TO ORDER",
    bestFor: ["Childrenswear", "Lingerie", "Sportswear"],
    description: "Wash-safe satin labels with soft-cut edges. Compliant with EU, US, and UK textile labelling laws.",
    materials: "Polyester satin, 8mm or 12mm widths, multi-language print.",
    artwork: "We localize care symbols + composition copy from your tech pack.",
    image: careDetail, hover: careImg, gallery: [careDetail, careImg, processFinish, handsInspect],
  },
  {
    handle: "heat-transfer-care-label",
    title: "Heat Transfer Care Label",
    category: "care-labels", categoryLabel: "Care Labels",
    finish: "Tagless print", moq: "1000 pcs", leadTime: "12–16 days",
    priceLabel: "Custom Quote", badge: "PREMIUM FINISH",
    bestFor: ["Activewear", "Performance", "Tagless tees"],
    description: "Direct-to-fabric heat transfer for a tagless, frictionless finish. The label that disappears.",
    materials: "Eco-PU film, OEKO-TEX certified.",
    artwork: "Provide vector or 600dpi raster for symbol legibility.",
    image: careImg, hover: careDetail, gallery: [careImg, careDetail, embroideredImg],
  },
  {
    handle: "embroidered-logo-patch",
    title: "Embroidered Logo Patch",
    category: "embroidered-patches", categoryLabel: "Embroidered Patches",
    finish: "Merrow border", moq: "300 pcs", leadTime: "12–18 days",
    priceLabel: "From $0.30/unit", badge: "SAMPLE AVAILABLE",
    bestFor: ["Streetwear", "Workwear", "Caps"],
    description: "Twill base with up to 9 thread colors and a merrow-stitched border. Iron-on or sew-on backing.",
    materials: "Polyester twill, viscose embroidery thread, optional gold thread.",
    artwork: "Vector logo; minimum legible size 25mm.",
    image: embroideredImg, hover: handsInspect, gallery: [embroideredImg, handsInspect],
  },
  {
    handle: "chenille-varsity-patch",
    title: "Chenille Varsity Patch",
    category: "embroidered-patches", categoryLabel: "Embroidered Patches",
    finish: "Raised chenille", moq: "300 pcs", leadTime: "16–22 days",
    priceLabel: "Custom Quote", badge: "PREMIUM FINISH",
    bestFor: ["Varsity", "Sportswear", "Heritage knitwear"],
    description: "Letterman-grade chenille with a tactile pile. The patch you can feel from across the room.",
    materials: "Wool chenille on felt base, embroidered outline available.",
    artwork: "Bold lettering and emblem shapes work best.",
    image: embroideredImg, hover: studioCraft, gallery: [embroideredImg, studioCraft],
  },
  {
    handle: "premium-packaging-suite",
    title: "Premium Packaging Suite",
    category: "packaging", categoryLabel: "Packaging",
    finish: "Box, tissue, sticker, card", moq: "300 sets", leadTime: "18–25 days",
    priceLabel: "Custom Quote", badge: "MADE TO ORDER",
    bestFor: ["DTC brands", "Luxury fashion", "Gift drops"],
    description: "A full unboxing system: rigid box, branded tissue, thank-you card, sticker seal, garment dust bag.",
    materials: "Recycled rigid board, FSC tissue, soy-ink printed cards.",
    artwork: "Provide brand kit + we engineer the system around it.",
    image: packagingSuite, hover: packagingImg, gallery: [packagingSuite, packagingImg],
  },
  {
    handle: "complete-brand-trim-kit",
    title: "Complete Brand Trim Kit",
    category: "custom-oem", categoryLabel: "Custom OEM",
    finish: "Labels, tags, patches, packaging", moq: "Custom", leadTime: "Project based",
    priceLabel: "Custom Quote", badge: "MADE TO ORDER",
    bestFor: ["Emerging brands", "Full collections", "Production launches"],
    description: "Every trim your collection needs, designed and produced as one cohesive system. One brief, one studio, one delivery.",
    materials: "Combination of all studio capabilities; sampled and approved before production.",
    artwork: "Send your brand book and tech pack — we handle the rest.",
    image: studioTable, hover: packagingSuite, gallery: [studioTable, packagingSuite, handsInspect, labelsGrid],
  },
];

export const ALL_PRODUCTS = PRODUCTS;

export function getProductsByCategory(slug: string): LabelProduct[] {
  if (slug === "all") return PRODUCTS;
  return PRODUCTS.filter(p => p.category === slug);
}

export function getProductByHandle(handle: string): LabelProduct | undefined {
  return PRODUCTS.find(p => p.handle === handle);
}

export const CATEGORY_HEROES: Record<string, { image: string; tagline: string }> = {
  "all": { image: labelsGrid, tagline: "Every trim a fashion brand needs, made in one studio." },
  "woven-labels": { image: wovenDetail, tagline: "The signature stitched into every garment." },
  "leather-patches": { image: leatherDenim, tagline: "Heritage you can feel between your fingers." },
  "hangtags": { image: hangtagLuxury, tagline: "The first handshake between brand and buyer." },
  "care-labels": { image: careDetail, tagline: "Quiet precision for the inside of every piece." },
  "embroidered-patches": { image: embroideredImg, tagline: "Iconography that outlasts the season." },
  "packaging": { image: packagingSuite, tagline: "The unboxing is part of the product." },
  "custom-oem": { image: studioTable, tagline: "Your full trim system, sampled and produced as one." },
};
