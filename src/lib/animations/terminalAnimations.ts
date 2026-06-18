import { Transition, Variants } from "framer-motion";

export const terminalTransition: Transition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
};

// Window close/open animations (respecting reduced motion if passed)
export const getWindowVariants = (shouldReduceMotion: boolean): Variants => ({
  initial: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.96,
    y: shouldReduceMotion ? 0 : 12,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...terminalTransition,
      // For entering, filter blur should transition smoothly too
      filter: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.96,
    y: shouldReduceMotion ? 0 : 12,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

// Restore button animations
export const getRestoreVariants = (shouldReduceMotion: boolean): Variants => ({
  initial: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.95,
    y: shouldReduceMotion ? 0 : 10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: terminalTransition,
  },
  exit: {
    opacity: 0,
    scale: shouldReduceMotion ? 1 : 0.95,
    y: shouldReduceMotion ? 0 : 10,
    transition: { duration: 0.2 },
  },
});

// Minimize/collapse body animations
export const bodyVariants: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.2, ease: "linear" },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.2, ease: "linear" },
    },
  },
};
