"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn, navLinks, site, whatsappLink } from "@/lib/site";
import { ease } from "@/lib/motion";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Mobile menu: lock page scroll, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    // The entry transform lives on the bar, not the header, so the fixed mobile
    // panel below is positioned against the viewport rather than a transformed parent.
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className={cn(
          "transition-[background-color,box-shadow,padding,backdrop-filter] duration-500 ease-organic",
          solid
            ? "bg-ivory/80 py-2.5 shadow-[0_1px_0_rgba(6,93,53,0.08),0_12px_32px_-16px_rgba(6,93,53,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent py-4 md:py-5",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <a href="#home" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/images/nalkera-logo.png"
              alt="Nalkera Foodco"
              width={768}
              height={320}
              priority
              sizes="140px"
              className={cn("h-auto transition-[width] duration-500 ease-organic", solid ? "w-[104px]" : "w-[118px] md:w-[132px]")}
            />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => {
              const current = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "group relative py-2 text-[0.9rem] font-medium transition-colors duration-300",
                      current ? "text-forest" : "text-ink/70 hover:text-forest",
                    )}
                  >
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-lime transition-transform duration-500 ease-organic",
                        current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group hidden h-11 items-center gap-2 rounded-full bg-forest pl-5 pr-4 text-sm font-semibold text-ivory transition-colors duration-300 hover:bg-leaf sm:inline-flex"
            >
              Contact Us
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 ease-organic group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest/5 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "circle(0% at 89% 36px)" }}
            animate={{ clipPath: "circle(150% at 89% 36px)" }}
            exit={{ clipPath: "circle(0% at 89% 36px)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-ivory px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.6, ease, delay: 0.18 + i * 0.06 }}
                  className="border-b border-forest/10"
                >
                  <a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-tight text-forest"
                  >
                    {l.label}
                    <span className="font-sans text-xs tracking-[0.2em] text-ink/40">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-auto space-y-4 pt-10"
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-leaf font-semibold text-ivory"
              >
                <WhatsAppIcon /> Enquire on WhatsApp
              </a>
              <p className="text-center text-sm text-ink/60">
                <a href={site.phoneHref} className="font-semibold text-forest">
                  {site.phoneDisplay}
                </a>
                <span className="mx-2">·</span>
                {site.location}
              </p>
              <p lang="ml" className="text-center font-ml text-lg text-leaf">
                {site.taglineMl}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
