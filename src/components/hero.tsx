'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { slideUp, staggerContainerSlow } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import LazyImage from '@/components/ui/lazy-image';
import { SITE } from '@/lib/site-data';

const ASSETS = {
  video: '/assets/video.mp4',
  poster: '/assets/bg.jpg',
  mobilePoster: '/assets/mobile_bg.jpeg',
};

/**
 * Home hero. The showreel plays only on screens wide enough to justify the
 * download and only when the viewer has not asked for reduced motion;
 * everywhere else the poster frame carries the same image.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-footer"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-x-0 -top-[30%] h-[160%]"
        style={prefersReducedMotion ? undefined : { y: backgroundY }}
        aria-hidden="true"
      >
        {/* Mobile and reduced-motion: still frame only */}
        <LazyImage
          src={ASSETS.mobilePoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
          wrapperClassName="absolute inset-0 md:hidden"
        />

        {prefersReducedMotion ? (
          <LazyImage
            src={ASSETS.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover md:block"
            wrapperClassName="absolute inset-0 hidden md:block"
          />
        ) : (
          <video
            className="hidden h-full w-full object-cover md:block"
            src={ASSETS.video}
            poster={ASSETS.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        <span className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
        variants={staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={slideUp}
          className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-accent-hover"
        >
          {SITE.tagline}
        </motion.span>

        <motion.h1 id="hero-heading" variants={slideUp} className="text-fluid-hero font-black text-ink">
          Crafting <span className="gradient-text-premium">Timeless</span> Memories
        </motion.h1>

        <motion.p variants={slideUp} className="mx-auto mt-6 max-w-2xl text-fluid-body text-ink/85">
          Premium photography and cinematography from Thanjavur — weddings, pre-wedding stories,
          maternity, baby shoots and live events.
        </motion.p>

        <motion.div variants={slideUp} className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/gallery"
            className="inline-flex min-h-12 items-center rounded-lg bg-accent px-8 font-bold text-on-accent shadow-premium-lg transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0"
          >
            View Gallery
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-lg border-2 border-ink/70 px-8 font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-surface"
          >
            Book a Shoot
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
