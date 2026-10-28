"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ShoppingBag } from "lucide-react";
import { cn, whatsappLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { sizes } from "@/lib/products";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

const N = sizes.length;
const SEG = 1 / N;
const HOLD = SEG * 0.22;

// Scroll progress → slide position, with a resting plateau on each bottle.
const progressStops: number[] = [];
const slideStops: number[] = [];
sizes.forEach((_, i) => {
  progressStops.push(i === 0 ? 0 : i * SEG + HOLD, i === N - 1 ? 1 : (i + 1) * SEG - HOLD);
  slideStops.push(i, i);
});
const restingProgress = (i: number) => (i === 0 ? 0 : i === N - 1 ? 1 : (i + 0.5) * SEG);

const enquiry = (label: string) => `Hi Nalkera, I'd like to know more about Nalkera Coconut Oil (${label}).`;

function Bottle({ index, position }: { index: number; position: MotionValue<number> }) {
  const s = sizes[index];
  const distance = useTransform(position, (p) => Math.min(Math.abs(p - index), 1));
  const opacity = useTransform(distance, [0, 1], [1, 0]);
  const scale = useTransform(distance, [0, 1], [1, 0.82]);
  const rotate = useTransform(position, (p) => Math.max(-1, Math.min(1, index - p)) * 9);
  // Neighbours sit just over half a stage away, so outgoing and incoming bottles cross over the disc.
  const x = useTransform(position, (p) => `${(index - p) * 55}%`);

  return (
    <motion.div style={{ x }} className="absolute inset-0 flex items-end justify-center">
      <motion.div style={{ opacity, scale, rotate }} className="flex h-full origin-bottom items-end justify-center">
        <motion.div whileHover={{ y: -12 }} transition={{ duration: 0.5, ease }} style={{ height: `${s.scale * 100}%` }}>
          <Image
            src={s.image.src}
            alt={`Nalkera Coconut Oil ${s.label} bottle with a green cap and a label reading വെളിച്ചെണ്ണ Coconut Oil`}
            width={s.image.width}
            height={s.image.height}
            sizes="(min-width: 1024px) 220px, 120px"
            className="h-full w-auto drop-shadow-[0_40px_35px_rgba(4,63,37,0.4)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SizePicker({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div role="group" aria-label="Pack size" className="inline-flex rounded-full bg-ivory p-1 ring-1 ring-forest/10">
      {sizes.map((s, i) => (
        <button
          key={s.key}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={active === i}
          className={cn(
            "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 sm:px-5",
            active === i ? "text-ivory" : "text-forest/70 hover:text-forest",
          )}
        >
          {active === i && (
            <motion.span layoutId="size-pill" transition={{ duration: 0.5, ease }} className="absolute inset-0 rounded-full bg-forest" />
          )}
          <span className="relative">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Reduced-motion layout: all sizes side by side, no pinning or scroll-linked movement. */
function StaticSizes() {
  return (
    <div className="mt-14 flex items-end justify-center gap-8 sm:gap-16">
      {sizes.map((s) => (
        <figure key={s.key} className="flex flex-col items-center">
          <div className="flex h-[260px] items-end sm:h-[380px]">
            <Image
              src={s.image.src}
              alt={`Nalkera Coconut Oil ${s.label} bottle`}
              width={s.image.width}
              height={s.image.height}
              sizes="140px"
              style={{ height: `${s.scale * 100}%` }}
              className="w-auto"
            />
          </div>
          <figcaption className="mt-4 font-display text-2xl text-forest">{s.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ProductShowcase() {
  // The scroll track holds the pinned panel; progress runs from the moment the panel locks to when it releases.
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, progressStops, slideStops);

  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(N - 1, Math.floor(p * N))));

  const select = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const pinned = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + pinned * restingProgress(i), behavior: reduce ? "auto" : "smooth" });
  };

  const current = sizes[active];

  const heading = (
    <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
      <SplitText lines={["Nature’s Goodness,", "Beautifully *Bottled.*"]} />
    </h2>
  );

  if (reduce) {
    return (
      <section id="products" className="relative bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Eyebrow className="justify-center">Our Products</Eyebrow>
          <div className="mt-6">{heading}</div>
          <StaticSizes />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href={whatsappLink(enquiry("pack sizes"))} size="lg" icon={<WhatsAppIcon className="size-[18px]" />}>
              Enquire about this product
            </ButtonLink>
            <ButtonLink href="#order" size="lg" variant="outline" icon={<ShoppingBag className="size-4" />}>
              Order multiple
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="relative overflow-x-clip bg-cream">
      <svg aria-hidden className="absolute inset-x-0 top-0 h-16 w-full md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 0H1440V30C1180 90 900 100 700 70S260 10 0 60Z" fill="#faf8e8" />
      </svg>

      {/* Below desktop the heading scrolls in normally, leaving the pinned screen to the bottle and details. */}
      <div className="relative mx-auto max-w-7xl px-5 pb-2 pt-24 md:px-8 lg:hidden">
        <Eyebrow>Our Products</Eyebrow>
        <div className="mt-4">{heading}</div>
      </div>

      <div ref={trackRef} style={{ height: `calc(${(N - 1) * 85}svh + 100svh)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-5 pt-[4.75rem] lg:justify-center lg:pb-0 lg:pt-16">
          <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-4 px-5 md:px-8 lg:grid lg:flex-none lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* ── Stage: bottles slide past as you scroll. On phones it takes whatever height is left. ── */}
            <div className="relative mx-auto min-h-0 w-full max-w-[520px] flex-1 [container-type:size] lg:aspect-[4/5] lg:max-w-none lg:flex-none">
              <div className="absolute bottom-[4%] left-1/2 aspect-square w-[min(84cqw,92cqh)] -translate-x-1/2 lg:bottom-[6%] lg:w-[min(100cqw,94cqh)]">
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
                          "bg-[radial-gradient(circle_at_40%_30%,#0a9a4d,#078843_45%,#065d35)] shadow-[0_50px_90px_-40px_rgba(6,93,53,0.7)]",
                      )}
                    />
                  </motion.div>
                ))}
              </div>

              {/* oversized size watermark */}
              <div aria-hidden className="absolute inset-x-0 -top-2 hidden justify-center overflow-hidden lg:flex">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.key}
                    initial={{ y: "60%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-60%", opacity: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="whitespace-nowrap font-display text-[clamp(5rem,11vw,10rem)] font-medium leading-none tracking-[-0.04em] text-forest/[0.07]"
                  >
                    {current.amount}
                    <span className="text-[0.45em] tracking-normal">{current.unit}</span>
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="absolute inset-x-0 bottom-[7%] top-[2%] lg:bottom-[9%] lg:top-[6%]">
                {sizes.map((s, i) => (
                  <Bottle key={s.key} index={i} position={position} />
                ))}
              </div>

              <div className="absolute -right-2 bottom-[1%] w-[min(30cqw,46cqh)] sm:right-[2%] lg:w-[36%]">
                <Image
                  src="/images/brand/coconut.png"
                  alt=""
                  width={1357}
                  height={1177}
                  sizes="220px"
                  className="h-auto w-full -scale-x-100 drop-shadow-[0_20px_20px_rgba(4,63,37,0.3)]"
                />
              </div>
            </div>

            {/* ── Details: follow the bottle on stage ── */}
            <div>
              <Eyebrow className="hidden lg:flex">Our Products</Eyebrow>
              <div className="mt-6 hidden lg:block">{heading}</div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:mt-8">
                <h3 className="font-display text-xl text-ink lg:text-2xl">Nalkera Coconut Oil</h3>
                <p lang="ml" className="font-ml text-lg font-semibold text-leaf lg:text-xl">
                  വെളിച്ചെണ്ണ
                </p>
              </div>

              <div aria-live="polite" className="relative mt-2 min-h-[5.5rem] short:min-h-[2.75rem] lg:mt-6 lg:min-h-[9.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-[clamp(2.6rem,5vw,4rem)] font-medium leading-none text-forest short:text-[2.2rem]">{current.label}</span>
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold">{current.tagline}</span>
                    </p>
                    <p className="mt-3 max-w-md leading-relaxed text-ink/70 max-sm:text-sm short:hidden">{current.blurb}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 lg:mt-6">
                <SizePicker active={active} onSelect={select} />
              </div>

              <div className="mt-4 flex gap-2.5 short:mt-3 sm:gap-3 lg:mt-10">
                <ButtonLink
                  href={whatsappLink(enquiry(current.label))}
                  size="lg"
                  icon={<WhatsAppIcon className="size-[18px]" />}
                  className="flex-1 sm:flex-none"
                >
                  <span className="sm:hidden">Enquire</span>
                  <span className="hidden sm:inline">Enquire about {current.label}</span>
                </ButtonLink>
                <ButtonLink href="#order" size="lg" variant="outline" icon={<ShoppingBag className="size-4" />} className="flex-1 sm:flex-none">
                  Order multiple
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* scroll progress */}
          <div aria-hidden className="absolute bottom-6 left-1/2 hidden h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-forest/10 lg:block">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-leaf" />
          </div>
        </div>
      </div>
    </section>
  );
}
