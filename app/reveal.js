"use client";

import { motion, useReducedMotion } from "motion/react";

const visible = { opacity: 1, y: 0 };

export default function Reveal({
  children,
  className,
  delay = 0,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`motion-reveal ${className ?? ""}`.trim()}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={visible}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.28, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
