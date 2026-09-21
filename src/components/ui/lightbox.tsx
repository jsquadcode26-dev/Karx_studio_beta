'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import LazyImage from './lazy-image';
import { modalBackdrop, modalContent } from '@/lib/animations';

export interface LightboxItem {
  id: number;
  image: string;
  title: string;
  location: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen image viewer with a blurred backdrop.
 *
 * Keyboard: Escape closes, arrow keys move between images, Tab stays inside the
 * dialog. Focus moves into the dialog on open and returns to whatever opened it
 * on close.
 */
export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = items[index];

  const goTo = useCallback(
    (delta: number) => {
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  // Restore focus to the element that opened the lightbox.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goTo(-1);
          break;
        case 'ArrowRight':
          goTo(1);
          break;
        case 'Tab': {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goTo, onClose]);

  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/80 p-4 backdrop-blur-premium md:p-8"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title}, ${item.location}. Image ${index + 1} of ${items.length}`}
        tabIndex={-1}
        className="relative w-full max-w-5xl outline-none"
        variants={modalContent}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute -top-12 right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-premium hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        <LazyImage
          src={item.image}
          alt={`${item.title} — ${item.location}`}
          width={1600}
          height={1067}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="h-auto max-h-[75vh] w-full rounded-xl object-contain"
          wrapperClassName="rounded-xl bg-black/40"
          priority
        />

        <div className="mt-4 text-center text-white">
          <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
          <p className="text-sm text-white/70">{item.location}</p>
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-premium hover:bg-white/25 md:-left-16"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-premium hover:bg-white/25 md:-right-16"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
