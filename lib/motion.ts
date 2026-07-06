import type { Variants } from "motion/react";

/* Variants d'animation partagés — inspirés du portfolio.
   Ease signature du projet : [0.22, 1, 0.36, 1] */
const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

/* Props prêtes à l'emploi pour un reveal au scroll */
export const inViewProps = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, margin: "-80px" },
};
