'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import Lightbox from '@/components/ui/lightbox';
import { gridItem } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import { WEDDINGS, WEDDING_CATEGORIES } from '@/lib/site-data';
import { cn } from '@/lib/utils';

export default function WeddingsGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const weddings = useMemo(
    () =>
      activeCategory === 'All'
        ? WEDDINGS
        : WEDDINGS.filter((wedding) => wedding.category === activeCategory),
    [activeCategory]
  );

  // The lightbox works on a generic shape, so map couples onto it.
  const lightboxItems = useMemo(
    () =>
      weddings.map((wedding) => ({
        id: wedding.id,
        image: wedding.image,
        title: wedding.couple,
        location: `${wedding.location} · ${wedding.date}`,
      })),
    [weddings]
  );

  return (
    <>
      <section className="bg-surface py-14 md:py-20" aria-label="Wedding collections">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="group"
            aria-label="Filter weddings by type"
            className="mb-10 flex flex-wrap gap-2 md:gap-3"
          >
            {WEDDING_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'min-h-11 rounded-full px-5 text-sm font-bold transition-premium',
                    isActive
                      ? 'bg-accent text-on-accent shadow-premium'
                      : 'bg-raised text-body hover:bg-accent-soft hover:text-accent'
                  )}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {weddings.map((wedding, index) => (
                <motion.li
                  key={wedding.id}
                  layout={!prefersReducedMotion}
                  variants={gridItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: prefersReducedMotion ? 0 : Math.min(index, 6) * 0.08 }}
                >
                  <button
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`View ${wedding.couple} in ${wedding.location}`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-panel text-left shadow-premium transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-premium-xl"
                  >
                    <span className="relative block aspect-[4/5] overflow-hidden">
                      <LazyImage
                        src={wedding.image}
                        alt={`${wedding.couple} — ${wedding.location}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        wrapperClassName="absolute inset-0"
                      />
                      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="text-sm font-bold text-white">View gallery &rarr;</span>
                      </span>
                      <span className="absolute left-4 top-4 rounded-full bg-surface/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {wedding.category}
                      </span>
                    </span>

                    <span className="block p-6">
                      <span className="block text-lg font-bold text-ink transition-colors duration-200 group-hover:text-accent">
                        {wedding.couple}
                      </span>
                      <span className="mt-2 flex items-center gap-1.5 text-sm text-body">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {wedding.date}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-accent">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {wedding.location}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={lightboxItems}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
