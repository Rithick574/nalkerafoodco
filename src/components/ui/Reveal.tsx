"use client";

import { motion, type Variants } from "motion/react";
import { ease, inView } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

/** Fades and lifts its content once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 28, amount = inView.amount }: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay } },
  };
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, amount }}>
      {children}
    </motion.div>
  );
}
