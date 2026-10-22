"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";

const facts = [
  { label: "Home", value: "Poochol, Kerala" },
  { label: "Featured", value: "Coconut Oil" },
  { label: "On every label", value: "The Mark of Purity" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const zoom = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 md:py-32 lg:py-40">
      <div aria-hidden className="absolute -right-40 top-1/4 size-[520px] rounded-full bg-lime/15 blur-3xl" />
      <div aria-hidden className="absolute -left-24 bottom-0 size-[360px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* ── Visual: arched window onto the coconut ── */}
        <div ref={ref} className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <motion.div
            initial={{ clipPath: "inset(18% 10% 0% 10% round 999px 999px 40px 40px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 40px 40px)", opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.4, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-forest"
          >
            <motion.div style={reduce ? undefined : { scale: zoom }} className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#0b9e50_0%,#078843_38%,#065d35_80%)]" />
              <Image src="/images/pattern.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 90vw" className="pattern-light object-cover opacity-[0.07]" />
              <p
                lang="ml"
                aria-hidden
                className="absolute inset-x-0 top-[12%] text-center font-ml text-[clamp(5rem,16vw,9.5rem)] font-bold leading-none text-ivory/[0.08]"
              >
                നല്ല
              </p>
              <Image
                src="/images/coconut.png"
                alt="A halved coconut with fresh white flesh and a drop of golden oil"
                width={680}
                height={648}
                sizes="(min-width: 1024px) 420px, 80vw"
                className="absolute bottom-[10%] left-1/2 h-auto w-[86%] -translate-x-1/2 drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
              />
            </motion.div>
          </motion.div>

          <motion.figure
            style={reduce ? undefined : { y: lift }}
            className="absolute -bottom-8 -right-2 w-[200px] rounded-[1.5rem] bg-ivory p-5 shadow-[0_30px_60px_-30px_rgba(6,93,53,0.55)] sm:-right-8 md:w-[220px]"
          >
            <p lang="ml" className="font-ml text-4xl font-bold leading-none text-leaf">
              നല്ല
            </p>
            <figcaption className="mt-2 text-xs leading-relaxed text-ink/65">
              <span className="font-semibold text-forest">nalla</span> — good. The word that opens our tagline,{" "}
              <span lang="ml" className="font-ml">
                നല്ല കേരളത്തിന്റെ രുചി
              </span>
              .
            </figcaption>
          </motion.figure>
        </div>

        {/* ── Copy ── */}
        <div>
          <Eyebrow>About Nalkera</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.1rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
            <SplitText lines={["A Taste of Kerala.", "A Tradition of *Goodness.*"]} />
          </h2>

          <motion.div
            variants={stagger(0.12, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 max-w-xl space-y-5 text-[1.05rem] leading-relaxed text-ink/75"
          >
            <motion.p variants={fadeUp}>
              Nalkera Foodco is a food brand from Poochol, Kerala, built on a simple belief: the everyday staples in
              your kitchen should carry the familiar goodness of home.
            </motion.p>
            <motion.p variants={fadeUp}>
              Our story begins with coconut oil —{" "}
              <span lang="ml" className="font-ml font-semibold text-forest">
                വെളിച്ചെണ്ണ
              </span>{" "}
              — the golden staple that has long been at the heart of Kerala kitchens. We bring it to your table under a
              name that speaks of where we come from, and a promise we print on every label.
            </motion.p>

            <motion.dl variants={fadeUp} className="grid grid-cols-1 gap-x-6 pt-6 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-forest/15 py-4">
                  <dt className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-ink/45">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-xl text-forest">{f.value}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
