import type { Variants, Transition } from 'framer-motion';

/**
 * Premium Animation Utilities
 * Reusable Framer Motion variants and configurations
 */

// ===================================
// TIMING AND EASING
// ===================================

export const DURATIONS = {
  fast: 0.15,
  base: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const;

/** Cubic-bezier control points, kept mutable so Framer Motion accepts them as `ease`. */
const bezier = (
  p1: number,
  p2: number,
  p3: number,
  p4: number
): [number, number, number, number] => [p1, p2, p3, p4];

export const EASINGS = {
  easeOut: bezier(0.4, 0, 0.2, 1),
  easeIn: bezier(0.4, 0, 1, 1),
  easeInOut: bezier(0.4, 0, 0.2, 1),
  spring: { type: 'spring', stiffness: 300, damping: 30 } as Transition,
  springSmooth: { type: 'spring', stiffness: 200, damping: 25 } as Transition,
};

// ===================================
// ANIMATION VARIANTS
// ===================================

/**
 * Fade In Animation
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.base,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Slide Up Animation
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Slide Down Animation
 */
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Slide In from Left
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Slide In from Right
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Scale In Animation
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Scale In with Spring
 */
export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASINGS.springSmooth,
  },
};

/**
 * Stagger Container - for staggering child animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast Stagger Container (100ms delay)
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Slow Stagger Container (150ms delay)
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger Item - for items within stagger container
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Blur In Animation
 */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DURATIONS.slower,
      ease: EASINGS.easeOut,
    },
  },
};

// ===================================
// HOVER/INTERACTION ANIMATIONS
// ===================================

/**
 * Button Hover Animation
 */
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
  tap: {
    scale: 0.98,
  },
};

/**
 * Card Hover Lift Animation
 */
export const cardHoverLift = {
  rest: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: DURATIONS.base,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Image Zoom on Hover
 */
export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Image Zoom Large (1.1x)
 */
export const imageZoomLarge = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: DURATIONS.slower,
      ease: EASINGS.easeOut,
    },
  },
};

// ===================================
// MODAL/OVERLAY ANIMATIONS
// ===================================

/**
 * Modal Backdrop Animation
 */
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.base,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATIONS.base,
    },
  },
};

/**
 * Modal Content Animation
 */
export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: DURATIONS.base,
    },
  },
};

/**
 * Mobile Menu Slide In
 */
export const mobileMenuSlide: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeIn,
    },
  },
};

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Parallax configuration for scroll effects
 */
export const parallaxConfig = {
  slow: {
    initial: { y: 0 },
    whileInView: { y: -20 },
    transition: { duration: 0.8, ease: EASINGS.easeOut },
  },
  medium: {
    initial: { y: 0 },
    whileInView: { y: -40 },
    transition: { duration: 0.8, ease: EASINGS.easeOut },
  },
  fast: {
    initial: { y: 0 },
    whileInView: { y: -60 },
    transition: { duration: 0.8, ease: EASINGS.easeOut },
  },
};

// ===================================
// PAGE TRANSITIONS
// ===================================

/**
 * Route-level transition. Kept to opacity plus a small translate so it never
 * delays interaction or shifts layout while the next route paints.
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
};

/**
 * Grid item used by filterable galleries: scales in on enter, out on exit so
 * `AnimatePresence` can play a stagger in both directions.
 */
export const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: DURATIONS.base,
      ease: EASINGS.easeIn,
    },
  },
};
