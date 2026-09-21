'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';

interface CtaBandProps {
  title: React.ReactNode;
  description: string;
  actionLabel: string;
  href?: string;
}

/** Closing call to action shared by the film, wedding and about pages. */
export default function CtaBand({ title, description, actionLabel, href = '/contact' }: CtaBandProps) {
  const { ref, animate } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="bg-gradient-to-r from-accent-soft to-panel py-16 md:py-20">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={animate}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.h2 variants={slideUp} className="text-fluid-section font-black text-ink">
          {title}
        </motion.h2>
        <motion.p variants={slideUp} className="mt-4 text-fluid-body text-body">
          {description}
        </motion.p>
        <motion.div variants={slideUp} className="mt-8">
          <Link
            href={href}
            className="inline-flex min-h-12 items-center rounded-lg bg-accent px-8 font-bold text-on-accent shadow-premium transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0"
          >
            {actionLabel}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
