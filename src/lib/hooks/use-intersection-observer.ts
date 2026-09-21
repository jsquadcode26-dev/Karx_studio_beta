'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

interface IntersectionOptions {
  /** Fraction of the element that must be visible before it counts as intersecting. */
  threshold?: number;
  /** Margin applied to the viewport when computing intersections. */
  rootMargin?: string;
  /** Stop observing after the first intersection (entrance animations). */
  once?: boolean;
}

interface IntersectionResult<T extends Element> {
  ref: RefObject<T | null>;
  isIntersecting: boolean;
}

/**
 * Observes a single element and reports whether it is in the viewport.
 *
 * One observer per element, disconnected on unmount. When `once` is set the
 * observer detaches as soon as the element first appears, so entrance
 * animations never re-run while the user scrolls back and forth.
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  once = true,
}: IntersectionOptions = {}): IntersectionResult<T> {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isIntersecting };
}
