'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import LazyImage from '@/components/ui/lazy-image';
import Lightbox from '@/components/ui/lightbox';
import { gridItem } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '@/lib/site-data';
import { cn } from '@/lib/utils';

/** Cap the stagger so a 14-item filter reset does not take three seconds. */
const MAX_STAGGERED_ITEMS = 8;
const STAGGER_STEP = 0.1;

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredItems = useMemo(
    () =>
      activeCategory === 'all'
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="portfolio" className="bg-surface py-20 md:py-24" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Work"
          title={
            <span id="portfolio-heading">
              Creative <span className="gradient-text-premium">Portfolio</span>
            </span>
          }
          description="Explore our collection of beautiful moments captured with love and artistry"
        />

        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter portfolio by category"
          className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={isActive}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  'min-h-11 rounded-full px-5 text-sm font-semibold transition-premium',
                  isActive
                    ? 'bg-accent text-on-accent shadow-premium'
                    : 'bg-raised text-body hover:bg-accent-soft hover:text-accent'
                )}
              >
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Masonry grid: CSS columns keep every image at its natural ratio. */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.id}
                layout={!prefersReducedMotion}
                variants={gridItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  delay: prefersReducedMotion
                    ? 0
                    : Math.min(index, MAX_STAGGERED_ITEMS) * STAGGER_STEP,
                }}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open ${item.title} in ${item.location}`}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl shadow-premium transition-shadow duration-300 hover:shadow-premium-xl"
              >
                <LazyImage
                  src={item.image}
                  alt={`${item.title} — ${item.location}`}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
                  wrapperClassName="w-full"
                />

                {/* Hover overlay — gradient keeps the caption readable on any photo */}
                <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="mb-2 h-5 w-5 text-white" />
                  <span className="text-lg font-bold text-white">{item.title}</span>
                  <span className="text-sm text-white/80">{item.location}</span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filteredItems}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
