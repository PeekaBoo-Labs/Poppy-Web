import { Variants } from "framer-motion";

export const defaultSpring = {
  type: "spring",
  damping: 20,
  stiffness: 200,
} as const;

export const fadeUpParent: Variants = {
  hidden: {
    opacity: 0,
    translateY: 50,
    transition: {
      ...defaultSpring,
      staggerChildren: 0.1,
    },
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      ...defaultSpring,
      staggerChildren: 0.1,
    },
  },
} as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    translateY: 50,
    transition: defaultSpring,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: defaultSpring,
  },
} as const;

export const scaleVariantParent: Variants = {
  hidden: {
    scale: 1.2,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 25,
      staggerChildren: 0.006,
    },
  },
} as const;

export const scaleVariantFast: Variants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 75,
    },
  },
};
