'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, Play, X } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import VideoPlayer from '@/components/ui/video-player';
import { gridItem, modalBackdrop, modalContent } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import { FILMS, type Film } from '@/lib/site-data';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', ...Array.from(new Set(FILMS.map((film) => film.category)))];

export default function FilmsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const films = useMemo(
    () =>
      activeCategory === 'All'
        ? FILMS
        : FILMS.filter((film) => film.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <section className="bg-surface py-14 md:py-20" aria-label="Film collection">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="group"
            aria-label="Filter films by category"
            className="mb-10 flex flex-wrap gap-2 md:gap-3"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'min-h-11 rounded-full px-5 text-sm font-bold uppercase tracking-wider transition-premium',
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
              {films.map((film, index) => (
                <motion.li
                  key={film.id}
                  layout={!prefersReducedMotion}
                  variants={gridItem}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: prefersReducedMotion ? 0 : Math.min(index, 6) * 0.08 }}
                >
                  <button
                    onClick={() => setSelectedFilm(film)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-panel text-left shadow-premium transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-premium-xl"
                    aria-label={`Play ${film.title}`}
                  >
                    <span className="relative block aspect-video overflow-hidden bg-black">
                      {/* Poster only — the video file downloads after the viewer presses play. */}
                      <LazyImage
                        src={film.image}
                        alt={film.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        wrapperClassName="absolute inset-0"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-on-accent">
                          <Play className="ml-1 h-7 w-7" fill="currentColor" />
                        </span>
                      </span>
                    </span>

                    <span className="flex flex-1 flex-col p-6">
                      <span className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent">
                          {film.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-body">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {film.duration}
                        </span>
                      </span>
                      <span className="text-lg font-bold text-ink transition-colors duration-200 group-hover:text-accent">
                        {film.title}
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm text-body">
                        {film.description}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      {/* Film detail modal */}
      <AnimatePresence>
        {selectedFilm && (
          <motion.div
            className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/90 p-4 backdrop-blur-premium md:p-8"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedFilm(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedFilm.title}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-panel"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFilm(null)}
                aria-label="Close film"
                autoFocus
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white transition-premium hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>

              <VideoPlayer
                src={selectedFilm.videoUrl}
                poster={selectedFilm.image}
                title={selectedFilm.title}
                autoPlay
                className="aspect-video w-full shrink-0"
              />

              <div className="overflow-y-auto p-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-accent">
                    {selectedFilm.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-body">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    {selectedFilm.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-body">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {selectedFilm.duration}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-ink">{selectedFilm.title}</h2>
                <p className="mt-2 leading-relaxed text-body">{selectedFilm.description}</p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-accent px-6 font-bold text-on-accent transition-colors duration-200 hover:bg-accent-hover"
                >
                  Book Your Film
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
