"use client";

import { motion, type Variants } from "motion/react";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, ease, delay: 0.3 + i * 0.08 }, opacity: { duration: 0.2, delay: 0.3 + i * 0.08 } },
  }),
};

function LineIcon({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 48 48" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths.map((d, i) => (
        <motion.path key={i} d={d} variants={draw} custom={i} />
      ))}
    </svg>
  );
}

const values = [
  {
    title: "Kerala Roots",
    body: "Born in Poochol and shaped by the flavours, habits and homes of Kerala — the place our name and our story come from.",
    icon: [
      "M10 44h28",
      "M23 44c1-9 2.5-17 1-26",
      "M24 18c4-7 11-8 17-5",
      "M24 18c-2-6-7-10-13-10",
      "M24 18c3-6 8-11 13-12",
      "M24 18c-5-2-10 1-13 6",
      "M24 18c6-1 11 2 13 7",
    ],
  },
  {
    title: "Quality-Focused",
    body: "Our label carries one simple line — “The Mark of Purity.” It is the standard we hold ourselves to, bottle after bottle.",
    icon: [
      "M24 35a13 13 0 1 0 0-26 13 13 0 0 0 0 26Z",
      "M24 14.5s-5.5 6.2-5.5 9.8a5.5 5.5 0 0 0 11 0c0-3.6-5.5-9.8-5.5-9.8Z",
      "M17.5 33 14 44l5-2.6L22 46l2-9.5",
      "M30.5 33 34 44l-5-2.6L26 46l-2-9.5",
    ],
  },
  {
    title: "Everyday Goodness",
    body: "Made for daily life — the morning tempering, the evening snack, the Sunday fry and the quiet comforts of home.",
    icon: [
      "M7 24h34",
      "M10 24c0 9.5 6 16 14 16s14-6.5 14-16",
      "M7 24c-2.5 0-2.5 4 1 4.5M41 24c2.5 0 2.5 4-1 4.5",
      "M18 18c-2-2.6 2-4.6 0-8",
      "M24 18c-2-2.6 2-4.6 0-8",
      "M30 18c-2-2.6 2-4.6 0-8",
    ],
  },
];

export function BrandValues() {
  return (
    <section id="values" className="relative overflow-hidden bg-ivory py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>What we value</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
              <SplitText lines={["Simple values,", "*honestly kept.*"]} />
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="max-w-xs md:text-right"
          >
            <p lang="ml" className="font-ml text-2xl font-semibold text-leaf">
              രുചിയുടെയും ഗുണമേന്മയുടെയും
            </p>
            <p className="mt-1 font-display text-lg italic text-ink/60">Of taste, and of quality.</p>
          </motion.div>
        </div>

        <motion.ol
          variants={stagger(0.16)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-forest/10 md:mt-20 md:grid-cols-3"
        >
          {values.map((v, i) => (
            <motion.li
              key={v.title}
              variants={fadeUp}
              className="group relative flex flex-col bg-ivory p-8 transition-colors duration-500 ease-organic hover:bg-cream md:p-10 lg:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-16 place-items-center rounded-full bg-lime/20 text-forest transition-all duration-500 ease-organic group-hover:-translate-y-1 group-hover:bg-forest group-hover:text-lime">
                  <LineIcon paths={v.icon} />
                </span>
                <span className="font-display text-5xl italic text-forest/15 transition-colors duration-500 group-hover:text-gold/70">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-10 font-display text-[1.75rem] text-forest">{v.title}</h3>
              <span aria-hidden className="mt-4 h-[2px] w-10 origin-left rounded-full bg-lime transition-transform duration-500 ease-organic group-hover:scale-x-[2.4]" />
              <p className="mt-5 leading-relaxed text-ink/70">{v.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
