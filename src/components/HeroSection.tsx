"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";
import { PalmFrond } from "./ui/Palm";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
});

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bottlesY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const coconutY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const coconutRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const frondY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallax = <T,>(style: T) => (reduce ? undefined : style);

  return (
    <section ref={ref} id="home" className="grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ivory pb-16 pt-28 lg:pb-12 lg:pt-28">
      {/* ── Background: poster-style contour pattern, drifting glows, green ground wave ── */}
      <motion.div aria-hidden style={parallax({ y: patternY })} className="absolute -inset-x-[5%] -top-[5%] bottom-[-20%] -z-20 opacity-[0.075]">
        <Image src="/images/pattern.webp" alt="" fill priority sizes="100vw" className="animate-drift object-cover" />
      </motion.div>
      <div aria-hidden className="absolute -left-48 -top-48 -z-10 size-[560px] animate-drift rounded-full bg-[radial-gradient(circle_at_45%_45%,#c7e26a_0%,#9bcb28_35%,transparent_70%)] opacity-50 blur-3xl" />
      <div aria-hidden className="absolute -right-40 top-[8%] -z-10 size-[720px] animate-drift-slow rounded-full bg-[radial-gradient(circle,rgba(212,175,85,0.26),transparent_62%)] blur-2xl" />
      <svg aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[24%] w-full lg:h-[30%]" viewBox="0 0 1440 300" preserveAspectRatio="none">
        <defs>
          <linearGradient id="hero-ground" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#078843" />
            <stop offset="1" stopColor="#065d35" />
          </linearGradient>
        </defs>
        <path d="M0 250C300 280 560 240 820 170 1060 108 1260 70 1440 64V300H0Z" fill="url(#hero-ground)" />
        <path d="M0 236C300 266 560 226 820 156 1060 94 1260 56 1440 50" fill="none" stroke="#9bcb28" strokeOpacity=".55" strokeWidth="3" />
      </svg>

      {/* ── Coconut fronds entering from the edges ── */}
      <motion.div
        aria-hidden
        style={parallax({ y: frondY })}
        initial={{ opacity: 0, x: 160, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.8, ease, delay: 0.5 }}
        className="pointer-events-none absolute -right-28 -top-16 -z-10 w-[340px] origin-top-right sm:w-[460px] lg:-right-20 lg:-top-24 lg:w-[620px]"
      >
        <div className="origin-right -scale-x-100 animate-sway">
          <PalmFrond className="w-full -rotate-[24deg] opacity-90" />
        </div>
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -140, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.8, ease, delay: 0.75 }}
        className="pointer-events-none absolute -left-32 bottom-[16%] -z-10 hidden w-[380px] md:block lg:bottom-[20%]"
      >
        <div className="origin-left animate-sway [animation-delay:-4s]">
          <PalmFrond className="w-full rotate-[18deg] opacity-25" />
        </div>
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* ── Copy ── */}
        <motion.div style={parallax({ y: textY, opacity: textOpacity })} className="relative z-10 max-w-xl">
          <motion.p {...rise(0.15)} className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.32em] text-leaf">
            <span aria-hidden className="h-px w-10 bg-leaf/50" />
            From the heart of Kerala
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8.4vw,6rem)] font-medium leading-[0.98] tracking-[-0.025em] text-forest">
            <SplitText onMount delay={0.3} lines={["Pure Goodness.", "Rooted in *Kerala.*"]} />
          </h1>

          <motion.p {...rise(0.75)} className="mt-7 max-w-[30rem] text-[1.05rem] leading-relaxed text-ink/75 md:text-lg">
            Discover Nalkera Coconut Oil — bringing the essence of Kerala&rsquo;s coconuts to everyday life.
          </motion.p>

          <motion.div {...rise(0.9)} className="mt-9 flex flex-wrap gap-2.5 sm:gap-3">
            <ButtonLink href="#products" size="lg" icon={<ArrowRight className="size-4" />}>
              Explore Our Products
            </ButtonLink>
            <ButtonLink href="#contact" size="lg" variant="outline">
              Contact Us
            </ButtonLink>
          </motion.div>

          <motion.div {...rise(1.05)} className="mt-10 hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/60 sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="size-4 text-leaf" />
              {site.location}
            </span>
            <span aria-hidden className="h-4 w-px bg-ink/15" />
            <span>
              <span lang="ml" className="font-ml text-base font-semibold text-forest">
                വെളിച്ചെണ്ണ
              </span>{" "}
              · Coconut Oil
            </span>
          </motion.div>
        </motion.div>

        {/* ── Product stage ── */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[580px]">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
            className="absolute inset-x-[4%] top-[8%] aspect-square"
          >
            <div className="absolute inset-0 animate-breathe rounded-full border border-gold/45" />
            <div className="absolute inset-[7%] rounded-full border border-dashed border-leaf/25" />
            <div className="absolute inset-[13%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#0a9a4d,#078843_45%,#065d35_100%)] shadow-[0_40px_80px_-30px_rgba(6,93,53,0.6)]">
              <Image src="/images/pattern.webp" alt="" fill sizes="500px" className="pattern-light object-cover opacity-[0.08]" />
              <div className="absolute inset-0 rounded-full ring-[10px] ring-inset ring-lime/30" />
            </div>
          </motion.div>

          {/* bottles: rise in, then float */}
          <motion.div style={parallax({ y: bottlesY })} className="absolute inset-x-0 bottom-[3%] top-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease, delay: 0.45 }}
              className="relative h-full"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 1.9 }}
                className="h-full"
              >
                <Image
                  src="/images/brand/nalkera-coconut-oil-bottles.png"
                  alt="Two Nalkera Coconut Oil bottles with green caps and വെളിച്ചെണ്ണ Coconut Oil labels"
                  width={836}
                  height={1954}
                  priority
                  sizes="(min-width: 1024px) 260px, 200px"
                  className="h-full w-auto drop-shadow-[0_30px_30px_rgba(4,63,37,0.35)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
          {/* soft contact shadow */}
          <div aria-hidden className="absolute bottom-[1%] left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[50%] bg-forest-900/40 blur-xl" />

          {/* coconut: slides in, drifts up on scroll */}
          <motion.div
            style={parallax({ y: coconutY, rotate: coconutRotate })}
            className="absolute -left-[4%] bottom-[-2%] w-[44%] sm:-left-[8%]"
          >
            <motion.div
              initial={{ opacity: 0, x: -50, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1.4, ease, delay: 0.8 }}
            >
              <Image
                src="/images/brand/coconut.png"
                alt=""
                width={1357}
                height={1177}
                priority
                sizes="(min-width: 1024px) 260px, 45vw"
                className="h-auto w-full drop-shadow-[0_24px_24px_rgba(4,63,37,0.3)]"
              />
            </motion.div>
          </motion.div>

          {/* label chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.5 }}
            className="absolute right-0 top-[18%] rounded-2xl border border-white/60 bg-ivory/75 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(6,93,53,0.45)] backdrop-blur-md sm:right-[2%]"
          >
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">On the label</p>
            <p className="mt-0.5 font-display text-lg italic text-forest">The Mark of Purity</p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About Nalkera"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-ivory/85 lg:flex"
      >
        Scroll
        <span className="grid size-9 place-items-center rounded-full border border-ivory/40 transition-colors group-hover:bg-ivory/15">
          <ArrowDown aria-hidden className="size-4 transition-transform duration-500 ease-organic group-hover:translate-y-0.5" />
        </span>
      </motion.a>
    </section>
  );
}
