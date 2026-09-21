'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LazyImage from './lazy-image';
import { slideUp, staggerContainer } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  /** Optional background photograph, rendered behind a dark scrim. */
  image?: string;
  imageAlt?: string;
}

/**
 * Hero band for sub-pages. The background drifts at roughly half scroll speed
 * for depth; the effect is skipped entirely under `prefers-reduced-motion`.
 */
export default function PageHeader({ title, subtitle, image, imageAlt = '' }: PageHeaderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const hasImage = Boolean(image);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-panel pb-14 pt-28 md:pb-20 md:pt-36"
    >
      {hasImage && (
        <motion.div
          className="absolute inset-x-0 -top-[30%] h-[160%] -z-10"
          style={prefersReducedMotion ? undefined : { y }}
          aria-hidden={imageAlt === '' ? 'true' : undefined}
        >
          <LazyImage
            src={image as string}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            wrapperClassName="absolute inset-0"
          />
          <span className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>
      )}

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={slideUp}
          className={`text-fluid-page font-black ${hasImage ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={slideUp}
            className={`mt-4 max-w-2xl text-fluid-body ${hasImage ? 'text-white/85' : 'text-body'}`}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
