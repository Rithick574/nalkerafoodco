"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/site";
import { ease } from "@/lib/motion";

type SplitTextProps = {
  /** One string per line. Wrap words in *asterisks* to give them the accent style. */
  lines: string[];
  delay?: number;
  stagger?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
  accentClassName?: string;
};

const word: Variants = {
  hidden: { y: "110%" },
  show: (d: number) => ({ y: "0%", transition: { duration: 1.05, ease, delay: d } }),
};

/** Masked, word-by-word headline reveal. */
export function SplitText({
  lines,
  delay = 0,
  stagger = 0.07,
  onMount = false,
  accentClassName = "italic text-leaf",
}: SplitTextProps) {
  let index = 0;
  let inAccent = false;
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span className="block" initial="hidden" {...trigger}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block">
            {words.map((raw, wi) => {
              // *accent* may span several words: open on a leading *, close after a trailing *.
              if (raw.startsWith("*")) inAccent = true;
              const accent = inAccent;
              if (raw.endsWith("*")) inAccent = false;
              const text = raw.replace(/\*/g, "");
              const d = delay + index++ * stagger;
              return (
                <span key={wi}>
                  <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                    <motion.span custom={d} variants={word} className={cn("inline-block", accent && cn(accentClassName, "pr-[0.06em]"))}>
                      {text}
                    </motion.span>
                  </span>
                  {wi < words.length - 1 && " "}
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
}
