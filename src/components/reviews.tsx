'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FaGoogle, FaStar } from 'react-icons/fa';
import SectionHeader from '@/components/ui/section-header';
import LazyImage from '@/components/ui/lazy-image';
import { DURATIONS, EASINGS } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import { GOOGLE_RATING, REVIEWS } from '@/lib/site-data';
import { cn } from '@/lib/utils';

const AUTO_ADVANCE_MS = 6000;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 240 : -240, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -240 : 240, opacity: 0 }),
};

/** Star row that fills one star at a time when the review appears. */
function StarRating({ rating, animated }: { rating: number; animated: boolean }) {
  return (
    <div
      className="flex gap-1 text-accent"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <motion.span
          key={i}
          initial={animated ? { opacity: 0, scale: 0.5 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: animated ? i * 0.08 : 0, duration: DURATIONS.slow }}
        >
          <FaStar aria-hidden="true" />
        </motion.span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex(next);
  }, []);

  const step = useCallback(
    (delta: number) => {
      goTo((index + delta + REVIEWS.length) % REVIEWS.length, delta);
    },
    [goTo, index]
  );

  useEffect(() => {
    // Auto-advance stops while the viewer is reading (hover/focus) and never
    // starts for viewers who asked for reduced motion.
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="bg-surface py-20 md:py-24" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Testimonials"
          title={
            <span id="reviews-heading">
              What Our <span className="gradient-text-premium">Clients Say</span>
            </span>
          }
        />

        {/* Google rating badge */}
        <div className="mx-auto mb-12 flex w-fit items-center gap-4 rounded-2xl bg-panel px-6 py-4 shadow-premium">
          <FaGoogle className="text-3xl text-accent" aria-hidden="true" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-ink">{GOOGLE_RATING.score}</span>
              <StarRating rating={5} animated={false} />
            </div>
            <span className="text-sm text-body">{GOOGLE_RATING.count} on Google</span>
          </div>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            className="relative min-h-[22rem] overflow-hidden rounded-2xl bg-panel p-8 shadow-premium md:min-h-[20rem] md:p-10"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.blockquote
                key={review.id}
                custom={direction}
                variants={prefersReducedMotion ? undefined : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: DURATIONS.slower, ease: EASINGS.easeInOut }}
                className="flex h-full flex-col"
              >
                <Quote className="mb-4 h-8 w-8 text-accent/40" aria-hidden="true" />
                <p className="flex-1 text-lg leading-relaxed text-body">{review.text}</p>

                <footer className="mt-6 flex items-center gap-4">
                  <LazyImage
                    src={review.image}
                    alt={review.name}
                    width={64}
                    height={64}
                    sizes="64px"
                    className="h-16 w-16 rounded-full object-cover"
                    wrapperClassName="h-16 w-16 shrink-0 rounded-full border-2 border-accent/30"
                  />
                  <div>
                    <cite className="block font-bold not-italic text-ink">{review.name}</cite>
                    <span className="text-sm text-body">{review.event}</span>
                    <div className="mt-1">
                      <StarRating rating={review.rating} animated={!prefersReducedMotion} />
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <button
            onClick={() => step(-1)}
            aria-label="Previous review"
            className="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-panel text-body shadow-premium-lg transition-premium hover:bg-accent hover:text-on-accent md:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next review"
            className="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-panel text-body shadow-premium-lg transition-premium hover:bg-accent hover:text-on-accent md:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Show review ${i + 1} of ${REVIEWS.length}`}
                aria-current={i === index}
                className="flex h-11 w-6 items-center justify-center"
              >
                <motion.span
                  className={cn(
                    'block h-2 rounded-full transition-colors duration-300',
                    i === index ? 'bg-accent' : 'bg-field'
                  )}
                  animate={{ width: i === index ? 24 : 8 }}
                  transition={{ duration: DURATIONS.slow, ease: EASINGS.easeOut }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
