"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";
import { cn, productEnquiry, site, whatsappLink } from "@/lib/site";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

const views = [
  {
    key: "single",
    label: "1 Ltr bottle",
    src: "/images/brand/nalkera-coconut-oil-1l.png",
    width: 554,
    height: 1954,
    alt: "Nalkera Coconut Oil 1 litre bottle with a green cap and a label reading വെളിച്ചെണ്ണ Coconut Oil",
  },
  {
    key: "pair",
    label: "Both bottles",
    src: "/images/brand/nalkera-coconut-oil-bottles.png",
    width: 836,
    height: 1954,
    alt: "Two Nalkera Coconut Oil bottles side by side",
  },
] as const;

// Only details that are printed on the packaging shown in the official artwork.
const specs = [
  { term: "Product", detail: "Coconut Oil · വെളിച്ചെണ്ണ" },
  { term: "Pack size", detail: "1 Ltr (larger bottle)" },
  { term: "Label line", detail: "The Mark of Purity" },
  { term: "Brand", detail: "Nalkera Foodco, Poochol" },
];

export function ProductShowcase() {
  const [view, setView] = useState<(typeof views)[number]["key"]>("single");
  const current = views.find((v) => v.key === view)!;

  return (
    <section id="products" className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-36">
      <svg aria-hidden className="absolute inset-x-0 top-0 h-16 w-full md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 0H1440V30C1180 90 900 100 700 70S260 10 0 60Z" fill="#faf8e8" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* ── Stage ── */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] lg:order-none lg:max-w-none">
          <div className="absolute inset-x-0 bottom-[6%] aspect-square">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                aria-hidden
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.5, ease, delay: i * 0.15 }}
                className="absolute inset-0"
                style={{ padding: `${i * 9}%` }}
              >
                <div
                  className={cn(
                    "size-full rounded-full",
                    i === 0 && "animate-breathe border border-gold/40",
                    i === 1 && "border border-leaf/20 bg-ivory/50",
                    i === 2 &&
                      "overflow-hidden bg-[radial-gradient(circle_at_40%_30%,#0a9a4d,#078843_45%,#065d35)] shadow-[0_50px_90px_-40px_rgba(6,93,53,0.7)]",
                  )}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 90 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease, delay: 0.2 }}
            className="absolute inset-x-0 bottom-[9%] top-0 flex justify-center"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, scale: 0.97, filter: "blur(6px)" }}
                transition={{ duration: 0.75, ease }}
                whileHover={{ y: -14 }}
                className="h-full"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 1024px) 300px, 220px"
                  className="h-full w-auto drop-shadow-[0_40px_35px_rgba(4,63,37,0.4)]"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 12 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
            className="absolute -right-2 bottom-[2%] w-[38%] sm:right-[2%]"
          >
            <Image src="/images/brand/coconut.png" alt="" width={1357} height={1177} sizes="220px" className="h-auto w-full -scale-x-100 drop-shadow-[0_20px_20px_rgba(4,63,37,0.3)]" />
          </motion.div>
        </div>

        {/* ── Product details ── */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <motion.div variants={fadeUp}>
            <Eyebrow>Our Products</Eyebrow>
          </motion.div>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,5.2vw,4rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
            <SplitText lines={["Nature’s Goodness,", "Beautifully *Bottled.*"]} />
          </h2>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl text-ink">Nalkera Coconut Oil</h3>
            <p lang="ml" className="font-ml text-xl font-semibold text-leaf">
              വെളിച്ചെണ്ണ
            </p>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-ink/75">
            A Kerala kitchen essential, presented with care. Golden, familiar and ready for the everyday — from the
            morning&rsquo;s first tempering to the family&rsquo;s Sunday fry.
          </motion.p>

          <motion.dl variants={fadeUp} className="mt-8 max-w-lg divide-y divide-forest/10 border-y border-forest/10">
            {specs.map((s) => (
              <div key={s.term} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-ink/45">{s.term}</dt>
                <dd className="text-right font-medium text-forest">{s.detail}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={fadeUp} role="group" aria-label="Product view" className="mt-8 inline-flex rounded-full bg-ivory p-1 ring-1 ring-forest/10">
            {views.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setView(v.key)}
                aria-pressed={view === v.key}
                className={cn(
                  "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
                  view === v.key ? "text-ivory" : "text-forest/70 hover:text-forest",
                )}
              >
                {view === v.key && (
                  <motion.span layoutId="view-pill" transition={{ duration: 0.5, ease }} className="absolute inset-0 -z-0 rounded-full bg-forest" />
                )}
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={whatsappLink(productEnquiry)} size="lg" icon={<WhatsAppIcon className="size-[18px]" />}>
              Enquire about this product
            </ButtonLink>
            <ButtonLink href={site.phoneHref} size="lg" variant="outline" icon={<Phone className="size-4" />}>
              Call Us
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
