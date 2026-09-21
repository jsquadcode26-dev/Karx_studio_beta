'use client';

import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** Small uppercase eyebrow above the title. */
  tag?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  /** Heading level, so each page keeps a single h1 and a sane outline. */
  as?: 'h1' | 'h2';
}

/**
 * Shared section heading: eyebrow, title and supporting copy, revealed as a
 * stagger when the section scrolls into view.
 */
export default function SectionHeader({
  tag,
  title,
  description,
  className,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  const { ref, animate } = useScrollAnimation<HTMLDivElement>({ rootMargin: '0px 0px -80px 0px' });
  const MotionHeading = Heading === 'h1' ? motion.h1 : motion.h2;

  return (
    <motion.div
      ref={ref}
      className={cn('mx-auto mb-12 max-w-3xl text-center', className)}
      variants={staggerContainer}
      initial="hidden"
      animate={animate}
    >
      {tag && (
        <motion.span
          variants={slideUp}
          className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-accent"
        >
          {tag}
        </motion.span>
      )}
      <MotionHeading
        variants={slideUp}
        className="text-fluid-section font-black leading-tight text-ink"
      >
        {title}
      </MotionHeading>
      {description && (
        <motion.p variants={slideUp} className="mt-4 text-lg leading-relaxed text-body">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
