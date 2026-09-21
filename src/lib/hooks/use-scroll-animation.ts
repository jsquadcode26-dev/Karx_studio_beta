'use client';

import { useIntersectionObserver } from './use-intersection-observer';
import { useReducedMotion } from './use-reduced-motion';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Drives scroll-triggered entrance animations.
 *
 * Pair the returned `ref` with a Framer Motion element and feed `animate` into
 * its `animate` prop:
 *
 *   const { ref, animate } = useScrollAnimation();
 *   <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={animate} />
 *
 * When the user prefers reduced motion the element is reported as visible
 * immediately, so content appears without movement instead of never appearing.
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver<T>(options);
  const isVisible = prefersReducedMotion || isIntersecting;

  return {
    ref,
    isVisible,
    prefersReducedMotion,
    /** Variant name to pass to a Framer Motion `animate` prop. */
    animate: isVisible ? 'visible' : 'hidden',
  } as const;
}
