"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { whatsappLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

// Sections that carry their own WhatsApp button; the floating one steps aside while they are on screen.
const SECTIONS_WITH_CTA = ["products", "order", "contact"];

/** Appears once the hero is passed; hides over sections that already offer WhatsApp. */
export function FloatingWhatsAppButton() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setPastHero(v > window.innerHeight * 0.7));

  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setCtaVisible(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    SECTIONS_WITH_CTA.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const show = pastHero && !ctaVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enquire on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.5, ease }}
          className="group fixed bottom-5 right-5 z-40 flex items-center md:bottom-8 md:right-8"
        >
          <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-ivory opacity-0 shadow-lg transition-all duration-500 ease-organic group-hover:translate-x-0 group-hover:opacity-100 md:block">
            Chat with us
          </span>
          <span className="relative grid size-14 place-items-center rounded-full bg-leaf text-ivory shadow-[0_16px_34px_-10px_rgba(6,93,53,0.7)] transition-transform duration-500 ease-organic group-hover:scale-105">
            <span aria-hidden className="absolute inset-0 animate-pulse-ring rounded-full bg-leaf" />
            <WhatsAppIcon className="relative size-6" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
