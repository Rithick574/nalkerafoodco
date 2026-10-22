"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { PalmLayerBack, PalmLayerFront } from "./ui/Palm";

const marqueeWords = ["Kerala", "Coconut", "Nature", "Quality", "Nalkera"];

function LeafMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-lime" aria-hidden>
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Zm0 0 9-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeritageSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const patternY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const backY = useTransform(scrollYProgress, [0.2, 1], [40, -10]);
  const frontY = useTransform(scrollYProgress, [0.2, 1], [80, -30]);

  return (
    <section ref={ref} id="story" className="relative isolate overflow-hidden bg-forest text-ivory">
      <motion.div aria-hidden style={reduce ? undefined : { y: patternY }} className="absolute -inset-y-[15%] inset-x-0 -z-10 opacity-[0.06]">
        <Image src="/images/pattern.webp" alt="" fill sizes="100vw" className="pattern-light object-cover" />
      </motion.div>
      <div aria-hidden className="absolute -left-40 top-0 -z-10 size-[600px] rounded-full bg-leaf/60 blur-[120px]" />
      <div aria-hidden className="absolute -right-32 top-1/3 -z-10 size-[420px] rounded-full bg-lime/20 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32 lg:pt-40">
        <div className="grid items-end gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Eyebrow light>Our Story</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.025em]">
              <SplitText lines={["Born from Kerala’s", "*Natural Heritage.*"]} accentClassName="italic text-lime" />
            </h2>
            <motion.div
              variants={stagger(0.12, 0.25)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-9 max-w-xl space-y-5 text-[1.05rem] leading-relaxed text-ivory/75"
            >
              <motion.p variants={fadeUp}>
                In Kerala, the coconut palm is everywhere — lining the backwaters, shading courtyards and finding its way
                into nearly every kitchen. Its oil is part of how a Malayali home cooks, cares and celebrates.
              </motion.p>
              <motion.p variants={fadeUp}>
                Nalkera begins right here, in Poochol, with a product every Kerala household knows by heart — and a name
                that carries the place it comes from.
              </motion.p>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease }}
            className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:ml-auto"
          >
            <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-leaf/50 blur-3xl" />
            <Image
              src="/images/nalla-keralathinte-ruchi.png"
              alt=""
              width={340}
              height={245}
              sizes="380px"
              className="h-auto w-full"
            />
            <figcaption className="mt-6 border-t border-ivory/15 pt-5 text-center lg:text-left">
              <p lang="ml" className="font-ml text-xl font-semibold text-ivory">
                നല്ല കേരളത്തിന്റെ രുചി
              </p>
              <p className="mt-1 font-display text-lg italic text-ivory/65">The taste of good Kerala.</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      {/* ── Palm landscape with layered parallax ── */}
      <div aria-hidden className="relative mt-16 h-[190px] sm:h-[250px] md:mt-20 lg:h-[340px]">
        <motion.div style={reduce ? undefined : { y: backY }} className="absolute inset-0">
          <PalmLayerBack className="size-full fill-ivory/[0.07]" />
        </motion.div>
        <motion.div style={reduce ? undefined : { y: frontY }} className="absolute inset-0">
          <PalmLayerFront className="size-full fill-forest-900/80" />
        </motion.div>
      </div>

      {/* ── Marquee ── */}
      <div aria-hidden className="relative border-y border-ivory/10 bg-forest-900 py-5 md:py-6">
        <div className="flex w-max animate-marquee items-center gap-8 pr-8 md:gap-12 md:pr-12">
          {[0, 1].flatMap((copy) =>
            Array.from({ length: 3 }).flatMap((_, rep) =>
              marqueeWords.map((w) => (
                <span key={`${copy}-${rep}-${w}`} className="flex items-center gap-8 md:gap-12">
                  <span className="font-display text-2xl italic text-ivory/85 md:text-4xl">{w}</span>
                  <LeafMark />
                </span>
              )),
            ),
          )}
        </div>
      </div>
    </section>
  );
}
