"use client";

import { motion } from "motion/react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";

export function LocationSection() {
  return (
    <section id="find-us" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Eyebrow>Find Us</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
            <SplitText lines={["Come say hello", "in *Poochol.*"]} />
          </h2>

          <motion.div variants={stagger(0.1, 0.25)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.p variants={fadeUp} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/70">
              Nalkera Foodco is based in Poochol, Kerala. Open the map for directions, or get in touch before you visit.
            </motion.p>

            <motion.address variants={fadeUp} className="mt-8 flex max-w-md items-start gap-4 border-y border-forest/10 py-5 not-italic">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime/20 text-forest">
                <MapPin aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block font-display text-xl text-forest">{site.company}</span>
                <span className="mt-0.5 block text-ink/65">{site.location}, India</span>
              </span>
            </motion.address>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={site.mapsUrl} size="lg" icon={<Navigation className="size-4" />}>
                Get Directions
              </ButtonLink>
              <ButtonLink href={site.phoneHref} size="lg" variant="outline" icon={<Phone className="size-4" />}>
                Call Us
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-[2rem] bg-lime/35 md:translate-x-5 md:translate-y-5 md:rounded-[2.5rem]" />
          <motion.div
            initial={{ clipPath: "inset(12% 8% 12% 8% round 40px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 40px)", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease }}
            className="relative aspect-square overflow-hidden rounded-[2rem] bg-cream shadow-[0_40px_80px_-40px_rgba(6,93,53,0.55)] ring-1 ring-forest/10 sm:aspect-[4/3] md:rounded-[2.5rem]"
          >
            {/* Shown while the map loads */}
            <div aria-hidden className="absolute inset-0 grid place-items-center text-forest/30">
              <MapPin className="size-10" />
            </div>
            <iframe
              src={site.mapEmbedSrc}
              title="Map showing Nalkera Foodco in Poochol, Kerala"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
