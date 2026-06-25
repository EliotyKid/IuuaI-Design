import type { Variants } from "framer-motion";

export const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Tempo entre o surgimento de cada card
    },
  },
};
