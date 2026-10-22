import type { Variants } from "motion/react";

/** Long, soft deceleration used across the site — never bouncy. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease } },
};

export function stagger(staggerChildren = 0.1, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}

export const inView = { once: true, amount: 0.3 } as const;
