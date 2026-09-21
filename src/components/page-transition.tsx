'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransition } from '@/lib/animations';

/**
 * Fades each route in as it mounts. Keyed on the pathname so a client-side
 * navigation replays the animation; there is no exit animation, which keeps
 * navigation instant instead of holding the old page on screen.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div key={pathname} variants={pageTransition} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
