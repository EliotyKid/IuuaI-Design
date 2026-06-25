import type { Variants } from "framer-motion";

export const scaleAnimation: Variants = {
  initial: { scale: 0 },
  enter: {
    x: "-50%",
    y: "-50%",
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    x: "-50%",
    y: "-50%",
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}